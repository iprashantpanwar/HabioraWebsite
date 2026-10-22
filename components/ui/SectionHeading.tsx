import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", id, className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-forest/70 uppercase ${centered ? "justify-center" : ""}`}>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-bright" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-[3.4rem]">
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}
