import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  FileText,
  FileEdit,
  FolderTree,
  Menu,
  ChevronLeft,
} from "lucide-react";
import Logo from "@/components/Logo";
import { Settings, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/stores/authStore";
import { useToast } from "@/stores/toastStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes.config";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/pages/core/categories/services/categoryService";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Noticias", path: "/dashboard/news", icon: FileText },
    { name: "Publicaciones", path: "/dashboard/posts", icon: FileEdit },
    { name: "Categorías", path: "/dashboard/categories", icon: FolderTree },
    { name: "Chatbot", path: "/dashboard/bot", icon: Bot },
  ];

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Sesión cerrada correctamente");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${
          isSidebarOpen ? "md:w-64" : "md:w-20"
        } w-64 bg-app border-r border-gray-800 transition-all duration-300 shrink-0 fixed md:sticky md:top-0 h-screen z-50 overflow-hidden`}
      >
        <div className="flex flex-col h-full">
        <div className={`p-4 border-b border-gray-800 flex items-center ${
          isSidebarOpen ? "justify-between" : "justify-center md:justify-center"
        }`}>
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <Logo size="sm" className="h-10" />
            </div>
          )}
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white transition-colors md:hidden"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={toggleSidebar}
            className="hidden md:block text-gray-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isSidebarOpen && (
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-gray-500 bg-gray-700 rounded">
                ⌘K
              </kbd>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      closeSidebar();
                    }
                  }}
                  className={`flex items-center ${
                    isSidebarOpen ? "space-x-3" : "md:justify-center"
                  } px-3 py-2 rounded-lg transition-all ${
                    active
                      ? "bg-linear-to-br from-purple-500 to-purple-700 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                  title={!isSidebarOpen ? item.name : undefined}
                >
                  <Icon size={20} />
                  {isSidebarOpen && (
                    <span className="text-sm">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {isSidebarOpen && (
            <div className="mt-6">
              <button
                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-sm font-medium">Wiki Entradas</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    isProjectsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isProjectsOpen && (
                <div className="mt-1 space-y-1">
                  {categoriesData?.data && categoriesData.data.length > 0 ? (
                    categoriesData.data.map((category) => (
                      <Link
                        key={category.id}
                        to={`/dashboard/wiki-entries/${category.id}`}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            closeSidebar();
                          }
                        }}
                        className={`block px-6 py-2 text-sm rounded-lg transition-colors ${
                          isActive(`/dashboard/wiki-entries/${category.id}`)
                            ? "text-white bg-gray-800"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        {category.displayName}
                      </Link>
                    ))
                  ) : (
                    <div className="px-6 py-2 text-xs text-gray-500">
                      No hay categorías disponibles
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="border-t border-gray-800 p-3">
          <Link
            to="/settings"
            onClick={() => {
              if (window.innerWidth < 768) {
                closeSidebar();
              }
            }}
            className={`flex items-center ${
              isSidebarOpen ? "space-x-3" : "md:justify-center"
            } px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all mb-2`}
            title={!isSidebarOpen ? "Configuración" : undefined}
          >
            <Settings size={20} />
            {isSidebarOpen && (
              <span className="text-sm">Configuración</span>
            )}
          </Link>

          <div className={`flex items-center ${
            isSidebarOpen ? "space-x-3" : "md:justify-center"
          } px-3 py-2`}>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {user?.userName?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase() ||
                "U"}
            </div>
            {isSidebarOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">
                    {user?.userName || user?.email || "Usuario"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut size={18} />
                </button>
              </>
            )}
          </div>

          {isSidebarOpen && (
            <div className="mt-2 px-3 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-400">{user?.role}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
