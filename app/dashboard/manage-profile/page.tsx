"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Edit2 } from "lucide-react"

interface Contact {
  phone: string
}

interface SocialMedia {
  instagram: string
  linkedin: string
  behance: string
  tiktok: string
  pinterest: string
}

interface ProfileData {
  companyName: string
  companyLogo: string
  about: string
  contacts: Contact[]
  email: string
  socialMedia: SocialMedia
}

interface ManageProfilePageProps {
  onBack: () => void
}

export default function ManageProfilePage({ onBack }: ManageProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const originalAbout =
    "NEDF is a creative studio based in Addis Ababa, Ethiopia, specializing in architectural design, interior spaces, and high-end visualizations. We blend design with technology to create thoughtful, innovative, and visually compelling environments. From concept to execution, our work reflects a commitment to clarity, craft, and bold creative expression......."

  const [profileData, setProfileData] = useState<ProfileData>({
    companyName: "NEDF",
    companyLogo: "/nedf-logo.png",
    about: originalAbout,
    contacts: [{ phone: "+1 (555) 123-4567" }, { phone: "+1 (555) 987-6543" }],
    email: "contact@nedf.studio",
    socialMedia: {
      instagram: "@nedf.studio",
      linkedin: "company/nedf",
      behance: "nedf",
      tiktok: "@nedf.studio",
      pinterest: "nedf",
    },
  })

  const [editData, setEditData] = useState<ProfileData>(profileData)

  const handleEdit = () => {
    setEditData({ ...profileData })
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfileData({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditData((prev) => ({ ...prev, companyLogo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addContact = () => {
    if (editData.contacts.length < 2) {
      setEditData((prev) => ({
        ...prev,
        contacts: [...prev.contacts, { phone: "" }],
      }))
    }
  }

  const removeContact = (index: number) => {
    setEditData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }))
  }

  const updateContact = (index: number, value: string) => {
    setEditData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) => (i === index ? { phone: value } : contact)),
    }))
  }

  const updateSocialMedia = (platform: keyof SocialMedia, value: string) => {
    setEditData((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value },
    }))
  }

  const removeSocialMedia = (platform: keyof SocialMedia) => {
    setEditData((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: "" },
    }))
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.203-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        )
      case "linkedin":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      case "behance":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.76-.62.16-1.25.24-1.89.24H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.837 0-1.584-.13-2.272-.4-.673-.27-1.24-.65-1.72-1.14-.464-.49-.823-1.08-1.077-1.77-.253-.69-.373-1.45-.373-2.27 0-.803.135-1.54.403-2.23.27-.7.644-1.28 1.12-1.79.495-.51 1.063-.9 1.736-1.194.672-.297 1.39-.447 2.17-.447.915 0 1.683.16 2.284.48.6.324 1.084.75 1.454 1.28.37.53.633 1.14.78 1.82.148.68.196 1.37.14 2.09h-7.69c.036.82.27 1.445.71 1.87l.007-.005zm-10.24.05c.317 0 .62-.03.906-.093.29-.06.548-.165.763-.3.21-.135.39-.328.52-.583.13-.24.19-.57.19-.96 0-.75-.22-1.29-.64-1.62-.43-.32-.99-.48-1.69-.48H3.24v4.05H6.7v-.03zm13.607-5.65c-.352-.385-.94-.578-1.77-.578-.57 0-.88.08-1.18.226-.31.135-.56.31-.75.5-.19.18-.3.37-.37.56-.07.18-.12.33-.15.45h4.26c-.11-.72-.39-1.264-.04-1.158z" />
          </svg>
        )
      case "tiktok":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        )
      case "pinterest":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12.013C24.007 5.367 18.641.001 12.017.001z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
          </svg>
        )
    }
  }

  const currentData = isEditing ? editData : profileData
  const aboutCharCount = currentData.about.length
  const originalCharCount = originalAbout.length
  const isAboutValidLength = aboutCharCount === originalCharCount

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!isAboutValidLength}
                  className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Logo and Company Name - Non-editable */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24  flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={currentData.companyLogo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
              </div>

              {/* About Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">About</h3>
                  {isEditing && (
                    <span className={`text-sm ${isAboutValidLength ? "text-green-600" : "text-red-500"}`}>
                      {aboutCharCount}/{originalCharCount} characters
                    </span>
                  )}
                </div>
                {isEditing ? (
                  <div>
                    <textarea
                      value={currentData.about}
                      onChange={(e) => setEditData((prev) => ({ ...prev, about: e.target.value }))}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none resize-none ${
                        isAboutValidLength ? "border-gray-300" : "border-red-300"
                      }`}
                      placeholder="Tell us about your company..."
                    />
                    {!isAboutValidLength && (
                      <p className="text-red-500 text-sm mt-1">
                        Text must be exactly {originalCharCount} characters long
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{currentData.about}</p>
                )}
              </div>

              {/* Contact Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                  {isEditing && currentData.contacts.length < 2 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addContact}
                      className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
                    >
                      Add Contact
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {currentData.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {isEditing ? (
                        <>
                          <input
                            type="tel"
                            value={contact.phone}
                            onChange={(e) => updateContact(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none"
                            placeholder="Phone number"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContact(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            X
                          </Button>
                        </>
                      ) : (
                        contact.phone && <p className="text-gray-700">{contact.phone}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Email</h3>
                {isEditing ? (
                  <input
                    type="email"
                    value={currentData.email}
                    onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none"
                    placeholder="Enter email address"
                  />
                ) : (
                  <p className="text-gray-700">{currentData.email}</p>
                )}
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h3>
                <div className="flex flex-col items-start gap-4 max-w-md">
                  {Object.entries(currentData.socialMedia).map(([platform, handle]) => (
                    <div key={platform} className="flex items-center gap-4 w-full">
                      {isEditing ? (
                        <>
                          <div className="flex items-center gap-2 text-[#001F4B] min-w-[100px]">
                            {getSocialIcon(platform)}
                            <span className="text-sm font-medium capitalize">{platform}</span>
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={handle}
                              onChange={(e) => updateSocialMedia(platform as keyof SocialMedia, e.target.value)}
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F4B] focus:border-[#001F4B] outline-none"
                              placeholder={`@handle`}
                            />
                            {handle && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSocialMedia(platform as keyof SocialMedia)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                              >
                                X
                              </Button>
                            )}
                          </div>
                        </>
                      ) : (
                        handle && (
                          <div className="flex items-center gap-4 w-full">
                            <div className="text-[#001F4B] p-2 rounded-lg hover:bg-gray-50 transition-colors">
                              {getSocialIcon(platform)}
                            </div>
                            <span className="text-sm text-gray-600">{handle}</span>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
