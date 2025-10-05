import { RotateCcw, Eye, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface ModeratorControlsProps {
  room: string
  isVotingEnabled: boolean
}

export function ModeratorControls({ room, isVotingEnabled }: ModeratorControlsProps) {
  const resetVotes = useMutation(api.participants.resetVotes);
  const disableVoting = useMutation(api.rooms.disableVoting);
//  const enableVoting = useMutation(api.rooms.enableVoting);

  const handleReveal = async () => {
    console.log("Revealing votes for room", room)
    room && await disableVoting({ roomName: room });
  };

  const handleReset = () => {
    console.log("Resetting votes for room", room)
    room && resetVotes({ roomName: room });
  };

  return (
    <div className="flex justify-center gap-4">
    <Button
      onClick={handleReset}
      variant="outline"
      className="flex items-center gap-2 bg-transparent"
    >
      <RotateCcw className="h-4 w-4" />
      Reset Votes
    </Button>
    <Button
      onClick={handleReveal}
      disabled={!isVotingEnabled}
      className="flex items-center gap-2"
    >
      <Eye className="h-4 w-4" />
      Reveal Votes
    </Button>
  </div>
  )
}
