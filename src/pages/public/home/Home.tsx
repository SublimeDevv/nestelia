import Particles from "@/components/Particles";
import { motion } from "motion/react";
import { Newspaper, Gamepad2, Swords, Map, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNews } from "@/pages/core/news/services/newsService";
import type { News } from "@/pages/core/news/interfaces/News";

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const gameFeatures = [
    { icon: Map, label: "Género", value: "Metroidvania" },
    { icon: Gamepad2, label: "Motor", value: "Unity" },
    { icon: Swords, label: "Tipo", value: "Plataformero" },
    { icon: Sparkles, label: "Estilo", value: "Pixel Art" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoadingNews(true);
        const response = await getNews({ page: 1, size: 3 });
        if (response.data) {
          setNews(response.data);
        }
      } catch (error) {
        console.error("Error al cargar las noticias:", error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-11-27T00:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-linear-to-b from-gray-900 via-black to-gray-900 relative min-h-screen overflow-clip">
      <div className="size-full fixed inset-0 z-0">
        <Particles
          particleColors={["#9333ea", "#a855f7", "#c084fc"]}
          particleCount={200}
          particleSpread={20}
          speed={0.15}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={true}
          particleHoverFactor={0.3}
          cameraDistance={35}
        />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-linear-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-full">
              <span className="text-purple-400 font-semibold text-sm tracking-wider">
                Versión 0.5.1
              </span>
            </div>

            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Embárcate en una aventura épica de pixel art en el mundo de
              Nestelia
            </p>

            <div className="flex flex-col gap-4 justify-center items-center mb-12">
              <div className="text-center">
                <motion.a
                  href="https://alonsoroano.itch.io/nestelia"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Descargar
                </motion.a>
              </div>
            </div>

            <div className="flex flex-col sm:inline-flex sm:flex-row items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md border border-gray-700 rounded-lg px-4 sm:px-5 py-2.5">
              <span className="text-gray-400 text-xs sm:text-sm">Disponible para:</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 sm:gap-1.5 group cursor-default"
                  title="Windows"
                >
                  <svg
                    className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                    Windows
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gameFeatures.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 md:p-6 text-center hover:border-purple-500/50 transition-all"
              >
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-purple-400" />
                <div className="text-sm md:text-2xl font-bold text-white mb-1">
                  {feature.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400">{feature.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Últimas noticias
            </h2>
            <p className="text-gray-400 text-lg">
              Mantente al día con las últimas actualizaciones y eventos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {isLoadingNews ? (
              [1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-700/50" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-700/50 rounded mb-2 w-1/3" />
                    <div className="h-6 bg-gray-700/50 rounded mb-2" />
                    <div className="h-4 bg-gray-700/50 rounded w-full" />
                    <div className="h-4 bg-gray-700/50 rounded w-2/3 mt-2" />
                  </div>
                </div>
              ))
            ) : news.length > 0 ? (
              news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => navigate(`/news/${item.id}`)}
                  className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer group"
                >
                  <div className="h-48 bg-linear-to-br from-purple-600/20 to-violet-600/20 flex items-center justify-center overflow-hidden">
                    {item.coverImageUrl ? (
                      <img
                        src={item.coverImageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Newspaper className="w-24 h-24 text-purple-400" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-purple-400 text-sm font-semibold mb-2">
                      {new Date(item.publishedAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {item.description}
                    </p>
                    {item.authorName && (
                      <div className="mt-3 text-xs text-gray-500">
                        Por {item.authorName}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No hay noticias disponibles</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
