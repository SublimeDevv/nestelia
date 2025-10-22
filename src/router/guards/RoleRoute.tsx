import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RoleRouteProps {
  allowedRoles: string[];
  redirectTo?: string;
}

export const RoleRoute: React.FC<RoleRouteProps> = ({
  allowedRoles,
  redirectTo = "/dashboard",
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = user && allowedRoles.includes(user.role);

  return hasRequiredRole ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
