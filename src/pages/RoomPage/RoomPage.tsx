import { RoomHeader } from "./RoomHeader";
import { RoomNotFoundCard } from "./RoomNotFoundCard";
import usePokerRoom from "@/hooks/usePokerRoom";
import { VotingCards } from "./VotingCards";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye, Check } from "lucide-react";

export default function RoomPage() {
  const {
    roomName,
    numberOfParticipants,
    isModerator,
    sessionId,
    isVotingEnabled,
  } = usePokerRoom();

  const handleVote = (vote: string) => {
    console.log("Voted: ", vote);
  };

  const handleReveal = () => {
    console.log('Revealed')
  }

  const handleReset = () => {
    console.log('Reset')
  }

  if (roomName === undefined || sessionId === undefined) {
    return <RoomNotFoundCard />;
  }

  return (
    <div className="min-h-screen bg-background grid-bg">
      <RoomHeader
        numberOfParticipants={numberOfParticipants || 0}
        roomName={roomName || ""}
        isVotingEnabled={isVotingEnabled || false}
        isModerator={isModerator}
        showSettings={false}
        onScaleChange={() => {}}
        setShowSettings={() => {}}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <VotingCards
            disabled={isVotingEnabled || false}
            onVote={handleVote}
          />
          
          {isModerator && (
        <div className="flex justify-center gap-4">
          <Button onClick={handleReset} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Reset Votes
          </Button>
          <Button onClick={handleReveal} disabled={!isVotingEnabled} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Reveal Votes
          </Button>
        </div>
      )}

          {/*<ParticipantsList
            room={room}
          />

          <ModeratorControls
            room={room}
            currentParticipant={currentParticipant}
            onReset={handleReset}
            onReveal={handleReveal}
          />

          <VotingResults room={room} /> */}
        </div>
      </main>
    </div>
  );
}
