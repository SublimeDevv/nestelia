import { Outlet } from 'react-router-dom';
import Particles from '@/components/Particles';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-black to-black relative overflow-hidden">
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
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

