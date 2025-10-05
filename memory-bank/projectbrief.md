# Project Brief: PokerShield

## Project Overview

**PokerShield** is a collaborative planning poker estimation tool designed for agile teams. It enables remote teams to conduct estimation sessions in real-time, where team members can vote on story complexity using various estimation scales.

## Core Purpose

To provide a lightweight, intuitive, and real-time planning poker experience that helps distributed teams estimate work efficiently without the overhead of complex tools.

## Key Features

1. **Room-Based Sessions**
   - Create estimation rooms with unique names
   - Shareable room URLs for easy team access
   - Persistent room state across sessions

2. **Real-Time Collaboration**
   - Live participant tracking
   - Synchronized voting state
   - Instant vote reveals

3. **Flexible Estimation Scales**
   - Multiple estimation scales (Fibonacci, T-shirt sizes, etc.)
   - Configurable per room

4. **Role-Based Controls**
   - Moderator: Controls voting flow, reveals votes, resets rounds
   - Participants: Cast votes, observe results

5. **Modern User Experience**
   - Responsive design for all devices
   - Dark/Light theme support
   - Clean, intuitive interface

## Target Users

- Agile development teams
- Product managers conducting estimation sessions
- Remote-first organizations
- Teams using Scrum or similar methodologies

## Technical Approach

- **Real-time Backend**: Convex for reactive data sync
- **Modern Frontend**: React 19 + TypeScript + Vite
- **Component System**: shadcn/ui with Tailwind CSS
- **State Management**: Zustand for client state
- **Deployment**: Vercel platform

## Success Criteria

- Instant room creation (< 2 seconds)
- Real-time updates (< 500ms latency)
- Support for 10+ concurrent participants per room
- 99.9% uptime
- Intuitive UX requiring no training

## Project Status

**Current Phase**: Active development  
**Branch**: migrate-to-vite  
**Version**: 0.1.1

## Key Differentiators

1. **Zero Setup**: No registration required to start
2. **Real-Time**: Built on reactive backend for instant sync
3. **Modern Stack**: Latest React/TypeScript patterns
4. **Beautiful UI**: Professional design system
5. **Privacy-First**: Rooms are ephemeral by default

