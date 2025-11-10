import { Search, X, SlidersHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showFilters?: boolean;
  onFilterClick?: () => void;
  className?: string;
  debounceMs?: number;
}

export default function SearchBar({
  onSearch,
  placeholder = "Buscar...",
  showFilters = false,
  onFilterClick,
  className = "",
  debounceMs = 500,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchRef.current(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const handleClear = () => {
    setQuery("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex items-center gap-2 bg-gray-900/40 border rounded-lg transition-colors ${
          isFocused ? "border-purple-500/40" : "border-gray-800/60"
        }`}
      >
        <div className="pl-4 text-gray-500">
          <Search size={20} />
        </div>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-3 pr-2 text-white placeholder-gray-500 focus:outline-none text-sm"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-300 pr-2"
            title="Limpiar búsqueda"
          >
            <X size={18} />
          </button>
        )}

        {showFilters && (
          <button
            type="button"
            onClick={onFilterClick}
            className="px-4 py-3 border-l border-gray-800/60 text-gray-400 hover:text-white rounded-r-lg"
            title="Filtros"
          >
            <SlidersHorizontal size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
