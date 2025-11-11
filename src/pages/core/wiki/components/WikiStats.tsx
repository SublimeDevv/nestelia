import { BarChart3, TrendingUp, Calendar, Layers } from "lucide-react";

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
      year: "numeric",
    });
  };

  const getEntriesThisMonth = () => {
    if (recentEntries.length === 0) return 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return recentEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    }).length;
  };

  const getEntriesThisWeek = () => {
    if (recentEntries.length === 0) return 0;

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return recentEntries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return entryDate >= weekAgo;
    }).length;
  };

  const getAveragePerCategory = () => {
    if (totalCategories === 0) return "0";
    return (totalEntries / totalCategories).toFixed(1);
  };

  return (
    <div className="mt-6 bg-gradient-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-purple-400" />
        Estadísticas de la Wiki
      </h3>
      <div className="space-y-3">
        {/* Total de entradas */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-300">Total de entradas</span>
          </div>
          <span className="text-lg font-bold text-purple-400">
            {isLoadingEntries ? "..." : totalEntries || 0}
          </span>
        </div>

        {/* Categorías */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-gray-300">Categorías</span>
          </div>
          <span className="text-lg font-bold text-violet-400">
            {isLoadingCategories ? "..." : totalCategories}
          </span>
        </div>

        {/* Promedio por categoría */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-gray-300">Promedio/categoría</span>
          </div>
          <span className="text-lg font-bold text-pink-400">
            {isLoadingEntries || isLoadingCategories ? "..." : getAveragePerCategory()}
          </span>
        </div>

        {/* Entradas este mes */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-300">Nuevas este mes</span>
          </div>
          <span className="text-lg font-bold text-blue-400">
            {isLoadingEntries ? "..." : getEntriesThisMonth()}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/20 pt-3 mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Última actualización:</span>
            <span className="font-semibold text-purple-300">
              {isLoadingEntries ? "..." : getLastUpdateDate()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

