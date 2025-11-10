import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/stores/authStore';
import { ROUTES } from '../routes.config';

/**
 * Hook para proteger rutas con lógica personalizada
 */
export const useRouteGuard = (options: {
  requireAuth?: boolean;
  requireRoles?: string[];
  redirectTo?: string;
  onUnauthorized?: () => void;
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    requireAuth = false,
    requireRoles = [],
    redirectTo = '/login',
    onUnauthorized,
  } = options;

  useEffect(() => {
    if (isLoading) return;

    // Check authentication
    if (requireAuth && !isAuthenticated) {
      if (onUnauthorized) {
        onUnauthorized();
      }
      navigate(redirectTo, {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    // Check roles
    if (requireRoles.length > 0 && user) {
      const hasRequiredRole = requireRoles.includes(user.role);
      if (!hasRequiredRole) {
        if (onUnauthorized) {
          onUnauthorized();
        }
        navigate(ROUTES.DASHBOARD, { replace: true });
      }
    }
  }, [isAuthenticated, user, isLoading, requireAuth, requireRoles, navigate, redirectTo, location, onUnauthorized]);

  return {
    isAllowed: isAuthenticated || !requireAuth,
    isLoading,
  };
};

