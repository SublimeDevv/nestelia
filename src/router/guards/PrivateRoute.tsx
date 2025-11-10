import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/stores/authStore";

interface PrivateRouteProps {
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/login",
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return;

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
