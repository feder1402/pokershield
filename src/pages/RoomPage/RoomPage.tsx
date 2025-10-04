import { RoomHeader } from "./RoomHeader";
import { RoomNotFoundCard } from "./RoomNotFoundCard";
import usePokerRoom from "@/hooks/usePokerRoom";
import { EstimationCardSelector } from "./EstimationCardSelector";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function RoomPage() {
  const setVote = useMutation(api.participants.setVote);
  const resetVotes = useMutation(api.participants.resetVotes);
  
  const {
    roomName,
    numberOfParticipants,
    isModerator,
    participantId,
    vote,
    isVotingEnabled,
  } = usePokerRoom();

  const handleVote = (vote: string) => {
    participantId && setVote({ participantId, vote });
    console.log("Voted: ", vote);
  };

  const handleReveal = () => {
    console.log("Revealed");
  };

  const handleReset = () => {
    console.log("Reset");
    resetVotes({ roomName });
  };

  // if (roomName === undefined || participantId === undefined) {
  //   return <RoomNotFoundCard />;
  // }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <RoomHeader
        numberOfParticipants={numberOfParticipants || 0}
        roomName={roomName || ""}
        isVotingEnabled={isVotingEnabled || false}
        isModerator={isModerator}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <EstimationCardSelector
            enabled={isVotingEnabled || false}
            votedValue={vote}
            onVote={handleVote}
          />

          {isModerator && (
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
          )}

          {/*<ParticipantsList
            room={room}
          />

          <VotingResults room={room} /> */}
        </div>
      </main>
    </div>
  );
}
