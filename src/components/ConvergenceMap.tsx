import React, { useMemo, useRef, useState } from "react";

/** ---------- Types ---------- */
export type ConvergenceMapProps = {
  /** Raw estimates (e.g., [5,8,5,3,13]) */
  values: number[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  dotRadius?: number;
  /** Distance between stacked dots at the same tick */
  verticalSpacing?: number;
  showMean?: boolean;
  colors?: {
    axis?: string;
    ticks?: string;
    bandFill?: string;
    bandStroke?: string;
    median?: string;
    mean?: string;
    inlier?: string;
    outlier?: string;
    tooltipBg?: string;
    tooltipText?: string;
  };
  ariaLabel?: string;
};

/** ---------- Constants ---------- */
const SCALE = [1, 2, 3, 5, 8, 13, 21] as const;

function getMedian(nums: number[]): number {
  if (nums.length === 0) return NaN;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function getMean(nums: number[]): number {
  if (nums.length === 0) return NaN;
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}

function nearestScaleIndex(value: number): number {
  let bestIdx = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < SCALE.length; i++) {
    const d = Math.abs(SCALE[i] - value);
    if (d <= bestDiff) {
      bestDiff = d;
      bestIdx = i;
    }
  }
  return bestIdx;
}

function makeIndexToX(
  innerWidth: number,
  leftPad: number
): (idx: number) => number {
  const step = innerWidth / (SCALE.length - 1);
  return (idx: number) => leftPad + idx * step;
}

/** ---------- Component ---------- */
export const ConvergenceMap: React.FC<ConvergenceMapProps> = ({
  values,
  width = 900,
  height = 260,
  margin = { top: 28, right: 20, bottom: 48, left: 20 },
  dotRadius = 8,
  verticalSpacing = 18,
  showMean = true,
  colors = {
    axis: "#9aa0a6",
    ticks: "#5f6368",
    bandFill: "rgba(52, 199, 89, 0.12)",
    bandStroke: "rgba(52, 199, 89, 0.6)",
    median: "#34c759",
    mean: "#ff9f0a",
    inlier: "#1f6feb",
    outlier: "#e11d48",
    tooltipBg: "rgba(32,33,36,0.95)",
    tooltipText: "#e8eaed",
  },
  ariaLabel = "Convergence map for planning poker estimates",
}) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const axisY = height - margin.bottom;
  const centerY = margin.top + innerHeight / 2;
  const idxToX = useMemo(
    () => makeIndexToX(innerWidth, margin.left),
    [innerWidth, margin.left]
  );

  // Aggregate counts by scale index
  const counts = useMemo(() => {
    const c = new Array(SCALE.length).fill(0);
    for (const v of values) {
      const i = nearestScaleIndex(v);
      c[i] += 1;
    }
    return c as number[];
  }, [values]);
  // Stats
  const median = useMemo(() => getMedian(values), [values]);
  const mean = useMemo(() => getMean(values), [values]);

  const medianIdx = useMemo(() => nearestScaleIndex(median), [median]);
  const bandMinIdx = Math.max(0, medianIdx - 1);
  const bandMaxIdx = Math.min(SCALE.length - 1, medianIdx + 1);

  // Mean X coordinate via linear interpolation across indices
  const meanX = useMemo(() => {
    if (!Number.isFinite(mean)) return idxToX(medianIdx);
    const iRight = SCALE.findIndex((v) => v >= mean);
    if (iRight === -1) return idxToX(SCALE.length - 1);
    if (iRight <= 0) return idxToX(0);
    const iLeft = iRight - 1;
    const vL = SCALE[iLeft];
    const vR = SCALE[iRight];
    const t = vR === vL ? 0 : (mean - vL) / (vR - vL);
    const xL = idxToX(iLeft);
    const xR = idxToX(iRight);
    return xL + t * (xR - xL);
  }, [mean, idxToX, medianIdx]);

  // Tooltip
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    content: React.ReactNode;
    key: string;
  } | null>(null);

  const hasData = Number.isFinite(median) && values.length > 0;
  if (!hasData) {
    return (
      <div style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: colors.ticks, fontSize: 14 }}>No estimates to display</div>
      </div>
    );
  }

  const isOutlierTick = (idx: number) =>
    idx < bandMinIdx || idx > bandMaxIdx;

  return (
    <div style={{ position: "relative", width, height }}>
      {hover && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            left: Math.max(8, Math.min(width - 260, hover.x + 12)),
            top: Math.max(8, hover.y - 8),
            background: colors.tooltipBg,
            color: colors.tooltipText,
            padding: "10px 12px",
            fontSize: 13,
            lineHeight: 1.35,
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            pointerEvents: "none",
            maxWidth: 240,
            zIndex: 10,
            backdropFilter: "blur(2px)",
          }}
        >
          {hover.content}
        </div>
      )}

      <svg
        ref={svgRef}
        width={width}
        height={height}
        aria-label={ariaLabel}
        role="img"
      >
        {/* Axis */}
        <line
          x1={margin.left}
          x2={width - margin.right}
          y1={axisY}
          y2={axisY}
          stroke={colors.axis}
          strokeWidth={1}
        />

        {/* Ticks + labels */}
        {SCALE.map((tick, i) => {
          const x = idxToX(i);
          return (
            <g key={`tick-${i}`} transform={`translate(${x},0)`}>
              <line
                x1={0}
                x2={0}
                y1={axisY - 6}
                y2={axisY + 6}
                stroke={colors.axis}
                strokeWidth={1}
                opacity={0.9}
              />
              <text
                x={0}
                y={axisY + 22}
                textAnchor="middle"
                fontSize={12}
                fill={colors.ticks}
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Consensus band */}
        <rect
          x={idxToX(bandMinIdx)}
          y={margin.top}
          width={idxToX(bandMaxIdx) - idxToX(bandMinIdx)}
          height={innerHeight}
          fill={colors.bandFill}
          stroke={colors.bandStroke}
          strokeDasharray="4 4"
          rx={8}
          ry={8}
        />

        {/* Median marker */}
        <g aria-label="median">
          <line
            x1={idxToX(medianIdx)}
            x2={idxToX(medianIdx)}
            y1={margin.top - 2}
            y2={height - margin.bottom + 2}
            stroke={colors.median}
            strokeWidth={2}
          />
          <text
            x={idxToX(medianIdx)}
            y={margin.top - 16}
            textAnchor="middle"
            fontSize={12}
            fill={colors.median}
            fontWeight={700}
          >
            Median {SCALE[medianIdx]}
          </text>
        </g>

        {/* Mean marker (optional) */}
        {showMean && (
          <g aria-label="mean">
            <line
              x1={meanX}
              x2={meanX}
              y1={margin.top}
              y2={height - margin.bottom}
              stroke={colors.mean}
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            <text
              x={meanX}
              y={margin.top - 5}
              textAnchor="middle"
              fontSize={12}
              fill={colors.mean}
              fontWeight={600}
            >
              Mean {Number.isFinite(mean) ? mean.toFixed(1) : "—"}
            </text>
          </g>
        )}

        {/* Stacked dots per tick */}
        {counts.map((count, i) => {
          if (count === 0) return null;
          const x = idxToX(i);
          const out = isOutlierTick(i);
          const totalHeight = (count - 1) * verticalSpacing;
          const startY = centerY - totalHeight / 2;

          return (
            <g key={`stack-${i}`} transform={`translate(${x},0)`}>
              {Array.from({ length: count }, (_, k) => {
                const y = startY + k * verticalSpacing;
                const key = `dot-${i}-${k}`;
                return (
                  <circle
                    key={key}
                    cx={0}
                    cy={y}
                    r={dotRadius}
                    fill={out ? colors.outlier : colors.inlier}
                    opacity={0.95}
                    style={{
                      filter: out
                        ? "drop-shadow(0 0 10px rgba(225,29,72,0.45))"
                        : "none",
                      transition: "transform 180ms ease, opacity 150ms ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      const rect =
                        svgRef.current?.getBoundingClientRect() ??
                        new DOMRect();
                      const votes = count;
                      setHover({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top - 24,
                        key,
                        content: (
                          <div>
                            <div style={{ fontWeight: 700, marginBottom: 4 }}>
                              Value {SCALE[i]}
                            </div>
                            <div>
                              Votes: <b>{votes}</b>{" "}
                              {out ? (
                                <span style={{ marginLeft: 6, color: "#fca5a5" }}>
                                  (out of band)
                                </span>
                              ) : (
                                <span style={{ marginLeft: 6, color: "#a7f3d0" }}>
                                  (in band)
                                </span>
                              )}
                            </div>
                          </div>
                        ),
                      });
                    }}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};