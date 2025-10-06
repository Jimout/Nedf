"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import ConfirmationModal from "@/components/Confirmation-modal"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/Search-bar"

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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
        <Link href="/dashboard/manage-review/add">
          <Button className="bg-[#001F4B] hover:bg-[#001F4B]/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </Link>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search reviews..." />

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          currentReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Profile Photo or Initials */}
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                      {review.profilePicture ? (
                        <img
                          src={review.profilePicture || "/placeholder.svg"}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#001F4B] flex items-center justify-center text-white font-semibold">
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                      <Badge className="mt-1 bg-[#001F4B]">{review.position}</Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/dashboard/manage-review/view/${review.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pl-16">
                  <p className="text-gray-600 text-sm">{review.testimonial}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? "No reviews found" : "No reviews yet"}
              </h2>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "No reviews found matching your search." : "Get started by adding your first review."}
              </p>
              {!searchTerm && (
                <Link href="/dashboard/manage-review/add">
                  <Button className="bg-[#001F4B] hover:bg-[#001F4B]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
        </div>
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
