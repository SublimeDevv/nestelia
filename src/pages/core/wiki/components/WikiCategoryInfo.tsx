import { motion } from "motion/react";
import type { Category } from "@/pages/core/categories/interfaces/Category";

interface WikiCategoryInfoProps {
  category: Category;
  onClearCategory: () => void;
}

export default function WikiCategoryInfo({
  category,
  onClearCategory,
}: WikiCategoryInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 bg-linear-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6"
    >
      <div className="flex items-start gap-4">
        {category.icon && (
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <img
              src={category.icon}
              alt={category.displayName}
              className="w-10 h-10 object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-white">
              {category.displayName}
            </h2>
            <button
              onClick={onClearCategory}
              className="ml-auto text-gray-400 hover:text-white transition-colors text-sm"
            >
              Ver todas →
            </button>
          </div>
          <p className="text-gray-300 leading-relaxed mb-3">
            {category.description}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-purple-400 font-semibold">
              {category.entriesCount} entradas disponibles
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">
              Categoría: {category.name}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

