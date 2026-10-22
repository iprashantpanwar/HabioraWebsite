import { Reveal } from "@/components/ui/Reveal";
import { TreeIllustration } from "@/components/ui/TreeIllustration";
import type { StageIndex } from "@/lib/constants";

const STAGES: { title: string; body: string; stage: StageIndex; size: string }[] = [
  { title: "Plant the seed", body: "Name one small thing you want more of in your days.", stage: 0, size: "h-36" },
  { title: "Nurture the habit", body: "Each day you show up, it grows a little.", stage: 3, size: "h-48" },
  { title: "Grow your forest", body: "Over time, small days become something that lasts.", stage: 5, size: "h-60" },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="relative overflow-hidden bg-[#eef3e2] pt-10 pb-28 sm:pb-36">
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 id="philosophy-title" className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.5rem]">
              Growth takes time.
              <br />
              <span className="text-amber-gradient">That&apos;s the beautiful part.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-lg leading-relaxed text-muted sm:text-xl">
              Some days you grow a little. Some days you grow a lot. Every time you show up for yourself, you&apos;re building something that lasts.
            </p>
          </Reveal>
        </div>

        {/* Three trees on one gentle meadow, from seed to forest */}
        <div className="relative mt-14 sm:mt-20">
          <svg aria-hidden viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-x-[-4%] top-[150px] hidden h-28 w-[108%] md:block">
            <path d="M0 90 C 260 60 420 70 600 64 S 980 40 1200 30 V120 H0 Z" fill="#e1ebd1" />
          </svg>

          <ol className="relative grid gap-14 md:grid-cols-3 md:gap-8">
            {STAGES.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12} className="flex flex-col items-center text-center">
                <div className="flex h-44 items-end justify-center md:h-60">
                  <TreeIllustration stage={s.stage} species={i === 2 ? "blossom" : "pine"} className={`${s.size} w-auto drop-shadow-[0_18px_18px_rgb(32_79_56/0.18)]`} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ivory font-display text-sm font-semibold text-forest shadow-soft">{i + 1}</span>
                  <h3 className="text-2xl font-semibold">{s.title}</h3>
                </div>
                <p className="mt-2 max-w-xs text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mx-auto mt-20 max-w-2xl text-center">
          <p className="font-display text-2xl leading-snug text-forest sm:text-[1.7rem]">
            Consistency matters more than perfection. A tree doesn&apos;t mind a quiet day — it remembers every day you came back.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
