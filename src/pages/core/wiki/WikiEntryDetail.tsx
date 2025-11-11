import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Sparkles,
} from "lucide-react";
import { getWikiEntryById } from "./services/wikiService";
import { useToast } from "@/stores/toastStore";
import { ROUTES } from "@/router/routes.config";
import { useWikiEntryPrecache } from "@/hooks/useWikiPrecache";
import RelatedEntriesCarousel from "./components/RelatedEntriesCarousel";

export default function WikiEntryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["wikiEntry", id],
    queryFn: () => getWikiEntryById(id!),
    enabled: !!id,
  });

  useWikiEntryPrecache(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Cargando entrada...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    toast.error("Error al cargar la entrada de la wiki");
    navigate(ROUTES.WIKI);
    return null;
  }

  const entry = data.data;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 pt-20 pb-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(ROUTES.WIKI)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver</span>
        </motion.button>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 space-y-4"
            >
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-contain"
                />
                {entry.category && (
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-purple-500/30">
                      {entry.category.icon && (
                        <img
                          src={entry.category.icon}
                          alt={entry.category.displayName}
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      <span className="text-xs text-purple-400 font-semibold">
                        {entry.category.displayName}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {entry.category && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-linear-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    {entry.category.icon && (
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <img
                          src={entry.category.icon}
                          alt={entry.category.displayName}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Tag className="w-3 h-3 text-purple-400" />
                        <h3 className="text-xs font-semibold text-gray-400">
                          Categoría
                        </h3>
                      </div>
                      <h4 className="text-sm font-semibold text-purple-400 mb-1 truncate">
                        {entry.category.displayName}
                      </h4>
                      <p className="text-xs text-gray-300 line-clamp-3">
                        {entry.category.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Publicado</p>
                    <p className="text-sm text-white font-medium">
                      {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Estado</p>
                    <p className="text-sm text-white font-medium">
                      {entry.isDeleted ? "Inactivo" : "Activo"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full">
                <h1 className="text-3xl font-bold text-purple-400 mb-3">
                  {entry.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-700">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div 
                  className="prose prose-invert prose-sm max-w-none overflow-y-auto"
                  style={{ maxHeight: "calc(100vh - 300px)" }}
                  dangerouslySetInnerHTML={{ __html: entry.description }}
                />
              </div>
            </motion.div>
          </div>

          {entry.categoryId && (
            <RelatedEntriesCarousel
              currentEntryId={entry.id}
              categoryId={entry.categoryId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

