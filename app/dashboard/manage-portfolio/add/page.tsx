"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const UploadIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)


interface ContentSection {
  id: string
  type: "description" | "photo" | "list" | "video" | "360tour"
  title: string
  content: string | string[] | File
}

interface ProjectData {
  name: string
  year: string
  client: string
  location: string
  area: string
  topology: string
  role: string
  status: string
  beforeImage: string
  afterImage: string
  colorPalette: string[]
  galleryImages: string[]
  contentSections: ContentSection[]
  companyMap: string
}

export default function AddProjectPage() {
  const router = useRouter()
  const colorPickerRef = useRef<HTMLInputElement>(null)
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null)
  const [colorPickerPosition, setColorPickerPosition] = useState({ x: 0, y: 0 })
  const [yearError, setYearError] = useState("")
  const [validationError, setValidationError] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    year: "",
    client: "",
    location: "",
    area: "",
    topology: "",
    role: "",
    status: "In Progress",
    beforeImage: "",
    afterImage: "",
    colorPalette: ["#ffffff"],
    galleryImages: [],
    contentSections: [],
    companyMap: "",
  })

  const handleInputChange = (field: keyof ProjectData, value: string) => {
    setProjectData((prev) => ({ ...prev, [field]: value }))
  }

  const handleYearChange = (value: string) => {
    // Check if user is trying to enter non-numeric characters
    if (value && !/^\d*$/.test(value)) {
      setYearError("⚠️ Year field only accepts numbers (0-9)")
      setTimeout(() => setYearError(""), 4000)
    } else {
      setYearError("")
    }

    // Strip all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "")
    setProjectData((prev) => ({ ...prev, year: numericValue }))
  }

  const handleArrayChange = (field: "galleryImages", index: number, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "galleryImages") => {
    setProjectData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "galleryImages", index: number) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleColorChange = (index: number, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      colorPalette: prev.colorPalette.map((color, i) => (i === index ? value : color)),
    }))
  }

  const addColor = () => {
    setProjectData((prev) => ({
      ...prev,
      colorPalette: [...prev.colorPalette, "#ffffff"],
    }))
  }

  const removeColor = (index: number) => {
    if (projectData.colorPalette.length > 1) {
      setProjectData((prev) => ({
        ...prev,
        colorPalette: prev.colorPalette.filter((_, i) => i !== index),
      }))
    }
  }

  const handleImageUpload = (field: "beforeImage" | "afterImage" | "galleryImages", index?: number) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        if (field === "galleryImages" && typeof index === "number") {
          handleArrayChange("galleryImages", index, url)
        } else if (field !== "galleryImages") {
          handleInputChange(field, url)
        }
      }
    }
    input.click()
  }

  const handleGalleryUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      files.forEach((file) => {
        const url = URL.createObjectURL(file)
        setProjectData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, url],
        }))
      })
    }
    input.click()
  }

  const handleUpload = () => {
    if (!isFormValid()) {
      setValidationError(
        "Please fill all required fields: Name, Year, Client, Before Image, After Image, Color Palette (at least 1), and Gallery (at least 2 photos)",
      )
      setTimeout(() => setValidationError(""), 6000)
      return
    }

    setShowConfirmModal(true)
  }

  const handleConfirmedUpload = () => {
    const existingProjects = JSON.parse(localStorage.getItem("portfolioProjects") || "[]")

    const newProject = {
      ...projectData,
      id: Date.now(),
    }

    const updatedProjects = [...existingProjects, newProject]

    localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects))

    console.log("Project uploaded successfully:", newProject)
    setShowConfirmModal(false)
    router.push(`/dashboard/manage-portfolio/view/${newProject.id}`)
  }

  const handleCancel = () => {
    router.back()
  }

  const handleBackClick = () => {
    router.back()
  }


  const addContentSection = (type: ContentSection["type"]) => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      type,
      title: "",
      content: type === "list" ? [""] : "",
    }
    setProjectData((prev) => ({
      ...prev,
      contentSections: [...prev.contentSections, newSection],
    }))
  }

  const updateContentSection = (id: string, updates: Partial<ContentSection>) => {
    setProjectData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      ),
    }))
  }

  const removeContentSection = (id: string) => {
    setProjectData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.filter((section) => section.id !== id),
    }))
  }

  const updateContentSectionItem = (sectionId: string, index: number, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.map((section) =>
        section.id === sectionId && section.type === "list"
          ? {
              ...section,
              content: (section.content as string[]).map((item, i) => (i === index ? value : item)),
            }
          : section
      ),
    }))
  }

  const addContentSectionItem = (sectionId: string) => {
    setProjectData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.map((section) =>
        section.id === sectionId && section.type === "list"
          ? { ...section, content: [...(section.content as string[]), ""] }
          : section
      ),
    }))
  }

  const removeContentSectionItem = (sectionId: string, index: number) => {
    setProjectData((prev) => ({
      ...prev,
      contentSections: prev.contentSections.map((section) =>
        section.id === sectionId && section.type === "list"
          ? {
              ...section,
              content: (section.content as string[]).filter((_, i) => i !== index),
            }
          : section
      ),
    }))
  }

  const handleContentSectionUpload = (sectionId: string, type: "photo" | "video") => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = type === "video" ? "video/*" : "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        updateContentSection(sectionId, { content: file })
      }
    }
    input.click()
  }

  const handleColorClick = (index: number, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset
    
    setColorPickerPosition({
      x: rect.left + scrollX,
      y: rect.bottom + scrollY + 5,
    })
    setActiveColorIndex(index)

    const input = document.createElement("input")
    input.type = "color"
    input.value = projectData.colorPalette[index]
    input.style.position = "absolute"
    input.style.left = `${rect.left + scrollX}px`
    input.style.top = `${rect.bottom + scrollY + 5}px`
    input.style.zIndex = "9999"
    input.style.opacity = "0"
    input.style.pointerEvents = "none"
    input.style.width = "1px"
    input.style.height = "1px"

    input.onchange = (e) => {
      handleColorChange(index, (e.target as HTMLInputElement).value)
      document.body.removeChild(input)
      setActiveColorIndex(null)
    }

    input.onblur = () => {
      document.body.removeChild(input)
      setActiveColorIndex(null)
    }

    document.body.appendChild(input)
    input.focus()
    input.click()
  }

  const isFormValid = () => {
    return (
      projectData.name.trim() !== "" &&
      projectData.year.trim() !== "" &&
      projectData.client.trim() !== "" &&
      projectData.beforeImage !== "" &&
      projectData.afterImage !== "" &&
      projectData.colorPalette.length > 0 &&
      projectData.galleryImages.length >= 2 // At least 2 gallery photos
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
      <div className="w-full p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={handleBackClick}>
            <ArrowLeftIcon />
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Add New Project</h1>
        </div>

        {validationError && (
          <div className="mb-6 p-4 bg-[#ec1e24]/10 dark:bg-[#ec1e24]/20 border border-[#ec1e24]/20 dark:border-[#ec1e24]/80 rounded-lg">
            <p className="text-[#ec1e24] dark:text-[#ec1e24]/80">{validationError}</p>
          </div>
        )}

        <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#001F4B] dark:text-white font-medium">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">
                  Project Name <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span>
                </label>
                <Input
                  value={projectData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">
                  Year <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span>
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={projectData.year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  placeholder="Enter year (numbers only)"
                  required
                  className={yearError ? "border-[#ec1e24] focus:border-[#ec1e24]" : ""}
                />
                {yearError && (
                  <p className="text-[#ec1e24] text-sm mt-1 bg-[#ec1e24]/10 p-2 rounded">
                    {yearError}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">
                  Client <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span>
                </label>
                <Input
                  value={projectData.client}
                  onChange={(e) => handleInputChange("client", e.target.value)}
                  placeholder="Client name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">Location</label>
                <Input
                  value={projectData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Project location"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">Area</label>
                <Input
                  value={projectData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  placeholder="Area size"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">Topology</label>
                <Input
                  value={projectData.topology}
                  onChange={(e) => handleInputChange("topology", e.target.value)}
                  placeholder="Topology used"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">Role</label>
                <Input
                  value={projectData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="Your role in project"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">Status</label>
                <Select value={projectData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="UnderConstruction">Under Construction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#001F4B] dark:text-white font-medium">
              Before & After Images <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">Before Image</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-white/50 rounded-lg p-6 text-center">
                  {projectData.beforeImage ? (
                    <div className="relative">
                      <img
                        src={projectData.beforeImage || "/placeholder.svg"}
                        alt="Before"
                        className="w-full h-48 object-cover rounded"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                        onClick={() => handleImageUpload("beforeImage")}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-gray-400 mx-auto mb-2">
                        <UploadIcon />
                      </div>
                      <Button variant="outline" onClick={() => handleImageUpload("beforeImage")} className="border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:bg-[#1a1d23] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent">
                        Upload Before Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">After Image</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-white/50 rounded-lg p-6 text-center">
                  {projectData.afterImage ? (
                    <div className="relative">
                      <img
                        src={projectData.afterImage || "/placeholder.svg"}
                        alt="After"
                        className="w-full h-48 object-cover rounded"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent"
                        onClick={() => handleImageUpload("afterImage")}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-gray-400 mx-auto mb-2">
                        <UploadIcon />
                      </div>
                      <Button variant="outline" onClick={() => handleImageUpload("afterImage")} className="border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:bg-[#1a1d23] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent">
                        Upload After Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        

        {/* Content Sections */}
        {projectData.contentSections.length > 0 && (
          <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
              <CardTitle className="text-[#001F4B] dark:text-white">Content Sections</CardTitle>
          </CardHeader>
            <CardContent className="space-y-6">
              {projectData.contentSections.map((section) => (
                <div key={section.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-[#1a1d23] dark:border-gray-600">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="flex-1">
                      <Input
                        value={section.title}
                        onChange={(e) => updateContentSection(section.id, { title: e.target.value })}
                        placeholder="Section title (optional)"
                        className="border-dashed border-gray-300"
                      />
                      <p className="text-xs text-gray-500 mt-1">You can leave this empty if you don't want a title</p>
            </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeContentSection(section.id)}
                      className="text-[#001F4B] dark:text-white hover:text-[#001F4B]/80 dark:hover:text-white border-[#001F4B] dark:border-white hover:border-transparent dark:hover:border-transparent h-10"
                    >
                      <XIcon />
                    </Button>
                  </div>

                  {section.type === "description" && (
              <Textarea
                      value={section.content as string}
                      onChange={(e) => updateContentSection(section.id, { content: e.target.value })}
                      placeholder="Enter detailed description"
                rows={4}
                    />
                  )}

                  {section.type === "photo" && (
                    <div className="space-y-2">
                      {section.content ? (
                        <div className="relative">
                          <img
                            src={typeof section.content === "string" ? section.content : URL.createObjectURL(section.content as File)}
                            alt="Content photo"
                            className="w-full h-48 object-cover rounded"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => handleContentSectionUpload(section.id, "photo")}
                          >
                            Change Photo
                          </Button>
            </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 dark:border-white/50 rounded-lg p-6 text-center">
                          <div className="text-gray-400 mx-auto mb-2">
                            <UploadIcon />
                          </div>
                          <Button variant="outline" onClick={() => handleContentSectionUpload(section.id, "photo")} className="border-[#001F4B] dark:border-[#ec1e24] text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white">
                            Upload Photo
              </Button>
            </div>
                      )}
                    </div>
                  )}

                  {section.type === "list" && (
            <div className="space-y-2">
                      {(section.content as string[]).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                            value={item}
                            onChange={(e) => updateContentSectionItem(section.id, index, e.target.value)}
                            placeholder="Enter list item"
                          />
                          {(section.content as string[]).length > 1 && (
                            <Button variant="outline" size="sm" onClick={() => removeContentSectionItem(section.id, index)} className="border-[#001F4B] dark:border-[#ec1e24] text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white">
                      <XIcon />
                    </Button>
                  )}
                </div>
              ))}
                      <Button variant="outline" onClick={() => addContentSectionItem(section.id)} className="w-full border-[#001F4B] dark:border-[#ec1e24] text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white">
                <PlusIcon />
                        <span className="ml-2">Add Item</span>
              </Button>
            </div>
                  )}

                  {section.type === "video" && (
            <div className="space-y-2">
                      {section.content ? (
                        <div className="relative">
                          <video
                            src={typeof section.content === "string" ? section.content : URL.createObjectURL(section.content as File)}
                            controls
                            className="w-full h-48 object-cover rounded"
                          />
              <Button
                variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => handleContentSectionUpload(section.id, "video")}
              >
                            Change Video
                    </Button>
                </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 dark:border-white/50 rounded-lg p-6 text-center">
                          <div className="text-gray-400 mx-auto mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <Button variant="outline" onClick={() => handleContentSectionUpload(section.id, "video")} className="border-[#001F4B] dark:border-[#ec1e24] text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white">
                            Upload Video
              </Button>
            </div>
                      )}
                    </div>
                  )}

                  {section.type === "360tour" && (
                    <div className="space-y-2">
                      <Input
                        value={section.content as string}
                        onChange={(e) => updateContentSection(section.id, { content: e.target.value })}
                        placeholder="Enter 360° tour embed URL or link"
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500">Enter the URL for your 360° tour (e.g., from Matterport, Roundme, etc.)</p>
                    </div>
                  )}

                </div>
              ))}
          </CardContent>
        </Card>
        )}


        {/* Content Type Selector - now below rendered content and not sticky */}
        <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#001F4B] dark:text-white font-medium">Additional Content</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300">Choose what type of content you want to add to showcase your project</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-4">
              <Button
                variant="outline"
                onClick={() => addContentSection("description")}
                className="w-full h-full min-h-[80px] flex flex-col items-center justify-center gap-2 border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:bg-[#1a1d23] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs">Description</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => addContentSection("photo")}
                className="w-full h-full min-h-[80px] flex flex-col items-center justify-center gap-2 border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:bg-[#1a1d23] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">Photo</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => addContentSection("list")}
                className="w-full h-full min-h-[80px] flex flex-col items-center justify-center gap-2 border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:bg-[#1a1d23] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="text-xs">List</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => addContentSection("video")}
                className="w-full h-full min-h-[80px] flex flex-col items-center justify-center gap-2 border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:bg-[#1a1d23] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">Video</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => addContentSection("360tour")}
                className="w-full h-full min-h-[80px] flex flex-col items-center justify-center gap-2 border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:bg-[#1a1d23] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                <span className="text-xs">360° Tour</span>
              </Button>
            </div>
          </CardContent>
        </Card>



        <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#001F4B] dark:text-white font-medium">
              Color Palette <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              {projectData.colorPalette.map((color, index) => (
                <div key={index} className="relative">
                  <div
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: color }}
                    onClick={(e) => handleColorClick(index, e)}
                  />
                  {projectData.colorPalette.length > 1 && (
                    <button
                      onClick={() => removeColor(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-[#ec1e24]/100 dark:bg-[#ec1e24] text-white rounded-full text-xs hover:bg-[#ec1e24] dark:hover:bg-[#ec1e24] transition-colors"
                    >
                      X
                    </button>
                  )}
                  <div className="text-xs text-gray-600 dark:text-white/80 mt-1 text-center font-mono">{color}</div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={addColor}
              className="border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent bg-transparent"
            >
              <PlusIcon />
              <span className="ml-2">Add Color</span>
            </Button>
          </CardContent>
        </Card>


        <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#001F4B] dark:text-white font-medium">
              Gallery <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-300 ml-2">(Minimum 2 photos required)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectData.galleryImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {projectData.galleryImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onClick={() => removeArrayItem("galleryImages", index)}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-[#ec1e24]/100 dark:bg-[#ec1e24] text-white rounded-full text-xs hover:bg-[#ec1e24] dark:hover:bg-[#ec1e24] transition-colors flex items-center justify-center shadow-lg"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Button
              variant="outline"
              onClick={handleGalleryUpload}
              className="bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white"
            >
              <PlusIcon />
              <span className="ml-2">Add Gallery Images</span>
            </Button>
          </CardContent>
        </Card>

        {/* Company Map Section */}
        <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#001F4B] dark:text-white font-medium">Company Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-white/80 mb-2">Map URL</label>
                <Input
                  value={projectData.companyMap}
                  onChange={(e) => handleInputChange("companyMap", e.target.value)}
                  placeholder="Enter map URL (e.g., Google Maps, Apple Maps, etc.)"
                  className="w-full"
                />
              </div>
              {projectData.companyMap && (
                <div className="mt-4">
                  <label className="block text-sm text-gray-700 mb-2">Map Preview</label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-2">Map URL:</p>
                    <a 
                      href={projectData.companyMap} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline break-all"
                    >
                      {projectData.companyMap}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Validation Status */}
        {!isFormValid() && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ Please complete all required fields:
            </p>
            <ul className="mt-2 text-yellow-700 text-sm list-disc list-inside">
              {!projectData.name.trim() && <li>Project Name</li>}
              {!projectData.year.trim() && <li>Year</li>}
              {!projectData.client.trim() && <li>Client</li>}
              {!projectData.beforeImage && <li>Before Image</li>}
              {!projectData.afterImage && <li>After Image</li>}
              {projectData.colorPalette.length === 0 && <li>Color Palette (at least 1 color)</li>}
              {projectData.galleryImages.length < 2 && <li>Gallery (at least 2 photos, currently {projectData.galleryImages.length})</li>}
            </ul>
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            className="border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:text-white hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-[#001F4B] dark:hover:border-transparent bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            className={`${isFormValid() ? "bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white" : "bg-gray-400 dark:bg-[#ec1e24]/30 cursor-not-allowed hover:bg-gray-400 dark:hover:bg-[#ec1e24]/30"}`}
            disabled={!isFormValid()}
          >
            Upload Project
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmedUpload}
        title="Confirm Upload"
        message="Are you sure you want to upload this project?"
        type="upload"
      />
    </div>
  )
}
