# Vite Project

This is a Vite-powered project.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- npm >= 9.x (or yarn/pnpm)

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

2. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

## Running the Development Server

By default, Vite runs on port 5173. To run on **port 8080**, you can either:

1. **Using command line:**

```bash
npm run dev -- --port 8080
```

2. **Or update `vite.config.js`:**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
});
```

Then run:

```bash
npm run dev
```

Your app will be available at [http://localhost:8080](http://localhost:8080).

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Useful Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |

## Notes

- Make sure no other process is using port 8080.
- Adjust `.env` or `vite.config.js` if you want to change ports or host.
