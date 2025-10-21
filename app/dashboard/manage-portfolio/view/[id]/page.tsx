"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload as UploadIcon, Plus as PlusIcon } from "lucide-react"
import Image from "next/image"
import ConfirmationModal from "@/components/Confirmation-modal"
import PanoramaViewer from "@/components/PanoramaViewer"

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

interface ContentSection {
  id: string
  type: "description" | "photo" | "list" | "video" | "360tour"
  title: string
  content: string | string[] | File
}

interface ProjectData {
  id: string
  name: string
  year: string
  client: string
  location?: string
  area?: string
  topology?: string
  role?: string
  status?: string
  category?: string
  customCategory?: string
  description?: string
  inspiration?: string
  beforeImage?: string
  afterImage?: string
  galleryImages: string[]
  colorPalette: string[]
  features?: string[]
  materials?: string[]
  contentSections?: ContentSection[]
  companyMap?: string
  customFields?: Array<{
    id: string
    label: string
    type: "text" | "list"
    value: string | string[]
  }>
}

export default function ViewProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  // State
  const [currentData, setCurrentData] = useState<ProjectData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)
  const [colorPickerIndex, setColorPickerIndex] = useState<number | null>(null)
  const [colorPickerPosition, setColorPickerPosition] = useState<{ top: number; left: number } | null>(null)

  // Refs
  const beforeImageRef = useRef<HTMLInputElement>(null)
  const afterImageRef = useRef<HTMLInputElement>(null)
  const galleryAddRef = useRef<HTMLInputElement>(null)

  // Load project data
  useEffect(() => {
    const loadProject = () => {
      try {
        // Try to load from localStorage first
        const savedProjects = localStorage.getItem("portfolioProjects")
        if (savedProjects) {
          const projects = JSON.parse(savedProjects)
          const project = projects.find((p: any) => String(p.id) === String(projectId))
          if (project) {
            setCurrentData(project)
            return
          }
        }

        // Fallback to sample data if not found
        const sampleProject: ProjectData = {
          id: projectId,
          name: "Sample Project",
          year: "2024",
          client: "Sample Client",
          category: "Architectural Design",
          location: "Sample Location",
          area: "1000 sq ft",
          topology: "Modern",
          role: "Lead Designer",
          status: "Completed",
          description: "This is a sample project description.",
          inspiration: "Modern minimalist design with clean lines",
          beforeImage: "/placeholder.svg",
          afterImage: "/placeholder.svg",
          galleryImages: ["/placeholder.svg"],
          colorPalette: ["#000000"],
          features: ["Feature 1", "Feature 2"],
          materials: ["Material 1", "Material 2"],
          contentSections: [
            {
              id: "1",
              type: "photo",
              title: "Project Overview",
              content: "/room1.jpg"
            },
            {
              id: "2", 
              type: "video",
              title: "Project Video",
              content: "/forma Visita.mp4"
            },
            {
              id: "3",
              type: "description",
              title: "Project Description",
              content: "This is a detailed description of the project showcasing the design process and final results."
            },
            {
              id: "4",
              type: "360tour",
              title: "360° Virtual Tour",
              content: "https://nedf-studios.github.io/Lula_Beauty_Salon_360/"
            }
          ],
          companyMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7577!3d9.0320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1647000000000!5m2!1sen!2set"
        }
        setCurrentData(sampleProject)
      } catch (error) {
        console.error("Error loading project:", error)
      }
    }

    loadProject()
  }, [projectId])

  // Update functions
  const updateEditData = (field: keyof ProjectData, value: any) => {
    setCurrentData(prev => prev ? { ...prev, [field]: value } : null)
  }

  const updateArrayField = (field: keyof ProjectData, index: number, value: string) => {
    if (!currentData) return
    const arrayField = currentData[field] as string[]
    const updatedArray = [...arrayField]
    updatedArray[index] = value
    updateEditData(field, updatedArray)
  }

  const addArrayItem = (field: keyof ProjectData) => {
    if (!currentData) return
    const arrayField = currentData[field] as string[]
    updateEditData(field, [...arrayField, ""])
  }

  const removeArrayItem = (field: keyof ProjectData, index: number) => {
    if (!currentData) return
    const arrayField = currentData[field] as string[]
    const updatedArray = arrayField.filter((_, i) => i !== index)
    updateEditData(field, updatedArray)
  }

  // Color palette functions
  const addColor = () => {
    if (!currentData) return
    updateEditData("colorPalette", [...currentData.colorPalette, "#000000"])
  }

  const removeColor = (index: number) => {
    if (!currentData || currentData.colorPalette.length <= 1) return
    const updatedPalette = currentData.colorPalette.filter((_, i) => i !== index)
    updateEditData("colorPalette", updatedPalette)
  }

  const updateColorPalette = (index: number, color: string) => {
    if (!currentData) return
    const updatedPalette = currentData.colorPalette.map((item, i) => 
      i === index ? color : item
    )
    updateEditData("colorPalette", updatedPalette)
  }

  const handleColorClick = (index: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setColorPickerPosition({
      top: rect.bottom + 10,
      left: rect.left
    })
    setColorPickerIndex(index)
  }

  // Gallery functions
  const addGalleryImage = () => {
    galleryAddRef.current?.click()
  }

  const handleAddGalleryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && currentData) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        updateEditData("galleryImages", [...currentData.galleryImages, imageUrl])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeGalleryImage = (index: number) => {
    if (!currentData || currentData.galleryImages.length <= 1) return
    const updatedImages = currentData.galleryImages.filter((_, i) => i !== index)
    updateEditData("galleryImages", updatedImages)
  }

  // File handling
  const triggerFileInput = (type: "beforeImage" | "afterImage") => {
    if (type === "beforeImage") {
      beforeImageRef.current?.click()
    } else {
      afterImageRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "beforeImage" | "afterImage") => {
    const file = e.target.files?.[0]
    if (file && currentData) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        updateEditData(type, imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  // Custom field functions
  const updateCustomField = (fieldId: string, updates: Partial<{ label: string; value: any }>) => {
    if (!currentData) return
    const updatedFields = currentData.customFields?.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ) || []
    updateEditData("customFields", updatedFields)
  }

  const addCustomListItem = (fieldId: string) => {
    if (!currentData) return
    const field = currentData.customFields?.find(f => f.id === fieldId)
    if (field && Array.isArray(field.value)) {
      const updatedValue = [...field.value, ""]
      updateCustomField(fieldId, { value: updatedValue })
    }
  }

  const removeCustomListItem = (fieldId: string, index: number) => {
    if (!currentData) return
    const field = currentData.customFields?.find(f => f.id === fieldId)
    if (field && Array.isArray(field.value)) {
      const updatedValue = field.value.filter((_, i) => i !== index)
      updateCustomField(fieldId, { value: updatedValue })
    }
  }

  const updateCustomListItem = (fieldId: string, index: number, value: string) => {
    if (!currentData) return
    const field = currentData.customFields?.find(f => f.id === fieldId)
    if (field && Array.isArray(field.value)) {
      const updatedValue = [...field.value]
      updatedValue[index] = value
      updateCustomField(fieldId, { value: updatedValue })
    }
  }

  // Save and delete functions
  const handleSave = () => {
    setShowSaveConfirmation(true)
  }

  const handleConfirmSave = () => {
    if (!currentData) return
    
    try {
      const savedProjects = localStorage.getItem("portfolioProjects")
      const projects = savedProjects ? JSON.parse(savedProjects) : []
      const projectIndex = projects.findIndex((p: any) => String(p.id) === String(projectId))
      
      if (projectIndex !== -1) {
        projects[projectIndex] = currentData
        localStorage.setItem("portfolioProjects", JSON.stringify(projects))
      }
      
      setShowSaveConfirmation(false)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  const handleDelete = () => {
    setShowConfirmationModal(true)
  }

  const confirmDelete = () => {
    try {
      const savedProjects = localStorage.getItem("portfolioProjects")
      const projects = savedProjects ? JSON.parse(savedProjects) : []
      const updatedProjects = projects.filter((p: any) => String(p.id) !== String(projectId))
      localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects))
      
      setShowConfirmationModal(false)
      router.push("/dashboard/manage-portfolio")
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  if (!currentData) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#15171a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Loading...</h2>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we load the project details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#15171a] w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white"
          >
            <ArrowLeftIcon />
          </Button>
          <h1 className="text-3xl font-bold text-[#001F4B] dark:text-red-500 font-montserrat uppercase tracking-wide">
            {isEditing ? "Edit Project" : "View Project"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="border-[#001F4B] dark:border-white/60 text-[#001F4B] dark:text-white hover:bg-[#001F4B] dark:hover:bg-red-500 hover:text-white dark:hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#001F4B] text-white hover:bg-[#001F4B]/90 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleDelete}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Delete
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-[#001F4B] text-white hover:bg-[#001F4B]/90 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Edit
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Project Information */}
        <div className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#001F4B] dark:text-red-500 font-montserrat">PROJECT INFORMATION</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { label: "PROJECT NAME", field: "name" as keyof ProjectData, required: true },
                { label: "YEAR", field: "year" as keyof ProjectData, required: true },
                { label: "CLIENT", field: "client" as keyof ProjectData, required: true },
                { label: "CATEGORY", field: "category" as keyof ProjectData, required: true },
                { label: "LOCATION", field: "location" as keyof ProjectData, required: false },
                { label: "AREA", field: "area" as keyof ProjectData, required: false },
                { label: "TECHNOLOGY", field: "technology" as keyof ProjectData, required: false },
                { label: "ROLE", field: "role" as keyof ProjectData, required: false },
                { label: "STATUS", field: "status" as keyof ProjectData, required: false },
              ].map(({ label, field, required }) => {
                const fieldValue = currentData?.[field] as string
                
                // Only show field if it has a value OR if we're editing OR if it's required
                if (!isEditing && !required && (!fieldValue || fieldValue.trim() === "")) {
                  return null
                }
                
                return (
                  <div key={field}>
                    <p className="text-sm text-gray-500 dark:text-gray-300 font-montserrat font-medium mb-1">{label}</p>
                    {isEditing ? (
                      <Input
                        value={fieldValue || ""}
                        onChange={(e) => updateEditData(field, e.target.value)}
                        className="border-gray-200 dark:border-white/60 rounded-lg focus:border-[#001F4B] dark:focus:border-red-500 focus:ring-[#001F4B] dark:focus:ring-red-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-800 dark:text-white font-montserrat bg-gray-50 dark:bg-[#15171a] p-2 rounded-lg">
                        {field === "category" && currentData?.category === "Other" && currentData?.customCategory 
                          ? currentData.customCategory 
                          : fieldValue || "Not specified"}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Before/After Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="relative group">
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm z-10 font-medium">
              Before
            </div>
            {isEditing && (
              <>
                <input
                  type="file"
                  ref={beforeImageRef}
                  onChange={(e) => handleFileChange(e, "beforeImage")}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => triggerFileInput("beforeImage")}
                  className="absolute top-4 right-4 z-10 bg-[#001F4B] hover:bg-[#001F4B]/90 dark:bg-red-500 dark:hover:bg-red-600 text-white shadow-lg transition-all duration-200"
                  size="sm"
                >
                  <UploadIcon />
                  <span className="ml-1">Upload</span>
                </Button>
              </>
            )}
            <Image
              src={currentData?.beforeImage || "/placeholder.svg?height=300&width=400&query=before renovation"}
              alt="Before renovation"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>

          <div className="relative group">
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm z-10 font-medium">
              After
            </div>
            {isEditing && (
              <>
                <input
                  type="file"
                  ref={afterImageRef}
                  onChange={(e) => handleFileChange(e, "afterImage")}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => triggerFileInput("afterImage")}
                  className="absolute top-4 right-4 z-10 bg-[#001F4B] hover:bg-[#001F4B]/90 dark:bg-red-500 dark:hover:bg-red-600 text-white shadow-lg transition-all duration-200"
                  size="sm"
                >
                  <UploadIcon />
                  <span className="ml-1">Upload</span>
                </Button>
              </>
            )}
            <Image
              src={currentData?.afterImage || "/placeholder.svg?height=300&width=400&query=after renovation"}
              alt="After renovation"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Content Sections - without title */}
        {currentData.contentSections && currentData.contentSections.length > 0 && (
          <div className="space-y-6">
            {currentData.contentSections.map((section) => (
              <div key={section.id} className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm">
                {section.title && (
                  <h3 className="text-xl font-semibold mb-4 text-[#001F4B] dark:text-red-500 font-montserrat">
                    {section.title}
                  </h3>
                )}
                
                {section.type === "description" && (
                  <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed bg-gray-50 dark:bg-[#15171a] p-4 rounded-lg">
                    {section.content as string}
                  </p>
                )}

                {section.type === "photo" && (
                  <div className="relative">
                    <Image
                      src={
                        typeof section.content === "string" 
                          ? section.content 
                          : section.content instanceof File 
                            ? URL.createObjectURL(section.content)
                            : "/placeholder.svg"
                      }
                      alt="Content photo"
                      width={800}
                      height={600}
                      className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                )}

                {section.type === "video" && (
                  <div className="relative">
                    <video
                      src={
                        typeof section.content === "string" 
                          ? section.content 
                          : section.content instanceof File 
                            ? URL.createObjectURL(section.content)
                            : "/placeholder.svg"
                      }
                      controls
                      preload="metadata"
                      className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLVideoElement
                        target.style.display = "none"
                        const fallback = document.createElement("div")
                        fallback.className = "w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center"
                        fallback.innerHTML = "<p class='text-gray-500 dark:text-gray-400'>Video not available</p>"
                        target.parentNode?.insertBefore(fallback, target)
                      }}
                    />
                  </div>
                )}

                {section.type === "list" && (
                  <ul className="space-y-3">
                    {(section.content as string[]).map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#001F4B] dark:bg-red-500 rounded-full"></span>
                        <span className="text-gray-600 dark:text-gray-300 font-montserrat">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === "360tour" && (
                  <div className="space-y-4">
                    {section.content ? (
                      <div className="w-full h-[600px]">
                        <PanoramaViewer iframeUrl={section.content as string} />
                        <p className="text-sm text-gray-500 dark:text-gray-300 font-montserrat mt-2">
                          Use mouse to drag and scroll to zoom. Touch controls supported on mobile.
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 font-montserrat">
                        No 360° tour provided
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Color Palette Section */}
        {currentData.colorPalette && currentData.colorPalette.length > 0 && (
        <div className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm relative">
          <div className="flex flex-wrap gap-4">
            {currentData.colorPalette?.map((color, index) => (
              <div key={index} className="relative">
                <div
                  className="w-16 h-16 rounded-xl border-2 border-gray-200 dark:border-white/60 cursor-pointer shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 relative"
                  style={{ backgroundColor: color }}
                  onClick={(e) => handleColorClick(index, e)}
                />
                {!isEditing && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-white font-mono">
                    {color.toUpperCase()}
                  </div>
                )}
                {isEditing && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeColor(index)
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-transparent hover:bg-transparent border-none shadow-none"
                    size="sm"
                  >
                    <span className="text-red-500 text-sm font-bold hover:text-red-700">X</span>
                  </Button>
                )}
              </div>
            ))}
            {isEditing && (
              <div className="flex items-center">
                <Button
                  onClick={addColor}
                  className="h-16 w-16 rounded-xl bg-transparent border-2 border-dashed border-gray-300 dark:border-white/60 hover:border-[#001F4B] dark:hover:border-red-500 hover:bg-[#001F4B]/5 dark:hover:bg-red-500/5 transition-all duration-200"
                >
                  <PlusIcon />
                </Button>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Gallery Section */}
        {currentData.galleryImages && currentData.galleryImages.length > 0 && (
          <div className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm">
            {isEditing ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {currentData.galleryImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image || "/placeholder.svg?height=120&width=120&query=gallery image"}
                      alt={`Gallery image ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-24 h-24 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                    />
                    <Button
                      onClick={() => removeGalleryImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-transparent hover:bg-transparent border-none shadow-none"
                      size="sm"
                    >
                      <span className="text-red-500 text-sm font-bold hover:text-red-700">X</span>
                    </Button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                id="gallery-upload"
                onChange={handleAddGalleryImage}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={addGalleryImage}
                className="bg-[#001F4B] hover:bg-[#001F4B]/90 dark:bg-red-500 dark:hover:bg-red-600 text-white shadow-lg transition-all duration-200"
              >
                <PlusIcon />
                <span className="ml-1">Add Gallery Image</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {currentData.galleryImages.map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={image || "/placeholder.svg?height=120&width=120&query=gallery image"}
                    alt={`Gallery image ${index + 1}`}
                    width={120}
                    height={120}
                    className="w-24 h-24 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              )) || []}
            </div>
          )}
        </div>
        )}

        {/* Company Map */}
        {currentData.companyMap && (
          <div className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#001F4B] dark:text-red-500 font-montserrat">COMPANY LOCATION</h2>
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={currentData.companyMap}
                    onChange={(e) => updateEditData("companyMap", e.target.value)}
                    placeholder="Enter Google Maps embed URL"
                className="w-full border-gray-200 dark:border-white/60 rounded-lg focus:border-[#001F4B] dark:focus:border-red-500 focus:ring-[#001F4B] dark:focus:ring-red-500"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-montserrat">
                    Enter Google Maps embed URL for interactive map display
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  {currentData.companyMap ? (
                    <div className="w-full h-[500px]">
                      <iframe
                        src={currentData.companyMap}
                        title="Project Location"
                        className="w-full h-full border-0 dark:invert dark:brightness-90 dark:contrast-125 dark:sepia-[0.1] dark:hue-rotate-[320deg] dark:saturate-150"
                        allowFullScreen
                        loading="eager"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ pointerEvents: "auto" }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">No map provided</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inspiration Section - only show if has content or editing */}
        {(isEditing || (currentData.inspiration && currentData.inspiration.trim() !== "")) && (
        <div className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#001F4B] dark:text-red-500 font-montserrat">INSPIRATION</h2>
          {isEditing ? (
            <Textarea
                value={currentData.inspiration || ""}
                onChange={(e) => updateEditData("inspiration", e.target.value)}
              className="w-full border-gray-200 dark:border-white/60 rounded-lg focus:border-[#001F4B] dark:focus:border-red-500 focus:ring-[#001F4B] dark:focus:ring-red-500"
                rows={2}
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed bg-gray-50 dark:bg-[#15171a] p-4 rounded-lg">
                {currentData.inspiration}
            </p>
          )}
        </div>
        )}


        {/* Features Section - only show if has features or editing */}
        {(isEditing || (currentData.features && currentData.features.some(f => f && f.trim() !== ""))) && (
          <div className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#001F4B] dark:text-red-500 font-montserrat">FEATURES</h2>
            <ul className="space-y-3">
              {currentData.features?.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#001F4B] dark:bg-red-500 rounded-full"></span>
                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={feature}
                        onChange={(e) => updateArrayField("features", index, e.target.value)}
                        className="flex-1 border-gray-200 dark:border-white/60 rounded-lg focus:border-[#001F4B] dark:focus:border-red-500 focus:ring-[#001F4B] dark:focus:ring-red-500"
                      />
                      <Button
                        onClick={() => removeArrayItem("features", index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        X
                      </Button>
                    </div>
                  ) : (
                    feature && feature.trim() && (
                      <span className="text-gray-600 dark:text-gray-300 font-montserrat">{feature}</span>
                    )
                  )}
                </li>
              )) || []}
              {isEditing && (
                <li>
                  <Button
                    onClick={() => addArrayItem("features")}
                    variant="outline"
                    size="sm"
                    className="mt-2 border-[#001F4B] dark:border-red-500 text-[#001F4B] dark:text-red-500 hover:bg-[#001F4B] dark:hover:bg-red-500 hover:text-white"
                  >
                    <PlusIcon />
                    <span className="ml-1">Add Feature</span>
                  </Button>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Materials Section - only show if has materials or editing */}
        {(isEditing || (currentData.materials && currentData.materials.some(m => m && m.trim() !== ""))) && (
          <div className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#001F4B] dark:text-red-500 font-montserrat">MATERIALS</h2>
            <ul className="space-y-3">
              {currentData.materials?.map((material, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#001F4B] dark:bg-red-500 rounded-full"></span>
                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={material}
                        onChange={(e) => updateArrayField("materials", index, e.target.value)}
                        className="flex-1 border-gray-200 dark:border-white/60 rounded-lg focus:border-[#001F4B] dark:focus:border-red-500 focus:ring-[#001F4B] dark:focus:ring-red-500"
                      />
                      <Button
                        onClick={() => removeArrayItem("materials", index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        X
                      </Button>
                    </div>
                  ) : (
                    material && material.trim() && (
                      <span className="text-gray-600 dark:text-gray-300 font-montserrat">{material}</span>
                    )
                  )}
                </li>
              )) || []}
              {isEditing && (
                <li>
                  <Button
                    onClick={() => addArrayItem("materials")}
                    variant="outline"
                    size="sm"
                    className="mt-2 border-[#001F4B] dark:border-red-500 text-[#001F4B] dark:text-red-500 hover:bg-[#001F4B] dark:hover:bg-red-500 hover:text-white"
                  >
                    <PlusIcon />
                    <span className="ml-1">Add Material</span>
                  </Button>
                </li>
              )}
            </ul>
          </div>
        )}




        {/* Custom Fields Section */}
        {currentData.customFields && currentData.customFields.length > 0 && (
          <div className="space-y-4">
            {currentData.customFields.map((field) => (
              <div key={field.id} className="bg-white dark:bg-[#1a1d23] rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-[#001F4B] dark:text-red-500 font-montserrat uppercase">
                  {isEditing ? (
                    <Input
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                      className="text-xl font-semibold border-gray-200 dark:border-white/60 rounded-lg focus:border-[#001F4B] dark:focus:border-red-500 focus:ring-[#001F4B] dark:focus:ring-red-500"
                    />
                  ) : (
                    field.label
                  )}
                </h2>
                
                {field.type === "text" ? (
                  isEditing ? (
                    <Textarea
                      value={field.value as string}
                      onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
                      className="w-full border-gray-200 dark:border-white/60 rounded-lg focus:border-[#001F4B] dark:focus:border-red-500 focus:ring-[#001F4B] dark:focus:ring-red-500"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed bg-gray-50 dark:bg-[#15171a] p-4 rounded-lg">
                      {field.value as string}
                    </p>
                  )
                ) : (
                  <ul className="space-y-3">
                    {(field.value as string[]).map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#001F4B] dark:bg-red-500 rounded-full"></span>
                        {isEditing ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={item}
                              onChange={(e) => updateCustomListItem(field.id, index, e.target.value)}
                              className="flex-1 border-gray-200 dark:border-white/60 rounded-lg focus:border-[#001F4B] dark:focus:border-red-500 focus:ring-[#001F4B] dark:focus:ring-red-500"
                            />
                            {(field.value as string[]).length > 1 && (
                              <Button
                                onClick={() => removeCustomListItem(field.id, index)}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                X
                              </Button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-600 dark:text-gray-300 font-montserrat">{item}</span>
                        )}
                      </li>
                    ))}
                    {isEditing && (
                      <li>
                        <Button
                          onClick={() => addCustomListItem(field.id)}
                          variant="outline"
                          size="sm"
                          className="mt-2 border-[#001F4B] dark:border-red-500 text-[#001F4B] dark:text-red-500 hover:bg-[#001F4B] dark:hover:bg-red-500 hover:text-white"
                        >
                          <PlusIcon />
                          <span className="ml-1">Add Item</span>
                        </Button>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color Picker Modal */}
      {isEditing && colorPickerIndex !== null && colorPickerPosition && (
        <div
          className="fixed z-[99999] bg-white dark:bg-[#1a1d23] p-4 rounded-xl shadow-2xl border-2 border-[#001F4B]/20 dark:border-red-500/20"
          style={{
            top: `${colorPickerPosition.top}px`,
            left: `${colorPickerPosition.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Arrow pointing up to the color */}
          <div 
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-[#1a1d23] border-l-2 border-t-2 border-[#001F4B]/20 dark:border-red-500/20 rotate-45"
          />
          
          <div className="flex flex-col items-center space-y-3 relative">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">Select Color</p>
            <input
              type="color"
              value={currentData.colorPalette[colorPickerIndex] || "#000000"}
              onChange={(e) => {
                updateColorPalette(colorPickerIndex, e.target.value)
              }}
              className="w-20 h-20 rounded-lg border-2 border-gray-200 dark:border-white/60 cursor-pointer hover:border-[#001F4B] dark:hover:border-red-500 transition-colors"
            />
            <div className="text-sm font-mono font-bold text-[#001F4B] dark:text-red-500">
              {currentData.colorPalette[colorPickerIndex]?.toUpperCase()}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      {showConfirmationModal && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={confirmDelete}
          title="Delete Project"
          message="Are you sure you want to delete this project? This action cannot be undone."
          type="delete"
        />
      )}

      {showSaveConfirmation && (
        <ConfirmationModal
          isOpen={showSaveConfirmation}
          onClose={() => setShowSaveConfirmation(false)}
          onConfirm={handleConfirmSave}
          title="Save Changes"
          message="Are you sure you want to save these changes?"
          type="update"
        />
      )}
    </div>
  )
}