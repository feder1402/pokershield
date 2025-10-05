# System Patterns: PokerShield

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              User Interface Layer                │
│  (React Components + shadcn/ui + Tailwind)      │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│           State Management Layer                 │
│  (Zustand Store + React Hooks)                  │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│          Convex Client Layer                     │
│  (useQuery / useMutation hooks)                 │
└────────────────┬────────────────────────────────┘
                 │
         ┌───────┴───────┐
         │               │
┌────────▼────────┐ ┌───▼──────────┐
│  Convex Queries │ │Convex Mutations│
│  (Read Data)    │ │ (Write Data)  │
└────────┬────────┘ └───┬──────────┘
         │              │
         └──────┬───────┘
                │
┌───────────────▼────────────────────────────────┐
│          Convex Database Layer                  │
│  (rooms, participants tables)                   │
└────────────────────────────────────────────────┘
```

## Core Patterns

### 1. Real-Time Data Synchronization

**Pattern**: Reactive Queries  
**Implementation**: Convex useQuery hook

```typescript
// Components subscribe to live data
const room = useQuery(api.rooms.getRoom, { roomName });

// Data automatically updates when backend changes
// No manual polling or WebSocket management needed
```

**Benefits**:
- Automatic real-time updates
- Optimistic UI updates
- Built-in caching and deduplication

### 2. State Management

**Pattern**: Hybrid State (Server + Client)

**Server State** (Convex):
- Room data (name, voting status, participant count)
- Participant data (votes, roles)
- Persistent across sessions

**Client State** (Zustand):
- Current room navigation
- Participant ID (local session)
- UI preferences (theme, etc.)

```typescript
// zustand store for client state
interface RoomStore {
  roomName: string | null;
  participantId: string | null;
  setRoomName: (name: string) => void;
  setParticipantId: (id: string) => void;
}
```

### 3. Component Architecture

**Pattern**: Presentational/Container Pattern

**Pages** (Container Components):
- `HomePage`: Landing page with room creation
- `RoomPage`: Estimation session interface

**Feature Components** (Smart Components):
- `RoomHeader`: Displays room info and controls
- `EstimationCardSelector`: Voting interface
- `ParticipantsList`: Show all participants
- `VotingResults`: Display revealed votes

**UI Components** (Presentational):
- `Button`, `Card`, `Dialog`, etc. (shadcn/ui)
- Reusable, stateless, styled with Tailwind

### 4. Data Flow Pattern

**Pattern**: Unidirectional Data Flow

```
User Action → Mutation Call → Backend Update → 
Query Re-fetch → Component Re-render → UI Update
```

Example: Casting a Vote

```typescript
// 1. User clicks card
handleVote("5")
  ↓
// 2. Component calls mutation
setVote({ participantId, vote: "5" })
  ↓
// 3. Backend updates database
ctx.db.patch(participantId, { vote: "5" })
  ↓
// 4. Query automatically refetches
useQuery(api.participants.getParticipant, { participantId })
  ↓
// 5. Component re-renders with new data
<EstimationCard selected={vote === "5"} />
```

### 5. Routing Pattern

**Pattern**: File-based routing (React Router)

```
/ → HomePage (room creation)
/room/:roomName → RoomPage (estimation interface)
```

URL structure:
- Clean URLs for easy sharing
- Room name in URL for direct access
- No authentication required

### 6. Error Handling Pattern

**Pattern**: Defensive Programming + Fallback UI

```typescript
// Check for required data
if (!roomName || !participantId) {
  return <RoomNotFoundCard />;
}

// Handle loading states
if (room === undefined) {
  return <LoadingSpinner />;
}

// Handle error states
if (room === null) {
  return <ErrorMessage />;
}
```

### 7. Styling Pattern

**Pattern**: Utility-First CSS + Component Library

- **Tailwind CSS**: Utility classes for layout and styling
- **shadcn/ui**: Pre-built accessible components
- **CSS Variables**: Theme customization
- **cn() utility**: Conditional class merging

```typescript
// Example: Conditional styling
<Button
  className={cn(
    "w-full transition-all",
    selected && "ring-2 ring-primary",
    disabled && "opacity-50 cursor-not-allowed"
  )}
/>
```

### 8. Theme Pattern

**Pattern**: CSS Variables + Context

```css
/* Light theme */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
}

/* Dark theme */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
}
```

Managed by `next-themes` provider with system preference detection.

### 9. Custom Hook Pattern

**Pattern**: Encapsulate Logic in Hooks

```typescript
// usePokerRoom: Combines room and participant data
function usePokerRoom() {
  const { roomName, participantId } = useRoomStore();
  const room = useQuery(api.rooms.getRoom, { roomName });
  const participant = useQuery(api.participants.getParticipant, { participantId });
  
  return {
    roomName,
    room,
    participant,
    isModerator: room?.moderator === participantId,
    // ... derived state
  };
}
```

### 10. Optimistic Updates Pattern

**Pattern**: Update UI Before Server Confirmation

```typescript
// Immediately update local state
setVote({ participantId, vote: "5" });

// UI updates instantly, then syncs with server
// If server fails, Convex automatically reverts
```

## Database Schema Patterns

### Table: rooms

```typescript
{
  roomName: string,          // Human-readable identifier
  isVotingEnabled: boolean,  // Control voting state
  numberOfParticipants: number, // Derived count
  moderator: Id<"participants">, // First participant
  estimationScale: string    // Scale type (e.g., "fibonacci")
}
```

**Indexes**:
- `by_room_name`: Fast lookup by room name

### Table: participants

```typescript
{
  roomId: Id<"rooms">,       // Foreign key to room
  vote: string | undefined,  // Current vote value
  isVotingParticipant: boolean // Can cast votes?
}
```

**Indexes**:
- `by_room_id`: List all participants in a room

## Naming Conventions

### Files and Directories

- **Components**: PascalCase (e.g., `RoomHeader.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `usePokerRoom.ts`)
- **Pages**: PascalCase (e.g., `HomePage.tsx`)

### Code

- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase with `I` or `T` prefix (optional)
- **Props**: `ComponentNameProps` pattern

## Code Organization Principles

1. **Colocation**: Keep related files together
2. **Separation of Concerns**: Business logic separate from UI
3. **DRY**: Extract reusable logic into hooks/utils
4. **Single Responsibility**: One purpose per component/function
5. **Composition**: Build complex UIs from simple components

## Testing Strategy (Planned)

1. **Unit Tests**: Utility functions, hooks
2. **Integration Tests**: Component interactions
3. **E2E Tests**: Critical user flows (Playwright)
4. **Visual Tests**: Component snapshots (Storybook)

## Performance Patterns

1. **Code Splitting**: Route-based splitting with React Router
2. **Lazy Loading**: Dynamic imports for heavy components
3. **Memoization**: React.memo for expensive renders
4. **Query Optimization**: Use indexes in Convex queries
5. **Asset Optimization**: Vite's built-in optimizations

## Security Patterns

1. **Input Validation**: Validate all user inputs
2. **XSS Prevention**: React's built-in escaping
3. **CSRF Protection**: Convex handles this
4. **Rate Limiting**: Convex built-in protection
5. **No Sensitive Data**: No passwords or personal info stored

