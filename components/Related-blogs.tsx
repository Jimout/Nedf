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
        <h2 className="text-2xl font-montserrat font-regular tracking-wide text-[#001F4B]/80">
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
                className="group bg-card border border-border overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="text-xl font-montserrat leading-tight line-clamp-2"
                    style={{ color: "rgba(51, 51, 51, 0.8)" }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-sm font-montserrat leading-relaxed line-clamp-3"
                    style={{ color: "rgba(51, 51, 51, 0.8)" }}
                  >
                    {post.description}
                  </p>

                  <div className="mt-auto pt-4 flex justify-end">
                    <button
                      onClick={() => (window.location.href = `/blog-detail?id=${post.id}`)}
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
