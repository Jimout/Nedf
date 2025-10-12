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
    switch (type) {
      case "delete":
        return "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
      case "upload":
        return "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
      case "add":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
      case "update":
        return "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40"
      default:
        return "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40"
    }
  }

  const getIconStyle = () => {
    switch (type) {
      case "delete":
        return "bg-gradient-to-br from-red-500/10 to-rose-500/10 text-red-600 border-red-200"
      case "upload":
        return "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-200"
      case "add":
        return "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-200"
      case "update":
        return "bg-gradient-to-br from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-200"
      default:
        return "bg-gradient-to-br from-violet-500/10 to-purple-500/10 text-violet-600 border-violet-200"
    }
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
              className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/60 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={onClose}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-full hover:bg-slate-100"
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
                className={`w-16 h-16 rounded-2xl ${getIconStyle()} border-2 flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                {getIcon()}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl font-bold text-slate-900 mb-3 text-center text-balance"
              >
                {title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-600 mb-8 text-center leading-relaxed text-pretty"
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
                  className="flex-1 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all font-medium px-6 py-6 rounded-xl text-base shadow-sm bg-transparent"
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={onConfirm}
                  className={`flex-1 ${getConfirmButtonStyle()} transition-all font-medium px-6 py-6 rounded-xl text-base border-0`}
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
