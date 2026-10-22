import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HabitatShowcase } from "@/components/sections/HabitatShowcase";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { PlansSection } from "@/components/sections/PlansSection";
import { FAQS, SITE, STORE_LINKS } from "@/lib/constants";

// Structured data describes the app and its FAQ only — no ratings or review counts,
// because there are none yet.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    description: SITE.description,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    downloadUrl: STORE_LINKS.appStore ?? undefined,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <PhilosophySection />
        <HowItWorksSection />
        <FeaturesSection />
        <HabitatShowcase />
        <PlansSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
