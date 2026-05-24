import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type CategoryChipProps = {
  children: ReactNode;
  active?: boolean;
  className?: string;
  href?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> &
  Omit<HTMLAttributes<HTMLSpanElement>, "className" | "children">;

export function CategoryChip({
  children,
  active = false,
  className,
  href,
  ...props
}: CategoryChipProps) {
  const classes = [
    "inline-flex min-h-9 items-center justify-center rounded-full border px-4 text-sm font-semibold transition focus-ring",
    active
      ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
      : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-300/40 hover:bg-violet-400/10 hover:text-white",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

