"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-context"
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

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

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

export default function ViewFounderPage() {
  const router = useRouter()
  const { founders } = useData()
  const [founder, setFounder] = useState<Founder | null>(null)

  const socialPlatforms: Record<string, React.ReactNode> = {
    instagram: <FaInstagram className="w-4 h-4" />,
    tiktok: <FaTiktok className="w-4 h-4" />,
    behance: <FaBehance className="w-4 h-4" />,
    pinterest: <FaPinterest className="w-4 h-4" />,
    linkedin: <FaLinkedin className="w-4 h-4" />,
    twitter: <FaX className="w-4 h-4" />,
  }

  const getSocialIcon = (platform: string) => {
    return socialPlatforms[platform] || <span className="w-4 h-4 text-gray-600 dark:text-white/60 text-xs">{platform[0].toUpperCase()}</span>
  }

  useEffect(() => {
    const founderId = window.location.pathname.split('/').pop()
    const foundFounder = founders.find(f => f.id === founderId)
    if (foundFounder) {
      setFounder(foundFounder)
    }
  }, [founders])

  if (!founder) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
        <div className="w-full p-4 sm:p-6">
          <div className="w-full space-y-6">
            <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
                <ArrowLeftIcon />
              </Button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Founder Details</h1>
            </div>
            <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
              <CardContent className="py-12 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Founder not found</h2>
                <p className="text-gray-600 dark:text-white/80">The requested founder could not be found.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
      <div className="w-full p-4 sm:p-6">
        <div className="w-full space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <Button variant="ghost" size="sm" className="p-2 text-gray-600 dark:text-[#ec1e24] hover:text-gray-800 dark:hover:text-white" onClick={() => router.back()}>
                <ArrowLeftIcon />
              </Button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">Founder Details</h1>
            </div>
            <Button className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Founder
            </Button>
          </div>

          <Card className="mb-8 dark:bg-[#1a1d23] dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center space-x-4">
            {/* Avatar or initials */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#001F4B] dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
              {founder.avatar ? (
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-lg sm:text-xl">
                  {founder.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <CardTitle className="text-2xl text-[#001F4B] dark:text-white">{founder.name}</CardTitle>
              <Badge className="mt-2 bg-[#001F4B] dark:bg-[#ec1e24] text-white">{founder.position}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {founder.description && (
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-white/80">Description</Label>
              <p className="text-gray-900 dark:text-white/80 mt-1 leading-relaxed">{founder.description}</p>
            </div>
          )}

          {founder.socialMedia && Object.keys(founder.socialMedia).length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-white/80">Social Media</Label>
              <div className="flex flex-wrap gap-3 mt-3">
                {Object.entries(founder.socialMedia).map(
                  ([platform, url]) =>
                    url && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-[#2a2d35] hover:bg-gray-200 dark:hover:bg-[#2a2d35]/80 rounded-lg transition-colors text-gray-700 dark:text-white/80"
                      >
                        {getSocialIcon(platform)}
                        <span className="text-sm font-medium capitalize">{platform}</span>
                      </a>
                    ),
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  )
}
