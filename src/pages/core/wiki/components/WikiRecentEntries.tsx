import { TrendingUp } from "lucide-react";

interface WikiEntry {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}

interface WikiRecentEntriesProps {
  entries: WikiEntry[];
  isLoading: boolean;
  onEntryClick: (entryId: string) => void;
}

export default function WikiRecentEntries({
  entries,
  isLoading,
  onEntryClick,
}: WikiRecentEntriesProps) {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        Entradas Recientes
      </h2>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          </div>
        ) : (
          entries.slice(0, 5).map((entry) => (
            <div
              key={entry.id}
              onClick={() => onEntryClick(entry.id)}
              className="rounded-lg hover:bg-gray-700/30 transition-all cursor-pointer group overflow-hidden"
            >
              <div className="flex items-center gap-3 p-3">
                <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-lg bg-gray-900/50 flex items-center justify-center">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-purple-400 font-medium group-hover:text-purple-300 transition-colors line-clamp-2">
                    {entry.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

