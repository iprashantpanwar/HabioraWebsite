import { useId } from "react";
import type { Species, StageIndex } from "@/lib/constants";

// The three species the app grows (ASSET_SPEC.md): a green leafy tree, a pink
// flowering one and an autumn one. Each is drawn at the app's six growth stages.
const PALETTES: Record<Species, { light: string; mid: string; dark: string; flower?: string }> = {
  pine: { light: "#c4e39b", mid: "#82bd69", dark: "#4f8d4b" },
  blossom: { light: "#fde0ea", mid: "#f1aac9", dark: "#d27fa6", flower: "#fff7fa" },
  amber: { light: "#fbe29a", mid: "#efb552", dark: "#c98538", flower: "#fff3cf" },
};

type Blob = [cx: number, cy: number, r: number];

type Shape = { trunkWidth: number; trunkTop: number; canopy: Blob[]; flowers?: [number, number][] };

// Canopies are listed back to front, so the last blob catches the most light.
const SHAPES: Partial<Record<StageIndex, Shape>> = {
  2: { trunkWidth: 5, trunkTop: 98, canopy: [[60, 90, 19]] },
  3: {
    trunkWidth: 8,
    trunkTop: 86,
    canopy: [
      [48, 84, 18],
      [72, 82, 19],
      [60, 66, 21],
    ],
  },
  4: {
    trunkWidth: 10,
    trunkTop: 80,
    canopy: [
      [42, 78, 22],
      [78, 76, 23],
      [60, 54, 26],
      [60, 74, 20],
    ],
    flowers: [
      [46, 70],
      [70, 52],
      [76, 78],
      [55, 84],
      [62, 40],
    ],
  },
  5: {
    trunkWidth: 12,
    trunkTop: 78,
    canopy: [
      [36, 78, 22],
      [84, 76, 22],
      [46, 52, 24],
      [76, 48, 24],
      [60, 30, 22],
      [60, 66, 26],
    ],
    flowers: [
      [40, 74],
      [52, 46],
      [74, 40],
      [82, 70],
      [62, 26],
      [56, 80],
      [70, 62],
    ],
  },
};

type TreeProps = {
  species?: Species;
  stage: StageIndex;
  className?: string;
  title?: string;
  /** Position when nested inside another <svg>, such as an island. */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

/**
 * One tree on its own little disc of grass, drawn in a 120×150 box whose bottom edge is
 * the base of the disc — so trees of different stages line up when placed side by side.
 */
export function TreeIllustration({ species = "pine", stage, className, title, x, y, width, height }: TreeProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const palette = PALETTES[species];
  const shape = SHAPES[stage];
  const ids = { canopy: `c${uid}`, trunk: `t${uid}`, grass: `g${uid}`, leaf: `l${uid}` };

  return (
    <svg
      viewBox="0 0 120 150"
      className={className}
      x={x}
      y={y}
      width={width}
      height={height}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      {title && <title>{title}</title>}
      <defs>
        <radialGradient id={ids.canopy} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor={palette.light} />
          <stop offset="0.55" stopColor={palette.mid} />
          <stop offset="1" stopColor={palette.dark} />
        </radialGradient>
        <linearGradient id={ids.trunk} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a8784d" />
          <stop offset="0.6" stopColor="#8b6240" />
          <stop offset="1" stopColor="#6c4a2f" />
        </linearGradient>
        <linearGradient id={ids.grass} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b5d98f" />
          <stop offset="1" stopColor="#7fb565" />
        </linearGradient>
        <linearGradient id={ids.leaf} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a6dc7c" />
          <stop offset="1" stopColor="#4e9447" />
        </linearGradient>
      </defs>

      {/* Disc of grass the tree stands on, with a sliver of soil showing beneath. */}
      <ellipse cx="60" cy="141" rx="35" ry="9" fill="#7a5537" />
      <ellipse cx="60" cy="137.5" rx="35" ry="9.5" fill={`url(#${ids.grass})`} />
      <ellipse cx="54" cy="135.5" rx="18" ry="3.5" fill="#ffffff" opacity="0.18" />

      {stage === 0 && (
        <g>
          <path d="M34 138c4-11 14-16 26-16s22 5 26 16z" fill="#8b6240" />
          <path d="M42 134c4-6 10-8.5 18-8.5" stroke="#a8784d" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <ellipse cx="60" cy="121.5" rx="6.5" ry="4.5" fill="#e6cb94" />
          <ellipse cx="58.5" cy="120.5" rx="2.5" ry="1.4" fill="#fff4d6" opacity="0.8" />
          <path d="M60 117.5c0-4 1.2-7 3.6-9" stroke="#6fae5a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M63.4 108.8c1.8-3.4 5-4.6 8.6-4-1.2 3.4-4.4 5-8.6 4z" fill="#86c46a" />
        </g>
      )}

      {stage === 1 && (
        <g>
          <ellipse cx="60" cy="136" rx="9" ry="2.6" fill="#4f8d4b" opacity="0.3" />
          <path d="M60 136c0-8 0-15 .5-21" stroke="#4f8d4b" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M60 118c-2-7-8-10-16-9 1 7 7 11 16 9z" fill={`url(#${ids.leaf})`} />
          <path d="M60.5 115c1.6-8 8-12 16.5-11-1 8-7.6 12.4-16.5 11z" fill={`url(#${ids.leaf})`} />
        </g>
      )}

      {shape && (
        <g>
          <ellipse cx="60" cy="136" rx={Math.min(30, 10 + shape.trunkWidth * 2)} ry="4" fill="#2f5a34" opacity="0.28" />
          <path
            d={trunkPath(shape.trunkWidth, shape.trunkTop)}
            fill={`url(#${ids.trunk})`}
          />
          {shape.canopy.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={`url(#${ids.canopy})`} />
          ))}
          {/* A soft highlight where the sun hits the crown. */}
          {shape.canopy.length > 0 && (
            <ellipse
              cx={shape.canopy[shape.canopy.length - 1][0] - 6}
              cy={Math.min(...shape.canopy.map((b) => b[1] - b[2])) + 12}
              rx="9"
              ry="5"
              fill="#ffffff"
              opacity="0.28"
            />
          )}
          {palette.flower &&
            shape.flowers?.map(([fx, fy], i) => (
              <g key={i}>
                <circle cx={fx} cy={fy} r="2.6" fill={palette.flower} />
                <circle cx={fx} cy={fy} r="1" fill={palette.dark} opacity="0.7" />
              </g>
            ))}
        </g>
      )}
    </svg>
  );
}

function trunkPath(w: number, top: number) {
  const l = 60 - w / 2;
  const r = 60 + w / 2;
  // Flares a little at the root and narrows toward the crown.
  return `M${l - 2},137 C${l + 1},133 ${l + 1},${top + 22} ${60 - w / 4},${top} L${60 + w / 4},${top} C${r - 1},${top + 22} ${r - 1},133 ${r + 2},137 Z`;
}
