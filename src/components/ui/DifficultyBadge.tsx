import type { DifficultyLevel } from "@/types";

type DifficultyBadgeProps = {
  level: DifficultyLevel;
  label?: string;
  className?: string;
};

const difficultyLabels: Record<DifficultyLevel, string> = {
  1: "Facil",
  2: "Medio",
  3: "Dificil",
  4: "Extremo",
  5: "Imposible",
};

const difficultyClasses: Record<DifficultyLevel, string> = {
  1: "border-emerald-300/40 bg-emerald-400/10 text-emerald-100",
  2: "border-cyan-300/40 bg-cyan-400/10 text-cyan-100",
  3: "border-amber-300/40 bg-amber-400/10 text-amber-100",
  4: "border-rose-300/45 bg-rose-400/10 text-rose-100",
  5: "border-violet-300/45 bg-violet-400/15 text-violet-100",
};

export function DifficultyBadge({
  level,
  label,
  className,
}: DifficultyBadgeProps) {
  const classes = [
    "inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-bold uppercase tracking-[0.08em]",
    difficultyClasses[level],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{label ?? difficultyLabels[level]}</span>;
}
