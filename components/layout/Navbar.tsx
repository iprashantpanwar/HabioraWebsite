"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { EARLY_ACCESS_ID, NAV_LINKS, WAITLIST_INPUT_ID } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const CTA_LABEL = "Get Early Access";
const CTA_HREF = `#${EARLY_ACCESS_ID}`;

/**
 * Brings the early-access email field to the middle of the screen and puts the cursor in it,
 * rather than landing on the top of the section with the field somewhere below. `defer`
 * waits a frame, for when the mobile menu still has page scrolling locked.
 */
function goToWaitlist(event: React.MouseEvent<HTMLAnchorElement>, defer = false) {
  const input = document.getElementById(WAITLIST_INPUT_ID);
  if (!input) return; // fall back to the plain #early-access jump
  event.preventDefault();
  const go = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    input.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    input.focus({ preventScroll: true });
    history.replaceState(null, "", CTA_HREF);
  };
  if (defer) setTimeout(go, 60);
  else go();
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: Escape closes it, focus moves into it, and the page
  // underneath doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const close = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-cream/85 shadow-[0_8px_30px_-20px_rgb(32_79_56/0.35)] backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink/80 transition-colors hover:bg-mint hover:text-forest-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href={CTA_HREF} onClick={goToWaitlist}>
              {CTA_LABEL}
            </ButtonLink>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-forest-deep transition-colors hover:bg-mint md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="container-page flex flex-col gap-1 pt-2 pb-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 font-display text-xl font-medium text-forest-deep transition-colors hover:bg-mint"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-3">
                <ButtonLink
                  href={CTA_HREF}
                  size="lg"
                  className="w-full"
                  onClick={(e) => {
                    setOpen(false);
                    goToWaitlist(e, true);
                  }}
                >
                  {CTA_LABEL}
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
