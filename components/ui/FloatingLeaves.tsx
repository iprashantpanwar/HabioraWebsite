import { Leaf } from "./Leaf";

type LeafSpec = {
  top: string;
  left: string;
  size: number;
  tone: "green" | "sage" | "gold";
  duration: number;
  delay: number;
  rotate: number;
  dx: number;
  dy: number;
  opacity?: number;
  blur?: boolean;
};

const DEFAULT_LEAVES: LeafSpec[] = [
  { top: "12%", left: "58%", size: 34, tone: "green", duration: 15, delay: -2, rotate: -20, dx: -120, dy: 140 },
  { top: "8%", left: "90%", size: 44, tone: "green", duration: 18, delay: -9, rotate: 30, dx: -160, dy: 180 },
  { top: "40%", left: "96%", size: 30, tone: "sage", duration: 14, delay: -4, rotate: 60, dx: -110, dy: 120 },
  { top: "58%", left: "52%", size: 22, tone: "sage", duration: 16, delay: -11, rotate: -40, dx: -90, dy: 90, opacity: 0.7 },
  { top: "22%", left: "74%", size: 18, tone: "gold", duration: 13, delay: -6, rotate: 10, dx: -70, dy: 110, opacity: 0.8 },
  { top: "70%", left: "88%", size: 52, tone: "green", duration: 20, delay: -14, rotate: 15, dx: -140, dy: 80, blur: true, opacity: 0.6 },
  { top: "30%", left: "6%", size: 20, tone: "sage", duration: 17, delay: -3, rotate: -70, dx: 80, dy: 120, opacity: 0.55 },
];

/** Leaves drifting across a scene. Purely decorative, and still when motion is reduced. */
export function FloatingLeaves({ leaves = DEFAULT_LEAVES, className = "" }: { leaves?: LeafSpec[]; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className={`leaf-drift absolute block animate-drift ${leaf.blur ? "blur-[2px]" : ""}`}
          style={
            {
              top: leaf.top,
              left: leaf.left,
              width: leaf.size,
              height: leaf.size,
              animationDelay: `${leaf.delay}s`,
              "--drift-duration": `${leaf.duration}s`,
              "--leaf-rotate": `${leaf.rotate}deg`,
              "--leaf-dx": `${leaf.dx}px`,
              "--leaf-dy": `${leaf.dy}px`,
              "--leaf-dx-mid": `${leaf.dx * 0.45}px`,
              "--leaf-dy-mid": `${leaf.dy * 0.55}px`,
              "--leaf-opacity": leaf.opacity ?? 0.9,
            } as React.CSSProperties
          }
        >
          <Leaf tone={leaf.tone} className="h-full w-full drop-shadow-[0_6px_8px_rgb(32_79_56/0.15)]" />
        </span>
      ))}
    </div>
  );
}
