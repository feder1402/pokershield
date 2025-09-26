import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Participant {
  id: string
  hasVoted: boolean
  vote?: string
  isModerator: boolean
  joinedAt: number
}

export interface Room {
  id: string
  participants: Participant[]
  votesRevealed: boolean
  estimationScale: string // Changed from union type to string to support more scales
  createdAt: number
  currentStory?: string
}

interface RoomState {
  rooms: Record<string, Room>
  currentUserId: string | null

  // Actions
  createRoom: (roomId: string) => void
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string, participantId: string) => void
  castVote: (roomId: string, participantId: string, vote: string) => void
  revealVotes: (roomId: string) => void
  resetVotes: (roomId: string) => void
  setEstimationScale: (roomId: string, scale: string) => void // Changed parameter type
  setCurrentStory: (roomId: string, story: string) => void
  getRoom: (roomId: string) => Room | undefined
  getCurrentParticipant: (roomId: string) => Participant | undefined
}

const generateUserId = () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

export const useRoomStore = create<RoomState>()(
  persist(
    (set, get) => ({
      rooms: {},
      currentUserId: null,

      createRoom: (roomId: string) => {
        const userId = generateUserId()
        const room: Room = {
          id: roomId,
          participants: [
            {
              id: userId,
              hasVoted: false,
              isModerator: true,
              joinedAt: Date.now(),
            },
          ],
          votesRevealed: false,
          estimationScale: "fibonacci", // Default to fibonacci scale ID
          createdAt: Date.now(),
        }

        set((state) => ({
          rooms: { ...state.rooms, [roomId]: room },
          currentUserId: userId,
        }))
      },

      joinRoom: (roomId: string) => {
        const userId = generateUserId()
        const room = get().rooms[roomId]

        if (!room) return

        const updatedRoom = {
          ...room,
          participants: [
            ...room.participants,
            {
              id: userId,
              hasVoted: false,
              isModerator: false,
              joinedAt: Date.now(),
            },
          ],
        }

        set((state) => ({
          rooms: { ...state.rooms, [roomId]: updatedRoom },
          currentUserId: userId,
        }))
      },

      leaveRoom: (roomId: string, participantId: string) => {
        const room = get().rooms[roomId]
        if (!room) return

        const updatedRoom = {
          ...room,
          participants: room.participants.filter((p) => p.id !== participantId),
        }

        set((state) => ({
          rooms: { ...state.rooms, [roomId]: updatedRoom },
        }))
      },

      castVote: (roomId: string, participantId: string, vote: string) => {
        const room = get().rooms[roomId]
        if (!room || room.votesRevealed) return

        const updatedRoom = {
          ...room,
          participants: room.participants.map((p) => (p.id === participantId ? { ...p, hasVoted: true, vote } : p)),
        }

        set((state) => ({
          rooms: { ...state.rooms, [roomId]: updatedRoom },
        }))
      },

      revealVotes: (roomId: string) => {
        const room = get().rooms[roomId]
        if (!room) return

        set((state) => ({
          rooms: {
            ...state.rooms,
            [roomId]: { ...room, votesRevealed: true },
          },
        }))
      },

      resetVotes: (roomId: string) => {
        const room = get().rooms[roomId]
        if (!room) return

        const updatedRoom = {
          ...room,
          votesRevealed: false,
          participants: room.participants.map((p) => ({
            ...p,
            hasVoted: false,
            vote: undefined,
          })),
        }

        set((state) => ({
          rooms: { ...state.rooms, [roomId]: updatedRoom },
        }))
      },

      setEstimationScale: (roomId: string, scale: string) => {
        // Updated parameter type
        const room = get().rooms[roomId]
        if (!room) return

        set((state) => ({
          rooms: {
            ...state.rooms,
            [roomId]: { ...room, estimationScale: scale },
          },
        }))
      },

      setCurrentStory: (roomId: string, story: string) => {
        const room = get().rooms[roomId]
        if (!room) return

        set((state) => ({
          rooms: {
            ...state.rooms,
            [roomId]: { ...room, currentStory: story },
          },
        }))
      },

      getRoom: (roomId: string) => {
        return get().rooms[roomId]
      },

      getCurrentParticipant: (roomId: string) => {
        const { rooms, currentUserId } = get()
        const room = rooms[roomId]
        if (!room || !currentUserId) return undefined

        return room.participants.find((p) => p.id === currentUserId)
      },
    }),
    {
      name: "poker-shield-rooms",
      partialize: (state) => ({
        rooms: state.rooms,
        currentUserId: state.currentUserId,
      }),
    },
  ),
)
