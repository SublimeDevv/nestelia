import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

interface WikiPaginationProps {
  pagination: PaginationInfo;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function WikiPagination({
  pagination,
  currentPage,
  onPageChange,
}: WikiPaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  const renderPageButtons = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const current = currentPage;

    if (current > 3) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="w-10 h-10 flex items-center justify-center bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:border-purple-500/50 transition-all"
        >
          1
        </button>
      );
      if (current > 4) {
        pages.push(
          <span key="dots1" className="text-gray-500">
            ...
          </span>
        );
      }
    }

    for (
      let i = Math.max(1, current - 2);
      i <= Math.min(totalPages, current + 2);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 flex items-center justify-center backdrop-blur-sm border rounded-lg transition-all ${
            i === current
              ? "bg-purple-500/20 border-purple-500 text-white font-bold"
              : "bg-gray-800/40 border-gray-700 text-white hover:border-purple-500/50"
          }`}
        >
          {i}
        </button>
      );
    }

    if (current < totalPages - 2) {
      if (current < totalPages - 3) {
        pages.push(
          <span key="dots2" className="text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="w-10 h-10 flex items-center justify-center bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:border-purple-500/50 transition-all"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 flex items-center justify-center gap-2"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        <div className="flex items-center gap-2">{renderPageButtons()}</div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700"
        >
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Mostrando {(currentPage - 1) * pagination.pageSize + 1} -{" "}
        {Math.min(currentPage * pagination.pageSize, pagination.totalCount)} de{" "}
        {pagination.totalCount} entradas
      </div>
    </>
  );
}

