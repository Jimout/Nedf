"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-context"
import ConfirmationModal from "@/components/Confirmation-modal"

export default function AddReviewPage() {
  const router = useRouter()
  const { addReview } = useData()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    testimonial: "",
    profilePicture: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.position && formData.testimonial) {
      setShowConfirmation(true)
    }
  }

  const handleConfirmAdd = () => {
    const reviewToAdd = {
      id: Date.now().toString(),
      name: formData.name,
      position: formData.position,
      testimonial: formData.testimonial,
      profilePicture: formData.profilePicture,
    }
    addReview(reviewToAdd)
    setShowConfirmation(false)
    router.push("/dashboard/manage-review")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePicture: reader.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
      <div className="w-full p-4 sm:p-6">
        <div className="w-full space-y-6">
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
              <ArrowLeftIcon />
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Add Review</h1>
          </div>

          <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
        <CardHeader>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <Label className="text-gray-700 dark:text-white/80">Profile Picture</Label>
              <label
                htmlFor="profilePicture"
                className="mt-2 w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed border-gray-400 dark:border-white/50 cursor-pointer bg-gray-50 dark:bg-[#1a1d23] hover:bg-gray-100 dark:hover:bg-[#1a1d23]/80 overflow-hidden"
              >
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 dark:text-white/60 text-center">Click to upload</span>
                )}
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-white/80">Name <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span></Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter reviewer name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-gray-700 dark:text-white/80">Job Position <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span></Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter job position"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial" className="text-gray-700 dark:text-white/80">Testimonial <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span></Label>
              <Textarea
                id="testimonial"
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                placeholder="Enter the testimonial..."
                rows={6}
                required
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white">
                Add Review
              </Button>
              <Link href="/dashboard/manage-review">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmAdd}
        title="Add Review"
        message={`Are you sure you want to add this review from ${formData.name}?`}
        type="add"
      />
        </div>
      </div>
    </div>
  )
}
