import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { PublicLayout } from '@/layouts/PublicLayout';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

import { PublicRoute } from './guards/PublicRoute';
import { PrivateRoute } from './guards/PrivateRoute';
//import { RoleRoute } from './guards/RoleRoute';

import Home from '@/pages/public/home/Home';
import NotFound from '@/pages/public/NotFound';

const Login = lazy(() => import('@/pages/public/auth/Login'));
const Register = lazy(() => import('@/pages/public/auth/Register'));

const Dashboard = lazy(() => import('@/pages/core/dashboard/Dashboard'));
const Chatbot = lazy(() => import('@/pages/core/bot/Chatbot'));

/**
 * Configuración centralizada de rutas TODO :D
 * 
 * Estructura:
 * - Rutas públicas: Accesibles sin autenticación
 * - Rutas de autenticación: Solo accesibles cuando NO estás autenticado
 * - Rutas privadas: Requieren autenticación
 * - Rutas por rol: Requieren autenticación + rol específico
 */
export const routesConfig: RouteObject[] = [
  // ==================== RUTAS PÚBLICAS ====================
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/',
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },

  // ==================== RUTAS DE AUTENTICACIÓN ====================
  // Estas rutas redirigen al dashboard si ya estás autenticado
  {
    element: <PublicRoute restrictWhenAuthenticated={true} redirectTo="/dashboard" />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
          {
            path: '/chatbot',
            element: <Chatbot />,
          },
        ],
      },
    ],
  },

  // ==================== RUTAS PRIVADAS ====================
  // Estas rutas requieren autenticación
  {
    element: <PrivateRoute redirectTo="/login" />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },

  // ==================== RUTAS POR ROL ====================
  // Ejemplo: Rutas solo para administradores
  /*
  {
    element: <RoleRoute allowedRoles={['admin']} redirectTo="/dashboard" />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: '/admin',
            element: <AdminPanel />,
          },
          {
            path: '/admin/users',
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
  */

  // ==================== 404 - NOT FOUND ====================
  {
    path: '*',
    element: <NotFound />,
  },
];

/**
 * Tipos de rutas disponibles para facilitar la navegación
 */
export const ROUTES = {
  // Públicas
  HOME: '/',
  
  // Autenticación
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Privadas
  DASHBOARD: '/dashboard',
  CHATBOT: '/chatbot',
  
  // Admin (ejemplo)
  // ADMIN: '/admin',
  // ADMIN_USERS: '/admin/users',
} as const;

export type RouteKey = keyof typeof ROUTES;

