import { Plus } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-[linear-gradient(180deg,#f8f5ea_0%,#eef3e2_100%)] py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          align="left"
          title="Questions, gently answered."
          description="Anything else on your mind? We'd love to hear it once Habiora is in your hands."
        />

        <Reveal>
          <ul className="divide-y divide-line rounded-[2rem] border border-line bg-ivory px-6 sm:px-8">
            {FAQS.map((item) => (
              <li key={item.q}>
                <details className="group py-2 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-4 font-display text-lg font-semibold text-forest-deep sm:text-xl">
                    {item.q}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mint text-forest transition-transform duration-300 group-open:rotate-45">
                      <Plus className="h-5 w-5" aria-hidden />
                    </span>
                  </summary>
                  <p className="pr-12 pb-5 leading-relaxed text-muted">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
