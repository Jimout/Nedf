"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/Search-bar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

import { cmsApi } from "@/lib/cms/client"
import type { CmsBlogPost } from "@/lib/cms/types"

interface Blog extends CmsBlogPost {}

export default function ManageBlogPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; blogId: string | null }>({
    isOpen: false,
    blogId: null,
  })

  useEffect(() => {
    cmsApi
      .getBlogs(true)
      .then(setBlogs)
      .catch(() => setBlogs([]))
  }, [])
  const handleAddBlog = () => {
    router.push("/dashboard/manage-blog/add")
  }

  const handleEditBlog = (blogId: string) => {
    router.push(`/dashboard/manage-blog/edit/${blogId}`)
  }

  const handleDeleteBlog = (blogId: string) => {
    setDeleteModal({ isOpen: true, blogId })
  }

  const confirmDelete = async () => {
    if (deleteModal.blogId) {
      try {
        await cmsApi.deleteBlog(deleteModal.blogId)
        setBlogs((prev) => prev.filter((blog) => blog.id !== deleteModal.blogId))
      } catch {
        // ignore
      }
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
    <div className="min-h-screen bg-background p-4 sm:p-6 font-montserrat">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Manage Blog</h1>
          <Button onClick={handleAddBlog} className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
          <PlusIcon />
          <span className="ml-2">Add New Blog</span>
        </Button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search blogs..." />

        <div className="mt-6">
          {filteredBlogs.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No blogs found matching your search."
                  : "No blogs found. Add your first blog to get started!"}
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted border-b border-border">
                      <TableHead className="font-montserrat font-semibold text-foreground">Title</TableHead>
                      <TableHead className="hidden sm:table-cell font-montserrat font-semibold text-foreground">Tags</TableHead>
                      <TableHead className="hidden md:table-cell font-montserrat font-semibold text-foreground">Created Date</TableHead>
                      <TableHead className="font-montserrat font-semibold text-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentBlogs.map((blog) => (
                      <TableRow key={blog.id} className="hover:bg-muted/50 border-b border-border">
                        <TableCell className="font-medium text-foreground">
                          <Link
                            href={`/blog/${blog.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-left hover:underline cursor-pointer focus:outline-none focus:underline"
                          >
                            <div className="text-sm sm:text-base">{blog.title}</div>
                          </Link>
                          <div className="sm:hidden mt-1 flex flex-wrap gap-1">
                              {blog.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 2 && <span className="text-muted-foreground text-xs">+{blog.tags.length - 2}</span>}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          <div className="flex flex-wrap gap-1">
                            {blog.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {blog.tags.length > 2 && <span className="text-muted-foreground text-xs">+{blog.tags.length - 2}</span>}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{blog.publishedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 sm:gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditBlog(blog.id)}
                              className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="p-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="p-4 border-t border-border">
                  <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
                </div>
              )}
            </div>
          )}
        </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blogId: null })}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        type="delete"
      />
      </div>
    </div>
  )
}
