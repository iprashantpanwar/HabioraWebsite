/**
 * Rolling hills that close a scene. The front layer is filled with `groundColor`, so the
 * section after it can start in the same colour and the landscape flows on into it.
 */
export function Hills({ className = "", groundColor = "#eef3e2" }: { className?: string; groundColor?: string }) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6e6c5" />
          <stop offset="1" stopColor="#c3dbb0" />
        </linearGradient>
        <linearGradient id="hill-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b3d29b" />
          <stop offset="1" stopColor="#9cc684" />
        </linearGradient>
      </defs>
      <path d="M0 150 C 180 90 320 110 470 140 S 760 70 960 110 S 1300 80 1440 120 V320 H0 Z" fill="url(#hill-far)" opacity="0.8" />
      <path d="M0 210 C 220 150 380 170 560 200 S 900 140 1110 180 S 1360 170 1440 190 V320 H0 Z" fill="url(#hill-mid)" />
      <path d="M0 268 C 260 230 520 250 760 262 S 1180 236 1440 256 V320 H0 Z" fill={groundColor} />
    </svg>
  );
}

/** A clump of round bushes, the soft botanical silhouettes at the edges of the scene. */
export function Bushes({ className = "", tone = "#a9cd93" }: { className?: string; tone?: string }) {
  return (
    <svg viewBox="0 0 300 140" className={className} aria-hidden="true">
      <circle cx="60" cy="100" r="50" fill={tone} opacity="0.8" />
      <circle cx="130" cy="78" r="64" fill={tone} />
      <circle cx="210" cy="96" r="52" fill={tone} opacity="0.9" />
      <circle cx="262" cy="116" r="34" fill={tone} opacity="0.75" />
      <rect x="0" y="118" width="300" height="22" fill={tone} />
    </svg>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 50" className={className} aria-hidden="true">
      <path d="M18 44c-9 0-14-6-14-12s6-12 14-11c2-9 10-15 20-14 6-7 19-8 27 0 10-2 20 5 21 14 10 0 18 6 18 12s-6 11-14 11z" fill="#ffffff" />
    </svg>
  );
}
