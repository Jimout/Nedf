"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, Plus, MessageSquare } from "lucide-react"
import Link from "next/link"
import ConfirmationModal from "@/components/Confirmation-modal"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/Search-bar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Review {
  id: string
  name: string
  position: string
  testimonial: string
  profilePicture?: string
}

export default function ManageReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null)

  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews")
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    } else {
      // Sample review data
      const sampleReview: Review = {
        id: "review-1",
        name: "Sarah Johnson",
        position: "CEO at TechCorp",
        testimonial:
          "Working with this team has been an absolute pleasure. Their attention to detail and commitment to excellence is unmatched.",
        profilePicture: "",
      }
      setReviews([sampleReview])
      localStorage.setItem("reviews", JSON.stringify([sampleReview]))
    }
  }, [])

  const handleDeleteReview = (id: string) => {
    setReviewToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (reviewToDelete) {
      const updatedReviews = reviews.filter((review) => review.id !== reviewToDelete)
      setReviews(updatedReviews)
      localStorage.setItem("reviews", JSON.stringify(updatedReviews))
    }
    setShowDeleteModal(false)
    setReviewToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setReviewToDelete(null)
  }

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.testimonial.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReviews = filteredReviews.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className="space-y-6 dark:bg-[#15171a] min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#ec1e24]">Manage Reviews</h1>
        <Link href="/dashboard/manage-review/add" className="w-full sm:w-auto">
          <Button className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </Link>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search reviews..." />

      {/* Reviews Table */}
      {filteredReviews.length === 0 ? (
        <Card className="dark:bg-[#1a1d23] dark:border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 dark:text-white/60 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? "No reviews found" : "No reviews yet"}
            </h3>
            <p className="text-gray-500 dark:text-white/60 text-center mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding your first review."}
            </p>
            {!searchTerm && (
              <Link href="/dashboard/manage-review/add">
                <Button className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Review
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-[#ec1e24]/10">
                    <TableHead className="font-medium text-[#001F4B] dark:text-white">Name</TableHead>
                    <TableHead className="hidden sm:table-cell font-medium text-[#001F4B] dark:text-white">Position</TableHead>
                    <TableHead className="hidden lg:table-cell font-medium text-[#001F4B] dark:text-white">Testimonial</TableHead>
                    <TableHead className="font-medium text-[#001F4B] dark:text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentReviews.map((review) => (
                    <TableRow key={review.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2d35]/50">
                      <TableCell className="font-medium text-[#001F4B] dark:text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-[#001F4B] dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                            {review.profilePicture ? (
                              <img
                                src={review.profilePicture || "/placeholder.svg"}
                                alt={review.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-bold text-xs sm:text-sm">
                                {review.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="text-sm sm:text-base dark:text-white">{review.name}</div>
                            <div className="sm:hidden text-xs text-gray-500 dark:text-white/60 mt-1">{review.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-gray-700 dark:text-white/80 text-sm">{review.position}</TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-600 dark:text-white/60 max-w-md">
                        <p className="line-clamp-2 text-sm">{review.testimonial}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Link href={`/dashboard/manage-review/view/${review.id}`}>
                            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {totalPages > 1 && (
            <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this review? This action cannot be undone."
        type="delete"
      />
    </div>
  )
}
