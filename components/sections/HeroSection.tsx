import { ArrowRight, Sprout } from "lucide-react";
import { HAS_STORE_LINKS, PRIMARY_CTA_HREF } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { FloatingLeaves } from "@/components/ui/FloatingLeaves";
import { HeroPhone } from "@/components/ui/HeroPhone";
import { Bushes, Cloud, Hills } from "@/components/ui/Landscape";
import { Reveal } from "@/components/ui/Reveal";
import { TreeIllustration } from "@/components/ui/TreeIllustration";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[radial-gradient(120%_80%_at_70%_20%,#fffbea_0%,#f8f5ea_45%,#f1f2e2_100%)] pt-28 sm:pt-32">
      {/* Sky: the sun, a couple of clouds, and distant hills */}
      <div aria-hidden className="absolute top-[6%] right-[-10%] -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,#fff6d6_0%,#fdf0c4_35%,rgba(253,240,196,0)_70%)] sm:right-[2%] lg:top-[8%] lg:right-[6%]" />
      <div aria-hidden className="absolute top-[18%] right-[12%] -z-10 hidden h-[280px] w-[280px] rounded-full bg-[#fdf3cf] opacity-80 lg:block" />
      <Cloud className="absolute top-[22%] right-[38%] -z-10 hidden w-24 opacity-80 lg:block" />
      <Cloud className="absolute top-[12%] right-[4%] -z-10 w-20 opacity-70" />
      <div className="grain absolute inset-0 -z-10 opacity-60" aria-hidden />

      <FloatingLeaves />

      <div className="container-page relative grid items-center gap-14 pb-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8 lg:pb-24">
        <div className="relative z-10 max-w-[40rem]">
          <Reveal y={16}>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-ivory/70 px-4 py-2 text-[0.72rem] font-bold tracking-[0.18em] text-forest uppercase backdrop-blur">
              <Sprout className="h-4 w-4 text-leaf" aria-hidden />
              Your little world of growth
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-title" className="mt-6 text-[clamp(2.2rem,10.6vw,3.1rem)] leading-[0.98] font-bold sm:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.1rem]">
              Every habit
              <br />
              you keep
              <br />
              <span className="text-amber-gradient whitespace-nowrap">becomes a tree.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
              Build better habits, one small step at a time. Watch your daily efforts grow into a beautiful world that&apos;s uniquely yours.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={PRIMARY_CTA_HREF} size="lg">
              Start Growing
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary" size="lg">
              Explore Habiora
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-muted">
              <span className="h-px w-8 bg-sage" aria-hidden />
              Small steps. Real growth.
              {!HAS_STORE_LINKS && <span className="w-full pl-10 text-muted/80 sm:w-auto sm:pl-0">· Coming soon to iPhone and Android</span>}
            </p>
          </Reveal>
        </div>

        <div className="relative pb-10 lg:pb-0">
          {/* The grassy knoll the phone stands on */}
          <div aria-hidden className="absolute right-[-20%] bottom-[-60px] left-[-20%] h-40 rounded-[50%] bg-[radial-gradient(ellipse_at_top,#a9d08c_0%,#8dbd72_60%,#7aae63_100%)] lg:bottom-[-110px]" />
          <TreeIllustration species="blossom" stage={3} className="absolute bottom-6 left-[2%] w-24 sm:left-[10%] lg:-left-[4%] lg:bottom-0 lg:w-28" />
          <TreeIllustration species="pine" stage={2} className="absolute right-[4%] bottom-8 w-16 sm:right-[12%] lg:-right-[2%] lg:bottom-4 lg:w-20" />
          <div className="relative">
            <div aria-hidden className="absolute -bottom-6 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-forest-deep/35 blur-xl" />
            <HeroPhone />
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none relative -mt-24 h-[170px] sm:-mt-28 sm:h-[220px]">
        <Bushes className="absolute bottom-10 -left-10 w-64 opacity-70 sm:w-80" tone="#b7d6a0" />
        <Bushes className="absolute right-[-40px] bottom-12 w-72 opacity-60 sm:w-96" tone="#a6cb8f" />
        <Hills className="absolute inset-0 h-full w-full" />
      </div>
    </section>
  );
}
