# Migration from Next.js to Vite + React Router

This document outlines the migration of the PokerShield application from Next.js to Vite with React Router.

## Changes Made

### 1. Build System Migration
- **From**: Next.js 15.5.4
- **To**: Vite 5.0.0 with React 19
- **Configuration**: `vite.config.ts` with path aliases and React plugin

### 2. Routing Migration
- **From**: Next.js App Router (`app/` directory)
- **To**: React Router v6 with client-side routing
- **Routes**:
  - `/` → HomePage component
  - `/room/:roomId` → RoomPage component

### 3. File Structure Changes
```
Before (Next.js):
app/
├── layout.tsx
├── page.tsx
├── globals.css
└── room/[roomId]/page.tsx

After (Vite):
src/
├── main.tsx (entry point)
├── App.tsx (router setup)
├── index.css
├── pages/
│   ├── HomePage.tsx
│   └── RoomPage.tsx
└── components/ (moved from root)
```

### 4. Import Path Updates
- **From**: `@/components/...` (pointing to root)
- **To**: `@/components/...` (pointing to `src/`)
- Updated `tsconfig.json` path mapping

### 5. Component Updates
- Removed `"use client"` directives (not needed in Vite)
- Updated navigation from `next/navigation` to `react-router-dom`
- Replaced `useRouter()` with `useNavigate()`
- Replaced `Link` from Next.js with React Router `Link`
- Updated `useParams()` import source

### 6. Styling and Assets
- Moved `globals.css` to `src/index.css`
- Updated font loading to use Google Fonts in `index.html`
- Preserved all Tailwind CSS configuration
- Updated Tailwind content paths for Vite

### 7. Package.json Changes
- **Scripts**:
  - `dev`: `vite` (instead of `next dev`)
  - `build`: `tsc && vite build`
  - `preview`: `vite preview`
- **Dependencies**:
  - Added `react-router-dom`
  - Added `@vitejs/plugin-react`
  - Added `vite`
  - Kept `next-themes` for theme switching
- **TypeScript**: Updated to Vite-compatible configuration

### 8. Development Server
- **Port**: 3000 (same as Next.js)
- **Hot Reload**: Vite's fast HMR
- **Build**: Optimized production builds with Vite

## Key Benefits

1. **Faster Development**: Vite's instant server start and HMR
2. **Smaller Bundle**: Vite's optimized build output
3. **Modern Tooling**: Latest Vite features and plugins
4. **Client-Side Routing**: Full control over routing behavior
5. **Simplified Configuration**: Less complex than Next.js

## Running the Application

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Notes

- All existing functionality preserved
- Theme switching still works with `next-themes`
- Zustand state management unchanged
- All UI components and styling preserved
- TypeScript configuration updated for Vite
