"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, Upload, Plus, RefreshCw, AlertCircle } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: "delete" | "upload" | "add" | "update" | "default"
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  type = "default",
}: ConfirmationModalProps) {
  const getIcon = () => {
    switch (type) {
      case "delete":
        return <Trash2 className="w-6 h-6" />
      case "upload":
        return <Upload className="w-6 h-6" />
      case "add":
        return <Plus className="w-6 h-6" />
      case "update":
        return <RefreshCw className="w-6 h-6" />
      default:
        return <AlertCircle className="w-6 h-6" />
    }
  }

  const getConfirmButtonStyle = () => {
    return "bg-[#001F4B] hover:bg-[#001F4B]/90 dark:bg-[#ec1e24] dark:hover:bg-[#ec1e24]/90 text-white shadow-lg"
  }

  const getIconStyle = () => {
    return "bg-[#001F4B]/10 dark:bg-[#ec1e24]/10 text-[#001F4B] dark:text-[#ec1e24] border-[#001F4B]/20 dark:border-[#ec1e24]/20"
  }

  const getDefaultConfirmText = () => {
    switch (type) {
      case "delete":
        return "Yes, Delete"
      case "upload":
        return "Yes, Upload"
      case "add":
        return "Yes, Add"
      case "update":
        return "Yes, Update"
      default:
        return "Confirm"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-white/5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0.3,
              }}
              className="relative bg-white/80 dark:bg-[#1a1d23]/95 backdrop-blur-xl p-8 max-w-md w-full shadow-2xl border border-white/60 dark:border-gray-700 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={onClose}
                className="absolute top-5 right-5 text-slate-400 dark:text-white/60 hover:text-slate-700 dark:hover:text-white transition-colors p-1.5 hover:bg-slate-100 dark:hover:bg-[#2a2d35]/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  delay: 0.1,
                  duration: 0.6,
                  bounce: 0.5,
                }}
                className={`w-16 h-16 ${getIconStyle()} border-2 flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                {getIcon()}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center text-balance"
              >
                {title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-600 dark:text-white/70 mb-8 text-center leading-relaxed text-pretty"
              >
                {message}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex gap-3"
              >
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-2 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-white/80 hover:bg-slate-50 dark:hover:bg-[#2a2d35]/50 hover:border-slate-300 dark:hover:border-gray-500 transition-all font-medium px-6 py-6 text-base shadow-sm bg-transparent"
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={onConfirm}
                  className={`flex-1 ${getConfirmButtonStyle()} transition-all font-medium px-6 py-6 text-base border-0`}
                >
                  {confirmText || getDefaultConfirmText()}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export { ConfirmationModal }
