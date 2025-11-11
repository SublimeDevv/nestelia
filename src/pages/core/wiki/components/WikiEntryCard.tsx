import { motion } from "motion/react";
import { Clock } from "lucide-react";

interface WikiEntry {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

interface WikiEntryCardProps {
  entry: WikiEntry;
  index: number;
  onClick: (entryId: string) => void;
}

export default function WikiEntryCard({
  entry,
  index,
  onClick,
}: WikiEntryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => onClick(entry.id)}
      className="group cursor-pointer bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-32 md:w-40 h-40 sm:h-full shrink-0 overflow-hidden bg-gray-900/50 p-4 sm:p-6 md:p-[30px] flex items-center justify-center">
          <img
            src={entry.image}
            alt={entry.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Contenido */}
        <div className="flex-1 p-3 sm:p-4 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-purple-400 group-hover:text-purple-300 transition-colors mb-1.5 sm:mb-2 line-clamp-2">
            {entry.title}
          </h3>
          <div
            className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: entry.description,
            }}
          />
          <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(entry.createdAt).toLocaleDateString(
                "es-ES",
                {
                  day: "numeric",
                  month: "short",
                }
              )}
            </span>
            <span className="text-purple-400 font-semibold group-hover:underline">
              Leer más →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

