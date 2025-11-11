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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                Juega ahora
              </motion.button>
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
                <span className="text-gray-600 hidden sm:inline">•</span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 sm:gap-1.5 group cursor-default"
                  title="macOS"
                >
                  <svg
                    className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                    macOS
                  </span>
                </motion.div>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 sm:gap-1.5 group cursor-default"
                  title="Linux"
                >
                  <svg
                    className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.069c-.104.055-.251.102-.481.102-.12 0-.237-.027-.332-.078a.81.81 0 01-.257-.249.974.974 0 01-.102-.182c-.033-.098-.045-.188-.051-.27 0-.073-.001-.13.01-.194l.005-.028c.01-.066.022-.122.036-.184.023-.11.05-.223.09-.325.06-.15.131-.287.221-.398.085-.104.19-.182.315-.249.118-.062.252-.096.394-.096zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064c-.13 0-.23.07-.325.167-.142.145-.21.361-.21.545 0 .053.004.135.011.199.007.058.018.133.035.2.07.27.205.462.410.596.113.074.259.11.428.133.062.008.125.012.185.015h.01c.146.003.31-.010.465-.046.18-.043.35-.116.496-.236.04-.04.081-.09.117-.14.037-.051.068-.094.092-.134l.002-.003c.05-.083.094-.162.13-.239l.004-.013c.02-.047.04-.097.058-.147.01-.024.018-.05.027-.075l.002-.006c.015-.042.03-.085.043-.124.032-.099.056-.226.07-.335.01-.08.013-.152.013-.228v-.015c0-.267-.055-.57-.187-.852-.139-.3-.347-.594-.633-.79-.29-.197-.633-.288-.95-.288zm4.985.355c.03.003.057.008.086.02.026.01.05.027.073.045.046.036.09.08.119.13.027.05.05.105.063.16.013.057.02.11.02.16v.003c0 .177-.06.339-.202.468-.064.056-.14.101-.228.139-.085.035-.182.063-.264.067-.02.001-.037.003-.055.003-.068 0-.14-.012-.209-.042-.072-.034-.139-.08-.188-.139-.05-.06-.088-.127-.114-.2-.025-.074-.038-.15-.038-.235v-.003c0-.105.03-.213.09-.317.059-.104.142-.195.249-.268.102-.069.22-.104.335-.104.034 0 .068.003.102.009.03.004.058.013.087.023zm-6.222.016c.082.002.166.017.25.05.085.035.162.084.217.139.056.054.095.115.126.183.03.067.044.133.044.197 0 .115-.045.229-.127.326-.082.097-.203.177-.354.244-.147.066-.324.102-.539.102-.078-.001-.155-.007-.231-.020-.075-.011-.149-.027-.221-.05-.071-.021-.14-.052-.204-.09-.063-.035-.117-.08-.156-.13-.04-.05-.065-.104-.065-.165 0-.132.06-.254.178-.353.117-.099.282-.177.480-.236.197-.059.42-.089.602-.089zm6.964 2.997c.001.003.003.006.004.009.003.006.007.013.01.02.004.007.008.014.012.022.004.008.007.015.01.023l.002.004c.004.009.007.018.01.027.003.009.006.018.008.027.003.009.005.018.007.027.002.009.004.018.005.027.001.009.002.018.003.027 0 .009.001.018.001.027 0 .009 0 .018-.001.027-.001.009-.002.018-.003.027-.002.009-.003.018-.005.027-.002.009-.004.018-.007.027-.003.009-.005.018-.008.027-.003.009-.006.018-.01.027l-.002.004c-.003.008-.006.015-.01.023-.004.008-.008.015-.012.022-.004.007-.007.014-.01.02-.003.003-.005.006-.007.009l-.002.003c-.035.055-.08.106-.13.152-.05.045-.105.084-.166.117-.059.032-.125.058-.19.078-.065.02-.13.034-.195.043-.066.01-.13.013-.195.013-.095 0-.19-.013-.283-.039-.094-.027-.183-.066-.267-.114-.083-.048-.16-.105-.23-.171-.068-.065-.13-.138-.18-.218-.051-.08-.092-.165-.122-.254-.031-.089-.048-.182-.048-.278 0-.157.045-.315.135-.457.09-.142.218-.268.378-.368.159-.099.344-.171.537-.211.192-.04.392-.049.584-.024.096.012.19.033.283.062.092.029.182.066.267.109.084.043.163.094.235.15.071.056.136.118.192.185.055.067.102.138.139.213.037.075.063.153.078.233.015.08.02.162.02.244 0 .122-.02.245-.06.363-.04.118-.098.231-.174.337-.076.106-.171.201-.283.282-.111.08-.24.144-.382.189-.141.045-.296.068-.459.068-.163 0-.325-.023-.484-.068-.159-.045-.312-.111-.452-.196-.14-.085-.267-.19-.377-.313-.11-.123-.201-.265-.268-.421-.067-.156-.101-.327-.101-.509 0-.182.034-.365.101-.544.067-.179.167-.35.295-.507.128-.157.285-.295.467-.41.182-.115.391-.205.619-.268.228-.063.477-.095.741-.095.264 0 .527.032.782.095.255.063.499.153.726.268.227.115.437.253.623.41.186.157.347.328.478.507.131.179.234.365.308.544.074.179.111.362.111.544 0 .182-.037.365-.111.544-.074.179-.177.35-.308.507-.131.157-.292.295-.478.41-.186.115-.396.205-.623.268-.227.063-.471.095-.726.095-.255 0-.527-.032-.782-.095-.255-.063-.499-.153-.726-.268-.227-.115-.437-.253-.623-.41-.186-.157-.347-.328-.478-.507-.131-.179-.234-.365-.308-.544-.074-.179-.111-.362-.111-.544 0-.182.037-.365.111-.544.074-.179.177-.35.308-.507.131-.157.292-.295.478-.41.186-.115.396-.205.623-.268.227-.063.471-.095.726-.095.255 0 .527.032.782.095.255.063.499.153.726.268.227.115.437.253.623.41.186.157.347.328.478.507.131.179.234.365.308.544.074.179.111.362.111.544z" />
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                    Linux
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
