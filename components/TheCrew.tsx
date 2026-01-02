"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { FaLinkedin, FaInstagram, FaPinterest, FaBehance, FaYoutube } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { CometCard } from "@/components/ui/comet-card"
import { cn } from "@/lib/utils"

// ==================== TYPES ====================

interface Founder {
  id: string
  name: string
  title: string
  description: string
  image: string
  hoverImage?: string
  social: SocialLinks
}

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

const FOUNDERS_DATA: Founder[] = [
  {
    id: "1",
    name: "Founder 2",
    title: "Co-founder",
    description:
      "Blender is his second home, and pixel fear his perfection. If it's not beautifully rendered, he's not done yet.",
    image: "/mus.jpg",
    hoverImage: "/mus2.jpg",
    social: {
      instagram: "https://instagram.com/mussiegs",
      tiktok: "https://tiktok.com/@mussiegs",
      linkedin: "https://linkedin.com/in/mussiegs",
      pinterest: "https://pinterest.com/mussiegs",
      behance: "https://behance.net/mussiegs",
      x: "https://x.com/mussiegs",
      youtube: "https://youtube.com/@mussiegs",
    },
  },
  {
    id: "2",
    name: "Founder 1",
    title: "Co-founder",
    description:
      "He can spot a misaligned pixel from space. Brands trust him, but perfectionism keeps him up at night.",
    image: "/nat.jpg",
    hoverImage: "/nat2.jpg",
    social: {
      instagram: "https://instagram.com/natnaeltibebe",
      tiktok: "https://tiktok.com/@natnaeltibebe",
      linkedin: "https://linkedin.com/in/natnaeltibebe",
      pinterest: "https://pinterest.com/natnaeltibebe",
      behance: "https://behance.net/natnaeltibebe",
      x: "https://x.com/natnaeltibebe",
      youtube: "https://youtube.com/@natnaeltibebe",
    },
  },
]

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
  return <Founders founders={FOUNDERS_DATA} />
}

// ==================== FOUNDERS COMPONENT ====================

export function Founders({ founders }: FoundersProps) {
  const descriptionRef = useRef<HTMLDivElement>(null)
  const meetFoundersRef = useRef<HTMLDivElement>(null)
  const foundersContainerRef = useRef<HTMLDivElement>(null)

  const descriptionVisible = useScrollAnimation(descriptionRef, ANIMATION_CONFIG.DESCRIPTION_DELAY)
  const meetFoundersVisible = useScrollAnimation(meetFoundersRef, ANIMATION_CONFIG.MEET_FOUNDERS_DELAY)
  const foundersVisible = useScrollAnimation(foundersContainerRef, ANIMATION_CONFIG.FOUNDERS_CONTAINER_DELAY)

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-36 2xl:pt-40">
      <section id="TheCrew" className="w-full">
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
            font-size: clamp(2.5rem, 8vw, 8rem);
            font-weight: 900;
            white-space: nowrap;
            letter-spacing: 0.05em;
            text-transform: uppercase;
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
            <div className="scroll-text-item text-black dark:text-white opacity-10">ABOUT US</div>
          </div>

          <div ref={descriptionRef} className="relative z-20 pb-6 sm:pb-7 md:pb-8 lg:pb-9 xl:pb-10 2xl:pb-12 pt-0">
            <div className="w-full max-w-none animate-on-scroll visible">
              <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed text-center font-normal">
                NEDF is a creative studio based in Addis Ababa, Ethiopia, specializing in architectural design, interior
                spaces, and high-end visualizations. We blend design with technology to create thoughtful, innovative, and
                visually compelling environments. From concept to execution, our work reflects a commitment to clarity,
                craft, and bold creative expression.
              </p>
            </div>
          </div>

          <div ref={meetFoundersRef} className="relative z-20 pb-6 sm:pb-7 md:pb-8 lg:pb-9 xl:pb-10 2xl:pb-12">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-bold font-montserrat tracking-tight animate-on-scroll visible text-[#333333]/80 dark:text-[#ec1e24]">
              MEET THE FOUNDERS
            </h2>
          </div>

          <div ref={foundersContainerRef} className="relative z-20 pb-12 sm:pb-14 md:pb-16 lg:pb-18 xl:pb-20 2xl:pb-24">
            <div className="flex flex-col md:flex-row justify-center items-start gap-6 sm:gap-8 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 w-full">
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
      </section>
    </div>
  )
}

// ==================== SUB-COMPONENTS ====================

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  return (
    <div
      className={cn(
        "space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-4 xl:space-y-5 2xl:space-y-5",
        "w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[440px] 2xl:max-w-[480px]",
        "mx-auto founder-card visible",
        index === 0 ? "md:order-1" : "md:order-2"
      )}
    >
      <CometCard>
        <div className="relative w-full bg-white dark:bg-[#15171a] p-2.5 sm:p-3 md:p-3 lg:p-4 xl:p-5 2xl:p-5 border-[0.25px] border-gray-300 dark:border-white/15 flex flex-col">
          <div className="relative aspect-[3/4] w-full overflow-hidden mb-2 sm:mb-2 md:mb-2.5 lg:mb-3 xl:mb-3 2xl:mb-4 group border-[0.25px] border-gray-300 dark:border-white/15">
            <img
              src={founder.image || "/placeholder.svg"}
              alt={founder.name}
              className="w-full h-full object-cover group-hover:opacity-0 transition-all duration-300"
            />
            {founder.hoverImage && (
              <img
                src={founder.hoverImage}
                alt={founder.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-300"
              />
            )}
          </div>
          <div className="px-1">
            <h3 className="text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg font-bold text-[#333333] dark:text-white mb-1">
              {founder.name}
            </h3>
            <p className="text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-sm font-medium text-[#333333]/80 dark:text-white/80">
              {founder.title}
            </p>
          </div>
        </div>
      </CometCard>

      <div className="space-y-2">
        <p className="text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg text-[#333333] dark:text-white leading-relaxed">
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
        className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base font-medium text-[#333333] dark:text-white/80 mb-2 sm:mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-4 hover:text-[#002e47] dark:hover:text-[#ec1e24] transition-colors duration-300 cursor-pointer flex items-center gap-2"
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
          "flex gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-5 justify-start flex-wrap overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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
        "w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-10 2xl:h-10",
        "rounded-full border-[0.25px] border-white flex items-center justify-center",
        "text-white hover:bg-white hover:text-[#15171a]",
        "dark:hover:bg-[#ec1e24] dark:hover:text-white dark:hover:border-[#ec1e24]",
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
