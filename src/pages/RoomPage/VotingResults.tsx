import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { PokerCard } from "@/components/PokerCard";
import { Check } from "lucide-react";
import { ConvergenceMap } from "@/components/ConvergenceMap";

interface VotingResultsProps {
  room: string;
  isVotingEnabled: boolean;
}

export function VotingResults({ room, isVotingEnabled }: VotingResultsProps) {
  const votes = useQuery(api.rooms.getVotes, { roomName: room });
  console.log("votes", votes);

  if (!votes) {
    return null;
  }

  const voters = votes.filter(({ isVotingParticipant }) => isVotingParticipant);
  const numberOfVotes = voters.filter(({ hasVoted }) => hasVoted).length;

  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-muted-foreground mb-4">
        {numberOfVotes > 0
          ? `${numberOfVotes} of ${voters.length} people voted`
          : "Nobody voted yet"}
      </p>
      <div className="space-y-2 flex flex-wrap justify-center  gap-4 mx-auto">
        {voters?.map(({ hasVoted, vote }, idx) =>
          isVotingEnabled ? (
            <PokerCard
              key={idx}
              value={hasVoted ? <Check /> : ""}
              size="md"
              disabled={true}
            />
          ) : (
            <PokerCard key={idx} value={vote} size="md" disabled={true} />
          )
        )}
      </div>
      {!isVotingEnabled && (
        <div className="mt-10 container mx-auto flex justify-center">
          <ConvergenceMap
            values={votes.filter(({ hasVoted }) => hasVoted).map(({ vote }) => (vote ? parseInt(vote) : 0)).filter((value) => !isNaN(value))}
          />
        </div>
      )}
    </div>
  );
}
