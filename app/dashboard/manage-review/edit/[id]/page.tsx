"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)
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
      <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
        <div className="w-full p-4 sm:p-6">
          <div className="w-full space-y-6">
            <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
                <ArrowLeftIcon />
              </Button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Edit Review</h1>
            </div>
            <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
              <CardContent className="py-12 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Review not found</h2>
                <p className="text-gray-600 dark:text-white/80">The requested review could not be found.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
      <div className="w-full p-4 sm:p-6">
        <div className="w-full space-y-6">
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
              <ArrowLeftIcon />
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Edit Review</h1>
          </div>

          <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#001F4B] dark:text-white font-medium">Review Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Profile Picture (Noticeable uploader) */}
              <div className="flex flex-col items-center space-y-2">
                <Label className="text-gray-700 dark:text-white/80">Profile Picture</Label>
                <label className="cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-white/50 bg-gray-100 dark:bg-[#1a1d23] flex items-center justify-center">
                    {preview ? (
                      <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 dark:text-white/60 text-3xl">+</span>
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                <p className="text-sm text-gray-500 dark:text-white/60">Click above to change photo</p>
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
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmUpdate}
        type="update"
        title="Update Review"
        message={`Are you sure you want to update this review by ${formData.name}?`}
      />
    </div>
  );
}
