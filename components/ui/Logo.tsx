import Link from "next/link";

/** The sprout mark: two leaves rising from warm soil under a morning sun. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbeaa8" />
          <stop offset="0.55" stopColor="#c9e29a" />
          <stop offset="1" stopColor="#8fc077" />
        </linearGradient>
        <linearGradient id="logo-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9b6c45" />
          <stop offset="1" stopColor="#6e4a2e" />
        </linearGradient>
        <linearGradient id="logo-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8ed06a" />
          <stop offset="1" stopColor="#3f8a3c" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#logo-sky)" />
      <circle cx="20" cy="13" r="6" fill="#fff6cf" opacity="0.85" />
      <path d="M0 29c6-4 13-5 20-5s14 1 20 5v0a0 0 0 0 1 0 0v-0 11H0z" fill="url(#logo-soil)" />
      <path d="M0 29c6-4 13-5 20-5s14 1 20 5v11H0z" fill="url(#logo-soil)" />
      <path d="M20 27v-8" stroke="#3f7a3a" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 21c-1-4.5-4.6-6.6-9-6 .2 4.3 3.8 7 9 6z" fill="url(#logo-leaf)" />
      <path d="M20 19.5c.8-5 4.6-7.5 9.4-7-.2 4.8-4 7.8-9.4 7z" fill="url(#logo-leaf)" />
    </svg>
  );
}

export function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 rounded-xl ${className}`} aria-label="Habiora home">
      <LogoMark className="h-9 w-9 drop-shadow-[0_4px_10px_rgb(32_79_56/0.18)]" />
      <span className={`font-display text-[1.6rem] leading-none font-semibold tracking-tight ${tone === "light" ? "text-ivory" : "text-forest-deep"}`}>Habiora</span>
    </Link>
  );
}
