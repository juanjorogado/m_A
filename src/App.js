import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { getMeditationForDate } from './data/meditations';
import SummaryCard from './components/SummaryCard';
import DetailSection from './components/DetailSection';
import ReferencesList from './components/ReferencesList';

const SWIPE_THRESHOLD = 56;

function App() {
  const [meditation, setMeditation] = useState(() => getMeditationForDate(new Date()));
  const [expanded, setExpanded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
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

  useEffect(() => {
    requestAnimationFrame(() => setCardLoaded(true));
  }, []);

  useEffect(() => {
    const checkAndUpdateMeditation = () => {
      setMeditation((currentMeditation) => {
        const today = new Date();
        const freshMeditation = getMeditationForDate(today);
        if (currentMeditation.id !== freshMeditation.id) {
          return freshMeditation;
        }
        return currentMeditation;
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAndUpdateMeditation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    const intervalId = setInterval(checkAndUpdateMeditation, 5 * 60 * 1000); // 5 minutos

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, []);

  const openCard = () => setExpanded(true);
  const closeCard = () => setExpanded(false);

  const handleTouchStart = (event) => {
    touchStartYRef.current = event.changedTouches[0].clientY;
    touchStartScrollTopRef.current = sheetScrollRef.current ? sheetScrollRef.current.scrollTop : 0;
  };

  const handleTouchEnd = (event) => {
    if (touchStartYRef.current === null) {
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
      <div className="background-monogram" aria-hidden="true">M · A</div>

      <main className="app-frame">
        <div className={`sheet ${expanded ? 'expanded' : ''} ${cardLoaded ? 'loaded' : ''}`}>
          <div
            ref={sheetScrollRef}
            className="sheet-scroll"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <SummaryCard
              meditation={meditation}
              expanded={expanded}
              loaded={cardLoaded}
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
