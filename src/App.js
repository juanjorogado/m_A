import React, { useState } from 'react';
import './App.css';
import { getMeditationForDate } from './data/meditations';

function CardFront({ meditation }) {
  return (
    <div className="card-face card-front">
      <div className="card-content">
        <div className="card-header">
          <span>Imperium Internum</span>
          <span>{meditation.era || 'Roma · 170 d. C.'}</span>
        </div>

        <div className="card-body">
          <blockquote className="card-quote">
            “{meditation.quote}”
          </blockquote>

          <div className="card-footer">
            <p className="card-author">{(meditation.author || 'Marco Aurelio').toUpperCase()}</p>
            <p className="card-source">{meditation.source}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBack({ meditation }) {
  return (
    <div className="card-face card-back">
      <div className="card-back-content">
        <div className="card-section">
          <h3>Lectura Filosófica</h3>
          <p>{meditation.explanation}</p>
        </div>

        <div className="card-section">
          <h3>Contexto Histórico</h3>
          <p>{meditation.context}</p>
        </div>

        <div className="card-section">
          <h3>Concepto Griego Original</h3>
          <div className="greek-concept">
            <p className="greek-text">{meditation.latin}</p>
            <p className="greek-translation">
              “{meditation.conceptTranslation || 'Lo que depende de nosotros'}”. Una distinción esencial del estoicismo.
            </p>
          </div>
        </div>

        {meditation.references && meditation.references.length > 0 && (
          <div className="references-section">
            <h3>Referencias y Fuentes</h3>
            {meditation.references.map((ref, index) => (
              <div key={index} className="reference-item">
                <p className="reference-title">{ref.title}</p>
                {ref.author && (
                  <p className="reference-author">por {ref.author}</p>
                )}
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reference-url"
                  >
                    {ref.url}
                  </a>
                )}
                {ref.type && (
                  <p className="reference-type">
                    Fuente {ref.type === 'primary' ? 'primaria' : 'secundaria'}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="card-footer-back">
          <span>Contemplación diaria</span>
          <span>Desliza para archivo</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const meditation = getMeditationForDate(new Date());
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="app-container">
      <div className="background-texture" aria-hidden="true" />

      <main className="main-content">
        <header className="header" />

        <section className="card-container">
          <div
            className="card-wrapper"
            onClick={() => setFlipped(v => !v)}
          >
            <div
              className={`card ${flipped ? 'flipped' : ''}`}
            >
              <CardFront meditation={meditation} />
              <CardBack meditation={meditation} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
