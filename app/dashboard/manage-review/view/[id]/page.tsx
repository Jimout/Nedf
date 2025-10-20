"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)
import { useParams } from "next/navigation";
import { useData } from "@/lib/data-context";

export default function ViewReviewPage() {
  const params = useParams();
  const router = useRouter();
  const reviewId = params.id as string;
  const { reviews } = useData();
  const review = reviews.find((r) => r.id === reviewId);

  if (!review) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
        <div className="w-full p-4 sm:p-6">
          <div className="w-full space-y-6">
            <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
                <ArrowLeftIcon />
              </Button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Review Details</h1>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
                <ArrowLeftIcon />
              </Button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Review Details</h1>
            </div>
            <Link href={`/dashboard/manage-review/edit/${review.id}`}>
              <Button className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit Review
              </Button>
            </Link>
          </div>

          <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center bg-[#001F4B] dark:bg-gray-600 flex-shrink-0">
                  {review.profilePicture ? (
                    <img
                      src={review.profilePicture}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg sm:text-xl">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <CardTitle className="text-2xl text-[#001F4B] dark:text-white">{review.name}</CardTitle>
                  <Badge className="mt-2 bg-[#001F4B] dark:bg-[#ec1e24] text-white">{review.position}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-white/80">Job Position</Label>
                <p className="text-gray-900 dark:text-white/80 mt-1 text-lg">{review.position}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-white/80">Testimonial</Label>
                <p className="text-gray-900 dark:text-white/80 mt-1 leading-relaxed text-lg">{review.testimonial}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
