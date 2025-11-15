import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DataList, { type DataListItem } from "@/components/DataList";
import SearchBar from "@/components/SearchBar";
import { Plus, FileText } from "lucide-react";
import { getPosts, deletePost } from "./services/blogService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "./interfaces/Post";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useToast } from "@/stores/toastStore";
import { ROUTES } from "@/router/routes.config";

export default function PostsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DataListItem | null>(null);
  const pageSize = 10;
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["posts", page, searchQuery],
    queryFn: () =>
      getPosts({
        page,
        size: pageSize,
        ...(searchQuery && { param: searchQuery }),
      }),
    placeholderData: (previousData) => previousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", deletedId] });
      toast.success("Publicación eliminada exitosamente");
      setDeleteModalOpen(false);
      setItemToDelete(null);
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar la publicación: ${error.message}`);
    },
  });

  const handleSearch = useCallback((query: string) => { 
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handleEdit = useCallback((item: DataListItem) => {
    navigate(ROUTES.POSTS_EDIT.replace(":id", item.id?.toString() || ""));
  }, [navigate]);

  const handleDelete = useCallback((item: DataListItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  }, []);

  const handleItemClick = useCallback((item: DataListItem) => {
    navigate(ROUTES.POSTS_DETAIL.replace(":id", item.id?.toString() || ""));
  }, [navigate]);

  const handleConfirmDelete = useCallback(() => {
    if (itemToDelete?.id) {
      deleteMutation.mutate(itemToDelete.id.toString());
    }
  }, [itemToDelete, deleteMutation]);

  const handleCancelDelete = useCallback(() => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  }, []);

  const handleFilterClick = useCallback(() => {
    console.log("Abrir filtros");
  }, []);

  if (isLoading) {
    return <div>Cargando publicaciones...</div>;
  }

  if (error) {
    return <div>Error al cargar publicaciones: {error.message}</div>;
  }

  const mappedItems: DataListItem[] = (data?.data || []).map((item: Post) => ({
    id: item.id,
    title: item.title,
    publishedAt: item.createdAt,
    description: item.description || "",
    author: item.authorName,
    coverImageUrl: item.coverImageUrl,
  }));

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <FileText className="text-purple-400 w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-xl sm:text-3xl font-bold text-white">
              Publicaciones
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400">
            Gestiona y visualiza todas las publicaciones publicadas
          </p>
        </div>
        <button 
          onClick={() => navigate(ROUTES.POSTS_CREATE)}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Crear publicación</span>
        </button>
      </div>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Buscar por título, descripción o autor..."
        showFilters={true}
        onFilterClick={handleFilterClick}
      />

      {searchQuery && (
        <div className="text-sm text-gray-400">
          {mappedItems.length === 0 ? (
            <span>No se encontraron resultados para "{searchQuery}"</span>
          ) : (
            <span>
              {data?.pagination?.totalCount || mappedItems.length} resultado
              {(data?.pagination?.totalCount || mappedItems.length) !== 1
                ? "s"
                : ""}{" "}
              encontrado
              {(data?.pagination?.totalCount || mappedItems.length) !== 1
                ? "s"
                : ""}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        {isFetching && !isLoading && (
          <div className="absolute top-0 right-0 z-10">
            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-300 text-xs">
              Actualizando...
            </div>
          </div>
        )}
        <DataList
          items={mappedItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onItemClick={handleItemClick}
          emptyMessage="No hay publicaciones disponibles"
          loading={isLoading}
        />
      </div>

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 sm:px-4 py-2 bg-gray-800 text-white text-sm sm:text-base rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-gray-400 text-sm sm:text-base">
            Página {page} de {data.pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setPage((p) => Math.min(data?.pagination?.totalPages || 0, p + 1))
            }
            disabled={page >= data.pagination.totalPages}
            className="px-3 sm:px-4 py-2 bg-gray-800 text-white text-sm sm:text-base rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar publicación"
        description="Esta acción no se puede deshacer"
        message={
          itemToDelete
            ? `¿Estás seguro de que deseas eliminar la publicación "${itemToDelete.title}"?`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmButtonVariant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

