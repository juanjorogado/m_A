import React from 'react';

function SummaryCard({ meditation, expanded, onOpen }) {
  const source = meditation.source || '';

  // Try to extract 'Libro ...' and 'Meditación ...' parts from source
  let bookLabel = '';
  let medLabel = '';
  if (source) {
    const parts = source.split('·').map((p) => p.trim());
    parts.forEach((p) => {
      if (/Libro\b/i.test(p)) bookLabel = p;
      if (/Meditaci[oó]n|Meditation|Mediti/i.test(p)) medLabel = p;
    });
  }

  return (
    <section className={`summary-card ${expanded ? 'expanded' : ''}`}>
      <div
        className="summary-card-hitbox"
        onClick={expanded ? undefined : onOpen}
        role={expanded ? undefined : 'button'}
        tabIndex={expanded ? -1 : 0}
        onKeyDown={(event) => {
          if (!expanded && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onOpen();
          }
        }}
        aria-label={expanded ? undefined : 'Abrir meditacion'}
      >
        <div className="summary-meta">
          <span>{meditation.author || 'Marco Aurelio'}</span>
          <span>{meditation.era || ''}</span>
        </div>

        <blockquote className="summary-quote">
          “{meditation.quote}”
        </blockquote>

        {(bookLabel || medLabel) && (
          <div className="summary-info" aria-hidden={expanded}>
            {bookLabel && <span className="summary-book">{bookLabel}</span>}
            {medLabel && <span className="summary-number">{medLabel}</span>}
          </div>
        )}

        <div className="summary-footer">
          <p>{meditation.source}</p>
        </div>
      </div>
    </section>
  );
}

export default SummaryCard;
