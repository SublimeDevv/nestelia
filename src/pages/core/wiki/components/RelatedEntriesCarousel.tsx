import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRelatedWikiEntries } from "../services/wikiService";
import { ROUTES } from "@/router/routes.config";
import type { WikiEntry } from "../interfaces/WikiEntry";

interface RelatedEntriesCarouselProps {
  currentEntryId: string;
  categoryId: string;
}

export default function RelatedEntriesCarousel({
  currentEntryId,
  categoryId,
}: RelatedEntriesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["relatedWikiEntries", categoryId, currentEntryId],
    queryFn: () =>
      getRelatedWikiEntries({ categoryId, currentEntryId, limit: 10 }),
    enabled: !!categoryId && !!currentEntryId,
  });

  const entries = data?.data || [];
  const itemsPerPage = 4;
  const totalPages = Math.ceil(entries.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleEntryClick = (entryId: string) => {
    navigate(`${ROUTES.WIKI}/${entryId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return null;
  }

  const visibleEntries = entries.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Entradas relacionadas</h2>
            <p className="text-sm text-gray-400">
              Descubre más contenido de la misma categoría
            </p>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={totalPages <= 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <span className="text-sm text-gray-400">
              {currentIndex + 1} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={totalPages <= 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleEntries.map((entry: WikiEntry, index: number) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleEntryClick(entry.id)}
            className="group cursor-pointer"
          >
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1">
              <div className="relative w-full h-48 bg-gray-900 overflow-hidden flex items-center justify-center">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {entry.category && (
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full border border-purple-500/30">
                      <span className="text-xs text-purple-400 font-semibold">
                        {entry.category.displayName}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-purple-400 font-semibold text-sm mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {entry.title}
                </h3>
                <div
                  className="text-gray-400 text-xs line-clamp-2 prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: entry.description.substring(0, 100),
                  }}
                />
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

