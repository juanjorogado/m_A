import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* ── Service Worker registration with update handling ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then((registration) => {
        console.log('SW registrado:', registration.scope);

        // Detect when a new SW takes over
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
              console.log('Nueva versión disponible. Recarga para actualizar.');
            }
          });
        });
      })
      .catch((error) => {
        console.error('Error al registrar el SW:', error);
      });
  });
}

/* ── Expose install prompt to the app ── */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__installPrompt = e;
});

window.addEventListener('appinstalled', () => {
  window.__installPrompt = null;
  console.log('PWA instalada');
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
