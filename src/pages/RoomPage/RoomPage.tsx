import { RoomHeader } from "./RoomHeader";
import { RoomNotFoundCard } from "./RoomNotFoundCard";
import usePokerRoom from "@/hooks/usePokerRoom";
import { EstimationCardSelector } from "./EstimationCardSelector";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { VotingResults } from "./VotingResults";
import { ModeratorControls } from "./ModeratorControls";

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
    roomName && resetVotes({ roomName });
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          <EstimationCardSelector
            enabled={isVotingEnabled || false}
            votedValue={vote}
            onVote={handleVote}
          />

          {roomName && <VotingResults room={roomName} />}

          <div className="mt-8">
            {isModerator && roomName &&<ModeratorControls room={roomName} isVotingEnabled={isVotingEnabled!} />}
          </div>
        </div>
      </div>
    </div>
  );
}
