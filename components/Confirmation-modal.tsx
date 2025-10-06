"use client"

import { Button } from "@/components/ui/button"

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
  if (!isOpen) return null

  const getConfirmButtonStyle = () => {
    switch (type) {
      case "delete":
        return "bg-red-500 hover:bg-red-600 text-white"
      case "upload":
        return "bg-green-500 hover:bg-green-600 text-white"
      case "add":
        return "bg-blue-500 hover:bg-blue-600 text-white"
      case "update":
        return "bg-orange-500 hover:bg-orange-600 text-white"
      default:
        return "bg-[#001F4B] hover:bg-[#001F4B]/90 text-white"
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
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-[#001F4B] mb-4 font-montserrat">{title}</h3>
        <p className="text-gray-600 mb-6 font-montserrat">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 font-montserrat bg-transparent"
          >
            {cancelText}
          </Button>
          <Button onClick={onConfirm} className={`${getConfirmButtonStyle()} font-montserrat`}>
            {confirmText || getDefaultConfirmText()}
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ConfirmationModal }
