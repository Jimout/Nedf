"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/Search-bar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

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

export default function ManageBlogPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; blogId: string | null }>({
    isOpen: false,
    blogId: null,
  })

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs")
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs))
    } else {
      // Sample blog data
      const sampleBlog: Blog = {
        id: "blog-1",
        title: "From Concept To Concrete",
        heroImage: "/modern-construction-site-with-buildings.jpg",
        tags: ["Architecture", "Design Process", "Construction", "Modern Home", "NEDF Studio"],
        createdAt: "2024-01-15",
        sections: [
          {
            id: "introduction",
            title: "Introduction",
            content:
              "Turning An Idea Into Reality Is Never A Straight Path. At NEDF Studio, Every Project Begins With A Spark—An Initial Concept Inspired By Our Client's Vision, The Site Conditions, And The Surrounding Environment.",
            level: 1,
            number: "1",
          },
          {
            id: "step1",
            title: "Step 1: Understanding The Client's Vision",
            content:
              "Every Successful Design Starts With Understanding The People Who Will Inhabit It. Our Client Desired A Contemporary Home That Balances Functionality With Aesthetic Elegance.",
            level: 1,
            number: "2",
          },
        ],
      }
      setBlogs([sampleBlog])
      localStorage.setItem("blogs", JSON.stringify([sampleBlog]))
    }
  }, [])

  const handleAddBlog = () => {
    router.push("/dashboard/manage-blog/add")
  }

  const handleViewBlog = (blogId: string) => {
    router.push(`/dashboard/manage-blog/view/${blogId}`)
  }

  const handleDeleteBlog = (blogId: string) => {
    setDeleteModal({ isOpen: true, blogId })
  }

  const confirmDelete = () => {
    if (deleteModal.blogId) {
      const updatedBlogs = blogs.filter((blog) => blog.id !== deleteModal.blogId)
      setBlogs(updatedBlogs)
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
    }
    setDeleteModal({ isOpen: false, blogId: null })
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#001F4B] font-montserrat">Manage Blog</h1>
        <Button onClick={handleAddBlog} className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white font-montserrat">
          <PlusIcon />
          <span className="ml-2">Add New Blog</span>
        </Button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search blogs..." />

      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500 font-montserrat">
            {searchTerm
              ? "No blogs found matching your search."
              : "No blogs found. Add your first blog to get started!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-montserrat font-semibold text-[#001F4B]">Title</TableHead>
                <TableHead className="font-montserrat font-semibold text-[#001F4B]">Tags</TableHead>
                <TableHead className="font-montserrat font-semibold text-[#001F4B]">Created Date</TableHead>
                <TableHead className="font-montserrat font-semibold text-[#001F4B] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBlogs.map((blog) => (
                <TableRow key={blog.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium font-montserrat text-[#001F4B]">{blog.title}</TableCell>
                  <TableCell className="font-montserrat text-gray-700">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 2 && <span className="text-gray-500 text-xs">+{blog.tags.length - 2}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="font-montserrat text-gray-700">{blog.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewBlog(blog.id)}
                        className="font-montserrat"
                      >
                        <EyeIcon />
                        <span className="ml-1">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 font-montserrat"
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="p-4 border-t">
              <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
            </div>
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blogId: null })}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        type="delete"
      />
    </div>
  )
}
