"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Instagram, Linkedin, Eye, EyeOff, Check, X } from "lucide-react"

interface PortfolioProfile {
  logo: string
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
  logo: "/nedf-logo.png",
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

export default function ManageProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<PortfolioProfile>(DEFAULT_PROFILE)
  const [editProfile, setEditProfile] = useState<PortfolioProfile>(DEFAULT_PROFILE)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

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

  const handleEdit = () => {
    setEditProfile(profile)
    setLogoPreview(null)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditProfile(profile)
    setLogoPreview(null)
    setIsEditing(false)
  }

  const handleSave = () => {
    const updatedProfile = { ...editProfile }
    if (logoPreview) {
      updatedProfile.logo = logoPreview
    }
    
    setProfile(updatedProfile)
    localStorage.setItem("portfolioProfile", JSON.stringify(updatedProfile))
    setIsEditing(false)
    setLogoPreview(null)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
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
      <span className={valid ? "text-green-600" : "text-gray-600"}>{text}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Profile</h1>
          <p className="text-gray-600 mt-2">Manage your portfolio information and contact details</p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Portfolio Information</h2>
              {!isEditing && (
                <Button 
                  onClick={handleEdit} 
                  className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white"
                >
                  Edit Profile
                </Button>
              )}
            </div>

            {isEditing ? (
              /* EDIT MODE */
              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Logo
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      {logoPreview || editProfile.logo ? (
                        <Image
                          src={logoPreview || editProfile.logo}
                          alt="Logo preview"
                          width={120}
                          height={120}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No logo</span>
                      )}
                    </div>
                    <div>
                    <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                      <Button
                      type="button"
                        variant="outline"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                        className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white"
                      >
                        Upload New Logo
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-gray-500">({charCount}/{maxChars} characters)</span>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none resize-none"
                    placeholder="Enter company description (max 353 characters)"
                  />
                </div>

                {/* Phone Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number 1
                  </label>
                    <input
                      type="tel"
                      value={editProfile.phoneNumber1}
                      onChange={(e) => setEditProfile((prev) => ({ ...prev, phoneNumber1: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none"
                      placeholder="+251 911 234 567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number 2 <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={editProfile.phoneNumber2}
                      onChange={(e) => setEditProfile((prev) => ({ ...prev, phoneNumber2: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none"
                      placeholder="+251 911 234 568"
                    />
                    </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none"
                    placeholder="info@company.com"
                  />
                </div>

                {/* Social Media Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Social Media Links
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Instagram</label>
                      <input
                        type="url"
                        value={editProfile.socialMedia.instagram}
                        onChange={(e) => setEditProfile((prev) => ({ 
                          ...prev, 
                          socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none text-sm"
                        placeholder="https://instagram.com/yourcompany"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">TikTok</label>
                      <input
                        type="url"
                        value={editProfile.socialMedia.tiktok}
                        onChange={(e) => setEditProfile((prev) => ({ 
                          ...prev, 
                          socialMedia: { ...prev.socialMedia, tiktok: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none text-sm"
                        placeholder="https://tiktok.com/@yourcompany"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        value={editProfile.socialMedia.linkedin}
                        onChange={(e) => setEditProfile((prev) => ({ 
                          ...prev, 
                          socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none text-sm"
                        placeholder="https://linkedin.com/company/yourcompany"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Pinterest</label>
                      <input
                        type="url"
                        value={editProfile.socialMedia.pinterest}
                        onChange={(e) => setEditProfile((prev) => ({ 
                          ...prev, 
                          socialMedia: { ...prev.socialMedia, pinterest: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none text-sm"
                        placeholder="https://pinterest.com/yourcompany"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Behance</label>
                    <input
                        type="url"
                        value={editProfile.socialMedia.behance}
                        onChange={(e) => setEditProfile((prev) => ({ 
                          ...prev, 
                          socialMedia: { ...prev.socialMedia, behance: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none text-sm"
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
                    className="w-full sm:w-auto border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    className="w-full sm:w-auto bg-[#001F4B] hover:bg-[#001F4B]/90 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              /* VIEW MODE */
              <div className="space-y-6">
                {/* Logo */}
                <div className="flex justify-center py-4">
                  <div className="relative w-40 h-40 border border-gray-200 rounded-lg flex items-center justify-center bg-white">
                    {profile.logo ? (
                      <Image
                        src={profile.logo}
                        alt="Company Logo"
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">No logo</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-800 leading-relaxed">{profile.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{profile.description.length} / 353 characters</p>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Phone Numbers</h3>
                    <div className="space-y-2">
                      {profile.phoneNumber1 && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#001F4B]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span className="text-gray-800">{profile.phoneNumber1}</span>
                        </div>
                      )}
                      {profile.phoneNumber2 && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#001F4B]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <span className="text-gray-800">{profile.phoneNumber2}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Email</h3>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#001F4B]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a href={`mailto:${profile.email}`} className="text-[#001F4B] hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Social Media</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {profile.socialMedia.instagram && (
                      <a
                        href={profile.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                      >
                        <Instagram className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-gray-700">Instagram</span>
                      </a>
                    )}
                    {profile.socialMedia.tiktok && (
                      <a
                        href={profile.socialMedia.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                      >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                        <span className="text-xs text-gray-700">TikTok</span>
                      </a>
                    )}
                    {profile.socialMedia.linkedin && (
                      <a
                        href={profile.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                      >
                        <Linkedin className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-gray-700">LinkedIn</span>
                      </a>
                    )}
                    {profile.socialMedia.pinterest && (
                      <a
                        href={profile.socialMedia.pinterest}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                      >
                        <svg className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0a12 12 0 00-4.37 23.17c-.07-.63-.12-1.58.03-2.27l1.03-4.37s-.26-.53-.26-1.31c0-1.23.71-2.15 1.6-2.15.75 0 1.12.56 1.12 1.24 0 .75-.48 1.88-.73 2.93-.21.87.44 1.58 1.3 1.58 1.56 0 2.76-1.64 2.76-4.01 0-2.09-1.5-3.56-3.65-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.16.06.25l-.24 1c-.04.15-.13.19-.3.11-1.09-.51-1.77-2.1-1.77-3.38 0-2.76 2-5.29 5.76-5.29 3.03 0 5.38 2.16 5.38 5.04 0 3-1.89 5.42-4.52 5.42-.88 0-1.71-.46-1.99-.99l-.54 2.06c-.2.76-.73 1.71-1.09 2.29A12 12 0 1012 0z"/>
                        </svg>
                        <span className="text-xs text-gray-700">Pinterest</span>
                      </a>
                    )}
                    {profile.socialMedia.behance && (
                      <a
                        href={profile.socialMedia.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                      >
                        <svg className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.25-1.91.25H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.837 0-1.584-.13-2.24-.4-.65-.27-1.2-.65-1.64-1.14-.44-.49-.78-1.08-1.02-1.76-.24-.68-.36-1.43-.36-2.25 0-.81.12-1.54.36-2.19.24-.65.58-1.22 1.02-1.7.44-.48.98-.86 1.64-1.14.65-.28 1.4-.42 2.24-.42.88 0 1.63.15 2.27.45.64.3 1.17.71 1.6 1.23.42.52.73 1.12.93 1.82.2.7.3 1.43.28 2.18h-7.69c.01.97.29 1.85.71 2.28zm-6.16-6.9c.49 0 .93.09 1.33.26.4.17.74.39 1.04.66.29.27.51.58.67.92.16.34.24.69.24 1.04H7.27c.08-.98.39-1.72.93-2.23.54-.51 1.21-.77 2.01-.77zM0 20.926h24V24H0v-3.074zm15.76-7.16h4.29c-.02-.36-.1-.67-.22-.94-.12-.27-.28-.5-.49-.68-.2-.18-.44-.32-.71-.41-.27-.1-.56-.15-.87-.15-.3 0-.58.05-.85.15-.27.1-.5.24-.7.42-.2.18-.36.41-.48.68-.12.27-.2.58-.22.94z"/>
                  </svg>
                        <span className="text-xs text-gray-700">Behance</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Admin Credentials Card */}
        <Card className="shadow-lg mt-8">
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
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
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
