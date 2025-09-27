import { RotateCcw, Eye, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Room, Participant } from "@/lib/room-store"

interface ModeratorControlsProps {
  room: Room
  currentParticipant: Participant | undefined
  onReset: () => void
  onReveal: () => void
}

export function ModeratorControls({ room, currentParticipant, onReset, onReveal }: ModeratorControlsProps) {
  const allVoted = room.participants.every((p) => p.hasVoted)

  return (
    <>
      {/* Voting Status */}
      <div className="text-center mb-8">
        {currentParticipant?.hasVoted ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <Check className="h-5 w-5" />
            <span>
              You voted: <strong>{currentParticipant.vote}</strong>
            </span>
          </div>
        ) : (
          <p className="text-muted-foreground">You haven&apos;t voted yet</p>
        )}
      </div>

      {/* Moderator Controls */}
      {currentParticipant?.isModerator && (
        <div className="flex justify-center gap-4">
          <Button onClick={onReset} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Reset Votes
          </Button>
          <Button onClick={onReveal} disabled={!allVoted} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Reveal Votes
          </Button>
        </div>
      )}
    </>
  )
}
