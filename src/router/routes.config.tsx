import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { PublicLayout } from '@/layouts/PublicLayout';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

import { PublicRoute } from './guards/PublicRoute';
import { PrivateRoute } from './guards/PrivateRoute';
//import { RoleRoute } from './guards/RoleRoute';

import Home from '@/pages/public/home/Home';
import About from '@/pages/public/about/About';
import NotFound from '@/pages/public/NotFound';
import PostsList from '@/pages/core/blog/List';
import CreatePost from '@/pages/core/blog/CreatePost';
import EditPost from '@/pages/core/blog/EditPost';
import PostDetail from '@/pages/core/blog/PostDetail';
import Wiki from '@/pages/core/wiki/Wiki';
import WikiEntryDetail from '@/pages/core/wiki/WikiEntryDetail';
import WikiEntriesList from '@/pages/core/wiki/List';
import CreateWikiEntry from '@/pages/core/wiki/CreateWikiEntry';
import EditWikiEntry from '@/pages/core/wiki/EditWikiEntry';
import NewsList from '@/pages/core/news/List';
import CreateNews from '@/pages/core/news/CreateNews';
import EditNews from '@/pages/core/news/EditNews';
import NewsDetail from '@/pages/core/news/NewsDetail';
import PublicNewsList from '@/pages/public/news/NewsList';
import PublicPostsList from '@/pages/public/blog/PostsList';
import CategoriesList from '@/pages/core/categories/List';

const Login = lazy(() => import('@/pages/public/auth/Login'));
const Register = lazy(() => import('@/pages/public/auth/Register'));

const Dashboard = lazy(() => import('@/pages/core/dashboard/Dashboard'));
const BotConfiguration = lazy(() => import('@/pages/core/bot/BotConfiguration'));

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
          {
            path: '/about',
            element: <About />,
          },
          {
            path: '/wiki',
            element: <Wiki />,
          },
          {
            path: '/wiki/:id',
            element: <WikiEntryDetail />,
          },
          {
            path: '/news',
            element: <PublicNewsList />,
          },
          {
            path: '/news/:id',
            element: <NewsDetail />,
          },
          {
            path: '/blog',
            element: <PublicPostsList />,
          },
          {
            path: '/posts/:id',
            element: <PostDetail />,
          }
        ],
      },
    ],
  },

  // ==================== RUTAS DE AUTENTICACIÓN ====================
  // Estas rutas redirigen al dashboard si ya está autenticado
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
          {
            path: '/dashboard/news',
            element: <NewsList />,
          },
          {
            path: '/dashboard/news/create',
            element: <CreateNews />,
          },
          {
            path: '/dashboard/news/edit/:id',
            element: <EditNews />,
          },
          {
            path: '/dashboard/posts',
            element: <PostsList />,
          },
          {
            path: '/dashboard/posts/create',
            element: <CreatePost />,
          },
          {
            path: '/dashboard/posts/edit/:id',
            element: <EditPost />,
          },
          {
            path: '/dashboard/categories',
            element: <CategoriesList />,
          },
          {
            path: '/dashboard/wiki-entries/:categoryId',
            element: <WikiEntriesList />,
          },
          {
            path: '/dashboard/wiki-entries/:categoryId/create',
            element: <CreateWikiEntry />,
          },
          {
            path: '/dashboard/wiki-entries/:categoryId/edit/:id',
            element: <EditWikiEntry />,
          },
          {
            path: '/dashboard/bot',
            element: <BotConfiguration />,
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
  ABOUT: '/about',
  WIKI: '/wiki',
  WIKI_DETAIL: '/wiki/:id',
  NEWS_LIST: '/news',
  NEWS_DETAIL: '/news/:id',
  BLOG_LIST: '/blog',
  POSTS_DETAIL: '/posts/:id',
  
  // Autenticación
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Privadas
  DASHBOARD: '/dashboard',
  BOT_CONFIG: '/dashboard/bot',
  NEWS: '/dashboard/news',
  NEWS_CREATE: '/dashboard/news/create',
  NEWS_EDIT: '/dashboard/news/edit/:id',
  POSTS: '/dashboard/posts',
  POSTS_CREATE: '/dashboard/posts/create',
  POSTS_EDIT: '/dashboard/posts/edit/:id',
  CATEGORIES: '/dashboard/categories',
  WIKI_ENTRIES: '/dashboard/wiki-entries/:categoryId',
  WIKI_ENTRIES_CREATE: '/dashboard/wiki-entries/:categoryId/create',
  WIKI_ENTRIES_EDIT: '/dashboard/wiki-entries/:categoryId/edit/:id',
  
  // Admin (ejemplo)
  // ADMIN: '/admin',
  // ADMIN_USERS: '/admin/users',
} as const;

export type RouteKey = keyof typeof ROUTES;

