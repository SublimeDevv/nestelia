import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/login",
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
