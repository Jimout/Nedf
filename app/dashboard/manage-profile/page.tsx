"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { 
  FaInstagram, 
  FaTiktok, 
  FaBehance, 
  FaPinterest, 
  FaLinkedin
} from "react-icons/fa"

// Custom X (Twitter) Icon Component
const FaX = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface PortfolioProfile {
  description: string
  phoneNumber1: string
  phoneNumber2: string
  email: string
  socialMedia: {
    instagram: string
    tiktok: string
    linkedin: string
    pinterest: string
    behance: string
    twitter: string
  }
}


const DEFAULT_PROFILE: PortfolioProfile = {
  description: "NEDF Studios is a creative design and architecture firm specializing in modern, sustainable spaces that blend innovation with timeless aesthetics. We bring your vision to life.",
  phoneNumber1: "+251 911 234 567",
  phoneNumber2: "+251 911 234 568",
  email: "info@nedfstudios.com",
  socialMedia: {
    instagram: "https://instagram.com/nedfstudios",
    tiktok: "https://tiktok.com/@nedfstudios",
    linkedin: "https://linkedin.com/company/nedfstudios",
    pinterest: "https://pinterest.com/nedfstudios",
    behance: "https://behance.net/nedfstudios",
    twitter: "https://x.com/nedfstudios",
  },
}

const socialPlatforms: Record<string, React.ReactNode> = {
  instagram: <FaInstagram className="w-4 h-4" />,
  tiktok: <FaTiktok className="w-4 h-4" />,
  behance: <FaBehance className="w-4 h-4" />,
  pinterest: <FaPinterest className="w-4 h-4" />,
  linkedin: <FaLinkedin className="w-4 h-4" />,
  twitter: <FaX className="w-4 h-4" />,
}

const getSocialIcon = (platform: string) => {
  return socialPlatforms[platform] || <span className="w-4 h-4 text-gray-600 dark:text-white/60 text-xs">{platform[0].toUpperCase()}</span>;
}

export default function ManageProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<PortfolioProfile>(DEFAULT_PROFILE)

  useEffect(() => {
    const stored = localStorage.getItem("portfolioProfile")
    if (stored) {
      const parsedProfile = JSON.parse(stored)
      setProfile(parsedProfile)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#ec1e24]">Manage Profile</h1>
        </div>

        <Card className="shadow-lg dark:bg-[#1a1d23] dark:border-gray-700">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">NEDF STUDIO</h2>
                <Button 
                onClick={() => router.push('/dashboard/manage-profile/edit')} 
                className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white"
                >
                  Edit Profile
                </Button>
            </div>


            <div className="space-y-6">
              {/* About NEDF */}
              <div className="bg-gray-50 dark:bg-[#2a2d35] p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">About NEDF</h3>
                <p className="text-gray-800 dark:text-white/80 leading-relaxed">{profile.description}</p>
                <p className="text-xs text-gray-500 dark:text-white/60 mt-2">{profile.description.length} / 353 characters</p>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-[#2a2d35] p-5 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-3">Phone Numbers</h3>
                    <div className="space-y-2">
                      {profile.phoneNumber1 && (
                        <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#001F4B] dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        <span className="text-gray-800 dark:text-white">{profile.phoneNumber1}</span>
                        </div>
                      )}
                      {profile.phoneNumber2 && (
                        <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#001F4B] dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        <span className="text-gray-800 dark:text-white">{profile.phoneNumber2}</span>
                        </div>
                      )}
                    </div>
                  </div>

                <div className="bg-gray-50 dark:bg-[#2a2d35] p-5 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-3">Email</h3>
                    <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#001F4B] dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    <a href={`mailto:${profile.email}`} className="text-[#001F4B] dark:text-white hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
              {profile.socialMedia && Object.keys(profile.socialMedia).some(key => profile.socialMedia[key as keyof typeof profile.socialMedia]) && (
                <div className="bg-gray-50 dark:bg-[#2a2d35] p-6 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-4">Social Media</h3>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(profile.socialMedia).map(
                      ([platform, url]) =>
                        url && (
                          <a
                            key={platform}
                            href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-[#1a1d23] hover:bg-gray-200 dark:hover:bg-[#1a1d23]/80 rounded-lg transition-colors text-gray-700 dark:text-white/80"
                          >
                            {getSocialIcon(platform)}
                            <span className="text-sm font-medium">NEDF Studios</span>
                          </a>
                        ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Editable Profile Section */}
        <Card className="shadow-lg dark:bg-[#1a1d23] dark:border-gray-700">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white">Edit Profile Information</h2>
            </div>

            <div className="space-y-6">
              {/* About NEDF */}
              <div className="bg-gray-50 dark:bg-[#2a2d35] p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">About NEDF</h3>
                <textarea
                  value={profile.description}
                  onChange={(e) => {
                    const newProfile = { ...profile, description: e.target.value }
                    setProfile(newProfile)
                    localStorage.setItem('portfolioProfile', JSON.stringify(newProfile))
                  }}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none dark:bg-[#1a1d23] dark:text-white resize-none"
                  rows={4}
                  placeholder="Enter company description..."
                />
                <p className="text-xs text-gray-500 dark:text-white/60 mt-2">{profile.description.length} / 353 characters</p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-[#2a2d35] p-5 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-3">Phone Numbers</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-white/60 mb-1">Primary Phone</label>
                      <input
                        type="tel"
                        value={profile.phoneNumber1}
                        onChange={(e) => {
                          const newProfile = { ...profile, phoneNumber1: e.target.value }
                          setProfile(newProfile)
                          localStorage.setItem('portfolioProfile', JSON.stringify(newProfile))
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                        placeholder="+251 911 234 567"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-white/60 mb-1">Secondary Phone</label>
                      <input
                        type="tel"
                        value={profile.phoneNumber2}
                        onChange={(e) => {
                          const newProfile = { ...profile, phoneNumber2: e.target.value }
                          setProfile(newProfile)
                          localStorage.setItem('portfolioProfile', JSON.stringify(newProfile))
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                        placeholder="+251 911 234 568"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#2a2d35] p-5 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-3">Email Address</h3>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-white/60 mb-1">Company Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => {
                        const newProfile = { ...profile, email: e.target.value }
                        setProfile(newProfile)
                        localStorage.setItem('portfolioProfile', JSON.stringify(newProfile))
                      }}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                      placeholder="info@company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-gray-50 dark:bg-[#2a2d35] p-6 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(socialPlatforms).map((platform) => (
                    <div key={platform} className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-white/80">{socialPlatforms[platform]}</span>
                      <input
                        type="url"
                        value={profile.socialMedia[platform as keyof typeof profile.socialMedia] || ""}
                        onChange={(e) => {
                          const newProfile = {
                            ...profile,
                            socialMedia: {
                              ...profile.socialMedia,
                              [platform]: e.target.value,
                            },
                          }
                          setProfile(newProfile)
                          localStorage.setItem('portfolioProfile', JSON.stringify(newProfile))
                        }}
                        placeholder={platform === 'twitter' ? 'X profile URL' : `${platform} profile URL`}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-white/50 rounded-lg focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-[#001F4B] dark:focus:border-[#ec1e24] outline-none text-sm dark:bg-[#1a1d23] dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}