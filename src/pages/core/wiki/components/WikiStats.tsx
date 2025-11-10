import { BarChart3 } from "lucide-react";

interface WikiEntry {
  createdAt: string;
}

interface WikiStatsProps {
  totalEntries: number;
  totalCategories: number;
  recentEntries: WikiEntry[];
  isLoadingEntries: boolean;
  isLoadingCategories: boolean;
}

export default function WikiStats({
  totalEntries,
  totalCategories,
  recentEntries,
  isLoadingEntries,
  isLoadingCategories,
}: WikiStatsProps) {
  const getLastUpdateDate = () => {
    if (recentEntries.length === 0) return "N/A";

    const dates = recentEntries.map((e) => new Date(e.createdAt).getTime());
    const maxDate = Math.max(...dates);

    return new Date(maxDate).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="mt-6 bg-linear-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-purple-400" />
        Estadísticas de la Wiki
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-300">
          <span>Total de entradas:</span>
          <span className="font-bold text-purple-400">
            {isLoadingEntries ? "..." : totalEntries || 0}
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Categorías:</span>
          <span className="font-bold text-purple-400">
            {isLoadingCategories ? "..." : totalCategories}
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Última actualización:</span>
          <span className="font-bold text-purple-400">
            {isLoadingEntries ? "..." : getLastUpdateDate()}
          </span>
        </div>
      </div>
    </div>
  );
}

