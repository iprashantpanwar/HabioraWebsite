import { Check } from "lucide-react";
import { FREE_TREE_LIMIT, STORE_LINKS } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreeIllustration } from "@/components/ui/TreeIllustration";

// Mirrors the comparison on the app's own paywall (PaywallScreen.kt). Prices are left to
// the store, which shows them in the visitor's own currency.
const SHARED = ["Streaks, milestones and growth charts", "Every tree species, icon and category", "Rest a tree and bring it back"];

export function PlansSection() {
  return (
    <section id="plans" aria-labelledby="plans-title" className="bg-cream py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="plans-title"
          eyebrow="Plans"
          title="Free to grow. Premium to grow it all."
          description="Start with a forest of your own at no cost. Go Premium when you'd like room for every habit."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col rounded-[2rem] border border-line bg-ivory p-8 sm:p-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Habiora Free</h3>
                <p className="mt-1 text-muted">Everything you need to begin.</p>
              </div>
              <TreeIllustration stage={2} className="-mt-4 h-20 w-auto" />
            </div>
            <p className="mt-6 font-display text-4xl font-semibold text-forest-deep">Free</p>
            <ul className="mt-8 space-y-3.5">
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden />
                <span>
                  Up to <strong className="font-semibold text-forest-deep">{FREE_TREE_LIMIT} trees</strong> growing at once
                </span>
              </li>
              {SHARED.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              {STORE_LINKS.appStore ? (
                <ButtonLink href={STORE_LINKS.appStore} external variant="secondary" size="lg" className="w-full">
                  Start growing on iPhone
                </ButtonLink>
              ) : (
                <ButtonLink href="#early-access" variant="secondary" size="lg" className="w-full">
                  Start growing
                </ButtonLink>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative flex flex-col overflow-hidden rounded-[2rem] bg-forest p-8 text-ivory shadow-lift sm:p-10">
            <div aria-hidden className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-gold-bright/30 blur-3xl" />
            <div className="relative flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-ivory">Habiora Premium</h3>
                <p className="mt-1 text-ivory/70">Grow the whole forest.</p>
              </div>
              <TreeIllustration stage={5} species="blossom" className="-mt-6 h-24 w-auto" />
            </div>
            <p className="relative mt-6 font-display text-4xl font-semibold text-gold-bright">Unlimited trees</p>
            <ul className="relative mt-8 space-y-3.5">
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-bright" aria-hidden />
                <span>
                  <strong className="font-semibold text-ivory">As many trees as you plant</strong>
                </span>
              </li>
              {SHARED.map((item) => (
                <li key={item} className="flex gap-3 text-ivory/85">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-bright" aria-hidden />
                  {item}
                </li>
              ))}
              <li className="flex gap-3 text-ivory/85">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-bright" aria-hidden />
                Helps keep Habiora growing
              </li>
            </ul>
            <p className="relative mt-auto pt-10 text-sm leading-relaxed text-ivory/70">
              Monthly, yearly, or one payment for life. Prices are shown in the app, in your own currency.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
