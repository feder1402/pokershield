const FIB = [1, 2, 3, 5, 8, 13, 21] as const;
export type Fib = typeof FIB[number];

function nearestFib(n: number): Fib {
  let best: Fib = FIB[0];
  let bestDiff = Math.abs(n - best);
  for (const f of FIB) {
    const d = Math.abs(n - f);
    if (d < bestDiff) { best = f; bestDiff = d; }
  }
  return best;
}

function median(nums: number[]): number {
  const a = [...nums].sort((x,y)=>x-y);
  const m = Math.floor(a.length/2);
  return a.length % 2 ? a[m] : (a[m-1] + a[m]) / 2;
}

function ratio(a: number, b: number) {
  return Math.max(a, b) / Math.max(1, Math.min(a, b));
}

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

function stepDistance(a: Fib, b: Fib): number {
  const ia = FIB.indexOf(a), ib = FIB.indexOf(b);
  return Math.abs(ia - ib);
}
function nextFibAbove(f: Fib): Fib {
  const i = FIB.indexOf(f);
  return FIB[Math.min(i+1, FIB.length-1)];
}
