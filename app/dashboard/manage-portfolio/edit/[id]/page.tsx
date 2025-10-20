"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

interface Project {
  id: number
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

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [yearError, setYearError] = useState("")

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolioProjects")
    if (savedProjects) {
      const projects = JSON.parse(savedProjects)
      const foundProject = projects.find((p: Project) => p.id === Number.parseInt(params.id))
      if (foundProject) {
        setProject({
          ...foundProject,
          customFields: foundProject.customFields || [],
          features: foundProject.features || [""],
          materials: foundProject.materials || [""],
          colorPalette: foundProject.colorPalette || ["#ffffff"],
          galleryImages: foundProject.galleryImages || [],
          location: foundProject.location || "",
          area: foundProject.area || "",
          topology: foundProject.topology || "",
          role: foundProject.role || "",
          inspiration: foundProject.inspiration || "",
        })
      } else {
        router.push("/dashboard/manage-portfolio")
      }
    }
  }, [params.id, router])

  const handleSave = () => {
    if (!project) return

    if (!isFormValid()) {
      setValidationError(
        "Please fill all required fields: Name, Year, Client, Before Image, After Image, Description, Color Palette (at least 1), and Gallery (at least 2 photos)",
      )
      setTimeout(() => setValidationError(""), 6000)
      return
    }

    setShowConfirmModal(true)
  }

  const handleConfirmedSave = () => {
    if (!project) return

    const savedProjects = localStorage.getItem("portfolioProjects")
    if (savedProjects) {
      const projects = JSON.parse(savedProjects)
      const updatedProjects = projects.map((p: Project) => (p.id === project.id ? project : p))
      localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects))
    }

    setShowConfirmModal(false)
    router.push(`/dashboard/manage-portfolio/view/${project.id}`)
  }

  const handleYearChange = (value: string) => {
    if (!project) return

    // Check if user is trying to enter non-numeric characters
    if (value && !/^\d*$/.test(value)) {
      setYearError("⚠️ Year field only accepts numbers (0-9)")
      setTimeout(() => setYearError(""), 4000)
    } else {
      setYearError("")
    }

    // Strip all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "")
    setProject({ ...project, year: numericValue })
  }

  const handleArrayChange = (field: "features" | "materials" | "galleryImages", index: number, value: string) => {
    if (!project) return
    setProject({
      ...project,
      [field]: project[field].map((item, i) => (i === index ? value : item)),
    })
  }

  const addArrayItem = (field: "features" | "materials" | "galleryImages") => {
    if (!project) return
    setProject({
      ...project,
      [field]: [...project[field], ""],
    })
  }

  const removeArrayItem = (field: "features" | "materials" | "galleryImages", index: number) => {
    if (!project) return
    setProject({
      ...project,
      [field]: project[field].filter((_, i) => i !== index),
    })
  }

  const handleColorChange = (index: number, value: string) => {
    if (!project) return
    setProject({
      ...project,
      colorPalette: project.colorPalette.map((color, i) => (i === index ? value : color)),
    })
  }

  const addColor = () => {
    if (!project) return
    setProject({
      ...project,
      colorPalette: [...project.colorPalette, "#ffffff"],
    })
  }

  const removeColor = (index: number) => {
    if (!project) return
    if (project.colorPalette.length > 1) {
      setProject({
        ...project,
        colorPalette: project.colorPalette.filter((_, i) => i !== index),
      })
    }
  }

  const handleColorClick = (index: number, event: React.MouseEvent) => {
    if (!project) return
    const rect = (event.target as HTMLElement).getBoundingClientRect()

    const input = document.createElement("input")
    input.type = "color"
    input.value = project.colorPalette[index]
    input.style.position = "absolute"
    input.style.left = `${rect.left}px`
    input.style.top = `${rect.bottom + 5}px`
    input.style.opacity = "0"
    input.style.pointerEvents = "none"

    input.onchange = (e) => {
      handleColorChange(index, (e.target as HTMLInputElement).value)
      document.body.removeChild(input)
    }

    input.onblur = () => {
      document.body.removeChild(input)
    }

    document.body.appendChild(input)
    input.focus()
    input.click()
  }

  const handleImageUpload = (field: "beforeImage" | "afterImage" | "galleryImages", index?: number) => {
    if (!project) return
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
          setProject({ ...project, [field]: url })
        }
      }
    }
    input.click()
  }

  const handleGalleryUpload = () => {
    if (!project) return
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      files.forEach((file) => {
        const url = URL.createObjectURL(file)
        setProject((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            galleryImages: [...prev.galleryImages, url],
          }
        })
      })
    }
    input.click()
  }

  const addCustomField = (type: "text" | "list") => {
    if (!project) return
    const newField: CustomField = {
      id: Date.now().toString(),
      type,
      label: `Custom ${type === "text" ? "Field" : "List"} ${project.customFields.length + 1}`,
      value: type === "text" ? "" : [""],
    }
    setProject({
      ...project,
      customFields: [...project.customFields, newField],
    })
  }

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    if (!project) return
    setProject({
      ...project,
      customFields: project.customFields.map((field) => (field.id === id ? { ...field, ...updates } : field)),
    })
  }

  const removeCustomField = (id: string) => {
    if (!project) return
    setProject({
      ...project,
      customFields: project.customFields.filter((field) => field.id !== id),
    })
  }

  const addCustomListItem = (fieldId: string) => {
    if (!project) return
    setProject({
      ...project,
      customFields: project.customFields.map((field) =>
        field.id === fieldId && field.type === "list" ? { ...field, value: [...(field.value as string[]), ""] } : field,
      ),
    })
  }

  const updateCustomListItem = (fieldId: string, index: number, value: string) => {
    if (!project) return
    setProject({
      ...project,
      customFields: project.customFields.map((field) =>
        field.id === fieldId && field.type === "list"
          ? {
              ...field,
              value: (field.value as string[]).map((item, i) => (i === index ? value : item)),
            }
          : field,
      ),
    })
  }

  const removeCustomListItem = (fieldId: string, index: number) => {
    if (!project) return
    setProject({
      ...project,
      customFields: project.customFields.map((field) =>
        field.id === fieldId && field.type === "list"
          ? {
              ...field,
              value: (field.value as string[]).filter((_, i) => i !== index),
            }
          : field,
      ),
    })
  }

  const isFormValid = () => {
    return (
      project &&
      project.name.trim() !== "" &&
      project.year.trim() !== "" &&
      project.client.trim() !== "" &&
      project.beforeImage !== "" &&
      project.afterImage !== "" &&
      project.description.trim() !== "" &&
      project.colorPalette.length > 0 &&
      project.galleryImages.length >= 2 // At least 2 gallery photos
    )
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Montserrat']">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
            <ArrowLeftIcon />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] uppercase tracking-wide mb-4">Edit Project</h1>
            {project.name && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium uppercase">Project Name</label>
                  <p className="text-base sm:text-lg text-gray-800 font-medium">{project.name}</p>
                </div>
                {project.year && (
                  <div>
                    <label className="text-xs text-gray-500 font-medium uppercase">Year</label>
                    <p className="text-base sm:text-lg text-gray-800 font-medium">{project.year}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {validationError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">{validationError}</p>
          </div>
        )}

        <Card className="mb-8 border-2 border-[#001F4B]/20 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-[#001F4B] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Project Name:</span>
                <span className="ml-2 text-gray-600">{project.name || "Not set"}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Year:</span>
                <span className="ml-2 text-gray-600">{project.year || "Not set"}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Client:</span>
                <span className="ml-2 text-gray-600">{project.client || "Not set"}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="ml-2 text-gray-600">{project.status || "Not set"}</span>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">Custom Fields:</span>
                <span className="ml-2 text-gray-600">{project.customFields.length} field(s)</span>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  value={project.name}
                  onChange={(e) => setProject({ ...project, name: e.target.value })}
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
                  value={project.year}
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
                  value={project.client}
                  onChange={(e) => setProject({ ...project, client: e.target.value })}
                  placeholder="Client name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  value={project.location}
                  onChange={(e) => setProject({ ...project, location: e.target.value })}
                  placeholder="Project location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                <Input
                  value={project.area}
                  onChange={(e) => setProject({ ...project, area: e.target.value })}
                  placeholder="Area size"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topology</label>
                <Input
                  value={project.topology}
                  onChange={(e) => setProject({ ...project, topology: e.target.value })}
                  placeholder="Topology used"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <Input
                  value={project.role}
                  onChange={(e) => setProject({ ...project, role: e.target.value })}
                  placeholder="Your role in project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={project.status} onValueChange={(value) => setProject({ ...project, status: value })}>
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
                  {project.beforeImage ? (
                    <div className="relative">
                      <img
                        src={project.beforeImage || "/placeholder.svg"}
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
                  {project.afterImage ? (
                    <div className="relative">
                      <img
                        src={project.afterImage || "/placeholder.svg"}
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
                value={project.inspiration}
                onChange={(e) => setProject({ ...project, inspiration: e.target.value })}
                placeholder="Describe the inspiration for this project"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
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
              {project.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleArrayChange("features", index, e.target.value)}
                    placeholder="Enter feature"
                  />
                  {project.features.length > 1 && (
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

        <Card className="mb-8 border-2 border-dashed border-gray-300 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-[#001F4B] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Custom Fields
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Create dynamic fields to add any additional information to your project. Choose between text fields for paragraphs or list fields for bullet points.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => addCustomField("text")}
                className="flex-1 border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-white shadow-sm"
              >
                <PlusIcon />
                <span className="ml-2">Add Text Field</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => addCustomField("list")}
                className="flex-1 border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-white shadow-sm"
              >
                <PlusIcon />
                <span className="ml-2">Add List Field</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {project.customFields.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#001F4B] flex items-center gap-2">
                Custom Fields
                <span className="text-sm font-normal text-gray-500">({project.customFields.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {project.customFields.map((field, fieldIndex) => (
                <div key={field.id} className="border-2 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#001F4B] text-white">
                      {field.type === "text" ? (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      )}
                      <span>{field.type === "text" ? "Text" : "List"}</span>
                    </div>
                    <Input
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                      placeholder="Field label"
                      className="flex-1 font-medium border-gray-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCustomField(field.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
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
                      className="border-gray-300"
                    />
                  ) : (
                    <div className="space-y-2">
                      {(field.value as string[]).map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <span className="text-xs text-gray-500 font-mono w-6">{index + 1}.</span>
                          <Input
                            value={item}
                            onChange={(e) => updateCustomListItem(field.id, index, e.target.value)}
                            placeholder="Enter list item"
                            className="flex-1 border-gray-300"
                          />
                          {(field.value as string[]).length > 1 && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => removeCustomListItem(field.id, index)}
                              className="hover:bg-red-50 hover:border-red-300"
                            >
                              <XIcon />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => addCustomListItem(field.id)} 
                        className="w-full border-dashed border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white"
                      >
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
            <CardTitle className="text-[#001F4B]">Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.materials.map((material, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={material}
                    onChange={(e) => handleArrayChange("materials", index, e.target.value)}
                    placeholder="Enter material"
                  />
                  {project.materials.length > 1 && (
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
            <CardTitle className="text-[#001F4B]">
              Color Palette <span className="text-red-500">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              {project.colorPalette.map((color, index) => (
                <div key={index} className="relative">
                  <div
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: color }}
                    onClick={(e) => handleColorClick(index, e)}
                  />
                  {project.colorPalette.length > 1 && (
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#001F4B]">
              Gallery <span className="text-red-500">*</span>
              <span className="text-sm font-normal text-gray-500 ml-2">(Minimum 2 photos required)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project.galleryImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {project.galleryImages.map((image, index) => (
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
              {!project.name.trim() && <li>Project Name</li>}
              {!project.year.trim() && <li>Year</li>}
              {!project.client.trim() && <li>Client</li>}
              {!project.beforeImage && <li>Before Image</li>}
              {!project.afterImage && <li>After Image</li>}
              {!project.description.trim() && <li>Description</li>}
              {project.colorPalette.length === 0 && <li>Color Palette (at least 1 color)</li>}
              {project.galleryImages.length < 2 && <li>Gallery (at least 2 photos, currently {project.galleryImages.length})</li>}
            </ul>
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className={`${isFormValid() ? "bg-[#001F4B] hover:bg-[#001F4B]/90" : "bg-gray-400 cursor-not-allowed hover:bg-gray-400"}`}
            disabled={!isFormValid()}
          >
            Save Changes
          </Button>
        </div>

        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmedSave}
          title="Save Changes"
          message="Are you sure you want to save these changes?"
          type="update"
        />
      </div>
    </div>
  )
}
