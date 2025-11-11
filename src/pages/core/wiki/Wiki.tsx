import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCategories } from "@/pages/core/categories/services/categoryService";
import { getWikiEntries } from "./services/wikiService";
import { useWikiPrecache } from "@/hooks/useWikiPrecache";
import {
  WikiBanner,
  WikiSearchBar,
  WikiCategoryList,
  WikiCategoryInfo,
  WikiEntryCard,
  WikiPagination,
  WikiRecentEntries,
  WikiStats,
} from "./components";

export default function Wiki() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: wikiEntriesData, isLoading: entriesLoading } = useQuery({
    queryKey: ["wikiEntries", selectedCategory, currentPage, debouncedSearchQuery],
    queryFn: () =>
      getWikiEntries({
        page: currentPage,
        size: 10,
        ...(selectedCategory && { category: selectedCategory }),
        ...(debouncedSearchQuery && { param: debouncedSearchQuery }),
      }),
  });

  const categories = categoriesData?.data || [];
  const wikiEntries = wikiEntriesData?.data || [];
  const pagination = wikiEntriesData?.pagination;

  useWikiPrecache(wikiEntries);

  const handleEntryClick = (entryId: string) => {
    navigate(`/wiki/${entryId}`);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedCategoryData = categories.find(
    (c) => c.id === selectedCategory
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-4 sm:pb-6">
        <WikiBanner
          totalEntries={pagination?.totalCount || 0}
          totalCategories={categories.length}
          isLoadingEntries={entriesLoading}
          isLoadingCategories={categoriesLoading}
        />

        <div className="grid grid-cols-12 gap-3 sm:gap-6">
          {/* Sidebar izquierdo - Categorías */}
          <div className="col-span-12 lg:col-span-3">
            <WikiCategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              totalEntries={pagination?.totalCount || 0}
              isLoading={categoriesLoading}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Contenido principal */}
          <div className="col-span-12 lg:col-span-6">
            <WikiSearchBar
              searchQuery={searchQuery}
              debouncedSearchQuery={debouncedSearchQuery}
              onSearchChange={setSearchQuery}
            />

            {selectedCategoryData && (
              <WikiCategoryInfo
                category={selectedCategoryData}
                onClearCategory={() => handleCategoryChange(null)}
              />
            )}

            <div className="space-y-3 sm:space-y-4">
              {entriesLoading ? (
                <div className="text-center py-12 sm:py-20 bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-xl">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-3 sm:mb-4"></div>
                  <p className="text-sm sm:text-base text-gray-400">Cargando entradas...</p>
                </div>
              ) : wikiEntries.length === 0 ? (
                <div className="text-center py-12 sm:py-20 bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-xl px-4">
                  <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-400 mb-2">
                    No se encontraron entradas
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    Intenta con otra búsqueda o categoría
                  </p>
                </div>
              ) : (
                <>
                  {wikiEntries.map((entry, index) => (
                    <WikiEntryCard
                      key={entry.id}
                      entry={entry}
                      index={index}
                      onClick={handleEntryClick}
                    />
                  ))}

                  {pagination && (
                    <WikiPagination
                      pagination={pagination}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar derecho - Entradas recientes */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6">
              <WikiRecentEntries
                entries={wikiEntries}
                isLoading={entriesLoading}
                onEntryClick={handleEntryClick}
              />

              <WikiStats
                totalEntries={pagination?.totalCount || 0}
                totalCategories={categories.length}
                recentEntries={wikiEntries}
                isLoadingEntries={entriesLoading}
                isLoadingCategories={categoriesLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
