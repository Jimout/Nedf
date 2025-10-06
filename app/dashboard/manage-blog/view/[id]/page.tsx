"use client"
import { ArrowLeft, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

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

export default function ViewBlogPage() {
  const router = useRouter()
  const params = useParams()
  const blogId = params.id as string
  const [blog, setBlog] = useState<Blog | null>(null)

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs")
    if (savedBlogs) {
      const blogs: Blog[] = JSON.parse(savedBlogs)
      const foundBlog = blogs.find((b) => b.id === blogId)
      if (foundBlog) {
        setBlog(foundBlog)
      }
    }
  }, [blogId])

  if (!blog) {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleEdit = () => {
    router.push(`/dashboard/manage-blog/edit/${blogId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
          <h1 className="text-3xl font-bold text-[#001F4B] font-montserrat">View Blog</h1>
        </div>
        <Button onClick={handleEdit} className="flex items-center gap-2 bg-[#001F4B] text-white hover:bg-[#001F4B]/90">
          <Edit3 className="w-4 h-4" />
          Edit
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Table of Contents Sidebar */}
        <div className="w-80 flex-shrink-0">
          <Card className="p-6 sticky top-8">
            <div className="bg-[#333333] text-white px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-4">
              <h3 className="font-semibold">Table Of Content</h3>
            </div>
            <nav className="space-y-1">
              {blog.sections.map((section) => (
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
                src={blog.heroImage || "/placeholder.svg?height=256&width=800"}
                alt="Blog hero"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h1 className="text-4xl font-bold text-[#333333] mb-4">{blog.title}</h1>
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Blog Sections */}
            <div className="space-y-8">
              {blog.sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-8">
                  <div className="flex items-start gap-1 mb-4">
                    <span className="font-bold text-2xl text-[#333333]">{section.number}</span>
                    <h2
                      className={`font-semibold text-gray-900 ${
                        section.level === 1 ? "text-2xl" : section.level === 2 ? "text-xl" : "text-lg"
                      }`}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
