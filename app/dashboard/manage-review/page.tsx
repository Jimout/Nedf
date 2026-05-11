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
  const itemsPerPage = 8
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
    <div className="space-y-6 bg-background min-h-screen p-6 font-montserrat">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Manage Reviews</h1>
        <Link href="/dashboard/manage-review/add" className="w-full sm:w-auto">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </Link>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search reviews..." />

      {/* Reviews Table */}
      {filteredReviews.length === 0 ? (
        <Card className="bg-card border border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {searchTerm ? "No reviews found" : "No reviews yet"}
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding your first review."}
            </p>
            {!searchTerm && (
              <Link href="/dashboard/manage-review/add">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Review
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted border-b border-border">
                    <TableHead className="font-montserrat font-semibold text-foreground">Name</TableHead>
                    <TableHead className="hidden sm:table-cell font-montserrat font-semibold text-foreground">Position</TableHead>
                    <TableHead className="hidden lg:table-cell font-montserrat font-semibold text-foreground">Testimonial</TableHead>
                    <TableHead className="font-montserrat font-semibold text-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentReviews.map((review) => (
                    <TableRow key={review.id} className="hover:bg-muted/50 border-b border-border">
                      <TableCell className="font-medium text-foreground">
                        <Link href={`/dashboard/manage-review/view/${review.id}`} className="flex items-center gap-3 hover:underline cursor-pointer">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-primary flex items-center justify-center flex-shrink-0">
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
                            <div className="text-sm sm:text-base text-foreground">{review.name}</div>
                            <div className="sm:hidden text-xs text-muted-foreground mt-1">{review.position}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{review.position}</TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground max-w-md">
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
                            className="p-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
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
