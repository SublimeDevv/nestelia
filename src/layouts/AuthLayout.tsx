import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/util/ScrollToTop";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-app relative overflow-hidden">
      <ScrollToTop />
      <div className="size-full fixed inset-0"></div>
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};
