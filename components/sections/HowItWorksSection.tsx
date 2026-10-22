import { Island } from "@/components/ui/Island";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreeIllustration } from "@/components/ui/TreeIllustration";

const STEPS = [
  {
    title: "Plant a habit",
    body: "Choose the small actions you want to bring into your everyday life — something to build, or something to let go of.",
    visual: (
      <TreeIllustration stage={0} className="h-48 w-auto" />
    ),
  },
  {
    title: "Show up each day",
    body: "Check in as you complete your habits and build a rhythm that works for you — every day, or a few times a week.",
    visual: (
      <div className="flex items-end gap-1">
        <TreeIllustration stage={1} className="h-40 w-auto" />
        <TreeIllustration stage={2} className="h-52 w-auto" />
      </div>
    ),
  },
  {
    title: "Watch your habitat grow",
    body: "See your consistency come to life as your personal landscape flourishes.",
    visual: (
      <Island
        className="h-56 w-auto"
        trees={[
          { species: "pine", stage: 3 },
          { species: "blossom", stage: 3 },
          { species: "amber", stage: 4 },
          { species: "pine", stage: 2 },
        ]}
      />
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative bg-cream py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="how-title" eyebrow="How it works" title="Little steps. A living world." />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-8 lg:mt-20">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.12} className="relative">
              <div className="flex h-full flex-col items-center rounded-[2rem] px-6 pt-4 pb-8 text-center">
                <div className="relative flex h-60 w-full items-end justify-center">
                  <div aria-hidden className="absolute bottom-2 left-1/2 h-28 w-64 -translate-x-1/2 rounded-full bg-[#e6eed6] blur-2xl" />
                  <div className="relative">{step.visual}</div>
                </div>
                <span className="mt-8 font-display text-sm font-semibold tracking-[0.16em] text-gold uppercase">Step {i + 1}</span>
                <h3 className="mt-2 text-[1.75rem] font-semibold">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
