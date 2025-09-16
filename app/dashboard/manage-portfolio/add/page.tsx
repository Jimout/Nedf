"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProjectData {
  name: string
  year: string
  client: string
  location: string
  area: string
  topology: string
  role: string // Changed from price to role
  status: string
  beforeImage: string
  afterImage: string
  inspiration: string
  description: string
  features: string[]
  materials: string[]
  colorPalette: string[] // Simplified to just hex colors without names
  galleryImages: string[]
}

interface AddProjectPageProps {
  onBack?: () => void
}

export default function AddProjectPage({ onBack }: AddProjectPageProps) {
  const router = useRouter()
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    year: "2024",
    client: "",
    location: "",
    area: "",
    topology: "",
    role: "", // Changed from price to role
    status: "In Progress",
    beforeImage: "",
    afterImage: "",
    inspiration: "",
    description: "",
    features: [""],
    materials: [""],
    colorPalette: ["#ffffff"], // Start with one color, no predefined names
    galleryImages: [],
  })

  const handleInputChange = (field: keyof ProjectData, value: string) => {
    setProjectData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: "features" | "materials" | "galleryImages", index: number, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "features" | "materials" | "galleryImages") => {
    setProjectData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "features" | "materials" | "galleryImages", index: number) => {
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

  const handleSave = () => {
    // Here you would typically save to a database or API
    console.log("Saving project:", projectData)
    if (onBack) {
      onBack()
    }
  }

  const handleCancel = () => {
    if (onBack) {
      onBack()
    }
  }

  const handleBackClick = () => {
    if (onBack) {
      onBack()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Montserrat']">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" className="p-2" onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold text-[#001F4B] uppercase tracking-wide">Add New Project</h1>
        </div>

        {/* Project Details Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <Input
                  value={projectData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <Input
                  value={projectData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <Input
                  value={projectData.client}
                  onChange={(e) => handleInputChange("client", e.target.value)}
                  placeholder="Client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  value={projectData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Project location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                <Input
                  value={projectData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  placeholder="Area size"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topology</label>
                <Input
                  value={projectData.topology}
                  onChange={(e) => handleInputChange("topology", e.target.value)}
                  placeholder="Technology used"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <Input
                  value={projectData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="Your role in project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={projectData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Planning">Planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Before & After Images */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Before & After Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Before Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <Button variant="outline" onClick={() => handleImageUpload("beforeImage")}>
                        Upload Before Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">After Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <Button variant="outline" onClick={() => handleImageUpload("afterImage")}>
                        Upload After Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inspiration & Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Inspiration</label>
              <Textarea
                value={projectData.inspiration}
                onChange={(e) => handleInputChange("inspiration", e.target.value)}
                placeholder="Describe the inspiration for this project"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={projectData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Detailed project description"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projectData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleArrayChange("features", index, e.target.value)}
                    placeholder="Enter feature"
                  />
                  {projectData.features.length > 1 && (
                    <Button variant="outline" size="sm" onClick={() => removeArrayItem("features", index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={() => addArrayItem("features")} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Materials */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projectData.materials.map((material, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={material}
                    onChange={(e) => handleArrayChange("materials", index, e.target.value)}
                    placeholder="Enter material"
                  />
                  {projectData.materials.length > 1 && (
                    <Button variant="outline" size="sm" onClick={() => removeArrayItem("materials", index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={() => addArrayItem("materials")} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Material
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              {projectData.colorPalette.map((color, index) => (
                <div key={index} className="relative">
                  <div
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "color"
                      input.value = color
                      input.onchange = (e) => handleColorChange(index, (e.target as HTMLInputElement).value)
                      input.click()
                    }}
                  />
                  {projectData.colorPalette.length > 1 && (
                    <button
                      onClick={() => removeColor(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                    >
                      X
                    </button>
                  )}
                  <div className="text-xs text-gray-600 mt-1 text-center font-mono">{color}</div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={addColor}
              className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Color
            </Button>
          </CardContent>
        </Card>

        {/* Gallery */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            {projectData.galleryImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {projectData.galleryImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onClick={() => removeArrayItem("galleryImages", index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Button
              variant="outline"
              onClick={handleGalleryUpload}
              className="bg-[#001F4B] text-white hover:bg-[#001F4B]/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Gallery Images
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#001F4B] hover:bg-[#001F4B]/90">
            Save Project
          </Button>
        </div>
      </div>
    </div>
  )
}
