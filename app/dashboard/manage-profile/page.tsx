"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Check, X } from "lucide-react"

interface AdminCredentials {
  username: string
  password: string
}

export default function ManageProfilePage() {
  const [isEditingCredentials, setIsEditingCredentials] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>({
    username: "admin",
    password: "password123",
  })

  useEffect(() => {
    const stored = localStorage.getItem("adminCredentials")
    if (stored) {
      setAdminCredentials(JSON.parse(stored))
    }
  }, [])

  const [credentialEdit, setCredentialEdit] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  })

  // Username validation
  const validateUsername = (username: string) => {
    const hasNumber = /\d/.test(username)
    const hasUppercase = /[A-Z]/.test(username)
    const hasLowercase = /[a-z]/.test(username)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(username)
    const isLengthValid = username.length >= 8

    return {
      isValid: hasNumber && hasUppercase && hasLowercase && hasSpecialChar && isLengthValid,
      hasNumber,
      hasUppercase,
      hasLowercase,
      hasSpecialChar,
      isLengthValid,
    }
  }

  // Password validation
  const validatePassword = (password: string) => {
    const hasNumber = /\d/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isLengthValid = password.length >= 8

    return {
      isValid: hasNumber && hasUppercase && hasLowercase && hasSpecialChar && isLengthValid,
      hasNumber,
      hasUppercase,
      hasLowercase,
      hasSpecialChar,
      isLengthValid,
    }
  }

  const usernameValidation = validateUsername(credentialEdit.newUsername)
  const passwordValidation = validatePassword(credentialEdit.newPassword)

  const handleEditCredentials = () => {
    setCredentialEdit({
      currentPassword: "",
      newUsername: adminCredentials.username,
      newPassword: "",
      confirmPassword: "",
    })
    setErrors({
      username: "",
      password: "",
      confirmPassword: "",
      currentPassword: "",
    })
    setIsEditingCredentials(true)
  }

  const handleSaveCredentials = () => {
    let hasError = false
    const newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
      currentPassword: "",
    }

    // Validate current password
    if (credentialEdit.currentPassword !== adminCredentials.password) {
      newErrors.currentPassword = "Current password is incorrect"
      hasError = true
    }

    // Validate username
    if (!usernameValidation.isValid) {
      newErrors.username = "Username does not meet requirements"
      hasError = true
    }

    // Validate password
    if (!passwordValidation.isValid) {
      newErrors.password = "Password does not meet requirements"
      hasError = true
    }

    // Validate confirm password
    if (credentialEdit.newPassword !== credentialEdit.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      hasError = true
    }

    setErrors(newErrors)

    if (hasError) {
      return
    }

    const newCredentials = {
      username: credentialEdit.newUsername,
      password: credentialEdit.newPassword,
    }

    setAdminCredentials(newCredentials)
    localStorage.setItem("adminCredentials", JSON.stringify(newCredentials))
    setIsEditingCredentials(false)
    alert("Credentials updated successfully!")
  }

  const handleCancelCredentials = () => {
    setIsEditingCredentials(false)
    setCredentialEdit({
      currentPassword: "",
      newUsername: "",
      newPassword: "",
      confirmPassword: "",
    })
    setErrors({
      username: "",
      password: "",
      confirmPassword: "",
      currentPassword: "",
    })
  }

  const ValidationItem = ({ valid, text }: { valid: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {valid ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}
      <span className={valid ? "text-green-600" : "text-gray-600"}>{text}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account credentials</p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Admin Credentials</h2>
              {!isEditingCredentials && (
                <Button 
                  onClick={handleEditCredentials} 
                  className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white"
                >
                  Change Credentials
                </Button>
              )}
            </div>

            {isEditingCredentials ? (
              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={credentialEdit.currentPassword}
                      onChange={(e) => setCredentialEdit((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none pr-12 ${
                        errors.currentPassword ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>

                {/* New Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={credentialEdit.newUsername}
                    onChange={(e) => setCredentialEdit((prev) => ({ ...prev, newUsername: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter new username"
                    required
                  />
                  {credentialEdit.newUsername && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Username Requirements:</p>
                      <ValidationItem valid={usernameValidation.isLengthValid} text="At least 8 characters" />
                      <ValidationItem valid={usernameValidation.hasUppercase} text="Contains uppercase letter" />
                      <ValidationItem valid={usernameValidation.hasLowercase} text="Contains lowercase letter" />
                      <ValidationItem valid={usernameValidation.hasNumber} text="Contains number" />
                      <ValidationItem valid={usernameValidation.hasSpecialChar} text="Contains special character (!@#$%^&*...)" />
                    </div>
                  )}
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={credentialEdit.newPassword}
                      onChange={(e) => setCredentialEdit((prev) => ({ ...prev, newPassword: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none pr-12 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {credentialEdit.newPassword && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                      <ValidationItem valid={passwordValidation.isLengthValid} text="At least 8 characters" />
                      <ValidationItem valid={passwordValidation.hasUppercase} text="Contains uppercase letter" />
                      <ValidationItem valid={passwordValidation.hasLowercase} text="Contains lowercase letter" />
                      <ValidationItem valid={passwordValidation.hasNumber} text="Contains number" />
                      <ValidationItem valid={passwordValidation.hasSpecialChar} text="Contains special character (!@#$%^&*...)" />
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={credentialEdit.confirmPassword}
                      onChange={(e) => setCredentialEdit((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none pr-12 ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                  {credentialEdit.confirmPassword && credentialEdit.newPassword === credentialEdit.confirmPassword && (
                    <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Passwords match
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancelCredentials}
                    className="w-full sm:w-auto border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveCredentials} 
                    className="w-full sm:w-auto bg-[#001F4B] hover:bg-[#001F4B]/90 text-white"
                    disabled={!usernameValidation.isValid || !passwordValidation.isValid || credentialEdit.newPassword !== credentialEdit.confirmPassword || !credentialEdit.currentPassword}
                  >
                    Save Credentials
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Click "Change Credentials" to update your username and password</p>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
