import { RoomHeader } from "./RoomHeader";
import usePokerRoom from "@/hooks/usePokerRoom";
import { EstimationCardSelector } from "./EstimationCardSelector";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { VotingResults } from "./VotingResults";
import { ModeratorControls } from "./ModeratorControls";

export default function RoomPage() {
  const setVote = useMutation(api.participants.setVote);

  const {
    roomName,
    numberOfParticipants,
    isModerator,
    participantId,
    vote,
    isVotingEnabled,
    storyTitle,
  } = usePokerRoom();

  const handleVote = (vote: string) => {
    participantId && setVote({ participantId, vote });
    console.log("Voted: ", vote);
  };

  // if (roomName === undefined || participantId === undefined) {
  //   return <RoomNotFoundCard />;
  // }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <RoomHeader
        numberOfParticipants={numberOfParticipants || 0}
        roomName={roomName}
        isVotingEnabled={isVotingEnabled || false}
        isModerator={isModerator}
        storyTitle={storyTitle}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          <EstimationCardSelector
            enabled={isVotingEnabled || false}
            votedValue={vote}
            onVote={handleVote}
          />

          {roomName && <VotingResults room={roomName} isVotingEnabled={isVotingEnabled!} />}

          <div className="mt-8">
            {isModerator && roomName &&<ModeratorControls room={roomName} isVotingEnabled={isVotingEnabled!} />}
          </div>
        </div>
      </div>
    </div>
  );
}
