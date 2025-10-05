import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { PokerCard } from "@/components/PokerCard";
import { Check, X } from "lucide-react";

interface VotingResultsProps {
  room: string;
}

export function VotingResults({ room }: VotingResultsProps) {
  const votes = useQuery(api.rooms.getVotes, { roomName: room });
  console.log("votes", votes);

  if (!votes) {
    return null;
  }

  const numberOfVotes = votes.filter(({ hasVoted }) => hasVoted).length;

  return (
    <div className="mt-8 text-center">
      <h3 className="text-lg font-semibold mb-4">Voting Results</h3>
      <p className="text-sm text-muted-foreground mb-4">{numberOfVotes} of {votes.length} people voted</p>
      <div className="space-y-2 flex flex-wrap justify-center  gap-4 mx-auto">
        {votes?.map(({ hasVoted }, idx) => (
          <PokerCard key={idx} value={hasVoted ? <Check /> : <X />} size="sm" disabled={true} />
        ))}
      </div>
    </div>
  );
}
