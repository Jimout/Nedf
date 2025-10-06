"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, X, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"

interface BlogSection {
  id: string
  title: string
  content: string
  level: number
  number: string
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-[#001F4B] font-montserrat">Add New Blog</h1>
        </div>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          {/* Hero Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-[#333333] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#001F4B] file:text-white hover:file:bg-[#001F4B]/90"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-[#333333] outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {blogTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-[#333333] text-white px-3 py-1 rounded-full text-sm"
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
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:border-[#333333] outline-none text-sm"
              />
              <Button
                type="button"
                onClick={addTag}
                size="sm"
                className="bg-[#001F4B] text-white hover:bg-[#001F4B]/90"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Blog Sections */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Blog Sections</label>
            <div className="space-y-4">
              {blogSections.map((section) => (
                <div key={section.id} className="p-4 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-bold text-lg text-[#333333]">{section.number}</span>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, "title", e.target.value)}
                        className="text-lg font-semibold text-gray-900 bg-transparent border-b border-gray-200 focus:border-[#333333] outline-none flex-1"
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
                        <span className="text-sm text-gray-600 min-w-[20px] text-center">{section.level}</span>
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
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(section.id, "content", e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-md focus:border-[#333333] outline-none resize-none"
                  />
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addSection}
                className="w-full border-dashed border-2 border-gray-300 hover:border-[#333333] hover:bg-[#333333]/5 bg-transparent"
              >
                + Add New Section
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateBlog}
              disabled={!blogTitle.trim()}
              className="bg-[#001F4B] text-white hover:bg-[#001F4B]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Blog
            </Button>
          </div>
        </div>
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
  )
}
