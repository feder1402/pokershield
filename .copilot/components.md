# Component Library Reference

## UI Components Location
All reusable UI components are in `/components/ui/` and built on Radix UI primitives.

## Available Components

### Button (`/components/ui/button.tsx`)
```tsx
<Button variant="default" size="md" onClick={handleClick}>
  Primary Action
</Button>

// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: default, sm, lg, icon
```

### Card (`/components/ui/card.tsx`)
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

### Input (`/components/ui/input.tsx`)
```tsx
<Input 
  type="text"
  placeholder="Enter room ID"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Dialog (`/components/ui/dialog.tsx`)
```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Select (`/components/ui/select.tsx`)
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Badge (`/components/ui/badge.tsx`)
```tsx
<Badge variant="default">Status</Badge>

// Variants: default, secondary, destructive, outline
```

## Icons
Use Lucide React icons consistently:

```tsx
import { 
  Shield,    // App logo/branding
  Users,     // Participants/collaboration
  Eye,       // Reveal votes
  RotateCcw, // Reset votes
  Settings,  // Configuration
  Copy,      // Copy room URL
  Check,     // Success states
  ArrowLeft, // Navigation back
  Edit3,     // Edit actions
  UserX,     // Remove participant
  Zap        // Fast/instant actions
} from "lucide-react"
```

## Layout Patterns

### Page Layout
```tsx
<div className="min-h-screen bg-background grid-bg">
  <header className="border-b border-border">
    {/* Header content */}
  </header>
  <main className="container mx-auto px-4 py-8">
    {/* Main content */}
  </main>
</div>
```

### Card Grid
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### Responsive Text
```tsx
<h1 className="text-4xl md:text-6xl font-bold">
  Large Heading
</h1>
<p className="text-xl text-muted-foreground">
  Subtitle text
</p>
```

## Custom CSS Classes
The app uses these custom classes defined in globals.css:

- `.grid-bg`: Background grid pattern
- `.text-balance`: Balanced text wrapping
- `.text-pretty`: Pretty text wrapping