# PokerShield

Planning Poker for agile teams, built with React, TypeScript, and Vite. Real‑time collaboration is powered by Convex.

## Features

- **Collaborative Planning**: Create and join rooms for agile estimation.
- **Real-time Sync**: Instant updates powered by [Convex](https://www.convex.dev/).

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7.
- **Backend**: Convex (Real-time database & functions).
- **Styling**: Tailwind CSS, shadcn/ui, Lucide React icons.
- **State Management**: Zustand.
- **Routing**: React Router.

## Getting Started

### Prerequisites
- Node.js 18+ (20 LTS recommended)

### Installation & Running

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start development servers**:
    ```bash
    npm run dev
    ```
    This runs both the Convex backend and Vite frontend.
    - Frontend: http://localhost:3000
    - On first run, Convex will prompt you to configure the project and save environment variables to `.env.local`.

### Environment Variables
Configuration is automatic via the Convex CLI. Key variables in `.env.local`:
- `CONVEX_DEPLOYMENT`: Convex deployment name.
- `VITE_CONVEX_URL`: Convex HTTP URL.

To reconfigure: `npx convex dev --until-success`

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Run Convex and Vite in parallel |
| `npm run build` | Build the frontend (Vite) |
| `npm run lint` | Lint and typecheck |
| `npm run storybook` | Start Storybook |
| `npx vitest` | Run tests |

## Project Structure

- `src/` - App source (Pages, Components, Store)
- `convex/` - Backend schema, queries, and mutations
- `dist/` - Build output

## Deployment

1.  **Frontend**: Build with `npm run build` and deploy the `dist/` folder to any static host (Vercel, Netlify, etc.).
2.  **Backend**: Deploy via Convex CLI/Dashboard. Ensure `VITE_CONVEX_URL` is set in your production environment.

## Contributing

Contributions welcome! Please open an issue for significant changes and follow existing code styles.

## License

MIT License. © 2025 Federico Raggi.
