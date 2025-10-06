"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/lib/data-context";

export default function ViewReviewPage() {
  const params = useParams();
  const reviewId = params.id as string;
  const { reviews } = useData();
  const review = reviews.find((r) => r.id === reviewId);

  if (!review) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/manage-review"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Review Details</h1>
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/manage-review"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Review Details</h1>
        </div>
        <Link href={`/dashboard/manage-review/edit/${review.id}`}>
          <Button className="bg-[#001F4B] hover:bg-[#001F4B]/90">
            <Edit className="w-4 h-4 mr-2" />
            Edit Review
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-[#001F4B]">
              {review.profilePicture ? (
                <img
                  src={review.profilePicture}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-xl">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{review.name}</CardTitle>
              <Badge className="mt-2 bg-[#001F4B]">{review.position}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-gray-700">Job Position</Label>
            <p className="text-gray-900 mt-1 text-lg">{review.position}</p>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Testimonial</Label>
            <p className="text-gray-900 mt-1 leading-relaxed text-lg">{review.testimonial}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
