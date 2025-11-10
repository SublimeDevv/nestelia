import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { useToastStore, type ToastType } from "@/stores/toastStore";

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/50",
    textColor: "text-green-400",
    iconColor: "text-green-500",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/50",
    textColor: "text-red-400",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/50",
    textColor: "text-yellow-400",
    iconColor: "text-yellow-500",
  },
  information: {
    icon: Info,
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-400",
    iconColor: "text-blue-500",
  },
};

interface ToastItemProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

const ToastItem = ({ id, type, message, duration = 5000 }: ToastItemProps) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, removeToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        flex items-start gap-3 p-4 rounded-lg border backdrop-blur-xl
        ${config.bgColor} ${config.borderColor}
        shadow-lg min-w-[320px] max-w-md
      `}
    >
      <Icon className={`${config.iconColor} shrink-0 mt-0.5`} size={20} />

      <div className="flex-1">
        <p className={`${config.textColor} text-sm font-medium`}>{message}</p>
      </div>

      <button
        onClick={() => removeToast(id)}
        className={`${config.textColor} hover:opacity-70 transition-opacity shrink-0`}
        aria-label="Cerrar notificación"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed top-4 right-4 z-9999 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem
              id={toast.id}
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
