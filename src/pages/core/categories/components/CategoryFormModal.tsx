import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Upload, Image as ImageIcon } from "lucide-react";
import { createCategorySchema, editCategorySchema } from "../schemas";
import type { Category } from "../interfaces";
import { ZodError } from "zod";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  category?: Category;
  isLoading?: boolean;
}

interface FormErrors {
  name?: string;
  displayName?: string;
  description?: string;
  icon?: string;
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  isLoading = false,
}: CategoryFormModalProps) {
  const isEditing = !!category;
  const [formData, setFormData] = useState({
    name: category?.name || "",
    displayName: category?.displayName || "",
    description: category?.description || "",
  });
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>(category?.icon || "");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        displayName: category.displayName,
        description: category.description,
      });
      setIconPreview(category.icon || "");
      setIconFile(null);
    } else {
      setFormData({
        name: "",
        displayName: "",
        description: "",
      });
      setIconPreview("");
      setIconFile(null);
    }
    setErrors({});
  }, [category, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.icon) {
        setErrors((prev) => ({ ...prev, icon: undefined }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const schema = isEditing ? editCategorySchema : createCategorySchema;

      const dataToValidate: any = {
        name: formData.name,
        displayName: formData.displayName,
        description: formData.description,
      };

      if (!isEditing) {
        dataToValidate.icon = iconFile;
      } else if (iconFile) {
        dataToValidate.icon = iconFile;
      }

      schema.parse(dataToValidate);

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("displayName", formData.displayName);
      submitData.append("description", formData.description);
      if (iconFile) {
        submitData.append("icon", iconFile);
      }

      onSubmit(submitData);
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = error as ZodError;
        const newErrors: FormErrors = {};
        zodError.issues.forEach((err) => {
          const field = err.path[0] as keyof FormErrors;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Categoría" : "Crear categoría"}
      description={
        isEditing
          ? "Modifica los datos de la categoría"
          : "Completa el formulario para crear una nueva categoría"
      }
      size="lg"
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Nombre (slug) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-full px-4 py-2.5 bg-gray-800 border ${
              errors.name ? "border-red-500" : "border-gray-700"
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50`}
            placeholder="categoria-ejemplo"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Solo letras, números, guiones y guiones bajos
          </p>
        </div>

        {/* Display Name */}
        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Nombre a mostrar <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`w-full px-4 py-2.5 bg-gray-800 border ${
              errors.displayName ? "border-red-500" : "border-gray-700"
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50`}
            placeholder="Categoría Ejemplo"
          />
          {errors.displayName && (
            <p className="mt-1 text-sm text-red-500">{errors.displayName}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={isLoading}
            rows={3}
            className={`w-full px-4 py-2.5 bg-gray-800 border ${
              errors.description ? "border-red-500" : "border-gray-700"
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none disabled:opacity-50`}
            placeholder="Descripción de la categoría..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ícono {!isEditing && <span className="text-red-500">*</span>}
          </label>
          <div className="flex items-start gap-4">
            {iconPreview && (
              <div className="w-20 h-20 rounded-lg border border-gray-700 bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={iconPreview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <label
                htmlFor="icon"
                className={`flex items-center justify-center px-4 py-3 border-2 border-dashed ${
                  errors.icon ? "border-red-500" : "border-gray-700"
                } rounded-lg cursor-pointer hover:border-purple-500 transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-gray-400">
                  {iconPreview ? <ImageIcon size={18} /> : <Upload size={18} />}
                  <span className="text-sm">
                    {iconPreview ? "Cambiar ícono" : "Seleccionar ícono"}
                  </span>
                </div>
                <input
                  type="file"
                  id="icon"
                  accept="image/*"
                  onChange={handleIconChange}
                  disabled={isLoading}
                  className="hidden"
                />
              </label>
              {errors.icon && (
                <p className="mt-1 text-sm text-red-500">{errors.icon}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG, WEBP o SVG (máx. 5MB)
              </p>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
