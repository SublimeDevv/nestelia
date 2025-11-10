import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import { getPostById } from "./services/blogService";
import { useToast } from "@/stores/toastStore";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Cargando publicación...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    toast.error("Error al cargar la publicación");
    navigate(-1);
    return null;
  }

  const post = data.data;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 pt-20 pb-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(-1)}
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
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x300?text=Sin+Imagen";
                  }}
                />
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-purple-500/30">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-purple-400 font-semibold">
                      Blog
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Autor</p>
                    <p className="text-sm text-white font-medium">
                      {post.authorName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Publicado</p>
                    <p className="text-sm text-white font-medium">
                      {new Date(post.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
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
                  {post.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-700">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {post.description && (
                  <div className="mb-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                )}

                <div 
                  className="prose prose-invert prose-sm max-w-none overflow-y-auto"
                  style={{ maxHeight: "calc(100vh - 300px)" }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

