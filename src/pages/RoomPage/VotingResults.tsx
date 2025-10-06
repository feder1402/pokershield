import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { PokerCard } from "@/components/PokerCard";
import { Check } from "lucide-react";
import { ConvergenceMap } from "@/components/ConvergenceMap";
import { standardDeviation } from "@/lib/standard_deviation";
import useRandomReward from "@/hooks/useRandomReward";
import { useEffect } from "react";
import { DecisionEstimate } from "./DecisionEstimate";

interface VotingResultsProps {
  room: string;
  isVotingEnabled: boolean;
}

export function VotingResults({ room, isVotingEnabled }: VotingResultsProps) {
  const votes = useQuery(api.rooms.getVotes, { roomName: room });
  const { reward } = useRandomReward();

  const voters = votes?.filter(
    ({ isVotingParticipant }) => isVotingParticipant
  ) || [];
  const numberOfVotes = voters?.filter(({ hasVoted }) => hasVoted).length || 0;
  const validVotes = isVotingEnabled
    ? []
    : votes
        ?.filter(({ hasVoted }) => hasVoted)
        .map(({ vote }) => (vote ? parseInt(vote) : 0))
        .filter((value) => !isNaN(value)) || [];
  const stdDev = standardDeviation(validVotes || []);
  console.log("stdDev", stdDev);

  useEffect(() => {
    console.log("useEffect", isVotingEnabled, stdDev);
    if (!isVotingEnabled && stdDev < 1) {
      console.log("rewarding");
      reward();
    }
  }, [stdDev, isVotingEnabled]);

  console.log("votes", votes);

  if (!votes) {
    return null;
  }

  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-muted-foreground mb-4">
        {numberOfVotes === 0 ? "Nobody Voted yet" 
        : numberOfVotes < voters.length ? `${numberOfVotes} of ${voters?.length} people voted`
        : numberOfVotes === voters.length && "Everybody Voted"}
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
        <div id="confettiReward">
          <div className="mt-10 container mx-auto flex justify-center">
            <ConvergenceMap values={validVotes} />
          </div>
          <div className="text-sm text-muted-foreground">
            <DecisionEstimate votes={validVotes} />
          </div>
        </div>
      )}
    </div>
  );
}
