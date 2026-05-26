import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { getMeditationForDate } from './data/meditations';

const SWIPE_THRESHOLD = 56;

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
          <p className="summary-hint">{expanded ? 'Desliza hacia abajo para cerrar' : 'Desliza hacia arriba'}</p>
        </div>
      </div>
    </section>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function ReferencesList({ references }) {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <section className="detail-section">
      <h2>Referencias</h2>
      <div className="references-list">
        {references.map((reference, index) => (
          <article key={index} className="reference-item">
            {reference.url ? (
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reference-title"
              >
                {reference.title}
              </a>
            ) : (
              <p className="reference-title">{reference.title}</p>
            )}
            {reference.author && <p className="reference-author">por {reference.author}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const meditation = getMeditationForDate(new Date());
  const [expanded, setExpanded] = useState(false);
  const sheetScrollRef = useRef(null);
  const touchStartYRef = useRef(null);
  const touchStartScrollTopRef = useRef(0);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setExpanded(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openCard = () => setExpanded(true);
  const closeCard = () => setExpanded(false);

  const handleTouchStart = (event) => {
    touchStartYRef.current = event.changedTouches[0].clientY;
    touchStartScrollTopRef.current = sheetScrollRef.current ? sheetScrollRef.current.scrollTop : 0;
  };

  const handleTouchEnd = (event) => {
    if (touchStartYRef.current === null) {
      touchStartYRef.current = null;
      touchStartScrollTopRef.current = 0;
      return;
    }

    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartYRef.current;
    const startedAtTop = touchStartScrollTopRef.current <= 0;

    touchStartYRef.current = null;
    touchStartScrollTopRef.current = 0;

    if (expanded) {
      if (startedAtTop && deltaY > SWIPE_THRESHOLD) {
        closeCard();
      }
      return;
    }

    if (deltaY < -SWIPE_THRESHOLD) {
      openCard();
    }
  };

  return (
    <div className={`app-shell ${expanded ? 'expanded' : ''}`}>
      <div className="background-layer" aria-hidden="true" />

      <main className="app-frame">
        <div className={`sheet ${expanded ? 'expanded' : ''}`}>
          <div
            ref={sheetScrollRef}
            className="sheet-scroll"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <SummaryCard
              meditation={meditation}
              expanded={expanded}
              onOpen={openCard}
            />

            <div className={`detail-content ${expanded ? 'expanded' : ''}`}>
              <DetailSection title="Lectura filosófica">
                <p>{meditation.explanation}</p>
              </DetailSection>

              <DetailSection title="Contexto histórico">
                <p>{meditation.context}</p>
              </DetailSection>

              <DetailSection title="Concepto original">
                <p className="concept-title">{meditation.latin}</p>
                <p>{meditation.conceptTranslation || 'Lo que depende de nosotros'}.</p>
              </DetailSection>

              <ReferencesList references={meditation.references} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
