import { Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  
  return (
    <header className="bg-app border-b border-gray-800 sticky top-0 z-30">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-6">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-2 sm:space-x-4"></div>
      </div>
    </header>
  );
}
