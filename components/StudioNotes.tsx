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
]

const calculateTextLines = (title: string, categories: string[]) => {
  // Base lines: 3 (default)
  let lines = 3

  // Reduce lines based on title length
  if (title.length > 40) lines -= 1
  if (title.length > 60) lines -= 1

  // Reduce lines based on number of tags
  if (categories.length > 2) lines -= 1
  if (categories.length > 3) lines -= 1

  // Ensure minimum 1 line
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
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const updateTextLength = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      // Adjust max length based on container width
      const newMaxLength = containerWidth < 250 ? 80 : containerWidth < 280 ? 100 : 120
      // setMaxTextLength(newMaxLength)
    }

    updateTextLength()
    window.addEventListener("resize", updateTextLength)
    return () => window.removeEventListener("resize", updateTextLength)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768
      setItemsPerSlide(isMobileView ? 1 : 3)
      setIsMobile(isMobileView)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const cardWidth = 280
  const gap = 32
  const totalSlides = Math.ceil(posts.length / itemsPerSlide)
  const isFirst = index === 0
  const isLast = index === totalSlides - 1
  const totalCardWidth = cardWidth + gap
  const translateX = -index * totalCardWidth * itemsPerSlide

  const nextSlide = () => {
    if (!isLast) setIndex((prev) => prev + 1)
  }

  const prevSlide = () => {
    if (!isFirst) setIndex((prev) => prev - 1)
  }

  const handleReadMore = (postId: number) => {
    router.push(`/blog-detail?id=${postId}`)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pt-20 relative" ref={containerRef}>
      <h2 className="text-center text-[26px] md:text-[30px] font-medium text-[#333333] font-montserrat mb-8">
        STUDIO NOTES
      </h2>

      <div className="flex flex-col items-center">
        {/* Slider area */}
        <div className="relative flex items-center justify-center w-full">
          {/* Arrows on Desktop */}
          {!isMobile && (
            <>
              <div
                onClick={prevSlide}
                aria-label="Previous"
                className={`absolute left-[-60px] top-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                  isFirst ? "opacity-30 pointer-events-none" : "opacity-100"
                }`}
              >
                <ArrowLeft />
              </div>

              <div
                onClick={nextSlide}
                aria-label="Next"
                className={`absolute right-[-60px] top-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                  isLast ? "opacity-30 pointer-events-none" : "opacity-100"
                }`}
              >
                <ArrowRight />
              </div>
            </>
          )}

          {/* Slider container */}
          <div
            className="overflow-hidden"
            style={{
              width: `${cardWidth * itemsPerSlide + gap * (itemsPerSlide - 1)}px`,
              maxWidth: "100%",
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX}px)`, gap: `${gap}px` }}
            >
              {posts.map(({ id, image, categories, title, description }, i) => {
                const textLines = calculateTextLines(title, categories)

                return (
                  <article
                    key={i}
                    className="bg-white shadow-sm flex flex-col overflow-hidden"
                    style={{
                      width: `${cardWidth}px`,
                      height: "400px",
                      border: "1px solid rgba(0, 31, 75, 0.1)",
                      borderRadius: "0",
                      flexShrink: 0,
                    }}
                  >
                    <div className="relative" style={{ height: "170px", width: "100%" }}>
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                    </div>

                    <div className="relative p-4 flex flex-col" style={{ height: "230px" }}>
                      <div className="flex flex-wrap gap-2 mb-2" style={{ minHeight: "24px" }}>
                        {categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-medium"
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              color: "#001F4B",
                              border: "1px solid rgba(0,31,75,0.1)",
                              padding: "2px 8px",
                              borderRadius: "999px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                            }}
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
                          className="text-white text-xs px-3 py-[8px] transition hover:opacity-90"
                          style={{
                            backgroundColor: "#001F4B",
                            border: "1px solid rgba(0,31,75,0.1)",
                            borderRadius: "0px",
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

        {/* Arrows on Mobile */}
        {isMobile && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className={`${isFirst ? "opacity-30 pointer-events-none" : "opacity-100"}`}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className={`${isLast ? "opacity-30 pointer-events-none" : "opacity-100"}`}
            >
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
