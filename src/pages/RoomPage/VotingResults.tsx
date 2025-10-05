import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { PokerCard } from "@/components/PokerCard";
import { Check, X } from "lucide-react";

interface VotingResultsProps {
  room: string;
  isVotingEnabled: boolean;
}

export function VotingResults({ room, isVotingEnabled }: VotingResultsProps) {
  const votes = useQuery(api.rooms.getVotes, { roomName: room });
  const disableVoting = useMutation(api.rooms.disableVoting);
  console.log("votes", votes);

  if (!votes) {
    return null;
  }

  const voters = votes.filter(({ isVotingParticipant }) => isVotingParticipant);
  const numberOfVotes = voters.filter(({ hasVoted }) => hasVoted).length;

  if (numberOfVotes === voters.length) {
    disableVoting({ roomName: room });
  }
  
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-muted-foreground mb-4">
        {numberOfVotes} of {voters.length} people voted
      </p>
      <div className="space-y-2 flex flex-wrap justify-center  gap-4 mx-auto">
        {voters?.map(({ hasVoted, vote }, idx) =>
          isVotingEnabled ? (
            <PokerCard key={idx} value={hasVoted ? <Check /> : <X />} size="md" disabled={true} />
          ) : (
            <PokerCard key={idx} value={vote} size="md" disabled={true} />
          )
        )}
      </div>
    </div>
  );
}
