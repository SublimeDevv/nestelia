import { BookOpen, ChevronRight, Star, Library } from "lucide-react";
import type { Category } from "@/pages/core/categories/interfaces/Category";

interface WikiCategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  totalEntries: number;
  isLoading: boolean;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function WikiCategoryList({
  categories,
  selectedCategory,
  totalEntries,
  isLoading,
  onCategoryChange,
}: WikiCategoryListProps) {
  return (
    <div className="sticky top-6">
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Library className="w-5 h-5 text-purple-400" />
          Categorías
        </h2>

        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all mb-2 ${
            selectedCategory === null
              ? "bg-gray-700/70 text-white border-l-4 border-purple-400"
              : "hover:bg-gray-700/50 text-gray-300"
          }`}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 rounded-lg">
            <Star className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold">Todas</div>
            <div className="text-xs opacity-70">
              {totalEntries} entradas
            </div>
          </div>
          {selectedCategory === null && (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        <div className="space-y-2">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            </div>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? "bg-gray-700/70 text-white border-l-4 border-purple-400"
                    : "hover:bg-gray-700/50 text-gray-300"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg overflow-hidden">
                  {category.icon ? (
                    <img
                      src={category.icon}
                      alt={category.displayName}
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm">
                    {category.displayName}
                  </div>
                  <div className="text-xs opacity-70">
                    {category.entriesCount} entradas
                  </div>
                </div>
                {selectedCategory === category.id && (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            ))
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">
              No hay categorías disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

