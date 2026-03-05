"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import Pagination from "./Pagination"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// ==================== TYPES ====================

interface BlogPost {
  id: number
  image: string
  categories: string[]
  title: string
  description: string
}

// ==================== CONSTANTS ====================

const BLOG_POSTS: BlogPost[] = [
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

const ITEMS_PER_PAGE = {
  MOBILE: 1,
  DESKTOP: 3,
} as const

const SWIPE_THRESHOLD = 50

function getItemsPerPage(isMobile: boolean): number {
  return isMobile ? ITEMS_PER_PAGE.MOBILE : ITEMS_PER_PAGE.DESKTOP
}

function getBlogSlug(postId: number): string {
  return postId === 0 ? "blog-1" : `blog-${postId + 1}`
}

export default function StudioNotes() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const router = useRouter()

  const itemsPerPage = getItemsPerPage(isMobile)
  const totalPages = Math.ceil(BLOG_POSTS.length / itemsPerPage)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [itemsPerPage, currentPage, totalPages])

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

    if (isLeftSwipe && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }

    if (isRightSwipe && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleReadMore = (postId: number) => {
    router.push(`/blog/${getBlogSlug(postId)}`)
  }

  return (
    <section className="w-full">
      <div className="flex flex-col">

        <BlogPostsSlider
          totalPages={totalPages}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          isMobile={isMobile}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onReadMore={handleReadMore}
        />

        {totalPages > 1 && (
          <NavigationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

      </div>
    </section>
  )
}

function BlogPostsSlider({
  totalPages,
  currentPage,
  itemsPerPage,
  isMobile,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onReadMore,
}: any) {

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
          transform: `translateX(-${(currentPage - 1) * 100}%)`,
        }}
      >

        {Array.from({ length: totalPages }, (_, pageIndex) => (

          <div key={pageIndex} className="w-full flex-shrink-0">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

              {BLOG_POSTS.slice(
                pageIndex * itemsPerPage,
                (pageIndex + 1) * itemsPerPage
              ).map((post) => (

                <BlogPostCard
                  key={`${pageIndex}-${post.id}`}
                  post={post}
                  isMobile={isMobile}
                  onReadMore={onReadMore}
                />

              ))}

            </div>

          </div>

        ))}

      </motion.div>

    </div>
  )
}

function BlogPostCard({
  post,
  isMobile,
  onReadMore,
}: any) {

  return (

    <article className="group bg-white dark:bg-[#15171a] border border-gray-300 dark:border-white/10 flex flex-col overflow-hidden transition-shadow 
    w-full max-w-[280px] mx-auto
    h-[520px] sm:h-[540px] md:h-[560px] lg:h-[580px] xl:h-[600px]">

      <PostImage image={post.image} title={post.title} isMobile={isMobile} />

      <PostContent
        categories={post.categories}
        title={post.title}
        description={post.description}
        postId={post.id}
        onReadMore={onReadMore}
      />

    </article>
  )
}

function PostImage({ image, title, isMobile }: any) {

  return (

    <div className="relative w-full h-[220px]">

      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes={isMobile ? "260px" : "300px"}
      />

      <div className="absolute inset-0 bg-[#15171a] opacity-0 dark:opacity-30 transition-all duration-300 group-hover:scale-105" />

    </div>
  )
}

function PostContent({
  categories,
  title,
  description,
  postId,
  onReadMore,
}: any) {

  return (

    <div className="relative p-6 flex flex-col flex-1">

      <CategoryTags categories={categories} />

      <h2 className="text-xl text-[#333333] dark:text-white leading-6 mb-3">
        {title}
      </h2>

      <div className="flex-1 mb-4">

        <p className="text-[#333333]/60 dark:text-white/60 text-sm line-clamp-4">
          {description}
        </p>

      </div>

      <div className="flex justify-end">

        <Button
          onClick={() => onReadMore(postId)}
          className="bg-[#002e47] dark:bg-[#ec1e24] text-white hover:bg-[#001f35] dark:hover:bg-[#ec1e24]/90"
        >
          Read More
        </Button>

      </div>

    </div>
  )
}

function CategoryTags({ categories }: any) {

  return (

    <div className="flex flex-wrap gap-2 mb-3">

      {categories.map((cat: string, idx: number) => (

        <span
          key={idx}
          className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground/70 rounded-full"
        >
          {cat}
        </span>

      ))}

    </div>
  )
}

function NavigationControls({
  currentPage,
  totalPages,
  onPageChange,
}: any) {

  return (

    <>

      <div className="flex justify-center gap-2 md:hidden mt-5">

        {Array.from({ length: totalPages }, (_, index) => (

          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentPage === index + 1
                ? "bg-[#001F4B] dark:bg-[#ec1e24] scale-125"
                : "bg-gray-300 dark:bg-gray-600"
            )}
          />

        ))}

      </div>

      <div className="hidden md:flex justify-center mt-8">

        <Pagination
          page={currentPage}
          setPage={(page: any) =>
            onPageChange(typeof page === "function" ? page(currentPage) : page)
          }
          total={totalPages}
        />

      </div>

    </>
  )
}