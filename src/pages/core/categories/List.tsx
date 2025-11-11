import { useState, useCallback } from "react";
import Table, { type Column } from "@/components/ui/Table";
import SearchBar from "@/components/SearchBar";
import { Plus, FolderOpen } from "lucide-react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./services/categoryService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Category } from "./interfaces/Category";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { CategoryFormModal } from "./components";
import { useToast } from "@/stores/toastStore";

export default function CategoriesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Category | null>(null);
  const [itemToEdit, setItemToEdit] = useState<Category | undefined>(undefined);
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría eliminada exitosamente");
      setDeleteModalOpen(false);
      setItemToDelete(null);
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar la categoría: ${error.message}`);
    },
  });

  const createMutation = useMutation({
    mutationFn: (formData: FormData) => createCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría creada exitosamente");
      setFormModalOpen(false);
      setItemToEdit(undefined);
    },
    onError: (error: Error) => {
      toast.error(`Error al crear la categoría: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateCategory(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoría actualizada exitosamente");
      setFormModalOpen(false);
      setItemToEdit(undefined);
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar la categoría: ${error.message}`);
    },
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleEdit = useCallback((item: Category) => {
    setItemToEdit(item);
    setFormModalOpen(true);
  }, []);

  const handleDelete = useCallback((item: Category) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (itemToDelete?.id) {
      deleteMutation.mutate(itemToDelete.id);
    }
  }, [itemToDelete, deleteMutation]);

  const handleCancelDelete = useCallback(() => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  }, []);

  const handleCreateNew = useCallback(() => {
    setItemToEdit(undefined);
    setFormModalOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    if (!createMutation.isPending && !updateMutation.isPending) {
      setFormModalOpen(false);
      setItemToEdit(undefined);
    }
  }, [createMutation.isPending, updateMutation.isPending]);

  const handleFormSubmit = useCallback(
    (formData: FormData) => {
      if (itemToEdit) {
        updateMutation.mutate({ id: itemToEdit.id, formData });
      } else {
        createMutation.mutate(formData);
      }
    },
    [itemToEdit, createMutation, updateMutation]
  );

  const handleFilterClick = useCallback(() => {
    console.log("Abrir filtros");
  }, []);

  if (isLoading) {
    return <div>Cargando categorías...</div>;
  }

  if (error) {
    return <div>Error al cargar categorías: {error.message}</div>;
  }

  const filteredCategories = (data?.data || []).filter((category: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      category.name?.toLowerCase().includes(query) ||
      category.displayName.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );
  });

  const columns: Column<Category>[] = [
    {
      key: "icon",
      label: "Ícono",
      width: "80px",
      align: "center",
      render: (item) => (
        <div className="flex justify-center">
          {item.icon ? (
            <img
              src={item.icon}
              alt={item.displayName}
              className="w-8 h-8 object-contain rounded"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
              <span className="text-xs text-gray-500">N/A</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Nombre (Slug)",
      render: (item) => (
        <span className="font-mono text-purple-400">{item.name}</span>
      ),
    },
    {
      key: "displayName",
      label: "Nombre a Mostrar",
      render: (item) => <span className="font-medium">{item.displayName}</span>,
    },
    {
      key: "description",
      label: "Descripción",
      render: (item) => (
        <span className="text-gray-400 line-clamp-2">{item.description}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Fecha de Creación",
      width: "180px",
      render: (item) => (
        <span className="text-gray-400">
          {new Date(item.createdAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <FolderOpen className="text-purple-400 w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-xl sm:text-3xl font-bold text-white">
              Categorías
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400">
            Gestiona y visualiza todas las categorías del sistema
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Crear categoría</span>
        </button>
      </div>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Buscar por nombre o descripción..."
        showFilters={false}
        onFilterClick={handleFilterClick}
      />

      {searchQuery && (
        <div className="text-sm text-gray-400">
          {filteredCategories.length === 0 ? (
            <span>No se encontraron resultados para "{searchQuery}"</span>
          ) : (
            <span>
              {filteredCategories.length} resultado
              {filteredCategories.length !== 1 ? "s" : ""} encontrado
              {filteredCategories.length !== 1 ? "s" : ""}
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
          data={filteredCategories}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No hay categorías disponibles"
          loading={isLoading}
          getRowId={(item) => item.id}
        />
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar categoría"
        description="Esta acción no se puede deshacer"
        message={
          itemToDelete
            ? `¿Estás seguro de que deseas eliminar la categoría "${itemToDelete.displayName}"?`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmButtonVariant="danger"
        isLoading={deleteMutation.isPending}
      />

      <CategoryFormModal
        isOpen={formModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
        category={itemToEdit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
