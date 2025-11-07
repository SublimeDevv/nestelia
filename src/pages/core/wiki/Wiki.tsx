import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  BookOpen,
  TrendingUp,
  Clock,
  ChevronRight,
  Book,
  Sparkles,
  Library,
  FolderOpen,
  Star,
  RefreshCw,
  Flame,
  BarChart3,
} from "lucide-react";
import type { Category, WikiEntry, NewsItem } from "./interfaces";
import buboWiki from "@/assets/bubo_wiki.webp";

export default function Wiki() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories: Category[] = [
    {
      id: 1,
      name: "Guías de Inicio",
      iconUrl: "https://img.icons8.com/fluency/96/rocket.png",
      articleCount: 12,
    },
    {
      id: 2,
      name: "Construcción",
      iconUrl: "https://img.icons8.com/fluency/96/brick-wall.png",
      articleCount: 24,
    },
    {
      id: 3,
      name: "Combate",
      iconUrl: "https://img.icons8.com/fluency/96/sword.png",
      articleCount: 18,
    },
    {
      id: 4,
      name: "Economía",
      iconUrl: "https://img.icons8.com/fluency/96/cash-in-hand.png",
      articleCount: 15,
    },
    {
      id: 5,
      name: "Exploración",
      iconUrl: "https://img.icons8.com/fluency/96/compass.png",
      articleCount: 20,
    },
    {
      id: 6,
      name: "Misiones",
      iconUrl: "https://img.icons8.com/fluency/96/quest.png",
      articleCount: 30,
    },
  ];

  const wikiEntries: WikiEntry[] = [
    {
      id: 1,
      title: "Cómo empezar en Nestelia",
      description:
        "Una guía completa para nuevos jugadores sobre los primeros pasos en el servidor.",
      categoryId: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop",
      lastUpdated: "2024-11-01",
    },
    {
      id: 2,
      title: "Tutorial de construcción básica",
      description:
        "Aprende los fundamentos de la construcción con este tutorial paso a paso.",
      categoryId: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=250&fit=crop",
      lastUpdated: "2024-11-05",
    },
    {
      id: 3,
      title: "Técnicas avanzadas de PvP",
      description:
        "Domina el combate jugador contra jugador con estas técnicas profesionales.",
      categoryId: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=250&fit=crop",
      lastUpdated: "2024-10-28",
    },
    {
      id: 4,
      title: "Guía del sistema de comercio",
      description:
        "Todo lo que necesitas saber sobre el comercio y la economía del servidor.",
      categoryId: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=400&h=250&fit=crop",
      lastUpdated: "2024-11-02",
    },
    {
      id: 5,
      title: "Mapa de tesoros ocultos",
      description:
        "Descubre la ubicación de todos los tesoros secretos en el mapa principal.",
      categoryId: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      lastUpdated: "2024-11-03",
    },
    {
      id: 6,
      title: "Misión principal: El Origen",
      description:
        "Walkthrough completo de la primera misión principal del servidor.",
      categoryId: 6,
      imageUrl:
        "https://images.unsplash.com/photo-1534996858221-380b92700493?w=400&h=250&fit=crop",
      lastUpdated: "2024-11-04",
    },
  ];

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Nueva sección de encantamientos agregada",
      date: "Hace 2 horas",
      type: "new",
    },
    {
      id: 2,
      title: "Actualización de guías de combate",
      date: "Hace 5 horas",
      type: "update",
    },
    {
      id: 3,
      title: "Guía de construcción más vista",
      date: "Hoy",
      type: "popular",
    },
    {
      id: 4,
      title: "Nuevas estrategias de economía",
      date: "Ayer",
      type: "new",
    },
    {
      id: 5,
      title: "Mapas actualizados con nuevas zonas",
      date: "Hace 2 días",
      type: "update",
    },
  ];

  const filteredEntries = wikiEntries.filter((entry) => {
    const matchesCategory =
      selectedCategory === null || entry.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getNewsIcon = (type: NewsItem["type"]) => {
    switch (type) {
      case "new":
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "update":
        return <RefreshCw className="w-5 h-5 text-blue-400" />;
      case "popular":
        return <Flame className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 pt-24 pb-6">
        {/* Hero Section con Bubo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 overflow-hidden rounded-2xl bg-linear-to-r from-purple-900/40 via-violet-900/30 to-indigo-900/40 border border-purple-500/30"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

          <div className="relative flex flex-col md:flex-row gap-4 md:gap-3 p-6 md:p-8 items-center">
            {/* Columna de imagen - Bubo (IZQUIERDA) */}
            <div className="relative flex items-center justify-center md:justify-start shrink-0">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Glow effect detrás de Bubo */}
                <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full"></div>

                {/* Imagen de Bubo */}
                <motion.img
                  src={buboWiki}
                  alt="Bubo - Bibliotecario de Nestelia"
                  className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Decoraciones flotantes */}
                <motion.div
                  className="absolute top-10 -left-6"
                  animate={{
                    rotate: [0, 15, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Book className="w-10 h-10 text-purple-400" />
                </motion.div>
                <motion.div
                  className="absolute bottom-20 -right-4"
                  animate={{
                    rotate: [0, -15, 0],
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </motion.div>
              </motion.div>
            </div>

            {/* Columna de texto (DERECHA) */}
            <div className="flex flex-col justify-center space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <BookOpen className="w-12 h-12 text-purple-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Wiki de Nestelia
                </h1>
              </div>

              <div className="space-y-3">
                <p className="text-xl text-gray-200 font-medium">
                  ¡Bienvenido a la Gran Biblioteca!
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Soy{" "}
                  <span className="text-purple-400 font-semibold">bubin</span>,
                  el bibliotecario guardián de todo el conocimiento de Nestelia.
                  Aquí encontrarás guías, tutoriales y secretos que te ayudarán
                  en tu aventura.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/20">
                    <Library className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-400">Artículos</p>
                      <p className="text-lg font-bold text-white">
                        {wikiEntries.length}+
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/20">
                    <FolderOpen className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-400">Categorías</p>
                      <p className="text-lg font-bold text-white">
                        {categories.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/20">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-400">Actualizado</p>
                      <p className="text-lg font-bold text-white">Hoy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6">
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Library className="w-5 h-5 text-purple-400" />
                  Categorías
                </h2>

                {/* Botón "Todas" */}
                <button
                  onClick={() => setSelectedCategory(null)}
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
                      {wikiEntries.length} artículos
                    </div>
                  </div>
                  {selectedCategory === null && (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>

                {/* Lista de categorías */}
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? "bg-gray-700/70 text-white border-l-4 border-purple-400"
                          : "hover:bg-gray-700/50 text-gray-300"
                      }`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg overflow-hidden">
                        <img
                          src={category.iconUrl}
                          alt={category.name}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-sm">
                          {category.name}
                        </div>
                        <div className="text-xs opacity-70">
                          {category.articleCount} artículos
                        </div>
                      </div>
                      {selectedCategory === category.id && (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna Central - Contenido Principal */}
          <div className="col-span-12 lg:col-span-6">
            {/* Buscador */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar en la wiki..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Indicador de filtro activo */}
            {selectedCategory && (
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
                <span>Mostrando artículos de:</span>
                <span className="text-purple-400 font-semibold">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
              </div>
            )}

            {/* Grid de entradas de wiki */}
            <div className="space-y-4">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-20 bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-xl">
                  <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">
                    No se encontraron artículos
                  </h3>
                  <p className="text-gray-500">
                    Intenta con otra búsqueda o categoría
                  </p>
                </div>
              ) : (
                filteredEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group cursor-pointer bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                  >
                    <div className="flex">
                      {/* Imagen */}
                      <div className="relative w-48 h-32 shrink-0 overflow-hidden">
                        <img
                          src={entry.imageUrl}
                          alt={entry.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-transparent to-gray-900/80"></div>
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 p-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
                          {entry.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {entry.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(entry.lastUpdated).toLocaleDateString(
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
                ))
              )}
            </div>
          </div>

          {/* Columna Derecha - Novedades */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6">
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Últimas Novedades
                </h2>

                <div className="space-y-3">
                  {newsItems.map((news) => (
                    <div
                      key={news.id}
                      className="p-3 rounded-lg hover:bg-gray-700/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <div className="shrink-0 mt-0.5">
                          {getNewsIcon(news.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium group-hover:text-purple-400 transition-colors line-clamp-2">
                            {news.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {news.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2 text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Ver todas las novedades →
                </button>
              </div>

              {/* Widget adicional - Estadísticas */}
              <div className="mt-6 bg-linear-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  Estadísticas de la Wiki
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Total de artículos:</span>
                    <span className="font-bold text-purple-400">
                      {wikiEntries.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Categorías:</span>
                    <span className="font-bold text-purple-400">
                      {categories.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Última actualización:</span>
                    <span className="font-bold text-purple-400">Hoy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
