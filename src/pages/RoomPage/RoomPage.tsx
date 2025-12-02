import { RoomHeader } from "./RoomHeader";
import usePokerRoom from "@/hooks/usePokerRoom";
import { EstimationCardSelector } from "./EstimationCardSelector";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { VotingResults } from "./VotingResults";
import { ModeratorControls } from "./ModeratorControls";
import { useParams } from "react-router-dom";
import { RoomNotFoundCard } from "./RoomNotFoundCard";

export default function RoomPage() {
  const params = useParams();
  const roomName = params.roomName as string;
  const setVote = useMutation(api.participants.setVote);

  const {
    numberOfParticipants,
    isModerator,
    participantId,
    vote,
    isVotingEnabled,
    storyTitle,
  } = usePokerRoom(roomName);

  const handleVote = (vote: string) => {
    participantId && setVote({ participantId, vote });
    console.log("Voted: ", vote);
  };

  // if (roomName === undefined || participantId === undefined) {
  //   return <RoomNotFoundCard />;
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <RoomHeader
        numberOfParticipants={numberOfParticipants || 0}
        roomName={roomName}
        isVotingEnabled={isVotingEnabled || false}
        isModerator={isModerator}
        storyTitle={storyTitle}
      />

        <div className="max-w-6xl mx-auto px-4 py-8 flex-1 flex flex-col">

          <div className="flex-1 flex flex-col justify-center">
            {roomName && <VotingResults room={roomName} isVotingEnabled={isVotingEnabled!} />}

            <div className="mt-8">
              {isModerator && roomName &&<ModeratorControls room={roomName} isVotingEnabled={isVotingEnabled!} />}
            </div>
          </div>

          <EstimationCardSelector
            enabled={isVotingEnabled || false}
            votedValue={vote}
            onVote={handleVote}
          />
        </div>
    </div>
  );
}
