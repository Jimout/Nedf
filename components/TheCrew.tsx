"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { FaLinkedin, FaInstagram, FaPinterest, FaBehance, FaYoutube } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { CometCard } from "@/components/ui/comet-card"
import { cn } from "@/lib/utils"
import { loadCrewSection, type CrewMember } from "@/lib/landing-crew"

// ==================== TYPES ====================

type Founder = CrewMember

interface SocialLinks {
  instagram?: string
  tiktok?: string
  linkedin?: string
  pinterest?: string
  behance?: string
  x?: string
  youtube?: string
}

interface FoundersProps {
  founders: Founder[]
  aboutDescription: string
}

type SocialPlatform = keyof SocialLinks

// ==================== CONSTANTS ====================

const ANIMATION_CONFIG = {
  THRESHOLD: 0.1,
  DESCRIPTION_DELAY: 0,
  MEET_FOUNDERS_DELAY: 300,
  FOUNDERS_CONTAINER_DELAY: 600,
} as const

const SOCIAL_ICONS: Record<SocialPlatform, React.ComponentType<{ size?: number }>> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
  pinterest: FaPinterest,
  behance: FaBehance,
  x: FaXTwitter,
  youtube: FaYoutube,
}

// ==================== HOOKS ====================

function useScrollAnimation(ref: React.RefObject<HTMLDivElement | null>, delay = 0) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: ANIMATION_CONFIG.THRESHOLD },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return isVisible
}

// ==================== MAIN COMPONENT ====================

export function TheCrew() {
  const [section, setSection] = useState(() => loadCrewSection())
  useEffect(() => {
    setSection(loadCrewSection())
  }, [])
  return (
    <Founders
      founders={section.crew}
      aboutDescription={section.aboutDescription}
    />
  )
}

// ==================== FOUNDERS COMPONENT ====================

