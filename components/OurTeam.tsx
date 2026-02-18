"use client";

import Image from "next/image";
import { FaLinkedin, FaInstagram, FaTwitter, FaDribbble } from "react-icons/fa";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ==================== TYPES ====================

interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  dribbble?: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: SocialLinks;
}

interface TeamMemberCardProps extends TeamMember {
  idx: number;
}

type SocialPlatform = keyof SocialLinks;

// ==================== CONSTANTS ====================

const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
} as const

const ITEMS_PER_PAGE = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
} as const

const SWIPE_THRESHOLD = 50

const SOCIAL_ICONS = {
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  twitter: FaTwitter,
  dribbble: FaDribbble,
} as const

// ==================== TEAM DATA ====================

const TEAM_DATA: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "Lead Designer",
    bio: "Creative visionary with 8+ years of experience in interior design and space planning.",
    image: "/test3.png",
    socials: { linkedin: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Michael Chen",
    role: "Senior Architect",
    bio: "Expert in sustainable architecture and innovative building solutions.",
    image: "/tes4.png",
    socials: { linkedin: "#", instagram: "#", dribbble: "#" },
  },
  {
    name: "Emily Rodriguez",
    role: "Project Manager",
    bio: "Ensures seamless project execution and client satisfaction from start to finish.",
    image: "/test3.png",
    socials: { linkedin: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "David Kim",
    role: "3D Visualization Specialist",
    bio: "Brings designs to life with stunning 3D renders and virtual walkthroughs.",
    image: "/tes4.png",
    socials: { linkedin: "#", instagram: "#", dribbble: "#" },
  },
  {
    name: "Lisa Thompson",
    role: "Client Relations Manager",
    bio: "Builds lasting relationships and ensures exceptional client experiences.",
    image: "/test3.png",
    socials: { linkedin: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "James Wilson",
    role: "Technical Consultant",
    bio: "Provides expert technical guidance and ensures project feasibility.",
    image: "/tes4.png",
    socials: { linkedin: "#", instagram: "#", dribbble: "#" },
  },
]

// ==================== HELPER FUNCTIONS ====================

function getItemsPerPage(windowWidth: number): number {
  if (windowWidth < BREAKPOINTS.MOBILE) return ITEMS_PER_PAGE.MOBILE
  if (windowWidth < BREAKPOINTS.DESKTOP) return ITEMS_PER_PAGE.TABLET
  return ITEMS_PER_PAGE.DESKTOP
}

// ==================== SUB-COMPONENTS ====================

function TeamMemberCard({ image, name, role, bio, socials, idx }: TeamMemberCardProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center text-center w-full",
        "max-w-[260px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] 3xl:max-w-[420px] 4xl:max-w-[460px]",
        "space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-5 2xl:space-y-5",
        idx === 0 ? "lg:mr-auto" : idx === 2 ? "lg:ml-auto" : "lg:mx-auto"
      )}
    >
      <MemberAvatar image={image} name={name} />
      <MemberInfo name={name} role={role} bio={bio} socials={socials} />
    </div>
  )
}

function MemberAvatar({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative">
      <Image
        src={image}
        alt={name}
        width={160}
        height={160}
        className="rounded-full object-cover shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-[112px] md:h-[112px] lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 3xl:w-44 3xl:h-44 4xl:w-48 4xl:h-48"
      />
      <div className="absolute inset-0 rounded-full bg-[#15171a] opacity-10" />
    </div>
  )
}

