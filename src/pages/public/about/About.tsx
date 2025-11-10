import { motion } from "motion/react";
import { Users } from "lucide-react";
import tanstackLogo from "@/assets/tech/tanstack_logu.webp";
import chromaLogo from "@/assets/tech/chroma.webp";
import Logo from "@/components/Logo";
import alonsoImg from "@/assets/team/alonso.webp";
import cochiImg from "@/assets/team/cochi.webp";
import juanDiegoImg from "@/assets/team/juan_diego.webp";
import leyvaImg from "@/assets/team/leyva.webp";
import juancaImg from "@/assets/team/juanca.webp";

export default function About() {
  const teamMembers = [
    {
      name: "Carlos Alonso",
      role: "Game Developer & Asset Designer",
      description: "Desarrollador de videojuego y diseñador de assets",
      avatar: alonsoImg,
    },
    {
      name: "Ángel",
      role: "Mobile & Full Stack Developer",
      description: "Desarrollador móvil, full-stack y creador de sonido",
      avatar: cochiImg,
    },
    {
      name: "Juan Diego",
      role: "Full Stack Developer & DevOps",
      description: "Desarrollador web full-stack y arquitectura de nube",
      avatar: juanDiegoImg,
    },
    {
      name: "Andrés",
      role: "Mobile Developer & Team Lead",
      description: "Desarrollador móvil, líder del equipo y creador de sprites",
      avatar: leyvaImg,
    },
    {
      name: "Juan Carlos",
      role: "Level Designer & Game Developer",
      description: "Diseñador de niveles y desarrollador del videojuego",
      avatar: juancaImg,
    },
  ];

  const technologies = [
    {
      category: "Frontend",
      items: [
        {
          name: "React",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          description:
            "Biblioteca de JavaScript para construir interfaces de usuario",
        },
        {
          name: "Tailwind CSS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
          description: "Framework CSS basado en utilidades",
        },
        {
          name: "TanStack Query",
          logo: tanstackLogo,
          description: "Gestión de estado del servidor y cache",
        },
        {
          name: "Zustand",
          logo: "https://repository-images.githubusercontent.com/180328715/fca49300-e7f1-11ea-9f51-cfd949b31560",
          description: "Gestión de estado global ligero",
        },
      ],
    },
    {
      category: "Backend",
      items: [
        {
          name: ".NET",
          logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Microsoft_.NET_logo.svg",
          description: "Framework para desarrollo backend",
        },
        {
          name: "SQL Server",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
          description: "Sistema de gestión de base de datos relacional",
        },
        {
          name: "Redis",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
          description: "Base de datos en memoria para cache",
        },
      ],
    },
    {
      category: "Sistema de IA para Chatbot",
      items: [
        {
          name: "Gemini AI",
          logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
          description: "Modelo de lenguaje de Google",
        },
        {
          name: "Ollama",
          logo: "https://github.com/ollama/ollama/assets/3325447/0d0b44e2-8f4a-4e99-9b52-a5c1c741c8f7",
          description: "Ejecución local de modelos de IA",
        },
        {
          name: "ChromaDB",
          logo: chromaLogo,
          description: "Base de datos vectorial para embeddings",
        },
      ],
    },
    {
      category: "Infraestructura",
      items: [
        {
          name: "Docker",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
          description: "Plataforma de contenedorización",
        },
        {
          name: "Jenkins",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg",
          description: "Servidor de automatización CI/CD",
        },
        {
          name: "Supabase",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
          description: "Backend as a Service",
        },
      ],
    },
    {
      category: "Desarrollo Móvil",
      items: [
        {
          name: "Flutter",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
          description: "Framework multiplataforma para desarrollo móvil",
        },
      ],
    },
    {
      category: "Desarrollo del Videojuego",
      items: [
        {
          name: "Unity",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg",
          description: "Motor de videojuegos para Nestelia",
        },
      ],
    },
  ];

  return (
    <main className="bg-linear-to-b from-gray-900 via-black to-gray-900 min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un proyecto desarrollado con tecnologías modernas y un equipo
            apasionado
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <Users className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Equipo de Desarrollo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all group"
                title={member.description}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500 group-hover:scale-110 transition-all">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-purple-400 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Stack Tecnológico
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-purple-500/50 transition-all"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
                  {tech.category}
                </h3>

                <div
                  className={`grid ${
                    tech.category === "Frontend"
                      ? "grid-cols-2 md:grid-cols-4"
                      : tech.items.length === 1
                      ? "grid-cols-1 place-items-center"
                      : "grid-cols-2 md:grid-cols-3"
                  } gap-6`}
                >
                  {tech.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-center group relative"
                      title={item.description}
                    >
                      <div className="w-20 h-20 mb-3 flex items-center justify-center bg-white/5 rounded-lg p-3 group-hover:bg-white/10 transition-all group-hover:scale-110 cursor-pointer">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-300 text-center font-medium">
                        {item.name}
                      </p>

                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 border border-purple-500/50 rounded-lg text-sm text-gray-200 whitespace-normal min-w-[250px] max-w-[300px] text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                        {item.description}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-purple-500/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-linear-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 flex items-center justify-center gap-6">
            <div className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-lg p-3">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg"
                alt="Oracle Cloud"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Alojado en Oracle Cloud
              </h3>
              <p className="text-gray-300">
                Todo el sistema está desplegado en un VPS de Oracle Cloud
                Infrastructure
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
