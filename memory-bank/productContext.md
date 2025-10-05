# Product Context: PokerShield

## Domain: Planning Poker Estimation

### What is Planning Poker?

Planning poker (also called Scrum poker) is a consensus-based, gamified technique for estimating effort or relative size of development goals in software development. Team members make estimates by playing numbered cards face-down, then revealing them simultaneously to avoid anchoring bias.

### User Flows

#### 1. Moderator Flow

```
1. Navigate to PokerShield homepage
2. Enter room name
3. Click "Create Room"
4. Share room URL with team
5. Wait for participants to join
6. Enable/disable voting rounds
7. Reveal votes when ready
8. Reset for next story
```

#### 2. Participant Flow

```
1. Receive room link from moderator
2. Click link to join room
3. Wait for voting to be enabled
4. Select estimation card (vote)
5. Wait for reveal
6. Discuss results with team
7. Repeat for next story
```

### Key Concepts

#### Room

- **Purpose**: Container for an estimation session
- **Identifier**: Human-readable name (e.g., "sprint-23-planning")
- **Lifecycle**: Created by moderator, persists until manually deleted
- **State**: Tracks voting status, participants, current scale

#### Participant

- **Types**: Moderator (creator) and regular participants
- **Permissions**: 
  - Moderator: Control voting, reveal results, reset votes
  - Participant: Cast votes, view results when revealed
- **State**: Current vote, voting eligibility

#### Vote

- **Values**: Depends on selected estimation scale
- **Visibility**: Hidden until moderator reveals
- **State**: Can be changed before reveal

#### Estimation Scales

Common scales supported:

1. **Fibonacci**: 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?
2. **Modified Fibonacci**: 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?
3. **T-Shirt Sizes**: XS, S, M, L, XL, XXL, ?
4. **Powers of 2**: 1, 2, 4, 8, 16, 32, 64, ?

### User Stories

#### Epic: Room Management

- **US-001**: As a moderator, I want to create a room with a unique name so I can start an estimation session
- **US-002**: As a moderator, I want to share a room URL so participants can easily join
- **US-003**: As a moderator, I want to select an estimation scale for the room
- **US-004**: As a user, I want to see the number of participants in the room

#### Epic: Voting Process

- **US-005**: As a moderator, I want to enable/disable voting so I can control the estimation flow
- **US-006**: As a participant, I want to select a card value as my estimate
- **US-007**: As a participant, I want to change my vote before it's revealed
- **US-008**: As a moderator, I want to reveal all votes simultaneously
- **US-009**: As a moderator, I want to reset all votes to start a new round

#### Epic: User Experience

- **US-010**: As a user, I want to toggle between dark and light themes
- **US-011**: As a user, I want a responsive design that works on mobile and desktop
- **US-012**: As a participant, I want to see visual feedback when I've voted
- **US-013**: As a user, I want to see who has voted (without seeing their vote)

### Business Rules

1. **Room Creation**
   - Room names must be unique across the system
   - First person to create a room becomes the moderator
   - Rooms are created with voting enabled by default

2. **Voting Rules**
   - Only voting participants can cast votes
   - Votes can be changed any time before reveal
   - All votes are hidden until moderator reveals
   - Moderator can vote as well

3. **Moderator Rules**
   - First participant in room is the moderator
   - Moderator role cannot be transferred (in current version)
   - Only moderator can enable/disable voting
   - Only moderator can reveal and reset votes

4. **Scale Selection**
   - Estimation scale is set when room is created
   - Default scale is Fibonacci
   - Scale cannot be changed mid-session (in current version)

### Edge Cases

1. **Moderator Leaves**: Room continues but no one can control voting
2. **All Participants Leave**: Room persists but is empty
3. **Network Disconnection**: Participant reconnects to same state
4. **Duplicate Votes**: Last vote overwrites previous vote
5. **Vote Before Enable**: System should prevent voting when disabled

### Performance Requirements

- **Room Creation**: < 2 seconds
- **Join Room**: < 1 second
- **Cast Vote**: < 500ms to reflect in UI
- **Reveal Votes**: < 500ms to show all votes
- **Real-time Sync**: < 500ms latency between participants

### Accessibility Requirements

- Keyboard navigation support
- Screen reader compatibility
- WCAG 2.1 AA compliance
- High contrast mode support
- Focus indicators on all interactive elements

### Mobile Considerations

- Touch-friendly card selection
- Responsive layout for small screens
- Simplified header on mobile
- Bottom sheet for controls (mobile)
- Swipe gestures for card selection

