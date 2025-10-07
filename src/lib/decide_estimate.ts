const FIB = [1, 2, 3, 5, 8, 13, 21] as const;
export type Fib = typeof FIB[number];

/**
 * Selects the Fibonacci value from FIB that is closest to the given number.
 *
 * @param n - The target number to approximate with a Fibonacci value
 * @returns The Fibonacci value from `FIB` nearest to `n`. If two values are equally close, returns the lower one.
 */
function nearestFib(n: number): Fib {
  let best: Fib = FIB[0];
  let bestDiff = Math.abs(n - best);
  for (const f of FIB) {
    const d = Math.abs(n - f);
    if (d < bestDiff) { best = f; bestDiff = d; }
  }
  return best;
}

/**
 * Compute the median of a list of numbers.
 *
 * @returns The median value; for an even-length array, the arithmetic mean of the two central values. Returns `NaN` if `nums` is empty.
 */
function median(nums: number[]): number {
  const a = [...nums].sort((x,y)=>x-y);
  const m = Math.floor(a.length/2);
  return a.length % 2 ? a[m] : (a[m-1] + a[m]) / 2;
}

/**
 * Compute the ratio between two numbers with the smaller value treated as at least 1.
 *
 * @param a - First value (order does not matter)
 * @param b - Second value (order does not matter)
 * @returns The ratio (>= 1) of the larger input to the smaller input, where the smaller input is clamped to 1 to avoid division by zero
 */
function ratio(a: number, b: number) {
  return Math.max(a, b) / Math.max(1, Math.min(a, b));
}

/**
 * Partitions Fibonacci votes into two clusters by choosing the split that minimizes within-cluster variance.
 *
 * Returns two ordered clusters (left and right) produced by splitting the sorted votes and a boolean
 * indicating whether the split is a true bimodal separation (both clusters non-empty and their boundary values differ).
 *
 * @param votes - Array of Fibonacci votes to cluster
 * @returns An object with `clusters`: a two-element array [leftCluster, rightCluster] of sorted numeric votes, and `isBimodal`: `true` if both clusters are non-empty and the largest value in the left cluster differs from the smallest value in the right cluster, `false` otherwise.
 */
function clusterVotes(votes: Fib[]): {clusters: number[][], isBimodal: boolean} {
  // naive 2-means on the discrete Fib line
  const a = [...votes].sort((x,y)=>x-y);
  // try every split and pick the one that minimizes within-cluster variance
  let bestSplit = 1, bestScore = Infinity;
  for (let i=1; i<a.length; i++) {
    const left = a.slice(0,i), right = a.slice(i);
    const mean = (arr:number[]) => arr.reduce((s,x)=>s+x,0)/arr.length;
    const lmean = mean(left), rmean = mean(right);
    const lvar = left.reduce((s,x)=>s+(x-lmean)**2,0);
    const rvar = right.reduce((s,x)=>s+(x-rmean)**2,0);
    const score = lvar + rvar;
    if (score < bestScore) { bestScore = score; bestSplit = i; }
  }
  const left = a.slice(0,bestSplit), right = a.slice(bestSplit);
  const isBimodal = left.length>0 && right.length>0 && left[left.length-1] !== right[0];
  return {clusters: [left, right], isBimodal};
}

type Decision =
  | {kind: 'final'; points: Fib; reason: string}
  | {kind: 'revote'; reason: string}
  | {kind: 'split-or-spike'; reason: string};

  export const decisionKindLabel = {
    final: 'Celebrate and move on!',
    revote: 'Revote',
    "split-or-spike": 'Split story if scope is unclear, or spike if scope is clear but implementation is uncertain or risky.',
  }

/**
 * Decides an estimate from an array of Fibonacci votes.
 *
 * Analyzes vote spread, clustering, and gaps to produce a Decision that is one of:
 * - a `final` decision with chosen `points` (a `Fib` value),
 * - a `revote` recommendation when votes are insufficient or too dispersed,
 * - or `split-or-spike` when the distribution indicates mixed scope or unknowns.
 *
 * @param votes - Array of votes where each value is one of the predefined Fibonacci sizes
 * @returns A Decision describing the chosen outcome: a `final` decision with `points`, a `revote` with a reason, or `split-or-spike` with a reason
 */
export function decideEstimate(votes: Fib[]): Decision {
  if (!votes.length) return {kind:'revote', reason:'No votes cast'};
  const a = [...votes].sort((x,y)=>x-y);
  const min = a[0], max = a[a.length-1];
  const med = nearestFib(median(a));
  const spread = ratio(max, min);

  // Hard stop: too much spread → split/spike
  if (stepDistance(min, max) >= 3) {
    return {kind:'split-or-spike',
      reason:`Spread too large (${min}↔︎${max}). Likely mixed scope or unknowns.`};
  }

  // Bimodal handling
  const {clusters, isBimodal} = clusterVotes(a);
  if (isBimodal && clusters[0].length && clusters[1].length) {
    const leftMax = clusters[0][clusters[0].length-1];
    const rightMin = clusters[1][0];
    const gapSteps = stepDistance(leftMax as Fib, rightMin as Fib);
    if (gapSteps >= 2) {
      // unknowns likely → conservative
      return {kind:'final', points: rightMin as Fib,
        reason:`Bimodal votes (${leftMax} vs ${rightMin}); chose higher due to uncertainty: ${rightMin}.`};
    }
    // small gap → median
    return {kind:'final', points: med,
      reason:`There are two clusters close together; use median.`};
  }

  // Risk-aware median
  if (spread <= 2) {
    return {kind:'final', points: med, reason:`Low spread; use median.`};
  }
  if (spread <= 3) {
    const up = nextFibAbove(med);
    return {kind:'final', points: up, reason:`Moderate spread; add "risk factor" to: ${up}.`};
  }

  // Fallback: discuss then revote
  return {kind:'revote', reason:`Wide spread (${min}↔︎${max}); have a quick discussion, then revote.`};
}

/**
 * Compute the distance in index steps between two Fibonacci choices in FIB.
 *
 * @param a - First Fibonacci value
 * @param b - Second Fibonacci value
 * @returns The absolute difference of their indices in `FIB` (the number of steps between them)
 */
function stepDistance(a: Fib, b: Fib): number {
  const ia = FIB.indexOf(a), ib = FIB.indexOf(b);
  return Math.abs(ia - ib);
}
/**
 * Selects the next Fibonacci value after the given `f`, clamping to the largest available entry.
 *
 * @returns The Fibonacci value immediately following `f` in FIB, or the last element if `f` is already the largest.
 */
function nextFibAbove(f: Fib): Fib {
  const i = FIB.indexOf(f);
  return FIB[Math.min(i+1, FIB.length-1)];
}