function MemberInfo({ name, role, bio, socials }: Omit<TeamMemberCardProps, 'image' | 'idx'>) {
  return (
    <div className="space-y-2 sm:space-y-2 md:space-y-3 lg:space-y-3 xl:space-y-3 2xl:space-y-3 w-full">
      <div>
        <h3 className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-medium text-[#001F4B] dark:text-[#ec1e24] font-montserrat">
          {name}
        </h3>
        <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base text-[#333333]/40 dark:text-white/60 font-montserrat">
          {role}
        </p>
      </div>

      {/* Responsive divider width (fix non-standard `w-18`) */}
      <div className="border-t border-gray-300 dark:border-white/20 w-12 sm:w-14 md:w-16 lg:w-16 xl:w-[4.5rem] 2xl:w-20 3xl:w-24 4xl:w-[112px] mx-auto" />

      <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-[#333333]/80 dark:text-white/70 leading-relaxed px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4 2xl:px-6 font-montserrat">
        {bio}
      </p>

      {socials && <SocialLinks socials={socials} />}
    </div>
  )
}

function SocialLinks({ socials }: { socials: SocialLinks }) {
  const platforms = Object.keys(socials) as SocialPlatform[]

  return (
    <div className="flex gap-2 sm:gap-2 md:gap-3 lg:gap-3 xl:gap-3 2xl:gap-4 justify-center pt-1 sm:pt-1 md:pt-2 lg:pt-2 xl:pt-2 2xl:pt-3">
      {platforms.map((platform) => {
        const url = socials[platform]
        if (!url) return null

        const Icon = SOCIAL_ICONS[platform]

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-10 2xl:h-10 rounded-full border border-[#001F4B]/20 dark:border-white/20 flex items-center justify-center hover:bg-[#001F4B] dark:hover:bg-[#ec1e24] hover:text-white dark:hover:text-white hover:border-transparent transition-all duration-300 text-[#001F4B]/20 dark:text-white active:scale-95"
          >
            <Icon size={12} className="sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-4 2xl:h-4" />
          </a>
        )
      })}
    </div>
  )
}

// ==================== MAIN COMPONENT ====================

export function OurTeam() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  const itemsPerPage = getItemsPerPage(windowWidth)

  const totalPages = Math.ceil(TEAM_DATA.length / itemsPerPage)

  // Track window width for responsive items per page
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset current index when screen size changes to prevent out-of-bounds
  useEffect(() => {
    if (currentIndex >= totalPages) {
      setCurrentIndex(0)
    }
  }, [itemsPerPage, currentIndex, totalPages])

  const handlePageChange = (page: number) => {
    setCurrentIndex(page - 1)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > SWIPE_THRESHOLD
    const isRightSwipe = distance < -SWIPE_THRESHOLD

    if (isLeftSwipe) {
      // Swipe left - go to next page (with wrapping)
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    } else if (isRightSwipe) {
      // Swipe right - go to previous page (with wrapping)
      setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
    }

    // Reset touch values
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section id="OurTeam" className="pb-12 sm:pb-14 md:pb-16 lg:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-[112px] 4xl:pb-32 w-full relative z-10">
      <div className="w-full">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl 4xl:text-6xl font-bold font-montserrat tracking-tight mb-8 sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 2xl:mb-14 3xl:mb-16 4xl:mb-20 text-[#333333]/80 dark:text-[#ec1e24]">
          OUR TEAM
        </h2>

        <TeamSlider
          totalPages={totalPages}
          currentIndex={currentIndex}
          itemsPerPage={itemsPerPage}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {totalPages > 1 && (
          <NavigationControls
            currentIndex={currentIndex}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onDotClick={setCurrentIndex}
          />
        )}
      </div>
    </section>
  )
}

function TeamSlider({
  totalPages,
  currentIndex,
  itemsPerPage,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: {
  totalPages: number
  currentIndex: number
  itemsPerPage: number
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
}) {
  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <motion.div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {Array.from({ length: totalPages }, (_, pageIndex) => (
          <div key={pageIndex} className="w-full flex-shrink-0">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 3xl:gap-20 4xl:gap-24 w-full justify-center lg:justify-end items-center">
              {TEAM_DATA.slice(
                pageIndex * itemsPerPage,
                (pageIndex + 1) * itemsPerPage
              ).map((member, idx) => (
                <TeamMemberCard key={idx} {...member} idx={idx} />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function NavigationControls({
  currentIndex,
  totalPages,
  onPageChange,
  onDotClick,
}: {
  currentIndex: number
  totalPages: number
  onPageChange: (page: number) => void
  onDotClick: (index: number) => void
}) {
  return (
    <>
      {/* Mobile & Tablet - Dot indicators; tap targets ≥44px */}
      <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-2 lg:hidden mt-8 sm:mt-9 md:mt-10 3xl:mt-12 4xl:mt-14">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className="group min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-all duration-300"
            aria-label={`Go to page ${index + 1}`}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full block transition-all duration-300",
                currentIndex === index
                  ? "bg-[#001F4B] dark:bg-[#ec1e24] scale-125"
                  : "bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500"
              )}
            />
          </button>
        ))}
      </div>

      {/* Desktop - Pagination */}
      <div className="hidden lg:flex justify-center mt-10 lg:mt-11 xl:mt-12 2xl:mt-14 3xl:mt-16 4xl:mt-20">
        <Pagination page={currentIndex + 1} setPage={onPageChange} total={totalPages} />
      </div>
    </>
  )
}