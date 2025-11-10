import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, ArrowLeft, Eye, BookOpen } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWikiEntries, deleteWikiEntry } from "./services/wikiService";
import { getCategoryById } from "@/pages/core/categories/services/categoryService";
import type { WikiEntry } from "./interfaces/WikiEntry";
import Table from "@/components/ui/Table";
import SearchBar from "@/components/SearchBar";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/stores/toastStore";

export default function WikiEntriesList() {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<WikiEntry | null>(null);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string>("");
  const pageSize = 10;
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: categoryData } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId!),
    enabled: !!categoryId,
  });

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["wikiEntries", categoryId, page, searchQuery],
    queryFn: () =>
      getWikiEntries({
        page,
        size: pageSize,
        category: categoryId,
        ...(searchQuery && { param: searchQuery }),
      }),
    placeholderData: (previousData) => previousData,
    enabled: !!categoryId,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWikiEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wikiEntries"] });
      toast.success("Entrada de wiki eliminada exitosamente");
      setDeleteModalOpen(false);
      setItemToDelete(null);
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar la entrada: ${error.message}`);
    },
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handleEdit = useCallback(
    (entry: WikiEntry) => {
      navigate(`/dashboard/wiki-entries/${categoryId}/edit/${entry.id}`);
    },
    [navigate, categoryId]
  );

  const handleDelete = useCallback((entry: WikiEntry) => {
    setItemToDelete(entry);
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (itemToDelete?.id) {
      deleteMutation.mutate(itemToDelete.id.toString());
    }
  }, [itemToDelete, deleteMutation]);

  const handleCancelDelete = useCallback(() => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  }, []);

  const handleViewContent = useCallback((content: string) => {
    setSelectedContent(content);
    setContentModalOpen(true);
  }, []);

  const handleCloseContentModal = useCallback(() => {
    setContentModalOpen(false);
    setSelectedContent("");
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Cargando entradas de wiki...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">
          Error al cargar entradas: {error.message}
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "image" as keyof WikiEntry,
      label: "Imagen",
      render: (item: WikiEntry) => (
        <img
          src={item.image}
          alt="Wiki entry"
          className="w-16 h-16 object-cover rounded-lg"
        />
      ),
    },
    {
      key: "title" as keyof WikiEntry,
      label: "Título",
    },
    {
      key: "description" as keyof WikiEntry,
      label: "Descripción",
      render: (item: WikiEntry) => (
        <button
          onClick={() => handleViewContent(item.description)}
          className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors text-sm"
        >
          <Eye size={16} />
          <span>Ver contenido</span>
        </button>
      ),
    },
    {
      key: "createdAt" as keyof WikiEntry,
      label: "Fecha de creación",
      render: (item: WikiEntry) => {
        try {
          return new Date(item.createdAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        } catch {
          return "Fecha inválida";
        }
      },
    },
  ];

  return (
    <div className="space-y-6 min-h-screen pb-12">
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-purple-400" size={32} />
            <h1 className="text-3xl font-bold text-white">
              Wiki - {categoryData?.data?.displayName || "Categoría"}
            </h1>
          </div>
          <p className="text-gray-400">
            Gestiona las entradas de wiki de esta categoría
          </p>
        </div>
        <button
          onClick={() =>
            navigate(`/dashboard/wiki-entries/${categoryId}/create`)
          }
          className="px-6 py-3 bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-lg flex items-center gap-2 transition-all"
        >
          <Plus size={18} />
          <span>Crear entrada</span>
        </button>
      </div>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Buscar por título o descripción..."
        showFilters={false}
      />

      {searchQuery && (
        <div className="text-sm text-gray-400">
          {data?.data?.length === 0 ? (
            <span>No se encontraron resultados para "{searchQuery}"</span>
          ) : (
            <span>
              {data?.pagination?.totalCount || data?.data?.length || 0}{" "}
              resultado
              {(data?.pagination?.totalCount || data?.data?.length || 0) !== 1
                ? "s"
                : ""}{" "}
              encontrado
              {(data?.pagination?.totalCount || data?.data?.length || 0) !== 1
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
        <Table
          data={data?.data || []}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No hay entradas de wiki disponibles para esta categoría"
          loading={isLoading}
        />
      </div>

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-gray-400">
            Página {page} de {data.pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setPage((p) => Math.min(data?.pagination?.totalPages || 0, p + 1))
            }
            disabled={page >= data.pagination.totalPages}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar entrada de wiki"
        description="Esta acción no se puede deshacer"
        message={
          itemToDelete
            ? `¿Estás seguro de que deseas eliminar la entrada "${itemToDelete.title}"?`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmButtonVariant="danger"
        isLoading={deleteMutation.isPending}
      />

      <Modal
        isOpen={contentModalOpen}
        onClose={handleCloseContentModal}
        title="Contenido de la entrada"
        size="xl"
        footer={
          <button
            onClick={handleCloseContentModal}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
          >
            Cerrar
          </button>
        }
      >
        <div className="max-h-[60vh] overflow-y-auto">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedContent }}
          />
        </div>
      </Modal>
    </div>
  );
}

