# Ahmad Abbani's portfolio

React + Vite portfolio with responsive layouts, project filters, accessible dialogs and animated page transitions.

## Run locally

```sh
npm ci
npm run dev
```

## Production checks

```sh
npm run lint
npm run build
npm run preview
```

The main routes are `/` and `/projects`. The former preview URLs redirect to these routes; `/contact` opens the home contact section. `vercel.json` supports direct visits and refreshes on client-side routes.

Project descriptions are maintained in `src/components/portfolio/project-catalog.js`. The original website backup is stored outside this repository. Local documents in `output/` and `tmp/` are ignored by Git.
