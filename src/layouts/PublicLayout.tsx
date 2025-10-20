import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black">
      <Outlet />
    </div>
  );
};

