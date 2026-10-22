import { useId } from "react";
import type { Species, StageIndex } from "@/lib/constants";
import { TreeIllustration } from "./TreeIllustration";

export type IslandTree = { species: Species; stage: StageIndex; name?: string };

// Where trees stand on the island's top face, back to front so nearer trees overlap
// farther ones. Six spots, like the app's islands (Islands.CAPACITY).
const PLOTS: [number, number][] = [
  [200, 82],
  [134, 112],
  [268, 108],
  [200, 140],
  [124, 166],
  [280, 162],
];

// With name pills shown, trees stand in a zigzag instead, so no pill sits right behind
// another tree's crown.
const LABELED_PLOTS: [number, number][] = [
  [122, 100],
  [244, 98],
  [62, 132],
  [184, 150],
  [290, 160],
  [326, 110],
];

type IslandProps = {
  trees: IslandTree[];
  className?: string;
  /** Show a name pill under each tree, as the app's forest does. */
  labels?: boolean;
  treeScale?: number;
  title?: string;
};

/** A floating block of grass and soil, seen from above at an angle, with trees growing on it. */
export function Island({ trees, className, labels = false, treeScale = 1, title }: IslandProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const g = { top: `it${uid}`, lip: `il${uid}`, left: `isl${uid}`, right: `isr${uid}` };
  const plots = labels ? LABELED_PLOTS : PLOTS;
  const placed = trees
    .slice(0, plots.length)
    .map((tree, i) => ({ tree, plot: plots[i] }))
    .sort((a, b) => a.plot[1] - b.plot[1]);
  const tw = 96 * treeScale;
  const th = tw * 1.25;

  return (
    <svg viewBox="0 -40 400 330" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
        <linearGradient id={g.top} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3e09a" />
          <stop offset="0.5" stopColor="#a2cf7f" />
          <stop offset="1" stopColor="#86bb68" />
        </linearGradient>
        <linearGradient id={g.lip} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#77ad5c" />
          <stop offset="1" stopColor="#5f9a4c" />
        </linearGradient>
        <linearGradient id={g.left} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b2804f" />
          <stop offset="1" stopColor="#8a5f3b" />
        </linearGradient>
        <linearGradient id={g.right} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#946641" />
          <stop offset="1" stopColor="#6e4a2e" />
        </linearGradient>
      </defs>

      {/* Soil sides */}
      <path d="M20 128 L200 216 L200 270 Q194 271 186 266 L34 190 Q20 183 20 172 Z" fill={`url(#${g.left})`} />
      <path d="M380 128 L200 216 L200 270 Q206 271 214 266 L366 190 Q380 183 380 172 Z" fill={`url(#${g.right})`} />
      {/* Strata in the soil */}
      <path d="M26 158 Q110 196 200 240" stroke="#7a5233" strokeWidth="2" opacity="0.35" fill="none" />
      <path d="M374 158 Q290 196 200 240" stroke="#5a3b24" strokeWidth="2" opacity="0.35" fill="none" />
      <circle cx="80" cy="190" r="4" fill="#c9a07a" opacity="0.6" />
      <circle cx="300" cy="200" r="5" fill="#a07a58" opacity="0.6" />
      <circle cx="150" cy="226" r="3" fill="#c9a07a" opacity="0.5" />

      {/* Grass lip hanging over the soil, then the top face */}
      <path d="M20 128 L200 216 L380 128 L380 142 Q290 190 200 232 Q110 190 20 142 Z" fill={`url(#${g.lip})`} />
      <path d="M32 122 Q18 128 32 134 L188 210 Q200 216 212 210 L368 134 Q382 128 368 122 L212 46 Q200 40 188 46 Z" fill={`url(#${g.top})`} />
      <path d="M60 126 L200 58 L230 72" stroke="#ffffff" strokeWidth="3" opacity="0.22" fill="none" strokeLinecap="round" />

      {/* Little details: stones and tufts */}
      <ellipse cx="320" cy="132" rx="9" ry="5.5" fill="#d9d4c7" />
      <ellipse cx="318" cy="130" rx="6" ry="3" fill="#f1ede3" />
      <ellipse cx="88" cy="134" rx="6" ry="4" fill="#d9d4c7" />
      <ellipse cx="236" cy="190" rx="7" ry="4" fill="#d9d4c7" />
      <path d="M168 186 l3 -9 l2 9 l3 -7 l1 7" stroke="#5f9a4c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M300 106 l3 -8 l2 8 l3 -6 l1 6" stroke="#5f9a4c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="252" cy="160" r="2.4" fill="#f4c6d8" />
      <circle cx="152" cy="80" r="2.4" fill="#fff2c4" />
      <circle cx="342" cy="150" r="2.2" fill="#ffffff" />

      {placed.map(({ tree, plot: [cx, cy] }) => (
        <TreeIllustration
          key={`${cx}-${cy}`}
          species={tree.species}
          stage={tree.stage}
          x={cx - tw / 2}
          y={cy - th * (139 / 150)}
          width={tw}
          height={th}
        />
      ))}

      {labels &&
        placed.map(({ tree, plot: [cx, cy] }, i) =>
          tree.name ? (
            <g key={`label-${i}`} transform={`translate(${cx}, ${cy + 13})`}>
              <rect x={-tree.name.length * 3.1 - 8} y="-9" width={tree.name.length * 6.2 + 16} height="18" rx="9" fill="#fffdf6" opacity="0.95" />
              <text textAnchor="middle" y="3.5" fontSize="9.5" fontWeight="700" fill="#163d2b" style={{ fontFamily: "var(--font-sans)" }}>
                {tree.name}
              </text>
            </g>
          ) : null,
        )}
    </svg>
  );
}
