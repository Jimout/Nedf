"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import Pagination from "./Pagination"
import { motion } from "framer-motion"

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
      "Clay Isn&apos;t Just A Material It&apos;s A Philosophy. In This Note, We Reflect On Why Traditional Materials Continue To Outperform Modern Alternatives In Both Sustainability And Aesthetic Appeal. Discover the timeless beauty and practical benefits of working with clay.",
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
      "Design Isn&apos;t Always About More. Sometimes It&apos;s About Less Done Right. We explore the principles of minimalist design and how restraint can create more impactful spaces. Learn why simplicity requires the most sophisticated thinking.",
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

export default function StudioNotes() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
    if (isRightSwipe && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Different items per page for mobile vs desktop
  const mobileItemsPerPage = 1
  const desktopItemsPerPage = 3
  const itemsPerPage = isMobile ? mobileItemsPerPage : desktopItemsPerPage
  
  const totalPages = Math.ceil(posts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)
  
  const handleReadMore = (postId: number) => {
    // Map post IDs to blog pages
    // First card (id: 0) goes to the existing blog-1 page
    const blogSlug = postId === 0 ? "blog-1" : `blog-${postId + 1}`
    router.push(`/blog/${blogSlug}`)
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="flex flex-col">
        {/* Posts Grid with Horizontal Slide */}
        <div 
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${(currentPage - 1) * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }, (_, pageIndex) => (
              <div
                key={pageIndex}
                className="w-full flex-shrink-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                  {posts.slice(pageIndex * (isMobile ? mobileItemsPerPage : desktopItemsPerPage), (pageIndex + 1) * (isMobile ? mobileItemsPerPage : desktopItemsPerPage)).map(({ id, image, categories, title, description }, i) => {
                    return (
                      <article
                        key={`${pageIndex}-${id}`}
                        className="group bg-white dark:bg-[#15171a] shadow-lg shadow-[#001F4B]/10 dark:shadow-[#ec1e24]/20 flex flex-col overflow-hidden transition-shadow hover:shadow-xl hover:shadow-[#001F4B]/20 dark:hover:shadow-[#ec1e24]/30 h-[400px] border border-[rgba(0,31,75,0.1)] dark:border-transparent"
                      >
                        <div className="relative w-full h-[170px]">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes={isMobile ? "260px" : "300px"}
                          />
                          <div className="absolute inset-0 bg-[#15171a] opacity-0 dark:opacity-30 transition-all duration-300 group-hover:scale-105" />
                        </div>

                        <div className="relative p-4 flex flex-col h-[230px]">
                          <div className="flex flex-wrap gap-2 mb-2" style={{ minHeight: "24px" }}>
                            {categories.map((cat, idx) => (
                              <span
                                key={idx}
                                className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground/70 rounded-full"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>

                          <h2 className="text-[18px] text-[#333333] dark:text-white font-regular leading-6 mb-2">{title}</h2>

                          <div className="flex-1 mb-3">
                            <p
                              className="text-[#333333]/60 dark:text-white/60 text-[12px] line-clamp-3"
                             
                            >
                              {description}
                            </p>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              onClick={() => handleReadMore(id)}>
                              Read More
                            </Button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: Dot Indicators, Desktop: Pagination */}
        {totalPages > 1 && (
          <>
            {/* Mobile - Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentPage === index + 1
                      ? "bg-[#001F4B] dark:bg-[#ec1e24] scale-125"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Desktop - Pagination */}
            <div className="hidden md:flex justify-end mt-6">
              <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
