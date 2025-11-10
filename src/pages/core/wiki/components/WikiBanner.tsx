import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Book, Sparkles, Library, FolderOpen } from "lucide-react";
import buboWiki from "@/assets/bubo_wiki.webp";
import logoNestelia from "@/assets/logo_nestelia.webp";
import swamp from "@/assets/Swamp.webp";
import familia from "@/assets/Familia.webp";
import bannerWiki from "@/assets/banner_wiki.webp";


interface WikiBannerProps {
  totalEntries: number;
  totalCategories: number;
  isLoadingEntries: boolean;
  isLoadingCategories: boolean;
}

const backgroundImages = [swamp, familia, bannerWiki];

export default function WikiBanner({
  totalEntries,
  totalCategories,
  isLoadingEntries,
  isLoadingCategories,
}: WikiBannerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-8 overflow-hidden rounded-2xl border border-purple-500/30"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-linear-to-r from-purple-900/80 via-violet-900/70 to-indigo-900/80"></div>
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="relative flex flex-col md:flex-row gap-4 md:gap-3 p-6 md:p-8 items-center">
        <div className="relative flex items-center justify-center md:justify-start shrink-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full"></div>

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

        <div className="flex flex-col justify-center space-y-4 flex-1">
          <div className="flex items-center gap-3">
            <BookOpen className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-2">
              Wiki de{" "}
              <img 
                src={logoNestelia} 
                alt="N" 
                className="inline-block h-16 md:h-20 w-auto"
              />
              
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
                  <p className="text-xs text-gray-400">Entradas</p>
                  <p className="text-lg font-bold text-white">
                    {isLoadingEntries
                      ? "..."
                      : totalEntries
                      ? `${totalEntries}+`
                      : "0"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/20">
                <FolderOpen className="w-6 h-6 text-purple-400" />
                <div>
                  <p className="text-xs text-gray-400">Categorías</p>
                  <p className="text-lg font-bold text-white">
                    {isLoadingCategories ? "..." : totalCategories}
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
  );
}

