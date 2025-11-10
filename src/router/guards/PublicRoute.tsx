import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/stores/authStore";

interface PublicRouteProps {
  redirectTo?: string;
  restrictWhenAuthenticated?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  redirectTo = "/dashboard",
  restrictWhenAuthenticated = false,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (restrictWhenAuthenticated && isLoading) return;

  if (restrictWhenAuthenticated && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
