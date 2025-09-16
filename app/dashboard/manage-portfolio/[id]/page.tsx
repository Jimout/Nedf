"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Edit3, Upload, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ProjectData {
  id: string
  name: string
  year: string
  client: string
  location: string
  area: string
  technology: string
  role: string // Changed from price to role
  status: string
  inspiration: string
  description: string
  features: string[]
  materials: string[]
  colorPalette: Array<{ color: string }> // Removed name field from color palette
  beforeImage: string
  afterImage: string
  galleryImages: string[]
}

const initialProjectData: ProjectData = {
  id: "1",
  name: "HIDASSE TELECOM",
  year: "2024",
  client: "Snap Trading And Industry Plc",
  location: "Gerji 04, Addis Ababa",
  area: "300 m²",
  technology: "HDTV/IPTV/LAN/Network/Lan Building",
  role: "Design & Application", // Changed from price to role
  status: "UnderConstruction",
  inspiration: "Inspired By Natural Light, Open-Plan Living, And Seamless Indoor-Outdoor Integration",
  description:
    "This Interior Design Project Embraces Open-Plan Living And Seamless Integration With The Surrounding Environment. The Design Promotes Natural Light And Sustainable Materials, Creating A Home That Is Both Functional And Aesthetically Pleasing. The Space Is Carefully Incorporated To Blend Indoor And Outdoor Areas, Offering Dynamic Views And A Strong Connection To Nature.",
  features: [
    "Sustainable Building Materials",
    "Open-Plan Layout With Panoramic Views",
    "Terraces And Green Spaces Integrated",
  ],
  materials: ["Upholstery", "Marble", "Wood"],
  colorPalette: [
    { color: "#F5F5DC" }, // Simplified color palette structure
    { color: "#D2B48C" },
    { color: "#8B4513" },
    { color: "#696969" },
  ],
  beforeImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VIluGQdq2SLlRxuJ1nnfavKORBjGgl.png",
  afterImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lJz1lgELnEPHQQTT6KaIm9WsaPsfGL.png",
  galleryImages: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lJz1lgELnEPHQQTT6KaIm9WsaPsfGL.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VIluGQdq2SLlRxuJ1nnfavKORBjGgl.png",
  ],
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData)
  const [editData, setEditData] = useState<ProjectData>(initialProjectData)
  const [colorPickerIndex, setColorPickerIndex] = useState<number | null>(null)
  const [colorPickerPosition, setColorPickerPosition] = useState<{ top: number; left: number } | null>(null)
  const [originalColor, setOriginalColor] = useState<string>("")

  const beforeImageRef = useRef<HTMLInputElement>(null)
  const afterImageRef = useRef<HTMLInputElement>(null)
  const galleryImageRefs = useRef<(HTMLInputElement | null)[]>([])
  const galleryAddRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    setEditData({ ...projectData })
    setIsEditing(true)
  }

  const handleSave = () => {
    setProjectData({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...projectData })
    setIsEditing(false)
  }

  const updateEditData = (field: keyof ProjectData, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  const updateArrayField = (field: "features" | "materials", index: number, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "features" | "materials") => {
    setEditData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "features" | "materials", index: number) => {
    setEditData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const updateColorPalette = (index: number, value: string) => {
    setEditData((prev) => ({
      ...prev,
      colorPalette: prev.colorPalette.map((color, i) => (i === index ? { color: value } : color)),
    }))
  }

  const addColor = () => {
    setEditData((prev) => ({
      ...prev,
      colorPalette: [...prev.colorPalette, { color: "#000000" }],
    }))
  }

  const removeColor = (index: number) => {
    setEditData((prev) => ({
      ...prev,
      colorPalette: prev.colorPalette.filter((_, i) => i !== index),
    }))
  }

  const addGalleryImage = () => {
    galleryAddRef.current?.click()
  }

  const removeGalleryImage = (index: number) => {
    setEditData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }))
  }

  const updateGalleryImage = (index: number, url: string) => {
    setEditData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.map((img, i) => (i === index ? url : img)),
    }))
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "beforeImage" | "afterImage" | "galleryImages",
    index?: number,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (field === "galleryImages" && index !== undefined) {
          updateGalleryImage(index, result)
        } else {
          updateEditData(field, result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = (field: "beforeImage" | "afterImage" | "galleryImages", index?: number) => {
    if (field === "beforeImage" && beforeImageRef.current) {
      beforeImageRef.current.click()
    } else if (field === "afterImage" && afterImageRef.current) {
      afterImageRef.current.click()
    } else if (field === "galleryImages" && index !== undefined && galleryImageRefs.current[index]) {
      galleryImageRefs.current[index]?.click()
    }
  }

  const handleAddGalleryImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, result],
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClickOutside = (event: React.MouseEvent) => {
    if (colorPickerIndex !== null) {
      setColorPickerIndex(null)
      setColorPickerPosition(null)
      setOriginalColor("")
    }
  }

  const handleColorClick = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing) {
      event.stopPropagation()
      const rect = event.currentTarget.getBoundingClientRect()

      const left = rect.right + 10 // 10px gap from the color
      const top = rect.top

      setColorPickerPosition({ top, left })
      setOriginalColor(editData.colorPalette[index]?.color || "#000000")
      setColorPickerIndex(colorPickerIndex === index ? null : index)
    }
  }

  const currentData = isEditing ? editData : projectData

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" onClick={handleClickOutside}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <div className="flex gap-3">
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white transition-all duration-200 bg-transparent"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Project Title */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
          {isEditing ? (
            <Input
              value={currentData.name}
              onChange={(e) => updateEditData("name", e.target.value)}
              className="text-3xl font-bold border-none p-0 h-auto text-[#001F4B] font-montserrat bg-transparent focus:ring-0"
            />
          ) : (
            <h1 className="text-3xl font-bold text-[#001F4B] font-montserrat">{currentData.name}</h1>
          )}
          {isEditing ? (
            <Input
              value={currentData.year}
              onChange={(e) => updateEditData("year", e.target.value)}
              className="text-gray-500 mt-2 w-20 border-gray-300 rounded-lg"
            />
          ) : (
            <p className="text-gray-500 mt-2 font-medium">{currentData.year}</p>
          )}
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { label: "CLIENT", field: "client" as keyof ProjectData },
                { label: "LOCATION", field: "location" as keyof ProjectData },
                { label: "AREA", field: "area" as keyof ProjectData },
                { label: "TECHNOLOGY", field: "technology" as keyof ProjectData },
                { label: "ROLE", field: "role" as keyof ProjectData }, // Changed from PRICE to ROLE
                { label: "STATUS", field: "status" as keyof ProjectData },
              ].map(({ label, field }) => (
                <div key={field}>
                  <p className="text-sm text-gray-500 font-montserrat font-medium mb-1">{label}</p>
                  {isEditing ? (
                    <Input
                      value={currentData[field] as string}
                      onChange={(e) => updateEditData(field, e.target.value)}
                      className="border-gray-200 rounded-lg focus:border-[#001F4B] focus:ring-[#001F4B]"
                    />
                  ) : (
                    <p className="font-medium text-gray-800 font-montserrat bg-gray-50 p-2 rounded-lg">
                      {currentData[field] as string}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Before/After Images */}
        <div className="grid grid-cols-2 gap-6 mb-8">
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
                  className="absolute top-4 right-4 z-10 bg-[#001F4B] hover:bg-[#001F4B]/90 text-white shadow-lg transition-all duration-200"
                  size="sm"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </>
            )}
            <Image
              src={currentData.beforeImage || "/placeholder.svg?height=300&width=400&query=before renovation"}
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
                  className="absolute top-4 right-4 z-10 bg-[#001F4B] hover:bg-[#001F4B]/90 text-white shadow-lg transition-all duration-200"
                  size="sm"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </>
            )}
            <Image
              src={currentData.afterImage || "/placeholder.svg?height=300&width=400&query=after renovation"}
              alt="After renovation"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-xl shadow-lg transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#001F4B] font-montserrat">INSPIRATION</h2>
          {isEditing ? (
            <Textarea
              value={currentData.inspiration}
              onChange={(e) => updateEditData("inspiration", e.target.value)}
              className="w-full border-gray-200 rounded-lg focus:border-[#001F4B] focus:ring-[#001F4B]"
              rows={2}
            />
          ) : (
            <p className="text-gray-600 font-montserrat leading-relaxed bg-gray-50 p-4 rounded-lg">
              {currentData.inspiration}
            </p>
          )}
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#001F4B] font-montserrat">DESCRIPTION</h2>
          {isEditing ? (
            <Textarea
              value={currentData.description}
              onChange={(e) => updateEditData("description", e.target.value)}
              className="w-full border-gray-200 rounded-lg focus:border-[#001F4B] focus:ring-[#001F4B]"
              rows={4}
            />
          ) : (
            <p className="text-gray-600 font-montserrat leading-relaxed bg-gray-50 p-4 rounded-lg">
              {currentData.description}
            </p>
          )}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#001F4B] font-montserrat">FEATURES</h2>
          <ul className="space-y-3">
            {currentData.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#001F4B] rounded-full"></span>
                {isEditing ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={feature}
                      onChange={(e) => updateArrayField("features", index, e.target.value)}
                      className="flex-1 border-gray-200 rounded-lg focus:border-[#001F4B] focus:ring-[#001F4B]"
                    />
                    <Button
                      onClick={() => removeArrayItem("features", index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      X
                    </Button>
                  </div>
                ) : (
                  <span className="text-gray-600 font-montserrat">{feature}</span>
                )}
              </li>
            ))}
            {isEditing && (
              <li>
                <Button
                  onClick={() => addArrayItem("features")}
                  variant="outline"
                  size="sm"
                  className="mt-2 border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Feature
                </Button>
              </li>
            )}
          </ul>
        </div>

        {/* Materials Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#001F4B] font-montserrat">MATERIALS</h2>
          <ul className="space-y-3">
            {currentData.materials.map((material, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#001F4B] rounded-full"></span>
                {isEditing ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={material}
                      onChange={(e) => updateArrayField("materials", index, e.target.value)}
                      className="flex-1 border-gray-200 rounded-lg focus:border-[#001F4B] focus:ring-[#001F4B]"
                    />
                    <Button
                      onClick={() => removeArrayItem("materials", index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      X
                    </Button>
                  </div>
                ) : (
                  <span className="text-gray-600 font-montserrat">{material}</span>
                )}
              </li>
            ))}
            {isEditing && (
              <li>
                <Button
                  onClick={() => addArrayItem("materials")}
                  variant="outline"
                  size="sm"
                  className="mt-2 border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Material
                </Button>
              </li>
            )}
          </ul>
        </div>

        {/* Color Palette Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 relative">
          <h2 className="text-xl font-semibold mb-4 text-[#001F4B] font-montserrat">COLOR PALETTE</h2>
          <div className="flex flex-wrap gap-4">
            {currentData.colorPalette.map((color, index) => (
              <div key={index} className="relative">
                <div
                  className="w-16 h-16 rounded-xl border-2 border-gray-200 cursor-pointer shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 relative"
                  style={{ backgroundColor: color.color }}
                  onClick={(e) => handleColorClick(index, e)}
                />
                {!isEditing && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-mono">
                    {color.color.toUpperCase()}
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
                  variant="outline"
                  size="sm"
                  className="h-16 w-16 rounded-xl bg-transparent border-2 border-dashed border-gray-300 hover:border-[#001F4B] hover:bg-[#001F4B]/5 transition-all duration-200"
                >
                  <Plus className="w-6 h-6 text-gray-400" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#001F4B] font-montserrat">GALLERY</h2>
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
                ref={galleryAddRef}
                onChange={handleAddGalleryImage}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={addGalleryImage}
                className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white shadow-lg transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Gallery Image
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
              ))}
            </div>
          )}
        </div>
      </div>

      {isEditing && colorPickerIndex !== null && colorPickerPosition && (
        <div
          className="fixed z-[99999] bg-white p-3 rounded-lg shadow-xl border-2 border-gray-300"
          style={{
            top: `${colorPickerPosition.top}px`,
            left: `${colorPickerPosition.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center space-y-2">
            <input
              type="color"
              value={currentData.colorPalette[colorPickerIndex]?.color || "#000000"}
              onChange={(e) => {
                updateColorPalette(colorPickerIndex, e.target.value)
              }}
              className="w-16 h-16 rounded-md border border-gray-300 cursor-pointer"
            />
            <div className="text-xs text-gray-600 font-mono">
              {currentData.colorPalette[colorPickerIndex]?.color.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
