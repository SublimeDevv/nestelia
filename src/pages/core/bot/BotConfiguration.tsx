import { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Settings,
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  XCircle,
  Database,
  Key,
  Bot,
  AlertTriangle,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/stores/toastStore";
import { ConfirmModal } from "@/components/ui";
import {
  getHealth,
  uploadPdf,
  clearChromaDb,
  createApiKey,
  updateApiKey,
  getModelName,
  createModelName,
  updateModelName,
} from "./services/chatbotService";
import type { BotDto } from "./interfaces/configuration";
import { apiKeySchema, modelNameSchema, type ApiKeyFormData, type ModelNameFormData } from "./schemas/chatbot.schema";


export default function BotConfiguration() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const { data: healthData, isLoading: isHealthLoading } = useQuery({
    queryKey: ["bot-health"],
    queryFn: getHealth,
    refetchInterval: 10000, 
  });

  const { data: modelNameData } = useQuery({
    queryKey: ["model-name"],
    queryFn: getModelName,
  });

  const apiKeyForm = useForm<ApiKeyFormData>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      value: "",
    },
  });

  const modelNameForm = useForm<ModelNameFormData>({
    resolver: zodResolver(modelNameSchema),
    defaultValues: {
      modelName: "",
    },
  });

  useEffect(() => {
    if (modelNameData?.isSuccess && modelNameData.data) {
      if (modelNameData.data.modelName) {
        modelNameForm.setValue("modelName", modelNameData.data.modelName);
      }
      if (modelNameData.data.apiKey) {
        apiKeyForm.setValue("value", modelNameData.data.apiKey);
      }
    }
  }, [modelNameData, modelNameForm, apiKeyForm]);

  const uploadMutation = useMutation({
    mutationFn: uploadPdf,
    onSuccess: (data) => {
      toast.success(
        `PDF procesado: ${data.chunksProcessed} chunks en ${data.processingTimeSeconds.toFixed(2)}s`
      );
      setSelectedFile(null);
      queryClient.invalidateQueries({ queryKey: ["bot-health"] });
    },
    onError: (error: Error) => {
      toast.error(`Error al subir PDF: ${error.message}`);
    },
  });

  const clearDbMutation = useMutation({
    mutationFn: clearChromaDb,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["bot-health"] });
    },
    onError: (error: Error) => {
      toast.error(`Error al limpiar la base de datos: ${error.message}`);
    },
  });

  const createApiKeyMutation = useMutation({
    mutationFn: createApiKey,
    onSuccess: () => {
      toast.success("API Key creada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["model-name"] });
    },
    onError: (error: Error) => {
      toast.error(`Error al crear API Key: ${error.message}`);
    },
  });

  const updateApiKeyMutation = useMutation({
    mutationFn: updateApiKey,
    onSuccess: () => {
      toast.success("API Key actualizada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["model-name"] });
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar API Key: ${error.message}`);
    },
  });

  const createModelMutation = useMutation({
    mutationFn: createModelName,
    onSuccess: () => {
      toast.success("Nombre del modelo creado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["model-name"] });
    },
    onError: (error: Error) => {
      toast.error(`Error al crear nombre del modelo: ${error.message}`);
    },
  });

  const updateModelMutation = useMutation({
    mutationFn: updateModelName,
    onSuccess: () => {
      toast.success("Nombre del modelo actualizado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["model-name"] });
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar nombre del modelo: ${error.message}`);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else if (file) {
      toast.error("Solo se permiten archivos PDF");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast.error("Solo se permiten archivos PDF");
    }
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUploadPdf = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  const handleClearDb = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmClearDb = () => {
    clearDbMutation.mutate();
    setShowConfirmModal(false);
  };

  const onSubmitApiKey = (data: ApiKeyFormData) => {
    const botDto: BotDto = {
      key: "OPENAI_API_KEY",
      value: data.value,
    };
    if (modelNameData?.data?.apiKey) {
      updateApiKeyMutation.mutate(botDto);
    } else {
      createApiKeyMutation.mutate(botDto);
    }
  };

  const onSubmitModelName = (data: ModelNameFormData) => {
    const botDto: BotDto = {
      key: "MODEL_NAME",
      value: data.modelName,
    };
    if (modelNameData?.data?.modelName) {
      updateModelMutation.mutate(botDto);
    } else {
      createModelMutation.mutate(botDto);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="text-purple-400" size={32} />
          <h1 className="text-3xl font-bold text-white">
            Configuración del Bot
          </h1>
        </div>
        <p className="text-gray-400">
          Administra la configuración del chatbot y la base de datos de conocimiento
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="text-purple-400" size={24} />
            <h2 className="text-xl font-semibold text-white">Estado del sistema</h2>
          </div>

            {isHealthLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-purple-400" size={32} />
              </div>
            ) : healthData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Estado</span>
                    {healthData.status === "running" ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {healthData.status === "running" ? "Activo" : "Inactivo"}
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Ollama</span>
                    {healthData.ollamaAvailable ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {healthData.ollamaAvailable ? "Disponible" : "No disponible"}
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Documentos</span>
                    <Database className="text-purple-400" size={20} />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {healthData.chunksInStore} chunks
                  </p>
                </div>
              </div>
            ) : null}

            {healthData && !healthData.ollamaAvailable && (
              <div className="mt-4 flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm text-yellow-400 font-medium">
                    {healthData.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Ejecuta `ollama serve` en tu terminal para iniciar el servicio
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* Gestión de Documentos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subir Documentos */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Subir documentos</h2>
              </div>

            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${
                  isDragging
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }
              `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="space-y-4">
                  <FileText className="mx-auto text-purple-400" size={48} />
                  <div>
                    <p className="text-white font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleUploadPdf}
                      disabled={uploadMutation.isPending}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {uploadMutation.isPending ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Subir PDF
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto text-gray-500" size={48} />
                  <div>
                    <p className="text-white font-medium mb-1">
                      Arrastra un archivo PDF aquí
                    </p>
                    <p className="text-sm text-gray-400">o</p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Seleccionar archivo
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-400">
                Los documentos PDF se procesarán y almacenarán en la base de datos
                para que el chatbot pueda responder preguntas basadas en su contenido.
              </p>
              <p className="text-xs text-blue-300/80 mt-2">
                El procesamiento puede tardar varios minutos dependiendo del tamaño del archivo.
                Por favor, espera mientras se completa la operación.
              </p>
            </div>
          </div>
          </div>

          {/* Limpiar Base de Datos */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-red-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Base de datos</h2>
              </div>

              <p className="text-sm text-gray-400 mb-4 grow">
                Limpia todos los documentos almacenados en ChromaDB. Esta acción no se puede deshacer.
              </p>

              <button
                onClick={handleClearDb}
                disabled={clearDbMutation.isPending}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {clearDbMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Limpiando...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Limpiar BD
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Configuración API */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="text-green-400" size={24} />
                <h2 className="text-xl font-semibold text-white">API Key de OpenAI</h2>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Clave API
                  </label>
                  <div className="relative">
                    <input
                      {...apiKeyForm.register("value")}
                      type={showApiKey ? "text" : "password"}
                      className="w-full px-4 py-2 pr-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="sk-..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label={showApiKey ? "Ocultar API Key" : "Mostrar API Key"}
                    >
                      {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {apiKeyForm.formState.errors.value && (
                    <p className="mt-1 text-sm text-red-400">
                      {apiKeyForm.formState.errors.value.message}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    La API key se utiliza para interactuar con los servicios de OpenAI
                  </p>
                </div>

                <button
                  type="button"
                  onClick={apiKeyForm.handleSubmit(onSubmitApiKey)}
                  disabled={
                    createApiKeyMutation.isPending || updateApiKeyMutation.isPending
                  }
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {createApiKeyMutation.isPending || updateApiKeyMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Guardando...
                    </>
                  ) : (
                    modelNameData?.data?.apiKey ? "Actualizar" : "Guardar"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Modelo */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="text-blue-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Modelo de IA</h2>
              </div>

              <form onSubmit={modelNameForm.handleSubmit(onSubmitModelName)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del Modelo
                  </label>
                  <input
                    {...modelNameForm.register("modelName")}
                    type="text"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="llama3.2:latest"
                  />
                  {modelNameForm.formState.errors.modelName && (
                    <p className="mt-1 text-sm text-red-400">
                      {modelNameForm.formState.errors.modelName.message}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-400">
                    Especifica el modelo de Ollama que se utilizará para las respuestas
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={
                    createModelMutation.isPending || updateModelMutation.isPending
                  }
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {createModelMutation.isPending || updateModelMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Guardando...
                    </>
                  ) : (
                    modelNameData?.data?.modelName ? "Actualizar" : "Guardar"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmClearDb}
        title="Limpiar base de datos"
        message="¿Estás seguro de que deseas limpiar toda la base de datos? Esta acción no se puede deshacer y eliminará todos los documentos almacenados en ChromaDB."
        confirmText="Sí, limpiar"
        cancelText="Cancelar"
        confirmButtonVariant="danger"
        isLoading={clearDbMutation.isPending}
      />
    </div>
  );
}

