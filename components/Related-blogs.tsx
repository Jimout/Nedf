"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import Pagination from "./Pagination"

interface RelatedBlogsProps {
  posts: Array<{
    id: number
    image: string
    categories: string[]
    title: string
    description: string
  }>
}

export default function RelatedBlogs({ posts }: RelatedBlogsProps) {
  const [page, setPage] = useState(1)
  const [itemsPerSlide, setItemsPerSlide] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setItemsPerSlide(1)
      } else if (width < 1024) {
        setItemsPerSlide(2)
      } else {
        setItemsPerSlide(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = Math.ceil(posts.length / itemsPerSlide)
  const index = page - 1
  const visiblePosts = posts.slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)

  return (
    <section className="w-full py-6" ref={containerRef}>
      <div className="mb-8">
        <h2 className="text-2xl font-montserrat font-regular tracking-wide text-[#001F4B] dark:text-[#ec1e24]">
          RECOMMENDED FOR YOU
        </h2>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No related posts found.</p>
      ) : (
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-[#15171a] shadow-lg shadow-[#001F4B]/10 dark:shadow-[#ec1e24]/20 flex flex-col overflow-hidden transition-shadow hover:shadow-xl hover:shadow-[#001F4B]/20 dark:hover:shadow-[#ec1e24]/30 h-[400px] border border-[rgba(0,31,75,0.1)] dark:border-transparent"
              >
                <div className="relative w-full h-[170px]">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#15171a] opacity-0 dark:opacity-30 transition-all duration-300 group-hover:scale-105" />
                </div>

                <div className="relative p-4 flex flex-col h-[230px]">
                  <div className="flex flex-wrap gap-2 mb-2" style={{ minHeight: "24px" }}>
                    {post.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground/70 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-[18px] text-[#333333] dark:text-white font-regular leading-6 mb-2">
                    {post.title}
                  </h3>

                  <div className="flex-1 mb-3">
                    <p className="text-[#333333]/60 dark:text-white/60 text-[12px] leading-[18px] line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => (window.location.href = `/blog-detail?id=${post.id}`)}
                      className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#003366] dark:hover:bg-[#ec1e24]/80 text-white text-xs px-3 py-2 transition hover:opacity-90"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Pagination page={page} setPage={setPage} total={totalSlides} />
          </div>
        </div>
      )}
    </section>
  )
}
