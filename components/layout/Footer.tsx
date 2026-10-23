import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-ivory/80">
      <div className="container-page flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 leading-relaxed">A mindful habit tracker where every small step becomes a tree.</p>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-semibold tracking-wide text-ivory">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-3 text-[0.95rem]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rounded transition-colors hover:text-gold-bright">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#plans" className="rounded transition-colors hover:text-gold-bright">
                Plans
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Habiora. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* A standalone page in public/, served as-is rather than through the app. */}
            <a href="/privacy-policy.html" className="rounded transition-colors hover:text-gold-bright">
              Privacy Policy
            </a>
            <p>Small steps. Real growth.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
