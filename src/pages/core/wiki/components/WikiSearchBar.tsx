import { Search } from "lucide-react";

interface WikiSearchBarProps {
  searchQuery: string;
  debouncedSearchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function WikiSearchBar({
  searchQuery,
  debouncedSearchQuery,
  onSearchChange,
}: WikiSearchBarProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        <input
          type="text"
          placeholder="Buscar en la wiki..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {searchQuery !== debouncedSearchQuery && (
          <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}

