"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
  FaInstagram, 
  FaTiktok, 
  FaBehance, 
  FaPinterest, 
  FaLinkedin, 
  FaTwitter 
} from "react-icons/fa"

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

interface PortfolioProfile {
  description: string
  phoneNumber1: string
  phoneNumber2: string
  email: string
  socialMedia: {
    instagram: string
    tiktok: string
    linkedin: string
    pinterest: string
    behance: string
  }
}

interface AdminCredentials {
  username: string
  password: string
}

const DEFAULT_PROFILE: PortfolioProfile = {
  description: "NEDF Studios is a creative design and architecture firm specializing in modern, sustainable spaces that blend innovation with timeless aesthetics. We bring your vision to life.",
  phoneNumber1: "+251 911 234 567",
  phoneNumber2: "+251 911 234 568",
  email: "info@nedfstudios.com",
  socialMedia: {
    instagram: "https://instagram.com/nedfstudios",
    tiktok: "https://tiktok.com/@nedfstudios",
    linkedin: "https://linkedin.com/company/nedfstudios",
    pinterest: "https://pinterest.com/nedfstudios",
    behance: "https://behance.net/nedfstudios",
  },
}

const socialPlatforms: Record<string, React.ReactNode> = {
  instagram: <FaInstagram className="w-4 h-4" />,
  tiktok: <FaTiktok className="w-4 h-4" />,
  behance: <FaBehance className="w-4 h-4" />,
  pinterest: <FaPinterest className="w-4 h-4" />,
  linkedin: <FaLinkedin className="w-4 h-4" />,
  twitter: <FaTwitter className="w-4 h-4" />,
  x: <FaTwitter className="w-4 h-4" />,
}

const getSocialIcon = (platform: string) => {
  return socialPlatforms[platform] || <span className="w-4 h-4 text-gray-600 dark:text-white/60 text-xs">{platform[0].toUpperCase()}</span>;
}

