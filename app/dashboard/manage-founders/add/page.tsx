"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-context"
import ConfirmationModal from "@/components/Confirmation-modal"

import {
  FaInstagram, 
  FaTiktok, 
  FaBehance, 
  FaPinterest, 
  FaLinkedin
} from "react-icons/fa";

// Custom X (Twitter) Icon Component
const FaX = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface Founder {
  id: string
  name: string
  position: string
  description: string
  socialMedia: {
    instagram?: string
    tiktok?: string
    behance?: string
    pinterest?: string
    linkedin?: string
    twitter?: string
  }
  avatar?: string
}

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

export default function AddFounderPage() {
  const router = useRouter()
  const { addFounder } = useData()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const [newFounder, setNewFounder] = useState<Founder>({
    id: "",
    name: "",
    position: "",
    description: "",
    socialMedia: {},
    avatar: "",
  });

  const socialPlatforms: Record<string, React.ReactNode> = {
    instagram: <FaInstagram className="w-4 h-4" />,
    tiktok: <FaTiktok className="w-4 h-4" />,
    behance: <FaBehance className="w-4 h-4" />,
    pinterest: <FaPinterest className="w-4 h-4" />,
    linkedin: <FaLinkedin className="w-4 h-4" />,
    twitter: <FaX className="w-4 h-4" />,
  };

  // Handle avatar upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewFounder({ ...newFounder, avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmAdd = () => {
    const founderData = {
      ...newFounder,
      id: Date.now().toString(),
    };
    addFounder(founderData);
    setShowConfirmation(false);
    router.push("/dashboard/manage-founders");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
      <div className="w-full p-4 sm:p-6">
        <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
            <ArrowLeftIcon />
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Add Founder</h1>
        </div>

        {/* Card */}
        <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
        <CardHeader>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Avatar */}
          <div className="flex flex-col items-center space-y-2">
            <label className="cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-white/50 bg-gray-100 dark:bg-[#1a1d23] flex items-center justify-center">
                {newFounder.avatar ? (
                  <img src={newFounder.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 dark:text-white/60 text-3xl">+</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            <p className="text-sm text-gray-500 dark:text-white/60">Click above to upload photo</p>
          </div>

          {/* Name & Position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 dark:text-white/80">Name <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span></Label>
              <Input
                id="name"
                value={newFounder.name || ""}
                onChange={(e) => setNewFounder({ ...newFounder, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="position" className="text-gray-700 dark:text-white/80">Position <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span></Label>
              <Input
                id="position"
                value={newFounder.position || ""}
                onChange={(e) => setNewFounder({ ...newFounder, position: e.target.value })}
                placeholder="Enter job position"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-700 dark:text-white/80">Description <span className="text-[#ec1e24] dark:text-[#ec1e24]">*</span></Label>
            <Textarea
              id="description"
              value={newFounder.description || ""}
              onChange={(e) =>
                setNewFounder({ ...newFounder, description: e.target.value.slice(0, 85) })
              }
              placeholder="Brief description (max 85 chars)"
              rows={3}
            />
            <p className="text-sm text-gray-500 dark:text-white/60">{newFounder.description?.length || 0}/85 characters</p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-700 dark:text-white/80">Social Media Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(socialPlatforms).map((platform) => (
                <div key={platform} className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-white/80">{socialPlatforms[platform]}</span>
                  <Input
                    placeholder={platform === 'twitter' ? 'X profile URL' : `${platform} profile URL`}
                    value={newFounder.socialMedia?.[platform as keyof typeof newFounder.socialMedia] || ""}
                    onChange={(e) =>
                      setNewFounder({
                        ...newFounder,
                        socialMedia: {
                          ...newFounder.socialMedia,
                          [platform]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={() => setShowConfirmation(true)}
              className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white"
            >
              Add Founder
            </Button>
            <Link href="/dashboard/manage-founders">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmAdd}
          title="Add Founder"
          message={`Are you sure you want to add ${newFounder.name} as a founder?`}
          type="add"
        />
        </div>
      </div>
    </div>
  );
}
