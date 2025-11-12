# PokerShield

Planning Poker for agile teams, built with React, TypeScript, and Vite. Real‑time collaboration is powered by Convex.

## Features

- Collaborative planning poker rooms
- Real‑time sync with Convex
- React 19 + TypeScript
- Tailwind CSS + shadcn/ui components
- Zustand for state management
- React Router for navigation

## Quick Start

Prerequisites:

- Node.js 18+ (20 LTS recommended)
- npm (included with Node.js)

Install dependencies and start the dev servers (frontend + Convex backend):

```bash
npm install
npm run dev
```

Vite will serve the app at:

- http://localhost:3000/

On first run, the Convex CLI will prompt you to link or create a project and will write environment values to `.env.local`.

## Scripts

- `npm run dev` — Run Convex dev server and Vite in parallel
- `npm run build` — Build the frontend (Vite)
- `npm run dev:backend` — Run Convex dev server
- `npm run dev:frontend` — Run Vite dev server
- `npm run logs` — Tail Convex logs
- `npm run lint` — Lint Convex functions and typecheck their TS config
- `npm run storybook` — Start Storybook on port 6006
- `npm run build-storybook` — Build Storybook

Preview a production build locally:

```bash
npm run build
npx vite preview
```

## Environment

Convex config is created automatically on first `npm run dev` and saved to `.env.local`:

- `CONVEX_DEPLOYMENT` — Convex deployment name
- `VITE_CONVEX_URL` — Convex HTTP URL used by the client

If you need to reconfigure, run:

```bash
npx convex dev --until-success
```

## Project Structure

- `src/main.tsx` — App bootstrap
- `src/App.tsx` — App shell and routes
- `src/pages/` — Pages (`HomePage`, `RoomPage`)
- `src/lib/room-store.ts` — Zustand store
- `src/components/ui/` — shadcn/ui components
- `convex/` — Convex schema, queries, and mutations
- `tailwind.config.ts` — Tailwind configuration
- `vite.config.ts` — Vite config with path aliases
- `tsconfig.json` — TypeScript configuration

Path alias:

- `@/*` → `./src/*`

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Convex (realtime backend)
- Zustand
- Tailwind CSS + shadcn/ui
- React Router
- Lucide React icons

## Development Notes

- First `npm run dev` may prompt Convex project selection and generate `.env.local`.
- When updating Convex schema, the dev server will typecheck and show errors in the terminal.
- Storybook is configured via `storybook` with Vite.

## Testing

This project includes Vitest in devDependencies. You can run tests via Vitest CLI:

```bash
npx vitest
```

## Building & Deployment

1) Frontend

- Build with `npm run build` (outputs to `dist/`).
- Deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages, etc.).

2) Convex Backend

- Deploy Convex separately using the Convex CLI and dashboard.
- The frontend must point `VITE_CONVEX_URL` to the deployed Convex instance.

## Contributing

Contributions are welcome! Please:

- Open an issue to discuss significant changes.
- Use clear commit messages and small PRs when possible.
- Follow existing code style and conventions.

## Security

If you discover a security issue, please open a private issue or contact the maintainers. Avoid including sensitive details in public issues.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Copyright

 © 2025 Federico Raggi
