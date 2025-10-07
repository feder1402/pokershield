import { decideEstimate, Fib, decisionKindLabel } from "@/lib/decide_estimate";

/**
 * Renders a single-line recommendation derived from a collection of numeric votes.
 *
 * @param votes - Array of numeric votes (expected to be Fibonacci-style estimate values) used to compute the recommendation
 * @returns A div containing a bold "Recommendation:" label followed by the computed reason and the decision kind label
 */
export function DecisionEstimate({ votes }: { votes: number[] }) {
  const decision = decideEstimate(votes as Fib[]);
  return (
      <div className="text-lg">
        <span className="font-bold">Recommendation:</span> {decision.reason} {decisionKindLabel[decision.kind]}
      </div>
  );
}