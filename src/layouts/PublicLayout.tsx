import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/util/ScrollToTop";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-b bg-gray-900">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
