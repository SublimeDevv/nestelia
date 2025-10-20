import { useNavigate } from 'react-router-dom';
import { ROUTES, type RouteKey } from '../routes.config';

/**
 * Hook personalizado para navegación type-safe
 * Proporciona métodos convenientes para navegar entre rutas
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();

  /**
   * Navega a una ruta definida en ROUTES
   * @param route - Clave de la ruta del objeto ROUTES
   * @param options - Opciones de navegación de React Router
   */
  const navigateTo = (route: RouteKey, options?: { replace?: boolean; state?: any }) => {
    navigate(ROUTES[route], options);
  };

  /**
   * Navega hacia atrás en el historial
   * @param delta - Número de pasos a retroceder (default: -1)
   */
  const goBack = (delta: number = -1) => {
    navigate(delta);
  };

  /**
   * Navega hacia adelante en el historial
   * @param delta - Número de pasos a avanzar (default: 1)
   */
  const goForward = (delta: number = 1) => {
    navigate(delta);
  };

  return {
    navigateTo,
    goBack,
    goForward,
    navigate, // Navegación directa si es necesaria
    routes: ROUTES, // Acceso a las rutas disponibles
  };
};

