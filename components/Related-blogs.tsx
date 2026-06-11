"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Pagination from "./Pagination"
import BlogPostCard, { type BlogPostCardData } from "./BlogPostCard"

interface RelatedBlogsProps {
  posts: BlogPostCardData[]
}

export default function RelatedBlogs({ posts }: RelatedBlogsProps) {
  const router = useRouter()
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 gap-6">
            {visiblePosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onReadMore={(id) => router.push(`/blog/${id}`)}
              />
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
