"use client"

import { useState, useEffect } from "react"
import { Save, X, Plus, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter, useParams } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

interface BlogSection {
  id: string
  title: string
  content: string
  level: number
  number: string
  images?: string[]
  imageFiles?: File[]
}

interface Blog {
  id: string
  title: string
  heroImage: string
  tags: string[]
  sections: BlogSection[]
  createdAt: string
}

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const blogId = params.id as string

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [originalBlog, setOriginalBlog] = useState<Blog | null>(null)

  // Editing state
  const [editingTitle, setEditingTitle] = useState("")
  const [editingTags, setEditingTags] = useState<string[]>([])
  const [editingSections, setEditingSections] = useState<BlogSection[]>([])
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs")
    if (savedBlogs) {
      const blogs: Blog[] = JSON.parse(savedBlogs)
      const foundBlog = blogs.find((b) => b.id === blogId)
      if (foundBlog) {
        setOriginalBlog(foundBlog)
        setEditingTitle(foundBlog.title)
        setEditingTags([...foundBlog.tags])
        setEditingSections([...foundBlog.sections])
      }
    }
  }, [blogId])

  const addTag = () => {
    if (newTag.trim() && !editingTags.includes(newTag.trim())) {
      setEditingTags([...editingTags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setEditingTags(editingTags.filter((tag) => tag !== tagToRemove))
  }

  const renumberSections = (sectionsToNumber: BlogSection[]): BlogSection[] => {
    const numbered = [...sectionsToNumber]
    const counters = [0, 0, 0]

    numbered.forEach((section) => {
      if (section.level === 1) {
        counters[0]++
        counters[1] = 0
        counters[2] = 0
        section.number = counters[0].toString()
      } else if (section.level === 2) {
        counters[1]++
        counters[2] = 0
        section.number = `${counters[0]}.${counters[1]}`
      } else if (section.level === 3) {
        counters[2]++
        section.number = `${counters[0]}.${counters[1]}.${counters[2]}`
      }
    })

    return numbered
  }

  const updateSection = (id: string, field: "title" | "content", value: string) => {
    setEditingSections((prev) => prev.map((section) => (section.id === id ? { ...section, [field]: value } : section)))
  }

  const handleSectionImageUpload = (sectionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newImages: string[] = []
      const newFiles: File[] = []
      
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          newImages.push(e.target?.result as string)
          newFiles.push(file)
          
          if (newImages.length === files.length) {
            setEditingSections((prev) => prev.map((section) => 
              section.id === sectionId 
                ? { 
                    ...section, 
                    images: [...(section.images || []), ...newImages],
                    imageFiles: [...(section.imageFiles || []), ...newFiles]
                  } 
                : section
            ))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeSectionImage = (sectionId: string, imageIndex: number) => {
    setEditingSections((prev) => prev.map((section) => 
      section.id === sectionId 
        ? { 
            ...section, 
            images: section.images?.filter((_, index) => index !== imageIndex),
            imageFiles: section.imageFiles?.filter((_, index) => index !== imageIndex)
          } 
        : section
    ))
  }

  const updateSectionLevel = (id: string, newLevel: number) => {
    setEditingSections((prev) => {
      const updated = prev.map((section) =>
        section.id === id ? { ...section, level: Math.max(1, Math.min(3, newLevel)) } : section,
      )
      return renumberSections(updated)
    })
  }

  const addSection = () => {
    const newSection: BlogSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      content: "Enter your content here...",
      level: 1,
      number: "1",
    }
    setEditingSections((prev) => renumberSections([...prev, newSection]))
  }

  const removeSection = (id: string) => {
    setEditingSections((prev) => renumberSections(prev.filter((section) => section.id !== id)))
  }

  const handleSave = () => {
    setShowSaveModal(true)
  }

  const confirmSave = () => {
    if (originalBlog) {
      const updatedBlog = {
        ...originalBlog,
        title: editingTitle,
        tags: editingTags,
        sections: editingSections,
      }

      const savedBlogs = localStorage.getItem("blogs")
      const blogs: Blog[] = savedBlogs ? JSON.parse(savedBlogs) : []
      const updatedBlogs = blogs.map((b) => (b.id === blogId ? updatedBlog : b))
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs))

      setShowSaveModal(false)
      router.push(`/dashboard/manage-blog/view/${blogId}`)
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!originalBlog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
        <div className="w-full">
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white"
              onClick={() => router.push("/dashboard/manage-blog")}
            >
              <ArrowLeftIcon />
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Edit Blog</h1>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-white/60">Blog not found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white"
              onClick={() => router.push(`/dashboard/manage-blog/view/${blogId}`)}
            >
              <ArrowLeftIcon />
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Edit Blog</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/manage-blog/view/${blogId}`)}
              className="border-[#001F4B] dark:border-[#ec1e24] text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white bg-transparent"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Table of Contents Sidebar */}
          <div className="w-80 flex-shrink-0">
            <Card className="p-6 sticky top-8 dark:bg-[#1a1d23] dark:border-gray-700">
              <div className="bg-[#001F4B] dark:bg-[#ec1e24] text-white px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-4">
                <h3 className="font-semibold">Table Of Content</h3>
              </div>
              <nav className="space-y-1">
                {editingSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-[#2a2d35] rounded-md transition-colors ${
                      section.level === 2 ? "ml-4" : section.level === 3 ? "ml-8" : ""
                    }`}
                  >
                    <span className="font-medium text-[#001F4B] dark:text-[#ec1e24] mr-2">{section.number}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="p-8 dark:bg-[#1a1d23] dark:border-gray-700">
              {/* Hero Section */}
              <div className="mb-8">
                <img
                  src={originalBlog.heroImage || "/placeholder.svg?height=256&width=800"}
                  alt="Blog hero"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />

                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full text-4xl font-bold text-[#001F4B] dark:text-[#ec1e24] bg-transparent border-b-2 border-gray-200 dark:border-white/50 focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none pb-2"
                  />

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-white/80">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editingTags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-[#001F4B] dark:bg-[#ec1e24] text-white px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                          <button onClick={() => removeTag(tag)} className="text-white hover:text-red-200 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                        placeholder="Add a new tag..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-white/50 rounded-md focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        size="sm"
                        className="bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Sections */}
              <div className="space-y-8">
                {editingSections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-8">
                    <div className="space-y-4 p-4 border-2 border-dashed border-gray-300 dark:border-white/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 flex-1">
                          <span className="font-bold text-lg text-[#001F4B] dark:text-[#ec1e24]">{section.number}</span>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(section.id, "title", e.target.value)}
                            className="text-2xl font-semibold text-gray-900 dark:text-white bg-transparent border-b border-gray-200 dark:border-white/50 focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none flex-1 mr-4"
                          />
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateSectionLevel(section.id, section.level - 1)}
                              disabled={section.level <= 1}
                              className="p-1 h-8 w-8"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>
                            <span className="text-sm text-gray-600 dark:text-white/60 min-w-[20px] text-center">{section.level}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateSectionLevel(section.id, section.level + 1)}
                              disabled={section.level >= 3}
                              className="p-1 h-8 w-8"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSection(section.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(section.id, "content", e.target.value)}
                        rows={6}
                        className="w-full p-3 border border-gray-300 dark:border-white/50 rounded-md focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none resize-none dark:bg-[#1a1d23] dark:text-white"
                      />
                      
                      {/* Optional Images Upload */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                          Optional Images (for this section)
                        </label>
                        <div className="space-y-3">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleSectionImageUpload(section.id, e)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-white/50 rounded-md focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#001F4B] dark:file:bg-[#ec1e24] file:text-white hover:file:bg-[#001F4B]/90 dark:hover:file:bg-[#ec1e24]/90"
                          />
                          
                          {section.images && section.images.length > 0 && (
                            <div className="space-y-3">
                              {section.images.length === 1 ? (
                                // Single image display
                                <div className="relative">
                                  <img
                                    src={section.images[0]}
                                    alt="Section preview"
                                    className="w-full max-w-md h-32 object-cover rounded-md"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeSectionImage(section.id, 0)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                // Gallery display for multiple images
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                  {section.images.map((image, index) => (
                                    <div key={index} className="relative group">
                                      <img
                                        src={image}
                                        alt={`Section image ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-md"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeSectionImage(section.id, index)}
                                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={addSection}
                    className="w-full border-dashed border-2 border-gray-300 dark:border-white/50 hover:border-[#001F4B] dark:hover:border-[#ec1e24] hover:bg-[#001F4B]/5 dark:hover:bg-[#ec1e24]/5 bg-transparent"
                  >
                    + Add New Section
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <ConfirmationModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          onConfirm={confirmSave}
          title="Save Changes"
          message="Are you sure you want to save these changes to the blog?"
          type="update"
        />
      </div>
    </div>
  )
}
