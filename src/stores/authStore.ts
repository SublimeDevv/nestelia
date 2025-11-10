import { create } from "zustand";
import { authService } from "@/pages/public/auth/services/authService";
import type { AuthState } from "@/pages/public/auth/interfaces";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authService.login({ email, password });

      if (response.isSuccess) {
        await useAuthStore.getState().checkAuth();
      } else {
        set({
          error: response.error?.message || "Error al iniciar sesión",
          isLoading: false,
        });
        throw new Error(response.error?.message || "Error al iniciar sesión");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Error al iniciar sesión";
      set({ error: errorMessage, isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authService.register({ name, email, password });

      if (response.isSuccess) {
        await useAuthStore.getState().checkAuth();
      } else {
        set({
          error: response.error?.message || "Error al registrarse",
          isLoading: false,
        });
        throw new Error(response.error?.message || "Error al registrarse");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Error al registrarse";
      set({ error: errorMessage, isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });

      await authService.logout();

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await authService.getCurrentUser();

      if (response.isSuccess && response.data) {
        set({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    register: store.register,
    logout: store.logout,
    checkAuth: store.checkAuth,
    clearError: store.clearError,
  };
};
