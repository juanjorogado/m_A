<<<<<<< HEAD
# Meditaciones de Marco Aurelio

Aplicacion React minimalista para leer una meditacion diaria de Marco Aurelio.

## Experiencia

- La hoja aparece desde abajo al cargar.
- Tap o swipe hacia arriba para abrir la meditacion completa.
- Pull down desde la parte superior para cerrar.
- El contenido diario se resuelve segun la fecha del dispositivo.

## Desarrollo

```bash
npm install
npm start
```

Servidor local: `http://localhost:3000`

## Build

```bash
npm run build
```

Genera la salida optimizada en `build/`.

## Estructura

- `src/App.js`: interfaz y gestos.
- `src/App.css`: estilos de la hoja y tipografia.
- `src/data/meditations.js`: contenido diario y seleccion por fecha.
- `public/`: `index.html` y `manifest.json`.

## Forzar actualización en clientes (service worker cached)

Si ya habías visitado la PWA antes, el Service Worker puede servir activos cacheados.
Para forzar que los usuarios obtengan la última versión, sugiere los siguientes pasos:

- Instrucciones rápidas (para desarrolladores o usuarios avanzados): abre la consola del navegador y ejecuta:

```js
// Unregister all service workers for the origin
navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));

// Optional: clear caches and reload
caches.keys().then(names => Promise.all(names.map(name => caches.delete(name)))).then(() => location.reload(true));
```

- Pasos para usuarios finales en Chrome/Edge:
	1. Abrir `chrome://settings/siteData` y buscar el dominio.
	2. Pulsar "Eliminar" para borrar datos del sitio (cache, localStorage, service worker).
	3. Volver a cargar la página.

- Alternativa (in-app): si controlas el Service Worker, publica una versión que llame a `self.skipWaiting()` y notifique al cliente para `clients.claim()` y reload automático.

Agregar estas notas en el README ayuda a soporte y despliegues cuando hay clientes con activos antiguos cacheados.
=======
>>>>>>> origin/main

# Meditaciones de Marco Aurelio

Aplicacion React minimalista para leer una meditacion diaria de Marco Aurelio.

## Experiencia

- La hoja aparece desde abajo al cargar.
- Tap o swipe hacia arriba para abrir la meditacion completa.
- Pull down desde la parte superior para cerrar.
- El contenido diario se resuelve segun la fecha del dispositivo.

## Desarrollo

```bash
npm install
npm start
```

Servidor local: `http://localhost:3000`

## Build

```bash
npm run build
```

Genera la salida optimizada en `build/`.

## Estructura

- `src/App.js`: interfaz y gestos.
- `src/App.css`: estilos de la hoja y tipografia.
- `src/data/meditations.js`: contenido diario y seleccion por fecha.
- `public/`: `index.html` y `manifest.json`.
