import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PublicRouteProps {
  redirectTo?: string;
  restrictWhenAuthenticated?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  redirectTo = "/dashboard",
  restrictWhenAuthenticated = false,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (restrictWhenAuthenticated && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
