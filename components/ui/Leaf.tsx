export function Leaf({ className = "", tone = "green" }: { className?: string; tone?: "green" | "sage" | "gold" }) {
  const fills = {
    green: ["#9ccc7a", "#5d9a4e"],
    sage: ["#cfe3b8", "#93bb83"],
    gold: ["#f6dc8e", "#d9a23e"],
  }[tone];
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M27 4C15 4 6 10 5 25c0 1 1 2 2 2 14-1 20-11 20-23z" fill={fills[0]} />
      <path d="M27 4C22 15 14 21 7 26" stroke={fills[1]} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M17 15l-6-1M21 11l-4-3M13 20l-3 3" stroke={fills[1]} strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
