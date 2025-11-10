import { Modal, type ModalProps } from "./Modal";
import { AlertTriangle } from "lucide-react";

export interface ConfirmModalProps
  extends Omit<ModalProps, "children" | "footer"> {
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: "danger" | "primary" | "warning";
  isLoading?: boolean;
  message?: string;
}

const variantClasses = {
  danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
  primary: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-white",
  warning: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white",
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  description,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonVariant = "danger",
  isLoading = false,
  ...modalProps
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
      {...modalProps}
      footer={
        <>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed
              ${variantClasses[confirmButtonVariant]}
            `}
          >
            {isLoading ? "Procesando..." : confirmText}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        {confirmButtonVariant === "danger" && (
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/50 flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={20} />
            </div>
          </div>
        )}
        <div className="flex-1">
          {message && <p className="text-gray-300">{message}</p>}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
