"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, X, Plus, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useParams } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"

interface BlogSection {
  id: string
  title: string
  content: string
  level: number
  number: string
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
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/manage-blog")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Blog not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/dashboard/manage-blog/view/${blogId}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to View
          </Button>
          <h1 className="text-3xl font-bold text-[#001F4B] font-montserrat">Edit Blog</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/manage-blog/view/${blogId}`)}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#001F4B] text-white hover:bg-[#001F4B]/90"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Table of Contents Sidebar */}
        <div className="w-80 flex-shrink-0">
          <Card className="p-6 sticky top-8">
            <div className="bg-[#333333] text-white px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-4">
              <h3 className="font-semibold">Table Of Content</h3>
            </div>
            <nav className="space-y-1">
              {editingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors ${
                    section.level === 2 ? "ml-4" : section.level === 3 ? "ml-8" : ""
                  }`}
                >
                  <span className="font-medium text-[#333333] mr-2">{section.number}</span>
                  {section.title}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card className="p-8">
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
                  className="w-full text-4xl font-bold text-[#333333] bg-transparent border-b-2 border-gray-200 focus:border-[#333333] outline-none pb-2"
                />

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editingTags.map((tag, index) => (
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
                      placeholder="Add a new tag..."
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
              </div>
            </div>

            {/* Blog Sections */}
            <div className="space-y-8">
              {editingSections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-8">
                  <div className="space-y-4 p-4 border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 flex-1">
                        <span className="font-bold text-lg text-[#333333]">{section.number}</span>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, "title", e.target.value)}
                          className="text-2xl font-semibold text-gray-900 bg-transparent border-b border-gray-200 focus:border-[#333333] outline-none flex-1 mr-4"
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
                      rows={6}
                      className="w-full p-3 border border-gray-200 rounded-md focus:border-[#333333] outline-none resize-none"
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={addSection}
                  className="w-full border-dashed border-2 border-gray-300 hover:border-[#333333] hover:bg-[#333333]/5 bg-transparent"
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
  )
}
