import { Outlet } from "react-router-dom";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import ScrollToTop from "@/components/util/ScrollToTop";

export const PrivateLayout = () => {
  return (
    <SidebarProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-950 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen w-full md:w-auto">
          <Header />
          <main className="flex-1 overflow-auto bg-gray-950 p-3 sm:p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
