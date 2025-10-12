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

interface CustomField {
  id: string
  type: "text" | "list"
  label: string
  value: string | string[]
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
  inspiration: string
  description: string
  features: string[]
  materials: string[]
  colorPalette: string[]
  galleryImages: string[]
  customFields: CustomField[]
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
    inspiration: "",
    description: "",
    features: [""],
    materials: [""],
    colorPalette: ["#ffffff"],
    galleryImages: [],
    customFields: [],
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

  const handleUpload = () => {
    if (!isFormValid()) {
      setValidationError(
        "Please fill all required fields: Name, Year, Client, Before Image, After Image, Description, Color Palette (at least 1), and Gallery (at least 2 photos)",
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

  const addCustomField = (type: "text" | "list") => {
    const newField: CustomField = {
      id: Date.now().toString(),
      type,
      label: `Custom ${type === "text" ? "Field" : "List"} ${projectData.customFields.length + 1}`,
      value: type === "text" ? "" : [""],
    }
    setProjectData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, newField],
    }))
  }

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    setProjectData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) => (field.id === id ? { ...field, ...updates } : field)),
    }))
  }

  const removeCustomField = (id: string) => {
    setProjectData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== id),
    }))
  }

  const addCustomListItem = (fieldId: string) => {
    setProjectData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId && field.type === "list" ? { ...field, value: [...(field.value as string[]), ""] } : field,
      ),
    }))
  }

  const updateCustomListItem = (fieldId: string, index: number, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId && field.type === "list"
          ? {
              ...field,
              value: (field.value as string[]).map((item, i) => (i === index ? value : item)),
            }
          : field,
      ),
    }))
  }

  const removeCustomListItem = (fieldId: string, index: number) => {
    setProjectData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId && field.type === "list"
          ? {
              ...field,
              value: (field.value as string[]).filter((_, i) => i !== index),
            }
          : field,
      ),
    }))
  }

  const handleColorClick = (index: number, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    setColorPickerPosition({
      x: rect.left,
      y: rect.bottom + 5,
    })
    setActiveColorIndex(index)

    const input = document.createElement("input")
    input.type = "color"
    input.value = projectData.colorPalette[index]
    input.style.position = "absolute"
    input.style.left = `${rect.left}px`
    input.style.top = `${rect.bottom + 5}px`
    input.style.opacity = "0"
    input.style.pointerEvents = "none"

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
      projectData.description.trim() !== "" &&
      projectData.colorPalette.length > 0 &&
      projectData.galleryImages.length >= 2 // At least 2 gallery photos
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Montserrat']">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" className="p-2" onClick={handleBackClick}>
            <ArrowLeftIcon />
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] uppercase tracking-wide">Add New Project</h1>
        </div>

        {validationError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">{validationError}</p>
          </div>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={projectData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={projectData.year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  placeholder="Enter year (numbers only)"
                  required
                  className={yearError ? "border-red-500 focus:border-red-500" : ""}
                />
                {yearError && (
                  <p className="text-red-600 text-sm mt-1 font-medium bg-red-50 p-2 rounded">
                    {yearError}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client <span className="text-red-500">*</span>
                </label>
                <Input
                  value={projectData.client}
                  onChange={(e) => handleInputChange("client", e.target.value)}
                  placeholder="Client name"
                  required
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
                  placeholder="Topology used"
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
                    <SelectItem value="UnderConstruction">Under Construction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">
              Before & After Images <span className="text-red-500">*</span>
            </CardTitle>
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
                      <div className="text-gray-400 mx-auto mb-2">
                        <UploadIcon />
                      </div>
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
                      <div className="text-gray-400 mx-auto mb-2">
                        <UploadIcon />
                      </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={projectData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Detailed project description"
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

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
                      <XIcon />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={() => addArrayItem("features")} className="w-full">
                <PlusIcon />
                <span className="ml-2">Add Feature</span>
              </Button>
            </div>
          </CardContent>
        </Card>

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
                      <XIcon />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={() => addArrayItem("materials")} className="w-full">
                <PlusIcon />
                <span className="ml-2">Add Material</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">Add Custom Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => addCustomField("text")}
                className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
              >
                <PlusIcon />
                <span className="ml-2">Add Text Field</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => addCustomField("list")}
                className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
              >
                <PlusIcon />
                <span className="ml-2">Add List Field</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">
              Color Palette <span className="text-red-500">*</span>
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
              <PlusIcon />
              <span className="ml-2">Add Color</span>
            </Button>
          </CardContent>
        </Card>

        {projectData.customFields.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#001F4B]">Custom Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {projectData.customFields.map((field) => (
                <div key={field.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Input
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                      placeholder="Field label"
                      className="font-medium"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCustomField(field.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XIcon />
                    </Button>
                  </div>

                  {field.type === "text" ? (
                    <Textarea
                      value={field.value as string}
                      onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
                      placeholder="Enter text content"
                      rows={3}
                    />
                  ) : (
                    <div className="space-y-2">
                      {(field.value as string[]).map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateCustomListItem(field.id, index, e.target.value)}
                            placeholder="Enter list item"
                          />
                          {(field.value as string[]).length > 1 && (
                            <Button variant="outline" size="sm" onClick={() => removeCustomListItem(field.id, index)}>
                              <XIcon />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => addCustomListItem(field.id)} className="w-full">
                        <PlusIcon />
                        <span className="ml-2">Add Item</span>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">
              Gallery <span className="text-red-500">*</span>
              <span className="text-sm font-normal text-gray-500 ml-2">(Minimum 2 photos required)</span>
            </CardTitle>
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
              <PlusIcon />
              <span className="ml-2">Add Gallery Images</span>
            </Button>
          </CardContent>
        </Card>

        {/* Validation Status */}
        {!isFormValid() && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-medium text-sm">
              ⚠️ Please complete all required fields:
            </p>
            <ul className="mt-2 text-yellow-700 text-sm list-disc list-inside">
              {!projectData.name.trim() && <li>Project Name</li>}
              {!projectData.year.trim() && <li>Year</li>}
              {!projectData.client.trim() && <li>Client</li>}
              {!projectData.beforeImage && <li>Before Image</li>}
              {!projectData.afterImage && <li>After Image</li>}
              {!projectData.description.trim() && <li>Description</li>}
              {projectData.colorPalette.length === 0 && <li>Color Palette (at least 1 color)</li>}
              {projectData.galleryImages.length < 2 && <li>Gallery (at least 2 photos, currently {projectData.galleryImages.length})</li>}
            </ul>
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            className={`${isFormValid() ? "bg-[#001F4B] hover:bg-[#001F4B]/90" : "bg-gray-400 cursor-not-allowed hover:bg-gray-400"}`}
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
