# Technical Context: PokerShield

## Technology Stack

### Frontend

#### Core Framework
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Type safety and developer experience
- **Vite 5**: Lightning-fast build tool and dev server

#### UI Layer
- **Tailwind CSS 4.1.9**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library built on Radix UI
- **Radix UI**: Headless UI components for accessibility
- **next-themes 0.4.6**: Theme management (dark/light mode)
- **Lucide React 0.454**: Icon library

#### Routing & Navigation
- **React Router DOM 6.28**: Client-side routing

#### State Management
- **Zustand 5.0.8**: Lightweight state management
- **Convex React**: Real-time data subscriptions

#### Form Handling
- **React Hook Form 7.60**: Performant form management
- **Zod 3.25**: TypeScript-first schema validation
- **@hookform/resolvers 3.10**: Form validation integration

#### Utilities
- **clsx 2.1.1**: Conditional class names
- **tailwind-merge 3.3.1**: Merge Tailwind classes intelligently
- **class-variance-authority 0.7.1**: Component variants
- **date-fns 4.1.0**: Date manipulation

### Backend

#### Database & Backend
- **Convex 1.27.3**: Real-time backend as a service
  - Reactive queries
  - Type-safe API
  - Built-in authentication (not used yet)
  - Automatic database indexes
  - Scheduled functions
  - File storage

### Development Tools

#### Build & Dev Tools
- **npm-run-all2 8.0.4**: Run multiple scripts in parallel
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

#### Linting & Formatting
- **ESLint 9.36**: JavaScript/TypeScript linting
- **eslint-plugin-react-hooks**: React Hooks linting
- **eslint-plugin-react-refresh**: React Fast Refresh linting
- **TypeScript**: Strict type checking enabled

#### Testing
- **Vitest 3.2.4**: Unit test runner (Vite-native)
- **@vitest/browser**: Browser-mode testing
- **@vitest/coverage-v8**: Code coverage
- **Playwright 1.55.1**: End-to-end testing

#### Storybook
- **Storybook 9.1.10**: Component development environment
- **@storybook/react-vite**: Vite-based Storybook
- **@storybook/addon-a11y**: Accessibility testing
- **@storybook/addon-themes**: Theme switching
- **@storybook/addon-vitest**: Vitest integration
- **@chromatic-com/storybook**: Visual regression testing

## Project Configuration

### TypeScript Configuration

