import { decideEstimate, Fib, decisionKindLabel } from "@/lib/decide_estimate";

export function DecisionEstimate({ votes }: { votes: number[] }) {
  const decision = decideEstimate(votes as Fib[]);
  return (
      <div className="text-lg">
        <span className="font-bold">Recommendation:</span> {decision.reason} {decisionKindLabel[decision.kind]}
      </div>
  );
}
