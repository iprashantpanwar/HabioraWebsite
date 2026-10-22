import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-ivory shadow-[0_10px_24px_-10px_rgb(22_61_43/0.65)] hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-[0_16px_30px_-12px_rgb(22_61_43/0.7)] active:translate-y-0",
  secondary:
    "border border-line bg-ivory/80 text-forest-deep shadow-soft backdrop-blur hover:-translate-y-0.5 hover:border-sage hover:bg-ivory active:translate-y-0",
  ghost: "text-forest hover:bg-mint",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({ href, children, variant, size, className = "", external, ...rest }: ButtonLinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses(variant, size, className)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}
