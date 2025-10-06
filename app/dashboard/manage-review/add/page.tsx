"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/manage-review"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add Review</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <Label>Profile Picture</Label>
              <label
                htmlFor="profilePicture"
                className="mt-2 w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed border-gray-400 cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden"
              >
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-center">Click to upload</span>
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
              <Label htmlFor="name">Name *</Label>
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
              <Label htmlFor="position">Job Position *</Label>
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
              <Label htmlFor="testimonial">Testimonial *</Label>
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
              <Button type="submit" className="bg-[#001F4B] hover:bg-[#001F4B]/90">
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
  )
}
