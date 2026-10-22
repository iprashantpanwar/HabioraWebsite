import { EARLY_ACCESS_ID } from "@/lib/constants";
import { FloatingLeaves } from "@/components/ui/FloatingLeaves";
import { StoreButtons, WaitlistForm } from "@/components/ui/GetTheApp";
import { Island } from "@/components/ui/Island";
import { Bushes, Hills } from "@/components/ui/Landscape";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTASection() {
  return (
    <section
      id={EARLY_ACCESS_ID}
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(80%_70%_at_50%_0%,#fff6d6_0%,#f6f3e3_50%,#eef3e2_100%)] pt-24 sm:pt-32"
    >
      <div aria-hidden className="absolute top-10 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fff1c2_0%,rgba(255,241,194,0)_70%)]" />
      <FloatingLeaves
        leaves={[
          { top: "14%", left: "12%", size: 30, tone: "green", duration: 17, delay: -5, rotate: 10, dx: 110, dy: 150 },
          { top: "20%", left: "84%", size: 40, tone: "green", duration: 19, delay: -12, rotate: -20, dx: -150, dy: 170 },
          { top: "50%", left: "6%", size: 20, tone: "gold", duration: 13, delay: -3, rotate: 40, dx: 80, dy: 90, opacity: 0.7 },
        ]}
      />

      <div className="container-page relative text-center">
        <Reveal>
          <h2 id="cta-title" className="mx-auto max-w-3xl text-[2.8rem] leading-[1.02] font-bold sm:text-6xl lg:text-7xl">
            Plant your first tree.
            <br />
            <span className="text-amber-gradient">Watch what grows.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Habiora is free to download on iPhone. Your little world is one small step away.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-10 flex justify-center">
          <StoreButtons className="justify-center" />
        </Reveal>

        <Reveal delay={0.24} className="mx-auto mt-14 max-w-xl rounded-[2rem] border border-line bg-ivory/70 p-6 text-left shadow-soft backdrop-blur sm:p-8">
          <h3 className="text-2xl font-semibold">On Android? Get early access.</h3>
          <p className="mt-2 text-muted">Habiora is coming to Google Play. Leave your email and we&apos;ll tell you the day it lands.</p>
          <WaitlistForm className="mt-5" />
        </Reveal>
      </div>

      <div className="relative mt-10 h-[300px] sm:h-[380px]">
        <Bushes className="absolute bottom-16 -left-12 w-72 opacity-80" tone="#b7d6a0" />
        <Bushes className="absolute right-[-50px] bottom-20 w-80 opacity-70" tone="#a6cb8f" />
        <Hills className="absolute inset-x-0 bottom-0 h-[200px] w-full" groundColor="#163d2b" />
        <Island
          className="absolute bottom-16 left-1/2 w-[min(88vw,440px)] -translate-x-1/2 animate-float drop-shadow-[0_30px_30px_rgb(22_61_43/0.25)]"
          trees={[
            { species: "pine", stage: 5 },
            { species: "blossom", stage: 4 },
            { species: "amber", stage: 4 },
            { species: "pine", stage: 3 },
            { species: "blossom", stage: 2 },
            { species: "amber", stage: 1 },
          ]}
        />
      </div>
    </section>
  );
}
