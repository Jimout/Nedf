"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
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

export default function AddBlogPage() {
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Form state
  const [blogTitle, setBlogTitle] = useState("")
  const [blogImage, setBlogImage] = useState<File | null>(null)
  const [blogImagePreview, setBlogImagePreview] = useState<string>("")
  const [blogTags, setBlogTags] = useState<string[]>([])
  const [blogSections, setBlogSections] = useState<BlogSection[]>([
    {
      id: "section-1",
      title: "Introduction",
      content: "Enter your introduction content here...",
      level: 1,
      number: "1",
    },
  ])
  const [newTag, setNewTag] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBlogImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setBlogImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !blogTags.includes(newTag.trim())) {
      setBlogTags([...blogTags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setBlogTags(blogTags.filter((tag) => tag !== tagToRemove))
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

  const addSection = () => {
    const newSection: BlogSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      content: "Enter your content here...",
      level: 1,
      number: "1",
    }
    setBlogSections((prev) => renumberSections([...prev, newSection]))
  }

  const updateSection = (id: string, field: "title" | "content", value: string) => {
    setBlogSections((prev) => prev.map((section) => (section.id === id ? { ...section, [field]: value } : section)))
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
            setBlogSections((prev) => prev.map((section) => 
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
    setBlogSections((prev) => prev.map((section) => 
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
    setBlogSections((prev) => {
      const updated = prev.map((section) =>
        section.id === id ? { ...section, level: Math.max(1, Math.min(3, newLevel)) } : section,
      )
      return renumberSections(updated)
    })
  }

  const removeSection = (id: string) => {
    setBlogSections((prev) => renumberSections(prev.filter((section) => section.id !== id)))
  }

  const handleCreateBlog = () => {
    if (blogTitle.trim()) {
      setShowCreateModal(true)
    }
  }

  const confirmCreate = () => {
    const newBlog = {
      id: `blog-${Date.now()}`,
      title: blogTitle,
      heroImage: blogImagePreview || "/placeholder.svg?height=256&width=800",
      tags: blogTags,
      sections: blogSections,
      createdAt: new Date().toISOString().split("T")[0],
    }

    const savedBlogs = localStorage.getItem("blogs")
    const blogs = savedBlogs ? JSON.parse(savedBlogs) : []
    blogs.push(newBlog)
    localStorage.setItem("blogs", JSON.stringify(blogs))

    setShowCreateModal(false)
    router.push(`/dashboard/manage-blog/view/${newBlog.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
            <ArrowLeftIcon />
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Add New Blog</h1>
        </div>

        <Card className="shadow-lg dark:bg-[#1a1d23] dark:border-gray-700">
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Hero Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">Hero Image</label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-white/50 rounded-md focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#001F4B] dark:file:bg-[#ec1e24] file:text-white hover:file:bg-[#001F4B]/90 dark:hover:file:bg-[#ec1e24]/90"
                  />
                  {blogImagePreview && (
                    <img
                      src={blogImagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>

              {/* Blog Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">Blog Title</label>
                <input
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="Enter blog title..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-white/50 rounded-md focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none dark:bg-[#1a1d23] dark:text-white"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {blogTags.map((tag, index) => (
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
                    placeholder="Add a tag..."
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

              {/* Blog Sections */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-4">Blog Sections</label>
                <div className="space-y-4">
                  {blogSections.map((section) => (
                    <div key={section.id} className="p-4 border-2 border-dashed border-gray-300 dark:border-white/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="font-bold text-lg text-[#001F4B] dark:text-[#ec1e24]">{section.number}</span>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(section.id, "title", e.target.value)}
                            className="text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-b border-gray-200 dark:border-white/50 focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none flex-1"
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
                        rows={4}
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
                  ))}

                  <Button
                    variant="outline"
                    onClick={addSection}
                    className="w-full border-dashed border-2 border-gray-300 dark:border-white/50 hover:border-[#001F4B] dark:hover:border-[#ec1e24] hover:bg-[#001F4B]/5 dark:hover:bg-[#ec1e24]/5 bg-transparent"
                  >
                    + Add New Section
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-[#001F4B] dark:border-[#ec1e24] text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateBlog}
                  disabled={!blogTitle.trim()}
                  className="bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Blog
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <ConfirmationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onConfirm={confirmCreate}
          title="Create Blog"
          message="Are you sure you want to create this blog?"
          type="add"
        />
      </div>
    </div>
  )
}
