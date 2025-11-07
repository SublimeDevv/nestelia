import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-b bg-gray-900">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
