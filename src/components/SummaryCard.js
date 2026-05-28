import React from 'react';

function SummaryCard({ meditation, expanded, onOpen }) {
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

        <div className="summary-footer">
          <p>{meditation.source}</p>
        </div>
      </div>
    </section>
  );
}

export default SummaryCard;
