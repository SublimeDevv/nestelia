import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, Image as ImageIcon, Loader2, FileEdit } from "lucide-react";
import Editor from "../../../components/util/Editor";
import { updatePost, getPostById } from "./services/blogService";
import { editPostSchema, type EditPostFormData } from "./schemas";
import { useToast } from "@/stores/toastStore";
import type Quill from "quill";
import { ROUTES } from "@/router/routes.config";
import Tip from "@/components/Dashboard/Tip";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const quillRef = useRef<Quill | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditPostFormData>({
    resolver: zodResolver(editPostSchema),
  });

  const { data: postData, isLoading: isLoadingPost } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (postData?.data) {
      setValue("title", postData.data.title);
      setValue("description", postData.data.description);
      setValue("content", postData.data.content);
      setImagePreview(postData.data.coverImageUrl);
    }
  }, [postData, setValue]);

  useEffect(() => {
    if (editorReady && quillRef.current && postData?.data?.content) {
      quillRef.current.root.innerHTML = postData.data.content;
    }
  }, [editorReady, postData]);

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => updatePost(id!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", id] });
      toast.success("Publicación actualizada exitosamente");
      navigate(ROUTES.POSTS);
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar la publicación: ${error.message}`);
    },
  });

  const handleImageChange = useCallback(
    (file: File | null) => {
      if (!file) {
        return;
      }

      setValue("image", file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [setValue]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageChange(file);
      }
    },
    [handleImageChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onSubmit = (data: EditPostFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);

    if (data.image) {
      formData.append("image", data.image);
    }

    updateMutation.mutate(formData);
  };

  if (isLoadingPost) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2
            className="animate-spin mx-auto mb-4 text-purple-500"
            size={48}
          />
          <p className="text-gray-400">Cargando publicación...</p>
        </div>
      </div>
    );
  }

  if (!postData?.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400 mb-4">No se pudo cargar la publicación</p>
          <button
            onClick={() => navigate(ROUTES.POSTS)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="mb-8">
        <button
          onClick={() => navigate(ROUTES.POSTS)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>
        <div className="flex items-center gap-3 mb-2">
          <FileEdit className="text-purple-400" size={32} />
          <h1 className="text-3xl font-bold text-white">
            Editar publicación
          </h1>
        </div>
        <p className="text-gray-400">
          Modifica los campos que desees actualizar
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Título <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title")}
                id="title"
                type="text"
                placeholder="Ingresa el título de la publicación"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={3}
                placeholder="Ingresa una breve descripción de la publicación"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contenido <span className="text-red-500">*</span>
              </label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <div className="bg-white rounded-lg overflow-hidden">
                    <Editor
                      ref={quillRef}
                      onTextChange={() => {
                        const html = quillRef.current?.root.innerHTML || "";
                        field.onChange(html);
                      }}
                      onEditorReady={() => setEditorReady(true)}
                    />
                  </div>
                )}
              />
              {errors.content && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.content.message}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Usa el editor para dar formato al contenido de tu publicación
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Imagen de portada
              </label>

              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <>
                    <input
                      {...field}
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleImageChange(file);
                      }}
                      className="hidden"
                    />

                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`
                        relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                        transition-all duration-200
                        ${
                          isDragging
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-gray-700 hover:border-gray-600"
                        }
                        ${imagePreview ? "aspect-video" : ""}
                      `}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <div className="text-white text-sm">
                              <Upload className="mx-auto mb-2" size={24} />
                              <p>Cambiar imagen</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8">
                          <ImageIcon
                            className="mx-auto mb-4 text-gray-500"
                            size={48}
                          />
                          <p className="text-gray-400 mb-2">
                            Arrastra una imagen aquí o haz clic para seleccionar
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG o WEBP (máx. 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              />

              {errors.image && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.image.message as string}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500">
                Deja en blanco para mantener la imagen actual
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-3">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="w-full px-6 py-3 bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Actualizando...</span>
                  </>
                ) : (
                  <span>Actualizar</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(ROUTES.POSTS)}
                disabled={updateMutation.isPending}
                className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>

            <Tip />
          </div>
        </div>
      </form>
    </div>
  );
}
