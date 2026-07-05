import { Card } from "@/components/ui";

type LocalScorePanelProps = {
  gameSlug: string;
};

export function LocalScorePanel({ gameSlug }: LocalScorePanelProps) {
  void gameSlug;

  return (
    <Card className="p-6" variant="glass">
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
          Progreso local
        </p>
        <h2 className="text-3xl font-black text-white">
          Resultados, tiempo e intentos locales
        </h2>
        <p className="text-sm leading-6 text-slate-400">
          Por ahora, estos datos se guardan solo en este navegador. En una
          próxima actualización, el sistema evolucionará con cuentas, progreso
          automático, logros y rankings globales.
        </p>
      </div>
    </Card>
  );
}
