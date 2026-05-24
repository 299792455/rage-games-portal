"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-cyan-300/40 bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.28)] hover:bg-cyan-200",
  secondary:
    "border-violet-300/35 bg-violet-400/15 text-violet-100 hover:bg-violet-400/25",
  ghost:
    "border-white/10 bg-white/5 text-slate-100 hover:border-cyan-300/35 hover:bg-cyan-300/10",
  danger:
    "border-rose-400/40 bg-rose-500/20 text-rose-100 hover:bg-rose-500/30",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border font-semibold transition focus-ring disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}

