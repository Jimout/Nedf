"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Edit3, Save, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BlogSection {
  id: string
  title: string
  subtitle?: string
  content: string
  level: number
}

interface ManageBlogPageProps {
  onBack: () => void
}

export default function ManageBlogPage({ onBack }: ManageBlogPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [blogTitle, setBlogTitle] = useState("From Concept To Concrete")
  const [blogSubtitle, setBlogSubtitle] = useState("Case File | Architecture")
  const [heroImage, setHeroImage] = useState("/modern-construction-site-with-buildings.jpg")
  const [tags, setTags] = useState<string[]>([
    "Architecture",
    "Design Process",
    "Construction",
    "Modern Home",
    "NEDF Studio",
  ])

  const [sections, setSections] = useState<BlogSection[]>([
    {
      id: "introduction",
      title: "Introduction",
      subtitle: "Setting the Foundation for Design Excellence",
      content:
        'Turning An Idea Into Reality Is Never A Straight Path. At NEDF Studio, Every Project Begins With A Spark—An Initial Concept Inspired By Our Client\'s Vision, The Site Conditions, And The Surrounding Environment. "From Concept To Concrete" Is A Journey Through One Of Our Recent Projects In Addis Ababa, Showcasing The Transformation From Rough Sketches To A Fully Realized Modern Home.',
      level: 1,
    },
    {
      id: "step1",
      title: "Step 1: Understanding The Client's Vision",
      subtitle: "Building Relationships Through Active Listening",
      content:
        "Every Successful Design Starts With Understanding The People Who Will Inhabit It. Our Client Desired A Contemporary Home That Balances Functionality With Aesthetic Elegance. They Emphasized Natural Lighting, Open Spaces, And A Harmonious Relationship With The Surrounding Landscape. This Initial Consultation Phase Is Critical—It Sets The Foundation For Every Decision That Follows.",
      level: 1,
    },
    {
      id: "step2",
      title: "Step 2: Conceptual Design",
      subtitle: "Transforming Ideas Into Visual Concepts",
      content:
        "With The Client's Vision Clear, We Begin The Conceptual Design Phase. This Involves Creating Initial Sketches, Exploring Different Spatial Arrangements, And Considering How The Building Will Interact With Its Environment. We Focus On Creating Spaces That Flow Naturally From One To Another While Maintaining The Desired Aesthetic.",
      level: 1,
    },
    {
      id: "step3",
      title: "Step 3: Material Selection & Sustainability",
      subtitle: "Choosing Materials That Stand the Test of Time",
      content:
        "Material Selection Is Where Vision Meets Reality. We Carefully Choose Materials That Not Only Align With The Design Intent But Also Consider Sustainability, Local Availability, And Long-Term Durability. For This Project, We Selected A Combination Of Natural Stone, Steel, And Glass To Create A Modern Yet Timeless Aesthetic.",
      level: 1,
    },
    {
      id: "step4",
      title: "Step 4: From 3D Models To Construction",
      subtitle: "Bridging Design and Reality Through Technology",
      content:
        "Once The Design Is Finalized, We Create Detailed 3D Models And Technical Drawings. These Serve As The Blueprint For Construction, Ensuring Every Detail Is Precisely Communicated To The Construction Team. Our High-End Visualizations Help Clients See Their Future Home Before Ground Is Broken.",
      level: 1,
    },
    {
      id: "step5",
      title: "Step 5: The Finished Home",
      subtitle: "Celebrating the Culmination of Collaborative Design",
      content:
        "The Final Result Is A Testament To The Power Of Thoughtful Design And Careful Execution. The Home Successfully Balances The Client's Desire For Modern Living With Respect For The Natural Environment. Large Windows Frame Views Of The Surrounding Landscape, While Open Floor Plans Create A Sense Of Spaciousness And Flow.",
      level: 1,
    },
    {
      id: "conclusion",
      title: "Conclusion",
      subtitle: "Reflecting on the Journey from Vision to Reality",
      content:
        "From Initial Concept To Final Construction, This Project Demonstrates Our Commitment To Creating Spaces That Are Both Beautiful And Functional. Every Project Is A Unique Journey, But The Process Remains The Same: Listen, Design, Refine, And Execute With Precision.",
      level: 1,
    },
  ])

  const [editingSections, setEditingSections] = useState<BlogSection[]>(sections)
  const [editingTitle, setEditingTitle] = useState(blogTitle)
  const [editingSubtitle, setEditingSubtitle] = useState(blogSubtitle)
  const [editingTags, setEditingTags] = useState<string[]>(tags)
  const [newTag, setNewTag] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)

  // Generate table of contents from sections
  const tableOfContents = sections.map((section) => ({
    id: section.id,
    title: section.title,
    level: section.level,
  }))

  const handleEdit = () => {
    setEditingSections([...sections])
    setEditingTitle(blogTitle)
    setEditingSubtitle(blogSubtitle)
    setEditingTags([...tags])
    setIsEditing(true)
  }

  const handleSave = () => {
    setSections([...editingSections])
    setBlogTitle(editingTitle)
    setBlogSubtitle(editingSubtitle)
    setTags([...editingTags])
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditingSections([...sections])
    setEditingTitle(blogTitle)
    setEditingSubtitle(blogSubtitle)
    setEditingTags([...tags])
    setNewTag("")
    setIsEditing(false)
  }

  const addTag = () => {
    if (newTag.trim() && !editingTags.includes(newTag.trim())) {
      setEditingTags([...editingTags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setEditingTags(editingTags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const updateSection = (id: string, field: "title" | "subtitle" | "content", value: string) => {
    setEditingSections((prev) => prev.map((section) => (section.id === id ? { ...section, [field]: value } : section)))
  }

  const addSection = () => {
    const newSection: BlogSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      subtitle: "Enter subtitle here...",
      content: "Enter your content here...",
      level: 1,
    }
    setEditingSections((prev) => [...prev, newSection])
  }

  const removeSection = (id: string) => {
    setEditingSections((prev) => prev.filter((section) => section.id !== id))
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Manage Blog</h1>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#001F4B] hover:bg-[#001F4B]/90"
                >
                  <Save className="w-4 h-4" />
                  Save
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={handleEdit}
                className="flex items-center gap-2 bg-[#001F4B] hover:bg-[#001F4B]/90"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Table of Contents Sidebar */}
          <div className="w-80 flex-shrink-0">
            <Card className="p-6 sticky top-8">
              <div className="bg-[#001F4B] text-white px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-4">
                <h3 className="font-semibold">Table Of Content</h3>
              </div>
              <nav className="space-y-2">
                {(isEditing ? editingSections : sections).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1" ref={contentRef}>
            <Card className="p-8">
              {/* Hero Section */}
              <div className="mb-8">
                <img
                  src={heroImage || "/placeholder.svg"}
                  alt="Blog hero"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />

                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="w-full text-4xl font-bold text-[#001F4B] bg-transparent border-b-2 border-gray-200 focus:border-[#001F4B] outline-none pb-2"
                    />
                    <input
                      type="text"
                      value={editingSubtitle}
                      onChange={(e) => setEditingSubtitle(e.target.value)}
                      className="w-full text-lg text-gray-600 bg-transparent border-b border-gray-200 focus:border-[#001F4B] outline-none pb-2"
                    />

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {editingTags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-[#001F4B] text-white px-3 py-1 rounded-full text-sm"
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
                          onKeyPress={handleKeyPress}
                          placeholder="Add a new tag..."
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:border-[#001F4B] outline-none text-sm"
                        />
                        <Button type="button" onClick={addTag} size="sm" className="bg-[#001F4B] hover:bg-[#001F4B]/90">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-bold text-[#001F4B] mb-2">{blogTitle}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="bg-[#001F4B] text-white px-3 py-1 rounded-full">
                        {blogSubtitle.split(" | ")[0]}
                      </span>
                      <span>{blogSubtitle.split(" | ")[1]}</span>
                    </div>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Blog Sections */}
              <div className="space-y-8">
                {(isEditing ? editingSections : sections).map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-8">
                    {isEditing ? (
                      <div className="space-y-4 p-4 border-2 border-dashed border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateSection(section.id, "title", e.target.value)}
                            className="text-2xl font-semibold text-gray-900 bg-transparent border-b border-gray-200 focus:border-[#001F4B] outline-none flex-1 mr-4"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSection(section.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <input
                          type="text"
                          value={section.subtitle || ""}
                          onChange={(e) => updateSection(section.id, "subtitle", e.target.value)}
                          placeholder="Enter subtitle..."
                          className="w-full text-lg text-gray-600 bg-transparent border-b border-gray-200 focus:border-[#001F4B] outline-none pb-2"
                        />
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, "content", e.target.value)}
                          rows={6}
                          className="w-full p-3 border border-gray-200 rounded-md focus:border-[#001F4B] outline-none resize-none"
                        />
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{section.title}</h2>
                        {section.subtitle && (
                          <h3 className="text-lg text-gray-600 mb-4 font-medium italic">{section.subtitle}</h3>
                        )}
                        <p className="text-gray-700 leading-relaxed">{section.content}</p>
                      </div>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      onClick={addSection}
                      className="w-full border-dashed border-2 border-gray-300 hover:border-[#001F4B] hover:bg-[#001F4B]/5 bg-transparent"
                    >
                      + Add New Section
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
