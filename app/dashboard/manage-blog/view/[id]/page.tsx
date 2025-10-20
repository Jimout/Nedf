"use client"
import { Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">View Blog</h1>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-white/60">Blog not found</p>
          </div>
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white"
              onClick={() => router.push("/dashboard/manage-blog")}
            >
              <ArrowLeftIcon />
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">View Blog</h1>
          </div>
          <Button onClick={handleEdit} className="bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90">
            <Edit3 className="w-4 h-4" />
            Edit
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Table of Contents Sidebar */}
          <div className="w-80 flex-shrink-0">
            <Card className="p-6 sticky top-8 dark:bg-[#1a1d23] dark:border-gray-700">
              <div className="bg-[#001F4B] dark:bg-[#ec1e24] text-white px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-4">
                <h3 className="font-semibold">Table Of Content</h3>
              </div>
              <nav className="space-y-1">
                {blog.sections.map((section) => (
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
                  src={blog.heroImage || "/placeholder.svg?height=256&width=800"}
                  alt="Blog hero"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h1 className="text-4xl font-bold text-[#001F4B] dark:text-[#ec1e24] mb-4">{blog.title}</h1>
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-[#2a2d35] text-gray-700 dark:text-white/80 px-3 py-1 rounded-full text-sm border dark:border-gray-600">
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
                      <span className="font-bold text-2xl text-[#001F4B] dark:text-[#ec1e24]">{section.number}</span>
                      <h2
                        className={`font-semibold text-gray-900 dark:text-white ${
                          section.level === 1 ? "text-2xl" : section.level === 2 ? "text-xl" : "text-lg"
                        }`}
                      >
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-gray-700 dark:text-white/80 leading-relaxed">{section.content}</p>
                    {section.images && section.images.length > 0 && (
                      <div className="mt-4">
                        {section.images.length === 1 ? (
                          // Single image display
                          <img
                            src={section.images[0]}
                            alt={`${section.title} illustration`}
                            className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-md"
                          />
                        ) : (
                          // Gallery display for multiple images
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${section.title} illustration ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
