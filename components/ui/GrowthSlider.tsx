"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { STAGES, stageForDays } from "@/lib/constants";
import { TreeIllustration } from "./TreeIllustration";

const MAX_DAYS = 365;
const CURVE = 2.4;

// The slider is eased so the early stages, which are days apart rather than months, get
// room to be found.
const toDays = (t: number) => Math.round(MAX_DAYS * Math.pow(t / 100, CURVE));
const toPosition = (days: number) => 100 * Math.pow(days / MAX_DAYS, 1 / CURVE);

/** Drag through a year of kept days and watch one tree move through the app's six stages. */
export function GrowthSlider() {
  const [position, setPosition] = useState(toPosition(30));
  const days = toDays(position);
  const stage = stageForDays(days);
  const info = STAGES[stage];

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex min-h-64 flex-1 items-end justify-center sm:min-h-72">
        <div aria-hidden className="absolute bottom-0 left-1/2 h-28 w-64 -translate-x-1/2 rounded-full bg-[#f7efcf] blur-2xl" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            style={{ transformOrigin: "50% 100%" }}
            className="relative"
          >
            <TreeIllustration species="blossom" stage={stage} className="h-64 w-auto sm:h-80" title={`A tree at the ${info.label} stage`} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4" aria-live="polite">
        <p className="font-display text-2xl font-semibold text-forest-deep">
          {info.label}
          <span className="block text-base font-medium text-muted sm:ml-2 sm:inline">{info.line}</span>
        </p>
        <p className="shrink-0 font-display text-lg font-semibold text-gold tabular-nums">
          {days} {days === 1 ? "day" : "days"}
        </p>
      </div>

      <label htmlFor="growth-slider" className="sr-only">
        Days kept
      </label>
      <input
        id="growth-slider"
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-valuetext={`${days} days kept, ${info.label}`}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-mint accent-forest [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-ivory [&::-moz-range-thumb]:bg-forest [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-ivory [&::-webkit-slider-thumb]:bg-forest [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgb(22_61_43/0.4)]"
        style={{ background: `linear-gradient(to right, #83b982 ${position}%, #e8f0de ${position}%)` }}
      />

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Growth stages">
        {STAGES.map((s, i) => (
          <li key={s.label}>
            <button
              type="button"
              onClick={() => setPosition(toPosition(s.days))}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                i === stage ? "bg-forest text-ivory" : i < stage ? "bg-sage/60 text-forest-deep" : "bg-ivory text-muted hover:bg-mint"
              }`}
            >
              {s.label} · {s.days}d
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
