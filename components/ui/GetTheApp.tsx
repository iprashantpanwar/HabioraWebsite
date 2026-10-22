"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { STORE_LINKS, WAITLIST_ENDPOINT, WAITLIST_INPUT_ID } from "@/lib/constants";
import { buttonClasses } from "./Button";

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.39-.92-2.4-3.64zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28z"
      />
    </svg>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4.6 2.3c-.3.3-.4.7-.4 1.2v17c0 .5.1.9.4 1.2l9.5-9.7zM15.3 13.2l2.8 2.9-11.6 6.6c-.5.3-1 .3-1.3.1zm0-2.4L5.2 1.2c.3-.2.8-.2 1.3.1l11.6 6.6zm4 4.6-2.9-1.7-3-3.1 3-3.1 2.9 1.7c1.1.6 1.1 1.7 0 2.4z" />
    </svg>
  );
}

function StoreBadge({ glyph, kicker, store }: { glyph: React.ReactNode; kicker: string; store: string }) {
  return (
    <>
      {glyph}
      <span className="flex flex-col items-start leading-none">
        <span className="text-[0.66rem] font-medium tracking-wide whitespace-nowrap opacity-80">{kicker}</span>
        <span className="mt-1 font-display text-[1.05rem] font-semibold whitespace-nowrap sm:text-[1.15rem]">{store}</span>
      </span>
    </>
  );
}

const badgeBase = "group inline-flex h-14 items-center gap-2.5 rounded-2xl px-4 text-left sm:gap-3 sm:px-5 transition-all duration-300 ease-out";

/**
 * The App Store and Google Play buttons. A store without a listing yet shows as a quiet
 * "Coming soon" badge rather than a link.
 */
export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2.5 sm:gap-3 ${className}`}>
      {STORE_LINKS.appStore ? (
        <a
          href={STORE_LINKS.appStore}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Habiora on the App Store"
          className={`${badgeBase} bg-forest-deep text-ivory shadow-[0_10px_24px_-10px_rgb(22_61_43/0.7)] hover:-translate-y-0.5 hover:bg-forest hover:shadow-[0_16px_30px_-12px_rgb(22_61_43/0.7)]`}
        >
          <StoreBadge glyph={<AppleGlyph className="h-7 w-7" />} kicker="Download on the" store="App Store" />
        </a>
      ) : (
        <ComingSoon glyph={<AppleGlyph className="h-7 w-7" />} store="App Store" />
      )}
      {STORE_LINKS.googlePlay ? (
        <a
          href={STORE_LINKS.googlePlay}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get Habiora on Google Play"
          className={`${badgeBase} bg-forest-deep text-ivory shadow-[0_10px_24px_-10px_rgb(22_61_43/0.7)] hover:-translate-y-0.5 hover:bg-forest`}
        >
          <StoreBadge glyph={<PlayGlyph className="h-6 w-6" />} kicker="Get it on" store="Google Play" />
        </a>
      ) : (
        <ComingSoon glyph={<PlayGlyph className="h-6 w-6" />} store="Google Play" />
      )}
    </div>
  );
}

function ComingSoon({ glyph, store }: { glyph: React.ReactNode; store: string }) {
  return (
    <span
      role="img"
      aria-label={`${store}: coming soon`}
      className={`${badgeBase} cursor-default border border-dashed border-sage bg-ivory/70 text-forest-deep/80 backdrop-blur`}
    >
      <StoreBadge glyph={glyph} kicker="Coming soon to" store={store} />
    </span>
  );
}

type Status = "idle" | "sending" | "done" | "error";

/** Early-access sign-up. Posts {email} as JSON to NEXT_PUBLIC_WAITLIST_ENDPOINT. */
export function WaitlistForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!WAITLIST_ENDPOINT) {
      setStatus("error");
      setMessage("Sign-ups aren't connected yet. Please check back soon.");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("done");
      setMessage("You're on the list. We'll write the day Habiora lands on Android.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("That didn't go through. Please try again in a moment.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className={`inline-flex items-center gap-3 rounded-full bg-mint px-5 py-4 font-semibold text-forest ${className}`}>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-forest text-ivory">
          <Check className="h-4 w-4" aria-hidden />
        </span>
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate={false}>
      <div className="flex flex-col gap-3 rounded-[1.75rem] border border-line bg-ivory p-2 shadow-soft transition-shadow focus-within:border-leaf focus-within:ring-4 focus-within:ring-sage/50 sm:flex-row sm:rounded-full">
        <label htmlFor={WAITLIST_INPUT_ID} className="sr-only">
          Email address
        </label>
        <input
          id={WAITLIST_INPUT_ID}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 min-w-0 flex-1 rounded-full bg-transparent px-5 text-base text-ink placeholder:text-muted/70 focus:outline-none focus-visible:outline-none"
        />
        <button type="submit" disabled={status === "sending"} className={buttonClasses("primary", "md", "h-12 shrink-0 px-6")}>
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Get early access
          {status !== "sending" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
        </button>
      </div>
      <p role="status" aria-live="polite" className={`mt-3 min-h-5 px-5 text-sm ${status === "error" ? "text-[#a3542c]" : "text-muted"}`}>
        {status === "error" ? message : "One email when Habiora lands on Android. Nothing else."}
      </p>
    </form>
  );
}
