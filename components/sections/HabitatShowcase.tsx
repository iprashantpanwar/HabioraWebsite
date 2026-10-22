"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalendarPlus, RotateCcw, Sprout } from "lucide-react";
import { Island } from "@/components/ui/Island";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingLeaves } from "@/components/ui/FloatingLeaves";
import { ISLAND_CAPACITY, STAGES, stageForDays, type Species } from "@/lib/constants";

type PlaygroundTree = { name: string; species: Species; days: number };

const START: PlaygroundTree[] = [
  { name: "Running", species: "pine", days: 112 },
  { name: "Reading", species: "blossom", days: 34 },
  { name: "Cycling", species: "amber", days: 8 },
];

const SPECIES: { id: Species; label: string; swatch: string }[] = [
  { id: "pine", label: "Green", swatch: "#82bd69" },
  { id: "blossom", label: "Blossom", swatch: "#f1aac9" },
  { id: "amber", label: "Amber", swatch: "#efb552" },
];

const SUGGESTIONS = ["Meditate", "Journal", "Stretch", "Water", "Walk", "Sleep early", "No phone", "Cook"];

export function HabitatShowcase() {
  const [trees, setTrees] = useState<PlaygroundTree[]>(START);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<Species>("blossom");
  const full = trees.length >= ISLAND_CAPACITY;

  function plant(e: React.FormEvent) {
    e.preventDefault();
    if (full) return;
    const fallback = SUGGESTIONS.find((s) => !trees.some((t) => t.name === s)) ?? "Habit";
    setTrees((ts) => [...ts, { name: name.trim().slice(0, 14) || fallback, species, days: 0 }]);
    setName("");
  }

  const tendWeek = () => setTrees((ts) => ts.map((t) => ({ ...t, days: t.days + 7 })));

  return (
    <section id="habitat" aria-labelledby="habitat-title" className="relative overflow-hidden bg-[radial-gradient(90%_70%_at_50%_10%,#fff8df_0%,#eef3e2_55%,#e3edd4_100%)] py-24 sm:py-32">
      <FloatingLeaves
        leaves={[
          { top: "10%", left: "8%", size: 28, tone: "green", duration: 18, delay: -4, rotate: 20, dx: 120, dy: 160 },
          { top: "18%", left: "88%", size: 36, tone: "sage", duration: 16, delay: -9, rotate: -30, dx: -140, dy: 150 },
          { top: "62%", left: "94%", size: 22, tone: "gold", duration: 14, delay: -2, rotate: 50, dx: -90, dy: 100, opacity: 0.7 },
        ]}
      />
      <div className="container-page relative">
        <SectionHeading
          id="habitat-title"
          eyebrow="Your habitat"
          title="A world that looks like your days."
          description="Every habit is a tree with its name beneath it. Trees share an island — six to each — and when one fills up, the next is waiting beside it. Try planting a few."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal className="relative">
            <div aria-hidden className="absolute inset-x-[12%] bottom-[4%] h-16 rounded-[50%] bg-forest-deep/25 blur-2xl" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
              <Island
                labels
                treeScale={0.82}
                className="relative mx-auto w-full max-w-2xl"
                title={`Your island: ${trees.map((t) => `${t.name}, ${STAGES[stageForDays(t.days)].label}`).join("; ")}`}
                trees={trees.map((t) => ({ species: t.species, stage: stageForDays(t.days), name: t.name }))}
              />
            </motion.div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-[2rem] bg-ivory/90 p-6 shadow-soft backdrop-blur sm:p-8">
            <form onSubmit={plant}>
              <label htmlFor="habit-name" className="font-display text-lg font-semibold text-forest-deep">
                Plant a habit
              </label>
              <input
                id="habit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={14}
                placeholder="e.g. Meditate"
                disabled={full}
                className="mt-3 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-base text-ink placeholder:text-muted/60 focus:border-leaf focus:outline-none disabled:opacity-50"
              />
              <fieldset className="mt-4" disabled={full}>
                <legend className="text-sm font-semibold text-muted">Tree</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SPECIES.map((s) => (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-gold-bright ${
                        species === s.id ? "border-forest bg-forest text-ivory" : "border-line bg-ivory text-forest-deep hover:bg-mint"
                      }`}
                    >
                      <input type="radio" name="species" value={s.id} checked={species === s.id} onChange={() => setSpecies(s.id)} className="sr-only" />
                      <span aria-hidden className="h-3.5 w-3.5 rounded-full ring-2 ring-ivory/70" style={{ background: s.swatch }} />
                      {s.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <button
                type="submit"
                disabled={full}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-forest font-semibold text-ivory transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-sage"
              >
                <Sprout className="h-5 w-5" aria-hidden /> Plant it
              </button>
              <p className="mt-2 min-h-5 text-sm text-muted" aria-live="polite">
                {full ? "This island is full. In the app, your next tree starts a new island." : `${ISLAND_CAPACITY - trees.length} spots left on this island.`}
              </p>
            </form>

            <div className="mt-5 flex gap-2 border-t border-line pt-5">
              <button
                type="button"
                onClick={tendWeek}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-mint px-4 text-sm font-semibold text-forest-deep transition-colors hover:bg-sage/60"
              >
                <CalendarPlus className="h-4 w-4" aria-hidden /> Keep them a week
              </button>
              <button
                type="button"
                onClick={() => setTrees(START)}
                aria-label="Reset island"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-mint hover:text-forest"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <ul className="mt-5 space-y-2 text-sm" aria-label="Trees on this island">
              {trees.map((t, i) => (
                <li key={`${t.name}-${i}`} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-semibold text-forest-deep">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: SPECIES.find((s) => s.id === t.species)?.swatch }} />
                    {t.name}
                  </span>
                  <span className="text-muted tabular-nums">
                    {STAGES[stageForDays(t.days)].label} · {t.days}d
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted/90">
              A preview to play with. In the app, a tree only grows on the days you actually keep its habit.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
