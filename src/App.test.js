import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock getMeditationForDate to return a known meditation
jest.mock('./data/meditations', () => ({
  getMeditationForDate: () => ({
    id: '2026-05-27',
    quote: 'TODO LO QUE OÍMOS ES UNA OPINIÓN, NO UN HECHO.',
    latin: 'Omnia opinio',
    conceptTranslation: 'Todo es interpretación',
    author: 'Marco Aurelio',
    era: 'Roma · 170 d. C.',
    source: 'Meditaciones · Libro VIII · Meditación 6',
    explanation: 'Test explanation.',
    context: 'Test context.',
    references: [
      {
        title: 'Meditations, Book VIII, 6',
        url: 'https://example.com',
      },
    ],
  }),
}));

describe('App', () => {
  let onlineSpy;

  beforeEach(() => {
    onlineSpy = jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
  });

  afterEach(() => {
    onlineSpy.mockRestore();
  });

  it('renders the meditation quote', () => {
    render(<App />);
    expect(
      screen.getByText(/TODO LO QUE OÍMOS ES UNA OPINIÓN/)
    ).toBeInTheDocument();
  });

  it('renders the author and era', () => {
    render(<App />);
    expect(screen.getByText('Marco Aurelio')).toBeInTheDocument();
    expect(screen.getByText('Roma · 170 d. C.')).toBeInTheDocument();
  });

  it('renders the source reference', () => {
    render(<App />);
    expect(
      screen.getByText(/Meditaciones · Libro VIII/)
    ).toBeInTheDocument();
  });

  it('does not render detail content when collapsed', () => {
    render(<App />);
    expect(screen.queryByText('Lectura filosófica')).not.toBeInTheDocument();
  });

  it('renders the background monogram', () => {
    render(<App />);
    expect(screen.getByText('M · A')).toBeInTheDocument();
  });

  it('does not show offline banner when online', () => {
    render(<App />);
    const banner = screen.getByRole('status');
    expect(banner).not.toHaveClass('visible');
  });

  it('shows offline banner when offline', () => {
    onlineSpy.mockReturnValue(false);
    render(<App />);
    const banner = screen.getByRole('status');
    expect(banner).toHaveClass('visible');
  });

  it('shows detail content on expand', async () => {
    render(<App />);

    const hitbox = screen.getByRole('button', { name: /Abrir meditacion/i });
    await act(async () => {
      hitbox.click();
    });

    // Detail content should now be visible
    expect(screen.getByText('Lectura filosófica')).toBeInTheDocument();
    expect(screen.getByText('Test explanation.')).toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(<App />);

    const hitbox = screen.getByRole('button', { name: /Abrir meditacion/i });
    await act(async () => {
      hitbox.click();
    });

    // Should be expanded
    expect(screen.getByText('Lectura filosófica')).toBeInTheDocument();

    await act(async () => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape' })
      );
    });

    // Detail content should be gone
    expect(screen.queryByText('Lectura filosófica')).not.toBeInTheDocument();
  });
});