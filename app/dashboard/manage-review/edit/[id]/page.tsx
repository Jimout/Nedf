"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useData } from "@/lib/data-context";
import ConfirmationModal from "@/components/Confirmation-modal";

export default function EditReviewPage() {
  const router = useRouter();
  const params = useParams();
  const reviewId = params.id as string;
  const { reviews, updateReview } = useData();
  const review = reviews.find((r) => r.id === reviewId);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    testimonial: "",
    profilePicture: "" as string | File, 
  });

  const [preview, setPreview] = useState<string>(""); 
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (review) {
      setFormData({
        name: review.name,
        position: review.position,
        testimonial: review.testimonial,
        profilePicture: review.profilePicture || "",
      });
      setPreview(review.profilePicture || "");
    }
  }, [review]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (review && formData.name && formData.position && formData.testimonial) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmUpdate = () => {
    if (review) {
      let profileUrl = review.profilePicture || "";

      if (formData.profilePicture instanceof File) {
        profileUrl = URL.createObjectURL(formData.profilePicture);
      }

      const updatedReview = {
        ...review,
        name: formData.name,
        position: formData.position,
        testimonial: formData.testimonial,
        profilePicture: profileUrl,
      };

      updateReview(reviewId, updatedReview);
      setShowConfirmation(false);
      router.push(`/dashboard/manage-review/view/${reviewId}`);
    }
  };

  if (!review) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/manage-review" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Review</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Review not found</h2>
            <p className="text-gray-600">The requested review could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/manage-review" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Review</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Review Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Profile Picture (Noticeable uploader) */}
              <div className="flex flex-col items-center space-y-2">
                <Label>Profile Picture</Label>
                <label className="cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                    {preview ? (
                      <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-3xl">+</span>
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                <p className="text-sm text-gray-500">Click above to change photo</p>
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
                  Update Review
                </Button>
                <Link href={`/dashboard/manage-review/view/${reviewId}`}>
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmUpdate}
        type="update"
        title="Update Review"
        message={`Are you sure you want to update this review by ${formData.name}?`}
      />
    </>
  );
}
