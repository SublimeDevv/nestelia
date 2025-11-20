import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Newspaper,
} from "lucide-react";
import { getNewsById } from "./services/newsService";
import { useToast } from "@/stores/toastStore";

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewsById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    toast.error("Error al cargar la noticia");
    navigate(-1);
    return null;
  }

  const news = data.data;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 pt-20 pb-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver</span>
        </motion.button>

        <article className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
          >
            {news.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-700"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span className="text-sm">Por <span className="text-purple-400 font-medium">{news.authorName}</span></span>
            </div>

            <span className="text-gray-600">•</span>

            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {new Date(news.publishedAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <span className="text-gray-600">•</span>

            <div className="flex items-center gap-2 bg-purple-500/10 px-2 py-1 rounded">
              <Newspaper className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs text-purple-400 font-medium">
                Noticia
              </span>
            </div>
          </motion.div>

          {news.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 p-4 bg-gray-800/60 border-l-4 border-purple-500 rounded"
            >
              <p className="text-gray-300 text-base leading-relaxed italic">
                {news.description}
              </p>
            </motion.div>
          )}

          {/* Contenido del artículo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div
              className="prose prose-invert max-w-none
                prose-headings:text-white prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-6
                prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-purple-400 prose-a:underline hover:prose-a:text-purple-300
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-purple-300 prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:p-4
                prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:text-gray-400 prose-blockquote:italic
                prose-ul:text-gray-300 prose-ul:my-4 prose-ol:text-gray-300 prose-ol:my-4
                prose-li:mb-2
                prose-img:rounded prose-img:my-6"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </motion.div>

          {/* Separador final */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 pt-6 border-t border-gray-700"
          >
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>Publicado el {new Date(news.publishedAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}</span>
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
}