export default function EditProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<PortfolioProfile>(DEFAULT_PROFILE)
  const [editProfile, setEditProfile] = useState<PortfolioProfile>(DEFAULT_PROFILE)

  // Credential management states
  const [isEditingCredentials, setIsEditingCredentials] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>({
    username: "admin",
    password: "password123",
  })
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

  useEffect(() => {
    const stored = localStorage.getItem("portfolioProfile")
    if (stored) {
      const parsedProfile = JSON.parse(stored)
      setProfile(parsedProfile)
      setEditProfile(parsedProfile)
    }

    const storedCredentials = localStorage.getItem("adminCredentials")
    if (storedCredentials) {
      setAdminCredentials(JSON.parse(storedCredentials))
    }
  }, [])

  const handleCancel = () => {
    setEditProfile(profile)
    router.back()
  }

  const handleSave = () => {
    setProfile(editProfile)
    localStorage.setItem("portfolioProfile", JSON.stringify(editProfile))
    router.back()
  }

  const charCount = editProfile.description.length
  const maxChars = 353

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

    if (credentialEdit.currentPassword !== adminCredentials.password) {
      newErrors.currentPassword = "Current password is incorrect"
      hasError = true
    }

    if (!usernameValidation.isValid) {
      newErrors.username = "Username does not meet requirements"
      hasError = true
    }

    if (!passwordValidation.isValid) {
      newErrors.password = "Password does not meet requirements"
      hasError = true
    }

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
      <span className={valid ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-white/60"}>{text}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
            <ArrowLeftIcon />
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Edit Profile</h1>
        </div>

        <Card className="shadow-lg dark:bg-[#1a1d23] dark:border-gray-700">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">NEDF STUDIO</h2>
            </div>

            <div className="space-y-6">
              {/* About NEDF */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                  About NEDF <span className="text-gray-500 dark:text-white/60">({charCount}/{maxChars} characters)</span>
                </label>
                <textarea
                  value={editProfile.description}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value.length <= maxChars) {
                      setEditProfile((prev) => ({ ...prev, description: value }))
                    }
                  }}
                  rows={4}
                  maxLength={maxChars}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none resize-none dark:bg-[#1a1d23] dark:text-white"
                  placeholder="Enter company description (max 353 characters)"
                />
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Phone Number 1
                  </label>
                  <input
                    type="tel"
                    value={editProfile.phoneNumber1}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, phoneNumber1: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none dark:bg-[#1a1d23] dark:text-white"
                    placeholder="+251 911 234 567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Phone Number 2 <span className="text-gray-500 dark:text-white/60">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={editProfile.phoneNumber2}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, phoneNumber2: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none dark:bg-[#1a1d23] dark:text-white"
                    placeholder="+251 911 234 568"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editProfile.email}
                  onChange={(e) => setEditProfile((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none dark:bg-[#1a1d23] dark:text-white"
                  placeholder="info@company.com"
                />
              </div>

              {/* Social Media Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-4">
                  Social Media Links
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-white/60 mb-1">Instagram</label>
                    <input
                      type="url"
                      value={editProfile.socialMedia.instagram}
                      onChange={(e) => setEditProfile((prev) => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                      placeholder="https://instagram.com/yourcompany"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-white/60 mb-1">TikTok</label>
                    <input
                      type="url"
                      value={editProfile.socialMedia.tiktok}
                      onChange={(e) => setEditProfile((prev) => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, tiktok: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                      placeholder="https://tiktok.com/@yourcompany"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-white/60 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={editProfile.socialMedia.linkedin}
                      onChange={(e) => setEditProfile((prev) => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-white/60 mb-1">Pinterest</label>
                    <input
                      type="url"
                      value={editProfile.socialMedia.pinterest}
                      onChange={(e) => setEditProfile((prev) => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, pinterest: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                      placeholder="https://pinterest.com/yourcompany"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-white/60 mb-1">Behance</label>
                    <input
                      type="url"
                      value={editProfile.socialMedia.behance}
                      onChange={(e) => setEditProfile((prev) => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, behance: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                      placeholder="https://behance.net/yourcompany"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full sm:w-auto border-[#001F4B] dark:border-[#ec1e24] text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white bg-transparent"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  className="w-full sm:w-auto bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Credentials Card */}
        <Card className="shadow-lg dark:bg-[#1a1d23] dark:border-gray-700 mt-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">Admin Credentials</h2>
              {!isEditingCredentials && (
                <Button 
                  onClick={handleEditCredentials} 
                  className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white"
                >
                  Edit Credentials
                </Button>
              )}
            </div>

            {isEditingCredentials ? (
              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Current Password <span className="text-[#ec1e24]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={credentialEdit.currentPassword}
                      onChange={(e) => setCredentialEdit((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none pr-12 dark:bg-[#1a1d23] dark:text-white ${
                        errors.currentPassword ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-white/50"
                      }`}
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>

                {/* New Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    New Username <span className="text-[#ec1e24]">*</span>
                  </label>
                  <input
                    type="text"
                    value={credentialEdit.newUsername}
                    onChange={(e) => setCredentialEdit((prev) => ({ ...prev, newUsername: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none dark:bg-[#1a1d23] dark:text-white ${
                      errors.username ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-white/50"
                    }`}
                    placeholder="Enter new username"
                    required
                  />
                  {credentialEdit.newUsername && (
                    <div className="mt-3 p-4 bg-gray-50 dark:bg-[#2a2d35] rounded-lg space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-white mb-2">Username Requirements:</p>
                      <ValidationItem valid={usernameValidation.isLengthValid} text="At least 8 characters" />
                      <ValidationItem valid={usernameValidation.hasUppercase} text="Contains uppercase letter" />
                      <ValidationItem valid={usernameValidation.hasLowercase} text="Contains lowercase letter" />
                      <ValidationItem valid={usernameValidation.hasNumber} text="Contains number" />
                      <ValidationItem valid={usernameValidation.hasSpecialChar} text="Contains special character (!@#$%^&*...)" />
                    </div>
                  )}
                  {errors.username && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    New Password <span className="text-[#ec1e24]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={credentialEdit.newPassword}
                      onChange={(e) => setCredentialEdit((prev) => ({ ...prev, newPassword: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none pr-12 dark:bg-[#1a1d23] dark:text-white ${
                        errors.password ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-white/50"
                      }`}
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {credentialEdit.newPassword && (
                    <div className="mt-3 p-4 bg-gray-50 dark:bg-[#2a2d35] rounded-lg space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-white mb-2">Password Requirements:</p>
                      <ValidationItem valid={passwordValidation.isLengthValid} text="At least 8 characters" />
                      <ValidationItem valid={passwordValidation.hasUppercase} text="Contains uppercase letter" />
                      <ValidationItem valid={passwordValidation.hasLowercase} text="Contains lowercase letter" />
                      <ValidationItem valid={passwordValidation.hasNumber} text="Contains number" />
                      <ValidationItem valid={passwordValidation.hasSpecialChar} text="Contains special character (!@#$%^&*...)" />
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Confirm New Password <span className="text-[#ec1e24]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={credentialEdit.confirmPassword}
                      onChange={(e) => setCredentialEdit((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none pr-12 dark:bg-[#1a1d23] dark:text-white ${
                        errors.confirmPassword ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-white/50"
                      }`}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                  {credentialEdit.confirmPassword && credentialEdit.newPassword === credentialEdit.confirmPassword && (
                    <p className="text-green-600 dark:text-green-400 text-sm mt-1 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Passwords match
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={handleCancelCredentials}
                    className="w-full sm:w-auto border-[#001F4B] dark:border-[#ec1e24] text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveCredentials} 
                    className="w-full sm:w-auto bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white"
                    disabled={!usernameValidation.isValid || !passwordValidation.isValid || credentialEdit.newPassword !== credentialEdit.confirmPassword || !credentialEdit.currentPassword}
                  >
                    Save Credentials
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Current Credentials */}
                <div className="space-y-3">
                  {/* Username */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2d35] rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#001F4B] dark:bg-[#ec1e24] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Username</p>
                        <p className="text-xs text-gray-500 dark:text-white/60">Admin login</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-gray-900 dark:text-white">{adminCredentials.username}</p>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2d35] rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#001F4B] dark:bg-[#ec1e24] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Password</p>
                        <p className="text-xs text-gray-500 dark:text-white/60">Admin login</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-gray-900 dark:text-white">••••••••</p>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 dark:text-white/60">
                    Click "Edit Credentials" to update your login information
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
