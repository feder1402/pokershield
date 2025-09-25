# Known Issues & Patterns

## Current Linting Errors
The following linting errors exist and should be addressed when working on related files:

### React/JSX Issues
- `react/no-unescaped-entities`: Apostrophes in JSX need to be escaped
  - Use `&apos;` instead of `'` in JSX text content
  - Files affected: `app/page.tsx`, `app/room/[roomId]/page.tsx`

### TypeScript Issues
- Unused variables: `router` and `currentUserId` in `app/room/[roomId]/page.tsx`
  - Remove unused imports and variable declarations
  - Consider prefix with underscore if intentionally unused

## Common Anti-patterns to Avoid

### State Management
```tsx
// ❌ Don't mutate state directly
room.participants.push(newParticipant)

// ✅ Use immutable updates
setRoom({...room, participants: [...room.participants, newParticipant]})
```

### Error Handling
```tsx
// ❌ Don't ignore undefined states
const room = getRoom(roomId)
return <div>{room.participants.length} participants</div>

// ✅ Handle undefined explicitly
const room = getRoom(roomId)
if (!room) return <div>Room not found</div>
return <div>{room.participants.length} participants</div>
```

### Performance
```tsx
// ❌ Don't create objects in render
<Button onClick={() => handleClick(item.id)}>

// ✅ Use useCallback for complex handlers
const handleClick = useCallback((id: string) => {
  // handler logic
}, [])
```

## Recommended Patterns

### Component Composition
```tsx
// Prefer composition over complex props
<RoomHeader>
  <RoomTitle>{room.currentStory}</RoomTitle>
  <RoomActions>
    <Button onClick={revealVotes}>Reveal</Button>
  </RoomActions>
</RoomHeader>
```

### Loading States
```tsx
// Always provide loading states
if (!isClient) {
  return <div>Loading...</div>
}
```

### Form Handling
```tsx
// Use controlled components with proper validation
const [value, setValue] = useState("")
const isValid = value.trim().length > 0

<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  disabled={!isValid}
/>
```