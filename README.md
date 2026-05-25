# Marcus Aurelius Meditations PWA

This is a Progressive Web App (PWA) that displays a daily meditation from Marcus Aurelius. The app can be installed on iPhone via Safari without requiring the Apple Developer Program or TestFlight.

## Features

- Displays a daily meditation quote from Marcus Aurelius
- Card flip animation to reveal explanation and context
- Can be installed on iPhone Home Screen via Safari

## How to Install on iPhone

1. Open Safari and navigate to the deployed URL (see Deployment below)
2. Tap the Share button (the square with an arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Confirm the name and tap "Add"
5. The app will appear on your Home Screen and can be launched like a native app

## Deployment

To deploy this PWA, you need to host it on a static web host that serves files over HTTPS. Some popular options:

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

### Deploying to GitHub Pages

1. Create a repository on GitHub (e.g., `marcus-meditations-pwa`)
2. Clone the repository locally
3. Copy the contents of this project into the repository
4. Commit and push to the `main` branch
5. Go to the repository settings on GitHub
6. Under "Pages", set the source to the `main` branch and `/ (root)` folder
7. GitHub will provide a URL (e.g., `https://username.github.io/marcus-meditations-pwa/`)

## Development

To run the project locally:

```bash
npm install
npm start
```

This will start the development server at `http://localhost:3000`.

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build` directory.

## Project Structure

- `public/` - Static assets including the web app manifest and icons
- `src/` - React source code
  - `App.js` - Main application component
  - `index.js` - Entry point
  - `components/` - Componentes reutilizables
  - `data/` - Meditation data
- `package.json` - Project dependencies and scripts

## Notes

- The app uses the device's current date to determine which meditation to display
- The meditation data is currently seeded for specific dates; more dates can be added to the `MEDITATIONS` array
- On iOS, the app will run in standalone mode when launched from the Home Screen (no Safari UI)

## License

This project is open source and available under the MIT License.
