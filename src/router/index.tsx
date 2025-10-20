import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { routesConfig } from "./routes.config";

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
      <p className="text-white text-lg">Cargando...</p>
    </div>
  </div>
);

const router = createBrowserRouter(routesConfig);

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
