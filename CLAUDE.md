# CLAUDE.md - PokerShield Development Guide for AI Assistants

This document provides comprehensive guidance for AI assistants working on the PokerShield codebase. It covers architecture, conventions, patterns, and workflows to ensure consistent, high-quality contributions.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [File Naming Conventions](#file-naming-conventions)
- [Code Patterns](#code-patterns)
- [Component Development](#component-development)
- [Backend Development (Convex)](#backend-development-convex)
- [Styling Guidelines](#styling-guidelines)
- [Testing](#testing)
- [Development Workflows](#development-workflows)
- [Common Tasks](#common-tasks)
- [Important Gotchas](#important-gotchas)

---

## Project Overview

PokerShield is a real-time Planning Poker application for agile teams built with React and Convex. It enables distributed teams to collaboratively estimate work items using various estimation scales (Fibonacci, T-shirt sizes, etc.).

**Key Features:**
- Real-time collaborative voting
- Multiple estimation scales
- Moderator controls (reveal votes, reset)
- Editable story titles
- Visual convergence analysis
- Dark/light theme support

**Architecture:** Serverless full-stack application with React frontend and Convex backend providing real-time database and serverless functions.

---

## Tech Stack

### Frontend
- **React 19** - UI framework (using automatic JSX runtime)
- **TypeScript 5.9** - Type safety with strict mode enabled
- **Vite 7** - Build tool and dev server
- **React Router 6.28** - Client-side routing
- **Convex Client** - Real-time data synchronization
- **Tailwind CSS 4.1** - Utility-first styling
- **shadcn/ui** - Component library (New York style)
- **Lucide React** - Icon library
- **next-themes** - Theme management
- **@uidotdev/usehooks** - Utility hooks (session storage, etc.)

### Backend
- **Convex** - Serverless backend with:
  - Real-time database
  - Type-safe queries and mutations
  - Automatic client code generation

### Development Tools
- **Storybook 9.1** - Component development and documentation
- **Vitest 3.2** - Unit testing framework
- **Playwright** - Browser testing
- **ESLint 9** - Code linting
- **Knip** - Dead code detection

---

## Project Structure

```
pokershield/
├── src/                              # Frontend application
│   ├── pages/                        # Page-level components (routes)
│   │   ├── HomePage/                 # Landing page
│   │   │   ├── HomePage.tsx          # Main landing component
│   │   │   ├── Header.tsx            # Navigation header
│   │   │   ├── HeroSection.tsx       # Hero banner
│   │   │   ├── CreateRoomCard.tsx    # Room creation UI
│   │   │   ├── FeaturesSection.tsx   # Feature highlights
│   │   │   ├── HowItWorks.tsx        # Instructions
│   │   │   └── Footer.tsx            # Footer
│   │   └── RoomPage/                 # Planning poker session
│   │       ├── RoomPage.tsx          # Main session component
│   │       ├── RoomHeader.tsx        # Room header with participants
│   │       ├── EstimationCardSelector.tsx  # Card grid for voting
│   │       ├── VotingResults.tsx     # Live voting status
│   │       ├── ModeratorControls.tsx # Reveal/restart buttons
│   │       ├── DecisionEstimate.tsx  # AI recommendation
│   │       └── RoomNotFoundCard.tsx  # Error state
│   │
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # shadcn/ui base components
│   │   │   ├── button.tsx            # Button with variants
│   │   │   ├── card.tsx              # Card container
│   │   │   ├── input.tsx             # Form input
│   │   │   ├── badge.tsx             # Badge/label
│   │   │   └── ...                   # Other primitives
│   │   ├── PokerCard.tsx             # Planning poker card
│   │   ├── ConvergenceMap.tsx        # Vote visualization
│   │   ├── theme-provider.tsx        # Theme context
│   │   └── theme-toggle.tsx          # Theme switcher
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── usePokerRoom.ts           # Combined room + participant data
│   │   ├── useParticipant.ts         # Participant lifecycle management
│   │   ├── useRandomReward.ts        # Confetti animations
│   │   └── useBeforeUnload.ts        # Tab close warning
│   │
│   ├── lib/                          # Utility functions
│   │   ├── utils.ts                  # cn() className utility
│   │   ├── estimation-scales.ts      # Scale definitions
│   │   ├── pet_name_url_generator.ts # Room name generator
│   │   ├── decide_estimate.ts        # Vote analysis logic
│   │   ├── standard_deviation.ts     # Statistical functions
│   │   └── data/                     # JSON data files
│   │       ├── adjectives.json       # For room names
│   │       └── animals.json          # For room names
│   │
│   ├── stories/                      # Storybook stories
│   │   ├── PokerCard.stories.tsx
│   │   ├── Button.stories.tsx
│   │   └── ...
│   │
│   ├── App.tsx                       # Main app with routing
│   ├── main.tsx                      # Entry point with providers
│   └── index.css                     # Global styles + CSS variables
│
├── convex/                           # Backend (Convex)
│   ├── schema.ts                     # Database schema
│   ├── rooms.ts                      # Room queries/mutations
│   ├── participants.ts               # Participant queries/mutations
│   └── _generated/                   # Auto-generated types (DO NOT EDIT)
│
├── .storybook/                       # Storybook configuration
│   ├── main.ts                       # Storybook config
│   ├── preview.ts                    # Global decorators
│   └── vitest.setup.ts               # Test integration
│
├── public/                           # Static assets
├── dist/                             # Build output (ignored)
│
└── Configuration Files
    ├── package.json                  # Dependencies and scripts
    ├── tsconfig.json                 # TypeScript config
    ├── tsconfig.node.json            # Node/build TS config
    ├── vite.config.ts                # Vite configuration
    ├── tailwind.config.ts            # Tailwind theme
    ├── postcss.config.mjs            # PostCSS pipeline
    ├── eslint.config.mjs             # ESLint rules
    ├── components.json               # shadcn/ui config
    └── vitest.shims.d.ts             # Vitest types
```

---

## File Naming Conventions

### Components
- **PascalCase** for React components: `PokerCard.tsx`, `RoomHeader.tsx`
- **kebab-case** for utilities and providers: `theme-provider.tsx`, `theme-toggle.tsx`
- Compound components share the same prefix: `Card`, `CardHeader`, `CardContent`, `CardFooter`

### Hooks
- **camelCase** with `use` prefix: `usePokerRoom.ts`, `useParticipant.ts`

### Utilities
- **snake_case** for library functions: `pet_name_url_generator.ts`, `standard_deviation.ts`
- **kebab-case** for general utilities: `estimation-scales.ts`

### Stories
- Match component name with `.stories.tsx` suffix: `PokerCard.stories.tsx`

### Configuration
- **kebab-case** for config files: `eslint.config.mjs`, `postcss.config.mjs`
- Use appropriate extensions: `.ts`, `.tsx`, `.mjs`

---

## Code Patterns

### TypeScript Patterns

#### Component Props
```typescript
// Define props interface above component
interface PokerCardProps {
  value: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

// Use destructuring with defaults
export function PokerCard({
  value,
  selected = false,
  disabled = false,
  onClick,
  size = "md",
}: PokerCardProps) {
  // Implementation
}
```

#### ForwardRef Pattern (for UI primitives)
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

#### Type-Safe Convex API Calls
```typescript
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// In component
const room = useQuery(api.rooms.getRoom, { roomName });
const setVote = useMutation(api.participants.setVote);

// Call mutation
setVote({ participantId: participant._id, vote: "5" });
```

### Import/Export Patterns

```typescript
// Prefer named exports for utilities
export function petNameUrlGenerator() { ... }
export const standardDeviation = (array: number[]) => { ... }

// Default export for single-component files
export default function HomePage() { ... }

// Use path aliases
import { PokerCard } from "@/components/PokerCard";
import { usePokerRoom } from "@/hooks/usePokerRoom";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
```

### Conditional Styling with `cn()`

```typescript
import { cn } from "@/lib/utils";

// Compose multiple classes conditionally
<button
  className={cn(
    "rounded-xl transition-all duration-200",
    "bg-card text-card-foreground border-2",
    !disabled && !selected && "hover:border-primary hover:-translate-y-2",
    selected && "bg-primary text-primary-foreground scale-105",
    disabled && "opacity-50 cursor-not-allowed",
  )}
>
```

**Key principles:**
- Base classes first
- Conditional classes with `&&` or ternary
- `cn()` merges and deduplicates classes intelligently

---

## Component Development

### shadcn/ui Component Pattern

All UI components in `src/components/ui/` follow shadcn/ui conventions:

1. **Use CVA (Class Variance Authority)** for variant management
2. **ForwardRef** for DOM access
3. **Radix UI primitives** for accessibility
4. **Tailwind classes** with semantic color tokens

**Example: Button Component**
```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";
```

### Compound Component Pattern

```typescript
// Card with subcomponents
<Card>
  <CardHeader>
    <CardTitle>Room Details</CardTitle>
    <CardDescription>Active participants: {count}</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Custom Hooks Pattern

#### Data Fetching Hook
```typescript
// hooks/usePokerRoom.ts
export default function usePokerRoom() {
  const params = useParams();
  const roomName = params.roomName;

  const participant = useParticipant(roomName);
  const room = useQuery(
    api.rooms.getRoom,
    roomName != null ? { roomName } : "skip"
  );

  const isModerator = room?.moderator === participant?._id;
  const isLoading = room === undefined || participant === undefined;

  return {
    ...room,
    ...participant,
    participantId: participant?._id,
    isModerator,
    isLoading,
  };
}
```

**Pattern notes:**
- Combine multiple queries into single hook
- Use `"skip"` for conditional queries
- Compute derived state (isModerator, isLoading)
- Return flat object for easy destructuring

#### Side Effect Hook with Session Storage
```typescript
// hooks/useParticipant.ts
export default function useParticipant(roomName: string | undefined) {
  const createParticipant = useMutation(api.participants.createParticipant);

  const [participantId, setParticipantId] = useSessionStorage<Id<"participants"> | undefined>(
    `${roomName}-participantId`,
    undefined
  );

  const participant = useQuery(
    api.participants.getParticipant,
    participantId != null ? { participantId } : "skip"
  );

  useEffect(() => {
    if (roomName && !participantId) {
      createParticipant({ roomName }).then((result) => {
        result && setParticipantId(result.participantId);
      });
    }
  }, [roomName, participantId, createParticipant, setParticipantId]);

  return participant;
}
```

**Pattern notes:**
- Store participant ID in session storage (persists across refreshes)
- Auto-create participant on first access
- Use effect cleanup to prevent duplicate calls

---

## Backend Development (Convex)

### Schema Definition

**File:** `convex/schema.ts`

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    estimationScale: v.optional(v.string()),
    isVotingEnabled: v.boolean(),
    moderator: v.optional(v.id("participants")),
    numberOfParticipants: v.float64(),
    roomName: v.string(),
    storyTitle: v.optional(v.string()),
  }).index("by_room_name", ["roomName"]),

  participants: defineTable({
    roomId: v.id("rooms"),
    vote: v.optional(v.string()),
    isVotingParticipant: v.boolean(),
  }).index("by_room_id", ["roomId"]),
});
```

**Key principles:**
- Use `v.id("tableName")` for foreign keys
- Create indexes for frequently queried fields
- Use `v.optional()` for nullable fields
- Use descriptive field names

### Query Pattern

**File:** `convex/rooms.ts`

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getRoom = query({
  args: { roomName: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.roomName != undefined) {
      return await ctx.db
        .query("rooms")
        .withIndex("by_room_name", (q) => q.eq("roomName", args.roomName!))
        .first();
    }
    return undefined;
  },
});
```

**Pattern notes:**
- Define args with `v` validators
- Use indexes for efficient queries
- Return `undefined` for not found
- Handle optional args explicitly

### Mutation Pattern

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const setVote = mutation({
  args: {
    participantId: v.id("participants"),
    vote: v.string(),
  },
  handler: async (ctx, args) => {
    const participant = await ctx.db.get(args.participantId);
    if (!participant) return;

    await ctx.db.patch(args.participantId, { vote: args.vote });

    // Check if all participants have voted
    const room = await ctx.db.get(participant.roomId);
    const allParticipants = await ctx.db
      .query("participants")
      .withIndex("by_room_id", (q) => q.eq("roomId", participant.roomId))
      .collect();

    const votingParticipants = allParticipants.filter((p) => p.isVotingParticipant);
    const allVoted = votingParticipants.every((p) => p.vote !== undefined);

    if (allVoted && room) {
      await ctx.db.patch(room._id, { isVotingEnabled: false });
    }
  },
});
```

**Pattern notes:**
- Validate entity exists before patching
- Use `.get()` for direct ID access
- Use `.query()` with indexes for filtering
- Implement business logic (auto-disable voting)

### Complex Query with Aggregation

```typescript
export const getVotes = query({
  args: { roomName: v.optional(v.string()) },
  returns: v.array(
    v.object({
      hasVoted: v.boolean(),
      vote: v.optional(v.string()),
      isVotingParticipant: v.boolean(),
    })
  ),
  handler: async (ctx, args) => {
    if (!args.roomName) return [];

    const room = await ctx.db
      .query("rooms")
      .withIndex("by_room_name", (q) => q.eq("roomName", args.roomName!))
      .first();

    if (!room) return [];

    const participants = await ctx.db
      .query("participants")
      .withIndex("by_room_id", (q) => q.eq("roomId", room._id))
      .collect();

    return participants
      .filter((p) => p.isVotingParticipant)
      .map((p) => ({
        hasVoted: p.vote !== undefined,
        vote: room.isVotingEnabled ? undefined : p.vote, // Hide during voting
        isVotingParticipant: p.isVotingParticipant,
      }));
  },
});
```

**Pattern notes:**
- Specify return type for better type safety
- Filter and transform data in handler
- Implement privacy logic (hide votes during voting)

---

## Styling Guidelines

### Tailwind CSS 4 with CSS Variables

PokerShield uses Tailwind 4 with a CSS variable-based theming system.

#### Color System

**File:** `src/index.css`

```css
:root {
  /* Light theme colors in oklch() */
  --background: oklch(0.9232 0.0026 48.7171);
  --foreground: oklch(0.2795 0.0368 260.0310);
  --primary: oklch(0.5854 0.2041 277.1173);
  --primary-foreground: oklch(0.9772 0.0133 277.2557);
  --card: oklch(0.9756 0.0026 48.7171);
  --card-foreground: oklch(0.2795 0.0368 260.0310);
  --muted: oklch(0.9220 0.0138 260.0667);
  --accent: oklch(0.9220 0.0138 260.0667);
  --destructive: oklch(0.5767 0.2226 25.8151);
  --border: oklch(0.8882 0.0138 260.0667);
  --radius: 1.25rem;
}

.dark {
  /* Dark theme colors */
  --background: oklch(0.2244 0.0074 67.4370);
  --foreground: oklch(0.9232 0.0026 48.7171);
  --primary: oklch(0.7023 0.1473 277.1391);
  /* ... other dark colors */
}
```

**Key principles:**
- Use **oklch()** color space (perceptually uniform, better interpolation)
- Semantic color names (primary, accent, muted, destructive)
- Paired colors (primary + primary-foreground for contrast)
- Switch themes by toggling `.dark` class on root

#### Using Semantic Colors

```tsx
// Use semantic tokens, not hardcoded colors
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Click me
  </button>
  <p className="text-muted-foreground">Helper text</p>
</div>
```

**Available tokens:**
- `background`, `foreground`
- `card`, `card-foreground`
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `muted`, `muted-foreground`
- `accent`, `accent-foreground`
- `destructive`, `destructive-foreground`
- `border`, `input`, `ring`

#### Responsive Design

```tsx
// Mobile-first approach
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Left column</div>
  <div className="w-full md:w-1/2">Right column</div>
</div>
```

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

#### Custom Animations

```css
/* Define in index.css */
@keyframes wiggle {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

.animate-wiggle {
  animation: wiggle 1s ease-in-out infinite;
}
```

```tsx
// Use in component
<div className="animate-wiggle">Wiggling element</div>
```

---

## Testing

### Storybook Setup

#### Creating Stories

**Pattern:** `src/stories/ComponentName.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { PokerCard } from "@/components/PokerCard";

const meta = {
  component: PokerCard,
  tags: ["autodocs"], // Auto-generate documentation
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof PokerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "5",
    selected: false,
    disabled: false,
    onClick: fn(),
    size: "md",
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
```

**Key principles:**
- Export `meta` and type `Story` from it
- Use `fn()` for event handlers (logs interactions)
- Create multiple stories for different states
- Use `argTypes` for custom controls
- Tag with `"autodocs"` for automatic documentation

#### Running Storybook

```bash
npm run storybook
# Opens at http://localhost:6006
```

### Vitest Integration

Storybook stories double as tests via `@storybook/addon-vitest`.

**Running tests:**
```bash
npx vitest
# Runs browser tests with Playwright
```

**Configuration:** `vite.config.ts`
```typescript
test: {
  projects: [{
    extends: true,
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }]
      },
      setupFiles: ['.storybook/vitest.setup.ts']
    }
  }]
}
```

---

## Development Workflows

### Starting Development

```bash
# Install dependencies
npm install

# Start dev servers (Convex + Vite)
npm run dev
# Convex: Backend functions + database
# Vite: Frontend at http://localhost:3000

# On first run, Convex prompts for project setup
# Creates .env.local with CONVEX_DEPLOYMENT and VITE_CONVEX_URL
```

### Code Quality

```bash
# Type check and lint
npm run lint

# Check for dead code
npm run knip

# Build for production
npm run build
```

### Storybook Development

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Convex Development

```bash
# Watch Convex logs
npm run logs

# Push schema changes
npx convex dev
# Automatically done by npm run dev

# Access Convex dashboard
# URL provided in terminal after running npm run dev
```

---

## Common Tasks

### Adding a New Page

1. **Create page component** in `src/pages/NewPage/`
   ```typescript
   // src/pages/NewPage/NewPage.tsx
   export default function NewPage() {
     return (
       <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold">New Page</h1>
       </div>
     );
   }
   ```

2. **Add route** in `src/App.tsx`
   ```typescript
   <Route path="/new" element={<NewPage />} />
   ```

3. **Add navigation link** (if needed)
   ```tsx
   <Link to="/new">New Page</Link>
   ```

### Adding a shadcn/ui Component

```bash
# Example: Add a dialog component
npx shadcn@latest add dialog

# Component appears in src/components/ui/dialog.tsx
# Import and use:
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
```

### Creating a Custom Component

1. **Create component file** in `src/components/`
   ```typescript
   // src/components/MyComponent.tsx
   interface MyComponentProps {
     title: string;
     onClick?: () => void;
   }

   export function MyComponent({ title, onClick }: MyComponentProps) {
     return (
       <div className="p-4 bg-card rounded-lg">
         <h3 className="text-lg font-semibold">{title}</h3>
         <button onClick={onClick} className="mt-2">
           Click me
         </button>
       </div>
     );
   }
   ```

2. **Create Storybook story**
   ```typescript
   // src/stories/MyComponent.stories.tsx
   import type { Meta, StoryObj } from "@storybook/react";
   import { fn } from "storybook/test";
   import { MyComponent } from "@/components/MyComponent";

   const meta = {
     component: MyComponent,
   } satisfies Meta<typeof MyComponent>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {
       title: "Example Title",
       onClick: fn(),
     },
   };
   ```

### Adding a Convex Query

1. **Add query function** in `convex/rooms.ts` (or appropriate file)
   ```typescript
   export const getActiveRooms = query({
     args: {},
     handler: async (ctx) => {
       return await ctx.db
         .query("rooms")
         .filter((q) => q.gt(q.field("numberOfParticipants"), 0))
         .collect();
     },
   });
   ```

2. **Use in React component**
   ```typescript
   import { useQuery } from "convex/react";
   import { api } from "@/convex/_generated/api";

   function ActiveRooms() {
     const rooms = useQuery(api.rooms.getActiveRooms);

     if (!rooms) return <div>Loading...</div>;

     return (
       <ul>
         {rooms.map((room) => (
           <li key={room._id}>{room.roomName}</li>
         ))}
       </ul>
     );
   }
   ```

### Adding a Convex Mutation

1. **Add mutation function**
   ```typescript
   export const updateRoomScale = mutation({
     args: {
       roomId: v.id("rooms"),
       estimationScale: v.string(),
     },
     handler: async (ctx, args) => {
       await ctx.db.patch(args.roomId, {
         estimationScale: args.estimationScale,
       });
     },
   });
   ```

2. **Use in React component**
   ```typescript
   import { useMutation } from "convex/react";
   import { api } from "@/convex/_generated/api";

   function ScaleSwitcher({ roomId }: { roomId: Id<"rooms"> }) {
     const updateScale = useMutation(api.rooms.updateRoomScale);

     const handleChange = (scale: string) => {
       updateScale({ roomId, estimationScale: scale });
     };

     return (
       <select onChange={(e) => handleChange(e.target.value)}>
         <option value="fibonacci">Fibonacci</option>
         <option value="tshirt">T-Shirt</option>
       </select>
     );
   }
   ```

### Adding a Schema Field

1. **Update schema** in `convex/schema.ts`
   ```typescript
   rooms: defineTable({
     // ... existing fields
     description: v.optional(v.string()), // NEW FIELD
   })
   ```

2. **Update queries/mutations** to handle new field
   ```typescript
   export const updateRoomDescription = mutation({
     args: {
       roomId: v.id("rooms"),
       description: v.string(),
     },
     handler: async (ctx, args) => {
       await ctx.db.patch(args.roomId, {
         description: args.description,
       });
     },
   });
   ```

3. **No migration needed** - Convex handles schema changes automatically
   - Existing documents will have `undefined` for new optional fields
   - New documents can include the field

---

## Important Gotchas

### 1. Convex Generated Files
**Never edit files in `convex/_generated/`** - they're auto-generated from your schema and functions. Changes will be overwritten.

### 2. Session Storage Keys
Participant IDs are stored in session storage with format: `${roomName}-participantId`
- If you change room name format, users will lose their participant identity
- Session storage is per-browser-tab (not shared across tabs)

### 3. Convex Query Skipping
Use `"skip"` string to conditionally skip queries:
```typescript
const room = useQuery(
  api.rooms.getRoom,
  roomName ? { roomName } : "skip"
);
```

### 4. CSS Variable Colors
When adding new semantic colors:
1. Add to `:root` AND `.dark` in `index.css`
2. Add to `@theme` block for Tailwind
3. Add to `tailwind.config.ts` colors object
4. Use oklch() format for consistency

### 5. Voting State Management
Voting is auto-disabled when all participants vote (see `convex/participants.ts:setVote`). When adding features that affect voting, be aware of this logic.

### 6. Moderator Assignment
First participant in a room automatically becomes moderator (see `convex/participants.ts:createParticipant`). There's no manual moderator transfer currently.

### 7. Path Aliases
Use `@/` prefix for all imports from `src/`:
```typescript
// Good
import { PokerCard } from "@/components/PokerCard";

// Bad
import { PokerCard } from "../../components/PokerCard";
```

### 8. Theme Provider
`ThemeProvider` must wrap the entire app (see `src/main.tsx`). Components use `useTheme()` from `next-themes` to access theme state.

### 9. Storybook and Convex
Storybook stories can't directly use Convex hooks (no ConvexProvider). Mock data or create wrapper components for testing Convex-dependent components.

### 10. Real-time Updates
Convex queries automatically re-run when data changes. Don't manually refetch or use loading states beyond checking for `undefined`:
```typescript
const room = useQuery(api.rooms.getRoom, { roomName });

// room is undefined while loading
if (!room) return <Loading />;

// room updates automatically when data changes
return <div>{room.storyTitle}</div>;
```

---

## Additional Resources

- **Convex Docs:** https://docs.convex.dev/
- **shadcn/ui Docs:** https://ui.shadcn.com/
- **Tailwind CSS 4:** https://tailwindcss.com/
- **Storybook Docs:** https://storybook.js.org/
- **React Router:** https://reactrouter.com/

---

## Development Philosophy

When working on PokerShield:

1. **Keep it simple** - Don't over-engineer solutions
2. **Follow existing patterns** - Maintain consistency with current code
3. **Type safety first** - Use TypeScript strictly, avoid `any`
4. **Component composition** - Build complex UIs from simple, reusable components
5. **Real-time by default** - Leverage Convex's real-time capabilities
6. **Accessible by default** - Use shadcn/ui and semantic HTML
7. **Document with stories** - Every reusable component should have a Storybook story
8. **Test through stories** - Stories serve as visual tests and documentation

---

*Last updated: 2025-11-25*
