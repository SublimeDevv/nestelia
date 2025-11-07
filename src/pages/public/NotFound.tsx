import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Particles from '@/components/Particles';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-black to-black relative overflow-hidden flex items-center justify-center">
      <div className="size-full fixed inset-0">
        <Particles
          particleColors={['#ffffff']}
          particleCount={200}
          particleSpread={18}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={true}
          particleHoverFactor={0.4}
          cameraDistance={40}
        />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-300 mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver atrás</span>
          </button>

          <Link
            to="/"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Home size={20} />
            <span>Ir al inicio</span>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12">
          <p className="text-gray-500 mb-4">¿Necesitas ayuda?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/" className="text-blue-400 hover:text-blue-300 transition">
              Inicio
            </Link>
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

