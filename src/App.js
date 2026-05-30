import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import { getMeditationForDate } from './data/meditations';
import SummaryCard from './components/SummaryCard';

const DetailSection = lazy(() => import('./components/DetailSection'));
const ReferencesList = lazy(() => import('./components/ReferencesList'));

const SWIPE_THRESHOLD = 56;

function App() {
  const [meditation, setMeditation] = useState(() => getMeditationForDate(new Date()));
  const [expanded, setExpanded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [slideUp, setSlideUp] = useState('100%');
  const contentRef = useRef(null);
  const sheetScrollRef = useRef(null);
  const touchStartYRef = useRef(null);
  const touchStartScrollTopRef = useRef(0);

  /* ── Keyboard: Escape to close ── */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && expanded) {
        setExpanded(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expanded]);

  /* ── Card entrance animation ── */
  useEffect(() => {
    requestAnimationFrame(() => setCardLoaded(true));
  }, []);

  /* ── Measure content and compute slide-up position ── */
  useLayoutEffect(() => {
    if (!cardLoaded || expanded) return;

    const measure = () => {
      if (!contentRef.current) return;

      const sheetEl = contentRef.current.closest('.sheet');
      if (!sheetEl) return;

      const sheetHeight = sheetEl.offsetHeight;
      const contentHeight = contentRef.current.offsetHeight;
      const safeGap = 0;

      // Show contentHeight + safeGap of the sheet
      // translateY = sheetHeight - (contentHeight + safeGap)
      const value = sheetHeight - (contentHeight + safeGap);
      setSlideUp(`${value}px`);
    };

    // Wait for layout to settle
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [cardLoaded, expanded]);

  /* ── Online / offline detection ── */
  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    setIsOffline(!navigator.onLine);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  /* ── Check for new meditation when tab becomes visible ── */
  useEffect(() => {
    const checkAndUpdateMeditation = () => {
      setMeditation((current) => {
        const fresh = getMeditationForDate(new Date());
        return current.id !== fresh.id ? fresh : current;
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAndUpdateMeditation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    const intervalId = setInterval(checkAndUpdateMeditation, 5 * 60 * 1000);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, []);

  /* ── PWA install prompt detection ── */
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const checkInstall = () => setCanInstall(!!window.__installPrompt);
    checkInstall();
    const timer = setInterval(checkInstall, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleInstall = useCallback(async () => {
    const prompt = window.__installPrompt;
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setCanInstall(false);
  }, []);

  const openCard = useCallback(() => setExpanded(true), []);
  const closeCard = useCallback(() => setExpanded(false), []);

  /* ── Touch gesture handlers ── */
  const handleTouchStart = useCallback((event) => {
    touchStartYRef.current = event.changedTouches[0].clientY;
    touchStartScrollTopRef.current = sheetScrollRef.current
      ? sheetScrollRef.current.scrollTop
      : 0;
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (touchStartYRef.current === null) return;
    const deltaY = event.touches[0].clientY - touchStartYRef.current;
    const startedAtTop = touchStartScrollTopRef.current <= 0;

    // Prevent native scroll when a vertical swipe is in progress
    if (Math.abs(deltaY) > 10) {
      if (expanded && startedAtTop && deltaY > 0) {
        event.preventDefault();
      } else if (!expanded && deltaY < 0) {
        event.preventDefault();
      }
    }
  }, [expanded]);

  const handleTouchEnd = useCallback((event) => {
    if (touchStartYRef.current === null) return;

    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartYRef.current;
    const startedAtTop = touchStartScrollTopRef.current <= 0;

    touchStartYRef.current = null;
    touchStartScrollTopRef.current = 0;

    if (expanded) {
      if (startedAtTop && deltaY > SWIPE_THRESHOLD) closeCard();
      return;
    }
    if (deltaY < -SWIPE_THRESHOLD) openCard();
  }, [expanded, openCard, closeCard]);

  return (
    <div className={`app-shell ${expanded ? 'expanded' : ''}`}>
      <div className="background-layer" aria-hidden="true" />
      <div className="background-monogram" aria-hidden="true">M · A</div>

      {/* Offline banner */}
      <div
        className={`offline-banner ${isOffline ? 'visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        <span aria-hidden="true">⚡</span>
        Sin conexión — la meditación sigue disponible offline
      </div>

      <main className="app-frame" role="main">
        <div
          className={`sheet ${expanded ? 'expanded' : ''} ${cardLoaded ? 'loaded' : ''}`}
          style={{ '--sheet-slide-up': slideUp }}
        >
          <div
            ref={sheetScrollRef}
            className="sheet-scroll"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* ── Collapsed: SummaryCard with ref for measurement ── */}
            <div ref={contentRef}>
              <SummaryCard
                meditation={meditation}
                expanded={expanded}
                loaded={cardLoaded}
                onOpen={openCard}
              />
            </div>

            {/* ── Expanded: detail content + controls ── */}
            {expanded && (
              <>
                <div className="swipe-indicator" aria-hidden="true">
                  <div className="sheet-drag-handle" />
                </div>

                <div className="detail-content expanded">
                  <Suspense fallback={null}>
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
                  </Suspense>
                </div>
              </>
            )}
          </div>

          {/* Install banner — only in collapsed state */}
          {!expanded && canInstall && (
            <button
              className="install-banner"
              onClick={handleInstall}
              type="button"
            >
              Instalar app
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;