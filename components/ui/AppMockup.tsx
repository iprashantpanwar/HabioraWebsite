"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChartColumn, House, Info, Leaf, Plus, UserRound } from "lucide-react";
import { Island, type IslandTree } from "./Island";
import { LogoMark } from "./Logo";

const PERIODS = ["Week", "Month", "Year"] as const;
type Period = (typeof PERIODS)[number];

// Illustrative sample data for the mockup only — not real usage figures.
const GROWTH: Record<Period, { bars: number[]; labels: string[]; summary: string }> = {
  Week: { bars: [3, 4, 2, 5, 4, 5, 3], labels: ["M", "T", "W", "T", "F", "S", "S"], summary: "5 trees · 26 days of growth" },
  Month: { bars: [14, 19, 17, 23], labels: ["W1", "W2", "W3", "W4"], summary: "5 trees · 73 days of growth" },
  Year: { bars: [20, 34, 41, 38, 52, 60, 58, 66, 71, 64, 73, 78], labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], summary: "5 trees · 655 days of growth" },
};

const TREES: IslandTree[] = [
  { species: "pine", stage: 4 },
  { species: "pine", stage: 3 },
  { species: "blossom", stage: 4 },
  { species: "amber", stage: 5 },
  { species: "blossom", stage: 2 },
];

const NAV = [
  { label: "Home", Icon: House },
  { label: "Growth", Icon: ChartColumn },
  { label: "Habits", Icon: Leaf },
  { label: "Profile", Icon: UserRound },
];

/**
 * A phone showing the Habiora app. Built from real markup rather than a screenshot, so it
 * stays crisp at any size; the Week / Month / Year switch actually switches.
 */
export function AppMockup({ className = "" }: { className?: string }) {
  const [period, setPeriod] = useState<Period>("Week");
  const data = GROWTH[period];
  const max = Math.max(...data.bars);

  return (
    <div className={`relative ${className}`}>
      {/* Device frame: a titanium edge, a dark bezel and a faint glass reflection. */}
      <div className="relative rounded-[3.1rem] bg-gradient-to-br from-[#8c9489] via-[#3b433c] to-[#1d231f] p-[3px] shadow-lift">
        <div className="relative rounded-[2.95rem] bg-[#121614] p-[9px]">
          {/* Side buttons */}
          <span aria-hidden className="absolute top-28 -left-[5px] h-12 w-[3px] rounded-l bg-[#4b524c]" />
          <span aria-hidden className="absolute top-44 -left-[5px] h-12 w-[3px] rounded-l bg-[#4b524c]" />
          <span aria-hidden className="absolute top-36 -right-[5px] h-20 w-[3px] rounded-r bg-[#4b524c]" />

          <div className="relative aspect-[9/19.3] overflow-hidden rounded-[2.4rem] bg-gradient-to-b from-[#eef4e4] via-[#f6f6ec] to-[#fbf9f1]">
            {/* Status bar + dynamic island */}
            <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-ink">
              <span>9:41</span>
              <span aria-hidden className="absolute top-2.5 left-1/2 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[#0c0f0d]" />
              <span aria-hidden className="flex items-center gap-1">
                <svg viewBox="0 0 18 12" className="h-2.5 w-4"><path d="M1 11h2V8H1zm4 0h2V6H5zm4 0h2V3H9zm4 0h2V1h-2z" fill="currentColor" /></svg>
                <svg viewBox="0 0 24 12" className="h-2.5 w-5"><rect x="1" y="1" width="19" height="10" rx="3" fill="none" stroke="currentColor" strokeOpacity=".5" /><rect x="3" y="3" width="14" height="6" rx="1.5" fill="currentColor" /></svg>
              </span>
            </div>

            <div className="flex h-[calc(100%-2rem)] flex-col px-4 pt-4">
              <div className="flex items-center gap-2">
                <LogoMark className="h-6 w-6" />
                <span className="font-display text-[1.05rem] font-semibold text-forest-deep">Habiora</span>
              </div>

              <div role="tablist" aria-label="Growth period" className="relative mt-3 grid grid-cols-3 rounded-full bg-[#e3ebd8] p-1">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    role="tab"
                    aria-selected={period === p}
                    onClick={() => setPeriod(p)}
                    className={`relative z-10 rounded-full py-1.5 text-[11px] font-semibold transition-colors ${period === p ? "text-forest-deep" : "text-muted hover:text-forest"}`}
                  >
                    {period === p && (
                      <motion.span
                        layoutId="period-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ivory shadow-[0_2px_6px_rgb(32_79_56/0.15)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {p}
                  </button>
                ))}
              </div>

              <div className="relative -mx-2 mt-1 flex-1">
                <div aria-hidden className="absolute top-[18%] left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#fff3c4] opacity-70 blur-2xl" />
                <Island trees={TREES} treeScale={1.3} className="relative h-full w-full" title="A floating island with five trees at different stages" />
              </div>

              <div className="relative rounded-2xl bg-ivory p-3 shadow-[0_6px_18px_-8px_rgb(32_79_56/0.25)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-[13px] font-semibold text-forest-deep">Forest growth</p>
                    <p className="mt-0.5 text-[10px] text-muted">{data.summary}</p>
                  </div>
                  <Info aria-hidden className="h-3.5 w-3.5 text-muted" />
                </div>
                <div className="mt-2.5 flex h-14 items-end gap-[5px] pr-12" aria-label={`${period} growth chart`} role="img">
                  {data.bars.map((v, i) => (
                    <div key={`${period}-${i}`} className="flex flex-1 flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(v / max) * 40}px` }}
                        transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full rounded-[4px] bg-gradient-to-t from-[#8fc078] to-[#c3e0a5]"
                      />
                      <span className="text-[7.5px] font-semibold text-muted/80">{data.labels[i]}</span>
                    </div>
                  ))}
                </div>
                <span
                  aria-hidden
                  className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-forest text-ivory shadow-[0_8px_16px_-6px_rgb(22_61_43/0.7)]"
                >
                  <Plus className="h-5 w-5" strokeWidth={2.5} />
                </span>
              </div>

              <nav aria-label="App tabs (preview)" className="-mx-4 mt-3 flex items-center justify-around border-t border-line/70 bg-ivory/90 px-2 pt-2 pb-5">
                {NAV.map(({ label, Icon }, i) => (
                  <span key={label} className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold ${i === 0 ? "text-forest" : "text-muted/80"}`}>
                    <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={i === 0 ? 2.4 : 1.8} />
                    {label}
                  </span>
                ))}
              </nav>
            </div>

            {/* Glass reflection */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[2.4rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.12)_100%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
