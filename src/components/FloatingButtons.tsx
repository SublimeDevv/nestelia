import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LayoutDashboard } from "lucide-react";
import { useAuth } from "@/stores/authStore";
import { ROUTES } from "@/router/routes.config";
import { Modal } from "@/components/ui/Modal";
import Chatbot from "@/pages/core/bot/Chatbot";

export default function FloatingButtons() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = isAuthenticated && user?.role?.toLowerCase() === "admin";

  return (
    <>
        {isAdmin && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="fixed bottom-28 right-6 z-50 w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 shadow-2xl border-2 border-indigo-500/50 hover:border-indigo-400 transition-all flex items-center justify-center group"
          aria-label="Ir al Dashboard"
          title="Dashboard"
        >
          <LayoutDashboard className="w-7 h-7 text-indigo-400" />
          <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Dashboard
          </span>
        </motion.button>
      )}

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full overflow-hidden shadow-2xl border-2 border-purple-500/50 hover:border-purple-400 transition-all bg-gray-800 flex items-center justify-center"
        aria-label="Abrir chatbot"
      >
        <img
          src="/images/bubot.webp"
          alt="BuBot"
          className="w-full h-full object-cover object-left"
        />
      </motion.button>

      <Modal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        size="3xl"
        showCloseButton={false}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <Chatbot onClose={() => setIsChatbotOpen(false)} />
      </Modal>
    </>
  );
}

