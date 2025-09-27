import { Room, Participant } from "@/lib/room-store"
import { getScaleValues } from "@/lib/estimation-scales"

interface VotingCardsProps {
  room: Room
  currentParticipant: Participant | undefined
  onVote: (vote: string) => void
}

export function VotingCards({ room, currentParticipant, onVote }: VotingCardsProps) {
  const currentScale = getScaleValues(room.estimationScale)

  return (
    <div className="mb-8">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 max-w-4xl mx-auto">
        {currentScale.map((value) => (
          <button
            key={value}
            onClick={() => onVote(value)}
            disabled={room.votesRevealed}
            className={`poker-card h-20 text-lg font-bold ${
              currentParticipant?.vote === value ? "selected" : ""
            } ${room.votesRevealed ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}
