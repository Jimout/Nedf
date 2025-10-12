"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"

const posts = [
  {
    id: 0,
    image: "/room1.jpg",
    categories: ["Case File", "Architecture"],
    title: "From Concept To Concrete",
    description:
      "We Take You Through The Design Journey Of A Modern Home We Recently Completed In Addis Ababa From Rough Initial Sketches To Polished Renders To Final Construction. This comprehensive case study explores every detail of our creative process and the challenges we overcame.",
  },
  {
    id: 1,
    image: "/interior2.jpg",
    categories: ["Materials", "Design Thinking", "Interior Design"],
    title: "Why Clay Still Wins",
    description:
      "Clay Isn't Just A Material It's A Philosophy. In This Note, We Reflect On Why Traditional Materials Continue To Outperform Modern Alternatives In Both Sustainability And Aesthetic Appeal. Discover the timeless beauty and practical benefits of working with clay.",
  },
  {
    id: 2,
    image: "/visual1.jpg",
    categories: ["Studio Life", "Behind The Scenes"],
    title: "Studio Mornings: What Fuels Our Process",
    description:
      "Every Monday At NEDF Starts With Music, Coffee, And Creative Chaos. We Give You A Glimpse Into Our Daily Rituals And The Small Moments That Spark Big Ideas. From brainstorming sessions to collaborative sketching, see how we maintain our creative energy.",
  },
  {
    id: 3,
    image: "/interior1.jpg",
    categories: ["Design"],
    title: "The Power Of Simplicity",
    description:
      "Design Isn't Always About More. Sometimes It's About Less Done Right. We explore the principles of minimalist design and how restraint can create more impactful spaces. Learn why simplicity requires the most sophisticated thinking.",
  },
  {
    id: 4,
    image: "/room3.jpg",
    categories: ["Tech", "AI"],
    title: "Using AI in Architecture",
    description:
      "How Artificial Intelligence is shaping how we plan, visualize, and build in the 21st century. From generative design to predictive modeling, we examine the tools that are revolutionizing our industry and changing the way we approach complex architectural challenges.",
  },
  {
    id: 5,
    image: "/visual2.jpg",
    categories: ["Process", "Design"],
    title: "Designing for the Future",
    description:
      "We explore how forward-thinking design principles shape spaces that adapt to changing needs. From flexible layouts to sustainable materials, discover our approach to creating timeless architecture that stands the test of time.",
  },
]

const calculateTextLines = (title: string, categories: string[]) => {
  let lines = 3
  if (title.length > 40) lines -= 1
  if (title.length > 60) lines -= 1
  if (categories.length > 2) lines -= 1
  if (categories.length > 3) lines -= 1
  return Math.max(1, lines)
}

const ArrowLeft = () => (
  <svg
    className="w-[40px] h-[40px] text-[#001F4B] transition-transform duration-200 ease-in-out hover:scale-110"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ArrowRight = () => (
  <svg
    className="w-[40px] h-[40px] text-[#001F4B] transition-transform duration-200 ease-in-out hover:scale-110"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export default function StudioNotes() {
  const [index, setIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(3)
  const [cardWidth, setCardWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const gap = 32

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth

      if (window.innerWidth < 768) {
        // Mobile - minimized card width (max 280px)
        const mobileWidth = Math.min(containerWidth * 0.85, 280)
        setItemsPerSlide(1)
        setCardWidth(mobileWidth)
        setIsMobile(true)
      } else {
        // Desktop and wider screens - always show 3 cards
        const calculatedWidth = (containerWidth - gap * 2) / 3
        setItemsPerSlide(3)
        setCardWidth(Math.min(calculatedWidth, 380))
        setIsMobile(false)
      }
      // Reset index when screen size changes to avoid out-of-bounds
      setIndex(0)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = Math.ceil(posts.length / itemsPerSlide)
  const isFirst = index === 0
  const isLast = index === totalSlides - 1

  // Calculate translation to move by full pages (itemsPerSlide cards at a time)
  const translateX = -index * itemsPerSlide * (cardWidth + gap)

  const nextSlide = () => !isLast && setIndex((prev) => prev + 1)
  const prevSlide = () => !isFirst && setIndex((prev) => prev - 1)
  
  const handleReadMore = (postId: number) => {
    // Map post IDs to blog pages
    // First card (id: 0) goes to the existing blog-1 page
    const blogSlug = postId === 0 ? "blog-1" : `blog-${postId + 1}`
    router.push(`/blog/${blogSlug}`)
  }

  return (
    <section
      className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-20 relative"
      ref={containerRef}
    >
      <h2 className="text-center text-[26px] md:text-[30px] font-medium text-[#333333] font-montserrat mb-8">
        STUDIO NOTES
      </h2>

      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-full">
          {/* Left Arrow */}
          <div
            onClick={prevSlide}
            aria-label="Previous"
            className={`absolute left-0 md:left-[-40px] top-1/2 -translate-y-1/2 cursor-pointer z-10 ${
              isFirst ? "opacity-30 pointer-events-none" : "opacity-100"
            }`}
          >
            <ArrowLeft />
          </div>

          {/* Right Arrow */}
          <div
            onClick={nextSlide}
            aria-label="Next"
            className={`absolute right-0 md:right-[-40px] top-1/2 -translate-y-1/2 cursor-pointer z-10 ${
              isLast ? "opacity-30 pointer-events-none" : "opacity-100"
            }`}
          >
            <ArrowRight />
          </div>

          {/* Slider container */}
          <div 
            className="overflow-hidden flex justify-center"
            style={{
              width: `${cardWidth * itemsPerSlide + gap * (itemsPerSlide - 1)}px`,
              maxWidth: '100%',
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${translateX}px)`,
                gap: `${gap}px`,
              }}
            >
              {posts.map(({ id, image, categories, title, description }, i) => {
                const textLines = calculateTextLines(title, categories)
                return (
                  <article
                    key={i}
                    className="group bg-white shadow-sm flex flex-col overflow-hidden transition-shadow hover:shadow-lg flex-shrink-0"
                    style={{
                      width: `${cardWidth}px`,
                      height: "400px",
                      border: "1px solid rgba(0, 31, 75, 0.1)",
                      borderRadius: "0",
                    }}
                  >
                    <div className="relative w-full h-[170px]">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes={isMobile ? "260px" : `${cardWidth}px`}
                      />
                    </div>

                    <div className="relative p-4 flex flex-col h-[230px]">
                      <div className="flex flex-wrap gap-2 mb-2" style={{ minHeight: "24px" }}>
                        {categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-[18px] text-[#333333] font-regular leading-6 mb-2">{title}</h2>

                      <div className="flex-1 mb-3">
                        <p
                          className="text-[#333333]/60 text-[12px] leading-[18px]"
                          title={description}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: textLines,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {description}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handleReadMore(id)}
                          className="text-white text-xs px-3 py-[8px] transition hover:opacity-90 active:opacity-80 touch-manipulation select-none"
                          style={{
                            backgroundColor: "#001F4B",
                            border: "1px solid rgba(0,31,75,0.1)",
                            borderRadius: "0px",
                            WebkitTapHighlightColor: 'transparent',
                            touchAction: 'manipulation',
                          }}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
