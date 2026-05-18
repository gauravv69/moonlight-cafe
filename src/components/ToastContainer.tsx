import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useToastStore } from "../store/toastStore";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 w-full max-w-[360px] pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto w-full glass-panel-heavy border border-glass-border p-4 rounded-xl flex items-start gap-3 shadow-2xl"
          >
            {t.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            )}
            {t.type === "error" && (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            )}
            {t.type === "info" && (
              <Info className="w-5 h-5 text-brand-beige shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <p className="text-xs font-semibold tracking-wider text-brand-beige uppercase font-display mb-0.5">
                {t.type === "success" ? "Notification" : t.type === "error" ? "Alert" : "Info"}
              </p>
              <p className="text-sm text-offwhite font-sans font-light">
                {t.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-subtle hover:text-offwhite transition-colors p-0.5 rounded-full hover:bg-white/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