**tsconfig.json** (root):
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "react-jsx",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**convex/tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["ES2021"],
    "module": "commonjs",
    "strict": true
  }
}
```

### Vite Configuration

**Key Features**:
- React plugin with Fast Refresh
- Path aliases (`@/` → `./src/`)
- Port 5173 (default)
- Auto-open browser on dev start

### Tailwind Configuration

**tailwind.config.ts**:
- Custom color system using CSS variables
- Dark mode: class-based
- Animations from `tailwindcss-animate`
- Custom border radius values
- Extended keyframes for complex animations

### Convex Configuration

**Location**: `convex/` directory
- Schema: `schema.ts`
- Functions: `rooms.ts`, `participants.ts`
- Generated types: `_generated/` (auto-generated)

## Build and Development

### Scripts

```json
{
  "dev": "npm-run-all --parallel dev:backend dev:frontend",
  "dev:backend": "convex dev --live-component-sources --typecheck-components",
  "dev:frontend": "vite --open",
  "build": "vite build",
  "predev": "convex dev --until-success",
  "lint": "tsc -p convex && eslint convex",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

### Development Workflow

1. **Start Development**:
   ```bash
   npm run dev
   ```
   - Starts Convex backend
   - Starts Vite dev server
   - Opens browser automatically
   - Watches for file changes

2. **Run Storybook**:
   ```bash
   npm run storybook
   ```
   - Component development on port 6006
   - Isolated component testing
   - Interactive documentation

3. **Linting**:
   ```bash
   npm run lint
   ```
   - Type checks Convex functions
   - Lints Convex code

### Build Process

1. **Production Build**:
   ```bash
   npm run build
   ```
   - Compiles TypeScript
   - Bundles with Vite
   - Optimizes assets
   - Generates `dist/` folder

2. **Convex Deployment**:
   ```bash
   npx convex deploy
   ```
   - Deploys backend functions
   - Updates database schema
   - Configures environment variables

## Environment Variables

### Development (.env.local)

```
CONVEX_DEPLOYMENT=dev:[your-project-name]
VITE_CONVEX_URL=https://[your-project].convex.cloud
```

### Production

Set in Vercel dashboard:
- `VITE_CONVEX_URL`: Production Convex URL

## API Structure

### Convex Functions

**Queries** (read-only):
- `rooms.getRoom`: Get room by name
- `rooms.enableVoting`: Check if voting is enabled
- `participants.getParticipant`: Get participant data

**Mutations** (write):
- `rooms.createRoom`: Create new room
- `participants.setVote`: Cast or update vote
- `participants.resetVotes`: Clear all votes in room

### Type Safety

```typescript
// Auto-generated from Convex schema
import { api } from "../convex/_generated/api";
import { Id, Doc } from "../convex/_generated/dataModel";

// Type-safe function calls
const room = useQuery(api.rooms.getRoom, { roomName });
//    ^? Doc<"rooms"> | null | undefined
```

## Browser Support

### Minimum Requirements
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Features Used
- ES2021 features
- CSS Grid & Flexbox
- CSS Custom Properties
- Web Animations API
- Fetch API
- WebSocket (via Convex)

## Performance Targets

### Development
- **Dev Server Start**: < 500ms (Vite)
- **Hot Module Replacement**: < 50ms
- **TypeScript Check**: < 2s

### Production
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 200KB (gzipped)
- **Lighthouse Score**: > 90

## Deployment

### Frontend (Vercel)
- Automatic deployments from Git
- Preview deployments for PRs
- Edge network CDN
- Environment variable management

### Backend (Convex Cloud)
- Automatic deployments via CLI
- Staging and production environments
- Real-time monitoring
- Built-in analytics

## Code Quality Tools

### Type Checking
- Strict TypeScript mode enabled
- No implicit `any`
- Strict null checks
- No unused variables/imports

### Linting Rules
- React Hooks rules enforced
- Import order consistency
- No console statements in production
- Accessibility checks (Storybook)

### IDE Support
- VSCode recommended
- Automatic formatting on save
- IntelliSense for all APIs
- Type hints in JSX

## Migration Status

### Current State
**Branch**: migrate-to-vite

The project is in the process of migrating from Next.js to Vite. Recent changes include:

**Modified Files** (uncommitted):
- `.storybook/preview.ts`
- `convex/participants.ts`
- `convex/rooms.ts`
- `convex/schema.ts`
- `src/hooks/useParticipant.ts`
- `src/hooks/usePokerRoom.ts`
- `src/lib/estimation-scales.ts`
- `src/pages/RoomPage/RoomHeader.tsx`
- `src/pages/RoomPage/RoomPage.tsx`

**Deleted Files**:
- `src/pages/RoomPage/VotingCards.tsx`

**New Files**:
- `src/pages/RoomPage/EstimationCardSelector.tsx`
- `src/stories/Button.stories.tsx`

### Migration Considerations
1. Replaced Next.js App Router with React Router
2. Using Vite instead of Next.js build system
3. Removed Next.js-specific features
4. Maintained Convex backend integration
5. Preserved component library and styling approach

## Third-Party Services

### Current
- **Convex Cloud**: Backend and database
- **Vercel**: Frontend hosting (assumed)

### Potential Future Integration
- **Analytics**: Plausible or PostHog
- **Error Tracking**: Sentry
- **Monitoring**: Convex built-in dashboard

