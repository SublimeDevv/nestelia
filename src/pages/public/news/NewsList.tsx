import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Newspaper, Calendar, User } from "lucide-react";
import { getNews } from "@/pages/core/news/services/newsService";
import type { News } from "@/pages/core/news/interfaces/News";
import { ROUTES } from "@/router/routes.config";

export default function PublicNewsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["publicNews", page],
    queryFn: () =>
      getNews({
        page,
        size: pageSize,
      }),
    placeholderData: (previousData) => previousData,
  });

  const handleNewsClick = useCallback((newsId: string) => {
    navigate(ROUTES.NEWS_DETAIL.replace(":id", newsId));
  }, [navigate]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Error al cargar noticias</p>
        </div>
      </div>
    );
  }

  const newsList = data?.data || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="text-purple-400" size={40} />
            <h1 className="text-4xl font-bold text-white">Noticias</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Mantente informado con las últimas novedades
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {newsList.map((news: News, index: number) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleNewsClick(news.id)}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.coverImageUrl}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x300?text=Sin+Imagen";
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {news.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {news.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{news.authorName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{formatDate(news.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {newsList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No hay noticias disponibles</p>
          </div>
        )}

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <span className="text-gray-400">
              Página {page} de {data.pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setPage((p) => Math.min(data?.pagination?.totalPages || 0, p + 1))
              }
              disabled={page >= data.pagination.totalPages}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

