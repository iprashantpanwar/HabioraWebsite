import { Check } from "lucide-react";
import { GrowthSlider } from "@/components/ui/GrowthSlider";
import { Island } from "@/components/ui/Island";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreeIllustration } from "@/components/ui/TreeIllustration";

// Illustrative week for the visual, not real data.
const WEEK = [
  { day: "Mon", value: 3 },
  { day: "Tue", value: 4 },
  { day: "Wed", value: 5 },
  { day: "Thu", value: 2 },
  { day: "Fri", value: 4 },
  { day: "Sat", value: 3 },
  { day: "Sun", value: 4 },
];

// A fortnight with a couple of quiet days in it.
const DAYS = [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1];

function FeatureText({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div>
      <span className="font-display text-sm font-semibold text-gold">{index}</span>
      <h3 className="mt-2 text-[1.75rem] leading-tight font-semibold sm:text-3xl">{title}</h3>
      <p className="mt-3 max-w-md leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function FeaturesSection() {
  const peak = Math.max(...WEEK.map((d) => d.value));

  return (
    <section id="features" aria-labelledby="features-title" className="relative bg-[linear-gradient(180deg,#f8f5ea_0%,#f2f4e6_100%)] py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          align="left"
          title={
            <>
              A gentler way to <span className="text-amber-gradient">build consistency.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12">
          {/* 1 — Habits that grow: the big, interactive one */}
          <Reveal className="relative overflow-hidden rounded-[2.25rem] bg-ivory p-7 shadow-soft sm:p-10 lg:col-span-7 lg:row-span-2">
            <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-soft/50 blur-3xl" />
            <div className="relative grid h-full gap-8 lg:grid-rows-[auto_1fr]">
              <FeatureText index="01" title="Habits that grow." body="Turn everyday actions into something you can see, nurture, and feel proud of. Drag through a year and watch one tree grow." />
              <GrowthSlider />
            </div>
          </Reveal>

          {/* 2 — Progress you can feel */}
          <Reveal delay={0.08} className="rounded-[2.25rem] bg-mint p-7 sm:p-9 lg:col-span-5">
            <FeatureText index="02" title="Progress you can feel." body="Look beyond checkboxes and celebrate the small steps that add up over time." />
            <div className="mt-8 rounded-3xl bg-ivory/80 p-5" role="img" aria-label="An example week of growth, strongest on Wednesday">
              <div className="flex h-32 items-end gap-2.5">
                {WEEK.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-xl ${d.value === peak ? "bg-gradient-to-t from-[#d9a23e] to-gold-bright" : "bg-gradient-to-t from-[#9cc684] to-[#cfe5b9]"}`}
                      style={{ height: `${(d.value / peak) * 96}px` }}
                    />
                    <span className="text-[11px] font-semibold text-muted">{d.day}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                You tend your forest most on <span className="font-semibold text-forest-deep">Wednesdays</span>.
              </p>
            </div>
          </Reveal>

          {/* 3 — Your own little forest */}
          <Reveal delay={0.12} className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(160deg,#fdf6dc_0%,#eef3e2_100%)] p-7 sm:p-9 lg:col-span-5">
            <FeatureText index="03" title="Your own little forest." body="Create a personal habitat that reflects the habits you're nurturing — a green tree, a blossom, an autumn amber." />
            <Island
              className="mx-auto mt-4 w-full max-w-sm drop-shadow-[0_24px_24px_rgb(32_79_56/0.18)]"
              title="An island with green, blossom and amber trees"
              trees={[
                { species: "pine", stage: 4 },
                { species: "blossom", stage: 3 },
                { species: "amber", stage: 4 },
                { species: "blossom", stage: 5 },
                { species: "pine", stage: 2 },
                { species: "amber", stage: 1 },
              ]}
            />
          </Reveal>

          {/* 4 — Consistency without the pressure */}
          <Reveal delay={0.08} className="relative overflow-hidden rounded-[2.25rem] bg-forest p-7 text-ivory sm:p-10 lg:col-span-12">
            <div aria-hidden className="absolute -bottom-32 left-1/3 h-72 w-[40rem] rounded-full bg-leaf/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <span className="font-display text-sm font-semibold text-gold-bright">04</span>
                <h3 className="mt-2 text-[1.75rem] leading-tight font-semibold text-ivory sm:text-3xl">Consistency without the pressure.</h3>
                <p className="mt-3 max-w-md leading-relaxed text-ivory/75">
                  Build routines at your own pace. Missing a day doesn&apos;t erase the effort you&apos;ve already made — a tree grows with every day you keep, and never shrinks back.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full max-w-sm">
                  <p className="text-sm font-semibold text-ivory/70">Two weeks</p>
                  <ul className="mt-3 grid grid-cols-7 gap-2" aria-label="Fourteen days, eleven kept and three quiet">
                    {DAYS.map((kept, i) => (
                      <li
                        key={i}
                        className={`grid aspect-square place-items-center rounded-xl text-[11px] font-bold ${kept ? "bg-leaf text-forest-deep" : "border border-dashed border-ivory/30 text-ivory/40"}`}
                      >
                        {kept ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> : null}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-ivory/75">
                    3 quiet days. <span className="font-semibold text-gold-bright">11 days of growth kept.</span>
                  </p>
                </div>
                <div className="relative shrink-0">
                  <div aria-hidden className="absolute bottom-0 left-1/2 h-16 w-40 -translate-x-1/2 rounded-full bg-gold-bright/25 blur-2xl" />
                  <TreeIllustration species="amber" stage={2} className="relative h-48 w-auto" title="A sapling, still growing" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
