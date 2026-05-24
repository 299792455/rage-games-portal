import type { RageLevel as RageLevelValue } from "@/types";

type RageLevelProps = {
  level: RageLevelValue;
  label?: string;
  className?: string;
};

const rageLabels: Record<RageLevelValue, string> = {
  1: "Rage bajo",
  2: "Rage medio",
  3: "Rage alto",
  4: "Rage brutal",
  5: "Rage imposible",
};

const rageValues: Record<RageLevelValue, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

export function RageLevel({ level, label, className }: RageLevelProps) {
  const activeBars = rageValues[level];
  const classes = ["inline-flex items-center gap-2", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-label={label ?? rageLabels[level]}>
      <span className="text-xs font-semibold text-slate-300">
        {label ?? rageLabels[level]}
      </span>
      <span className="inline-flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((bar) => (
          <span
            className={[
              "h-2 w-5 rounded-full border border-white/10",
              bar <= activeBars
                ? "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.5)]"
                : "bg-white/10",
            ]
              .filter(Boolean)
              .join(" ")}
            key={bar}
          />
        ))}
      </span>
    </span>
  );
}
