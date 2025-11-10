import { Link } from "react-router-dom";
import {
  MessageSquare,
  BarChart3,
  Users,
  TrendingUp,
  FileText,
  Newspaper,
  FolderTree,
  BookOpen,
  Sparkles,
  Clock,
} from "lucide-react";
import { useAuth } from "@/stores/authStore";
import { useDashboardData } from "./hooks/useDashboardData";
import { ROUTES } from "@/router/routes.config";
import bannerWiki from "@/assets/banner_wiki.webp";
import bannerChatbot from "@/assets/banner_chatbot.webp";
import bannerDashboard from "@/assets/banner_dashboard.webp";
import favicon from "@/assets/favicon.webp";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useDashboardData();

  const dashboardData = data?.data;
  const loading = isLoading;
  const errorMessage = isError
    ? (error as any)?.message || "Error al cargar los datos del dashboard"
    : null;

  const stats = [
    {
      title: "Categorías",
      value: loading ? "..." : (dashboardData?.totalCategories ?? 0).toString(),
      icon: FolderTree,
      gradient: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-500/10",
      iconBg: "bg-linear-to-br from-blue-500 to-cyan-500",
      description: "Total de categorías",
    },
    {
      title: "Entradas Wiki",
      value: loading ? "..." : (dashboardData?.totalEntries ?? 0).toString(),
      icon: BookOpen,
      gradient: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-500/10",
      iconBg: "bg-linear-to-br from-green-500 to-emerald-500",
      description: "Artículos publicados",
    },
    {
      title: "Posts de Blog",
      value: loading ? "..." : (dashboardData?.totalPosts ?? 0).toString(),
      icon: FileText,
      gradient: "from-purple-500 to-pink-500",
      bgGlow: "bg-purple-500/10",
      iconBg: "bg-linear-to-br from-purple-500 to-pink-500",
      description: "Posts creados",
    },
    {
      title: "Noticias",
      value: loading ? "..." : (dashboardData?.totalNews ?? 0).toString(),
      icon: Newspaper,
      gradient: "from-orange-500 to-red-500",
      bgGlow: "bg-orange-500/10",
      iconBg: "bg-linear-to-br from-orange-500 to-red-500",
      description: "Noticias publicadas",
    },
    {
      title: "Usuarios",
      value: loading ? "..." : (dashboardData?.totalUsers ?? 0).toString(),
      icon: Users,
      gradient: "from-pink-500 to-rose-500",
      bgGlow: "bg-pink-500/10",
      iconBg: "bg-linear-to-br from-pink-500 to-rose-500",
      description: "Usuarios registrados",
    },
    {
      title: "Roles",
      value: loading ? "..." : (dashboardData?.totalRoles ?? 0).toString(),
      icon: BarChart3,
      gradient: "from-indigo-500 to-purple-500",
      bgGlow: "bg-indigo-500/10",
      iconBg: "bg-linear-to-br from-indigo-500 to-purple-500",
      description: "Roles disponibles",
    },
  ];

  const quickActions = [
    {
      title: "Ir al Chatbot",
      description: "Inicia una conversación con el asistente",
      icon: MessageSquare,
      link: ROUTES.CHATBOT,
      color: "bg-blue-600 hover:bg-blue-700",
      backgroundImage: bannerChatbot,
    },
    {
      title: "Wiki",
      description: "Explora nuestra enciclopedia de conocimiento",
      icon: BookOpen,
      link: ROUTES.WIKI,
      color: "bg-purple-600 hover:bg-purple-700",
      backgroundImage: bannerWiki,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in px-4 sm:px-0">
      <div className="relative mb-4 sm:mb-6 lg:mb-8 overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-purple-900/30 via-gray-900/50 to-blue-900/30 border border-purple-500/20 p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
        <div className="absolute inset-0 opacity-20 sm:opacity-30">
          <img
            src={bannerDashboard}
            alt="Dashboard Banner"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-transparent to-blue-500/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-4 mb-3">
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <img src={favicon} alt="Nestelia" className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent truncate">
                Bienvenido, {user?.userName || user?.email}!
              </h1>
              <p className="text-gray-400 mt-1 flex items-center gap-2 text-xs sm:text-sm">
                <Clock size={12} className="sm:hidden" />
                <Clock size={14} className="hidden sm:block" />
                <span className="hidden sm:inline">
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="sm:hidden">
                  {new Date().toLocaleDateString("es-ES", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>

          <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
            Este es tu panel de control. Aquí podrás gestionar todas tus
            actividades.
          </p>

          {dashboardData?.modelName && (
            <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/20 border border-purple-500/30">
              <Sparkles size={14} className="text-purple-400 sm:w-4 sm:h-4" />
              <span className="text-gray-300 text-xs sm:text-sm">
                Modelo de IA:{" "}
                <span className="text-purple-300 font-semibold">
                  {dashboardData.modelName}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="bg-linear-to-r from-red-900/30 to-red-800/30 border border-red-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 backdrop-blur-sm animate-slide-in-down">
          <p className="text-red-300 font-medium text-sm sm:text-base">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-gray-700 transition-all duration-300 md:hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            <div
              className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
            />

            <div className="relative z-10 flex items-center gap-3 sm:gap-4">
              <div
                className={`${stat.iconBg} p-2 sm:p-3 rounded-lg shadow-lg transform md:group-hover:scale-110 md:group-hover:rotate-3 transition-all duration-300 shrink-0`}
              >
                <stat.icon className="text-white" size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
              </div>

              <div
                className={`absolute -bottom-2 -right-2 w-20 h-20 bg-linear-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <TrendingUp className="text-purple-400" size={20} />
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`group relative ${action.color} rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all transform md:hover:scale-105 hover:shadow-2xl overflow-hidden`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Background Image - Clash Royale Style */}
              {action.backgroundImage && (
                <div className="absolute inset-0 opacity-40 sm:opacity-50 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none">
                  <img
                    src={action.backgroundImage}
                    alt={action.title}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-black/60" />
                </div>
              )}

              <div className="relative flex items-start space-x-3 sm:space-x-5 z-10">
                <div className="bg-white/20 p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 md:group-hover:rotate-6 md:group-hover:scale-110 shrink-0">
                  <action.icon className="text-white" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 md:group-hover:translate-x-1 transition-transform duration-300">
                    {action.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 z-10 text-lg sm:text-xl">
                →
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="group">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <FolderTree className="text-blue-400" size={20} />
            Categorías Recientes
          </h2>
          <div className="bg-linear-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-blue-500/30 transition-all duration-300">
            {loading ? (
              <div className="text-center py-8 sm:py-12">
                <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-400"></div>
                <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">Cargando...</p>
              </div>
            ) : dashboardData?.listCategories &&
              dashboardData.listCategories.length > 0 ? (
              <ul className="space-y-2 sm:space-y-3">
                {dashboardData.listCategories
                  .slice(0, 5)
                  .map((category, index) => (
                    <li
                      key={category.categoryId || index}
                      className="group/item flex items-center justify-between p-3 sm:p-4 bg-gray-800/30 rounded-lg sm:rounded-xl hover:bg-linear-to-r hover:from-blue-900/20 hover:to-cyan-900/20 hover:border-blue-500/30 border border-transparent transition-all duration-300 md:hover:scale-105"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 md:group-hover/item:scale-110 transition-transform duration-300 shrink-0">
                          <FolderTree className="text-white" size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold group-hover/item:text-blue-300 transition-colors text-sm sm:text-base truncate">
                            {category.categoryName}
                          </p>
                        </div>
                      </div>
                      {category.entriesCount !== undefined && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold whitespace-nowrap ml-2 shrink-0">
                          <span className="hidden sm:inline">
                            {category.entriesCount}{" "}
                            {category.entriesCount === 1 ? "entrada" : "entradas"}
                          </span>
                          <span className="sm:hidden">
                            {category.entriesCount}
                          </span>
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-800/50 mb-3 sm:mb-4">
                  <FolderTree className="text-gray-600" size={24} />
                </div>
                <p className="text-gray-400 text-sm sm:text-base">No hay categorías disponibles.</p>
              </div>
            )}
          </div>
        </div>

        <div className="group">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <BookOpen className="text-green-400" size={20} />
            Entradas Recientes
          </h2>
          <div className="bg-linear-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-green-500/30 transition-all duration-300">
            {loading ? (
              <div className="text-center py-8 sm:py-12">
                <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-400"></div>
                <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">Cargando...</p>
              </div>
            ) : dashboardData?.listEntries &&
              dashboardData.listEntries.length > 0 ? (
              <ul className="space-y-2 sm:space-y-3">
                {dashboardData.listEntries.slice(0, 5).map((entry, index) => (
                  <li
                    key={entry.id || index}
                    className="group/item flex items-center justify-between p-3 sm:p-4 bg-gray-800/30 rounded-lg sm:rounded-xl hover:bg-linear-to-r hover:from-green-900/20 hover:to-emerald-900/20 hover:border-green-500/30 border border-transparent transition-all duration-300 md:hover:scale-105"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 md:group-hover/item:scale-110 transition-transform duration-300 shrink-0">
                        <BookOpen className="text-white" size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold group-hover/item:text-green-300 transition-colors truncate text-sm sm:text-base">
                          {entry.title}
                        </p>
                        {entry.categoryName && (
                          <p className="text-gray-400 text-xs sm:text-sm mt-1 truncate">
                            {entry.categoryName}
                          </p>
                        )}
                      </div>
                    </div>
                    {entry.createdAt && (
                      <span className="text-gray-500 text-xs ml-2 sm:ml-4 shrink-0">
                        {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-800/50 mb-3 sm:mb-4">
                  <BookOpen className="text-gray-600" size={24} />
                </div>
                <p className="text-gray-400 text-sm sm:text-base">No hay entradas disponibles.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
