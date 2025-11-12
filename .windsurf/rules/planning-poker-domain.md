---
trigger: model_decision
description: Planning poker domain knowledge and business logic
globs:
---

# Planning Poker Domain Knowledge

## Core Concepts
PokerShield is a collaborative estimation tool for agile teams using planning poker methodology.

## Key Entities

### Room
- Unique identifier (roomId)
- Contains participants, current story, estimation scale
- Manages voting state (votesRevealed)
- Created by first participant who becomes moderator

### Participant
- Unique ID, voting status, role (moderator/participant)
- Can cast votes on user stories
- Joins rooms via room ID

### Estimation Scales
- Fibonacci: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
- T-shirt sizes: XS, S, M, L, XL, XXL
- Custom scales supported via [src/lib/estimation-scales.ts](mdc:src/lib/estimation-scales.ts)

## Workflow
1. **Room Creation**: First person creates room, becomes moderator
2. **Joining**: Team members join using room ID
3. **Story Setup**: Moderator sets current user story
4. **Voting**: All participants cast votes simultaneously
5. **Reveal**: Moderator reveals all votes at once
6. **Discussion**: Team discusses discrepancies
7. **Reset**: Start new round for next story

## State Management
- Zustand store handles all room state
- Persists to localStorage for session continuity
- Real-time updates (currently client-side only)

## UI Patterns
- Cards for estimation values
- Participant list with voting status
- Moderator controls (reveal, reset, settings)
- Room sharing via copy-to-clipboard