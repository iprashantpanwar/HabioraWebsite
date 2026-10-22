import Link from "next/link";

/** The app icon: a floating island of trees under a morning sun. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    // A plain <img>: the site is a static export, so there is no image optimiser to go through.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.png" alt="" width={160} height={160} className={`rounded-[24%] object-cover ${className}`} aria-hidden="true" />
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
