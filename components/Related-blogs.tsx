"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import Pagination from "./Pagination"
import { Button } from "@/components/ui/button"

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
      } else if (width < 1536) {
        setItemsPerSlide(3)
      } else if (width < 2560) {
        setItemsPerSlide(4)
      } else {
        setItemsPerSlide(5)
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
        <h2 className="text-2xl font-montserrat font-bold tracking-tight text-foreground">
          RECOMMENDED FOR YOU
        </h2>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No related posts found.</p>
      ) : (
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 gap-6">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="group bg-card text-card-foreground shadow-lg flex flex-col overflow-hidden transition-shadow hover:shadow-xl border border-border h-[400px]"
              >
                <div className="relative w-full h-[170px]">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, (max-width: 2560px) 25vw, 20vw"
                  />
                </div>

                <div className="relative p-4 flex flex-col flex-1 min-h-0">
                  <div className="flex flex-wrap gap-2 mb-2 min-h-6 shrink-0">
                    {post.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground/70 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-[18px] text-foreground font-normal leading-6 mb-2 line-clamp-2 h-[3rem] shrink-0 overflow-hidden">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-[12px] leading-[18px] line-clamp-3 h-[3.375rem] shrink-0 overflow-hidden">
                    {post.description}
                  </p>

                  <div className="mt-auto flex justify-end shrink-0 pt-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => (window.location.href = `/blog-detail?id=${post.id}`)}
                    >
                      Read More
                    </Button>
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