export function Founders({ founders, aboutDescription }: FoundersProps) {
  const descriptionRef = useRef<HTMLDivElement>(null)
  const meetFoundersRef = useRef<HTMLDivElement>(null)
  const foundersContainerRef = useRef<HTMLDivElement>(null)

  const descriptionVisible = useScrollAnimation(descriptionRef, ANIMATION_CONFIG.DESCRIPTION_DELAY)
  const meetFoundersVisible = useScrollAnimation(meetFoundersRef, ANIMATION_CONFIG.MEET_FOUNDERS_DELAY)
  const foundersVisible = useScrollAnimation(foundersContainerRef, ANIMATION_CONFIG.FOUNDERS_CONTAINER_DELAY)

  return (
    <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 2xl:pt-20 3xl:pt-24 4xl:pt-28 pb-4 sm:pb-6 md:pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 3xl:pb-24 4xl:pb-28">
      <section
        id="TheCrew"
        className="w-full 2xl:w-screen 2xl:relative 2xl:left-1/2 2xl:-ml-[50vw] 2xl:px-16 3xl:px-20 4xl:px-24"
      >
        <div className="w-full">
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .sticky-container {
            position: relative;
            min-height: 0;
          }

          .scroll-bg {
            position: sticky;
            top: 0;
            width: 100%;
            height: auto;
            min-height: 0;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 0;
            padding-bottom: 0;
            overflow: hidden;
            z-index: 10;
            pointer-events: none;
          }

          .scroll-text-item {
            font-size: clamp(2.5rem, 8vw, 6rem); /* base ≈ 8xl */
            font-weight: 900;
            white-space: nowrap;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          /* 2xl and up (≥1536px): larger ABOUT US */
          @media (min-width: 1536px) {
            .scroll-text-item {
              font-size: 11rem;
            }
          }

          /* 3xl and up (≥1920px): larger ABOUT US */
          @media (min-width: 1920px) {
            .scroll-text-item {
              font-size: 13rem;
            }
          }

          /* 4xl and up (≥2560px): largest ABOUT US */
          @media (min-width: 2560px) {
            .scroll-text-item {
              font-size: 15rem;
            }
          }

          .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }

          .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .founder-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }

          .founder-card.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .founder-card:nth-child(1).visible {
            transition-delay: 0s;
          }

          .founder-card:nth-child(2).visible {
            transition-delay: 0.2s;
          }
        `}</style>

        <div className="sticky-container">
          <div className="scroll-bg">
            <div className="scroll-text-item text-foreground opacity-10">ABOUT US</div>
          </div>

          <div ref={descriptionRef} className="relative z-20 pb-6 sm:pb-7 md:pb-8 lg:pb-9 xl:pb-10 2xl:pb-12 3xl:pb-14 4xl:pb-16 pt-0">
            <div className="w-full max-w-none animate-on-scroll visible">
              <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl text-muted-foreground leading-relaxed 2xl:leading-relaxed 3xl:leading-[1.6] 4xl:leading-[1.6] text-center font-normal px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-32">
                {aboutDescription}
              </p>
            </div>
          </div>

          <div ref={meetFoundersRef} className="relative z-20 pb-6 sm:pb-7 md:pb-8 lg:pb-9 xl:pb-10 2xl:pb-12 3xl:pb-14 4xl:pb-16">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-8xl 3xl:text-9xl 4xl:text-[7.5rem] font-bold font-montserrat tracking-tight animate-on-scroll visible text-foreground/80 dark:text-primary">
              MEET THE FOUNDERS
            </h2>
          </div>

          <div ref={foundersContainerRef} className="relative z-20 pb-12 sm:pb-14 md:pb-16 lg:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-[112px] 4xl:pb-32">
            <div className="flex flex-col md:flex-row justify-center items-start gap-6 sm:gap-8 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-14 w-full min-w-0">
              {founders.map((founder, index) => (
                <FounderCard 
                  key={founder.id} 
                  founder={founder} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

// ==================== SUB-COMPONENTS ====================

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const darkImg = founder.imageDark || founder.image
  return (
    <div
      className={cn(
        "space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-7 4xl:space-y-8",
        "w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[320px] 2xl:max-w-[420px] 3xl:max-w-[460px] 4xl:max-w-[520px]",
        "mx-auto founder-card visible",
        index === 0 ? "md:order-1" : "md:order-2"
      )}
    >
      <CometCard>
        <div className="relative w-full bg-card p-2.5 sm:p-3 md:p-3 lg:p-4 xl:p-5 2xl:p-8 3xl:p-10 4xl:p-12 border border-border flex flex-col">
          <div className="relative aspect-[3/4] w-full overflow-hidden mb-2 sm:mb-2 md:mb-2.5 lg:mb-3 xl:mb-3 2xl:mb-4 group border border-border">
            {/* Light mode */}
            <img
              src={founder.image || "/placeholder.svg"}
              alt={founder.name}
              className="absolute inset-0 w-full h-full object-cover dark:opacity-0 group-hover:opacity-0 transition-all duration-300"
            />
            {/* Dark mode */}
            <img
              src={darkImg || founder.image || "/placeholder.svg"}
              alt={founder.name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 dark:opacity-100 group-hover:opacity-0 transition-all duration-300"
            />
            {/* Hover (overlays both) */}
            {founder.hoverImage && (
              <img
                src={founder.hoverImage}
                alt={founder.name}
                className="absolute inset-0 z-10 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
              />
            )}
          </div>
          <div className="px-1">
            <h3 className="text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-[2rem] font-bold text-foreground mb-1.5">
              {founder.name}
            </h3>
            <p className="text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-xl 3xl:text-2xl 4xl:text-[1.4rem] font-medium text-muted-foreground">
              {founder.title}
            </p>
          </div>
        </div>
      </CometCard>

      <div className="space-y-2">
        <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl text-foreground leading-relaxed 2xl:leading-relaxed 3xl:leading-[1.6] 4xl:leading-[1.6]">
          {founder.description}
        </p>

        <SocialLinks social={founder.social} />
      </div>
    </div>
  )
}

function SocialLinks({ social }: { social: SocialLinks }) {
  const [isOpen, setIsOpen] = useState(false)
  const platforms = Object.keys(social) as SocialPlatform[]

  return (
    <div className="pt-3 sm:pt-3 md:pt-4 lg:pt-4 xl:pt-4 2xl:pt-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-xl 3xl:text-2xl 4xl:text-3xl font-medium text-muted-foreground mb-2 sm:mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-4 hover:text-primary transition-colors duration-300 cursor-pointer flex items-center gap-2"
      >
        Follow Us
        <span className={cn(
          "transform transition-transform duration-300",
          isOpen ? "rotate-180" : "rotate-0"
        )}>
          ▼
        </span>
      </button>
      <div 
        className={cn(
          "flex gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-6 3xl:gap-7 4xl:gap-8 justify-start flex-wrap py-1 transition-all duration-500 ease-in-out",
          isOpen ? "max-h-40 opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        {platforms.map((platform, index) => {
          const url = social[platform]
          if (!url) return null

          const Icon = SOCIAL_ICONS[platform]
          
          return (
            <SocialLink 
              key={platform} 
              url={url} 
              icon={<Icon size={14} />}
              label={platform}
              delay={index * 50}
              isVisible={isOpen}
            />
          )
        })}
      </div>
    </div>
  )
}

function SocialLink({ 
  url, 
  icon, 
  label,
  delay,
  isVisible
}: { 
  url: string
  icon: React.ReactNode
  label: string
  delay: number
  isVisible: boolean
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 3xl:w-12 3xl:h-12 4xl:w-14 4xl:h-14",
        "rounded-full border border-border flex items-center justify-center",
        "text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary",
        "transition-all duration-300 hover:scale-110 active:scale-95",
        "transform",
        isVisible ? "scale-100 translate-y-0" : "scale-0 -translate-y-4"
      )}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {icon}
    </a>
  )
}
