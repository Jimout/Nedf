"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { FaLinkedin, FaInstagram, FaPinterest, FaBehance, FaYoutube } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { CometCard } from "@/components/ui/comet-card"

interface Founder {
  id: string
  name: string
  title: string
  description: string
  image: string
  hoverImage?: string
  social: {
    instagram?: string
    tiktok?: string
    linkedin?: string
    pinterest?: string
    behance?: string
    x?: string
    youtube?: string
  }
}

interface FoundersProps {
  founders: Founder[]
}

// Sample founders data
const foundersData: Founder[] = [
  {
    id: "1",
    name: "MUSSIE G. SELASSIE",
    title: "Co-founder",
    description:
      "Blender is his second home, and pixel fear his perfection. If it's not beautifully rendered, he's not done yet.",
    image: "/mos.jpg",
    hoverImage: "/mos2.jpg",
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
    name: "NATNAEL TIBEBE",
    title: "Co-founder",
    description:
      "He can spot a misaligned pixel from space. Brands trust him, but perfectionism keeps him up at night.",
    image: "/natty.jpg",
    hoverImage: "/natty2.jpg",
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
      { threshold: 0.1 },
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

export function TheCrew() {
  return <Founders founders={foundersData} />
}

export function Founders({ founders }: FoundersProps) {
  const descriptionRef = useRef<HTMLDivElement>(null)
  const meetFoundersRef = useRef<HTMLDivElement>(null)
  const foundersContainerRef = useRef<HTMLDivElement>(null)

  const descriptionVisible = useScrollAnimation(descriptionRef, 0)
  const meetFoundersVisible = useScrollAnimation(meetFoundersRef, 300)
  const foundersVisible = useScrollAnimation(foundersContainerRef, 600)

  return (
    <div className="pt-24 md:pt-32 lg:pt-40">
      <section className="w-full">
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

          <div ref={descriptionRef} className="relative z-20 pb-8 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-0">
            <div className={`max-w-5xl mx-auto animate-on-scroll visible`}>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center font-normal">
                NEDF is a creative studio based in Addis Ababa, Ethiopia, specializing in architectural design, interior
                spaces, and high-end visualizations. We blend design with technology to create thoughtful, innovative, and
                visually compelling environments. From concept to execution, our work reflects a commitment to clarity,
                craft, and bold creative expression.
              </p>
            </div>
          </div>

          <div ref={meetFoundersRef} className="relative z-20 pb-8 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <p
              className={`text-center text-3xl font-bold sm:text-4xl font-montserrat tracking-tight animate-on-scroll visible`}
              style={{ color: '#ec1e24' }}
            >
              MEET THE FOUNDERS
            </p>
          </div>

          <div ref={foundersContainerRef} className="relative z-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-16 md:pb-20">
            <div className="flex flex-col md:flex-row justify-center items-start gap-1 w-full">
              {founders.map((founder, index) => (
                <div
                  key={founder.id}
                  className={`space-y-4 max-w-md mx-auto founder-card visible ${index === 0 ? "md:order-1" : "md:order-2"}`}
                >
                <CometCard>
                  <div className="relative w-full bg-[#15171a] p-4 border-[0.25px] border-white/15 flex flex-col">
                    <div className="relative aspect-[3/4] w-full overflow-hidden mb-3 group border-[0.25px] border-white/15">
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
                      <h3 className="text-base font-bold text-white mb-1">{founder.name}</h3>
                      <p className="text-xs font-medium text-white/80">{founder.title}</p>
                    </div>
                  </div>
                </CometCard>

                <div className="space-y-2">
                  <p className="text-white leading-relaxed text-base">{founder.description}</p>

                  <div className="flex gap-4 justify-start flex-wrap pt-4">
                    {founder.social.instagram && (
                      <a
                        href={founder.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border-white flex items-center justify-center text-white hover:bg-white hover:text-[#15171a] active:bg-white active:text-[#15171a] focus:bg-white focus:text-[#15171a] transition-colors duration-300"
                        style={{ borderWidth: '0.25px' }}
                      >
                        <FaInstagram size={14} />
                      </a>
                    )}
                    {founder.social.tiktok && (
                      <a
                        href={founder.social.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border-white flex items-center justify-center text-white hover:bg-white hover:text-[#15171a] active:bg-white active:text-[#15171a] focus:bg-white focus:text-[#15171a] transition-colors duration-300"
                        style={{ borderWidth: '0.25px' }}
                      >
                        <FaTiktok size={14} />
                      </a>
                    )}
                    {founder.social.linkedin && (
                      <a
                        href={founder.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border-white flex items-center justify-center text-white hover:bg-white hover:text-[#15171a] active:bg-white active:text-[#15171a] focus:bg-white focus:text-[#15171a] transition-colors duration-300"
                        style={{ borderWidth: '0.25px' }}
                      >
                        <FaLinkedin size={14} />
                      </a>
                    )}
                    {founder.social.pinterest && (
                      <a
                        href={founder.social.pinterest}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border-white flex items-center justify-center text-white hover:bg-white hover:text-[#15171a] active:bg-white active:text-[#15171a] focus:bg-white focus:text-[#15171a] transition-colors duration-300"
                        style={{ borderWidth: '0.25px' }}
                      >
                        <FaPinterest size={14} />
                      </a>
                    )}
                    {founder.social.behance && (
                      <a
                        href={founder.social.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border-white flex items-center justify-center text-white hover:bg-white hover:text-[#15171a] active:bg-white active:text-[#15171a] focus:bg-white focus:text-[#15171a] transition-colors duration-300"
                        style={{ borderWidth: '0.25px' }}
                      >
                        <FaBehance size={14} />
                      </a>
                    )}
                    {founder.social.x && (
                      <a
                        href={founder.social.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border-white flex items-center justify-center text-white hover:bg-white hover:text-[#15171a] active:bg-white active:text-[#15171a] focus:bg-white focus:text-[#15171a] transition-colors duration-300"
                        style={{ borderWidth: '0.25px' }}
                      >
                        <FaXTwitter size={14} />
                      </a>
                    )}
                    {founder.social.youtube && (
                      <a
                        href={founder.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border-white flex items-center justify-center text-white hover:bg-white hover:text-[#15171a] active:bg-white active:text-[#15171a] focus:bg-white focus:text-[#15171a] transition-colors duration-300"
                        style={{ borderWidth: '0.25px' }}
                      >
                        <FaYoutube size={14} />
                      </a>
                    )}
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
