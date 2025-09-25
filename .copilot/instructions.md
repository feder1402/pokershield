# PokerShield - GitHub Copilot Instructions

## Project Overview
PokerShield is a collaborative planning poker application for agile teams. It enables real-time story point estimation sessions without requiring user sign-ups. Teams can create rooms, join sessions, and use various estimation scales like Fibonacci, T-shirt sizes, and custom scales.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom animations
- **State Management**: Zustand with persistence
- **UI Components**: Custom components built on Radix UI primitives
- **Icons**: Lucide React
- **Build**: Node.js with npm

## Architecture Overview

### Directory Structure
```
/app                    # Next.js App Router pages
  /page.tsx            # Landing page with create/join room functionality
  /layout.tsx          # Root layout with fonts and metadata
  /room/[roomId]/      # Dynamic room pages
/components/ui/        # Reusable UI components (Radix-based)
/lib/                  # Business logic and utilities
  /room-store.ts       # Zustand store for room state management
  /estimation-scales.ts # Predefined estimation scales configuration
  /utils.ts           # Utility functions (cn for className merging)
```

### Key Concepts

#### Room System
- **Room**: Central entity containing participants, voting state, and configuration
- **Participant**: Individual team member with voting capabilities and moderator status
- **Moderator**: First participant who creates the room, manages settings and voting reveals

#### Estimation Scales
- Predefined scales: Fibonacci, T-shirt sizes, Powers of 2, Linear, Modified Fibonacci, Risk Assessment
- Each scale has id, name, values array, and description
- Scales are configurable per room by moderators

#### State Management
- Uses Zustand for global state with localStorage persistence
- Store pattern: actions and state are co-located
- Participant identification via generated user IDs

## Code Standards

### TypeScript
- Strict mode enabled
- Use proper interface definitions for all data structures
- Prefer type inference where possible, explicit types for function parameters and returns
- Use `Readonly<>` for props that shouldn't be modified

### React Patterns
- Functional components with hooks
- Use `"use client"` directive for client-side components
- Custom hooks for complex state logic
- Prop destructuring in component parameters

### Styling Guidelines
- Use Tailwind utility classes
- Follow responsive-first approach: mobile base, then `md:`, `lg:` breakpoints
- Use semantic color variables: `text-primary`, `bg-background`, `border-border`
- Component variants using `class-variance-authority` (cva)
- Use `cn()` utility for conditional className merging

### Component Structure
```tsx
"use client" // Only when needed

import { useState } from "react"
import { SomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComponentProps {
  title: string
  isActive?: boolean
}

export default function Component({ title, isActive = false }: ComponentProps) {
  const [state, setState] = useState(false)

  return (
    <div className="flex items-center gap-4">
      {/* Implementation */}
    </div>
  )
}
```

### File Naming
- Pages: `page.tsx` (Next.js App Router convention)
- Components: PascalCase (`UserCard.tsx`)
- Utilities: kebab-case (`room-store.ts`)
- Types: Use interfaces, export from the same file or dedicated types file

## Common Patterns

### State Management with Zustand
```tsx
// Store definition
export const useRoomStore = create<RoomState>()(
  persist(
    (set, get) => ({
      // State and actions
    }),
    { name: "storage-key", partialize: (state) => ({ ... }) }
  )
)

// Usage in components
const { getRoom, joinRoom } = useRoomStore()
```

### Error Handling
- Use early returns for guard clauses
- Handle undefined/null states explicitly
- Show user-friendly error states with appropriate UI

### Responsive Design
- Mobile-first approach
- Use grid layouts: `grid md:grid-cols-2 lg:grid-cols-3`
- Responsive text: `text-lg md:text-xl`
- Responsive spacing: `mb-4 md:mb-6`

## Specific Guidelines

### Room Management
- Always validate room existence before operations
- Check moderator permissions for privileged actions
- Handle participant leaving/removal edge cases
- Persist room state across browser sessions

### Voting System
- Prevent vote changes after reveal
- Handle edge case where all participants leave
- Provide visual feedback for voting states (voted/not voted/revealed)

### UI Components
- Use existing UI primitives from `/components/ui/`
- Follow established patterns for buttons, cards, dialogs
- Maintain consistent spacing and typography scales
- Use proper loading and empty states

### Performance
- Use React.memo for expensive re-renders
- Lazy load heavy components
- Optimize bundle size with proper imports

## Linting and Code Quality
- Follow existing ESLint configuration
- Escape special characters in JSX strings (use `&apos;` for apostrophes)
- Remove unused variables and imports
- Prefer const assertions and readonly types

## Testing Considerations
- Test room creation, joining, and voting flows
- Validate estimation scale switching
- Test persistence and state restoration
- Verify responsive design across devices

## Domain-Specific Notes
- Planning poker is about collaborative estimation, not gambling
- Estimation should be anonymous until revealed by moderator
- Support common agile practices (story points, risk assessment)
- Keep UX simple and focused on the core workflow

## When Making Changes
1. Understand the existing patterns before introducing new approaches
2. Test real-time collaboration scenarios
3. Verify localStorage persistence works correctly
4. Ensure responsive design is maintained
5. Check that moderator/participant permissions are respected
6. Validate that the app works without backend dependencies