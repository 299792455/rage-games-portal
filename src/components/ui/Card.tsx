import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "glass" | "panel" | "flat";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  glass: "surface-glass",
  panel: "surface-panel",
  flat: "border border-white/10 bg-slate-950/40",
};

export function Card({
  children,
  className,
  variant = "glass",
  ...props
}: CardProps) {
  const classes = [
    "rounded-[var(--radius-lg)]",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

