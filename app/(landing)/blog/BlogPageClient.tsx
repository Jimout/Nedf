"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import Pagination from "@/components/Pagination"
import Subscription from "@/components/Subscription"
import LandingListHeader from "@/components/LandingListHeader"
import LandingFilterTags from "@/components/LandingFilterTags"
import BlogPostCard, { cmsPostToCard } from "@/components/BlogPostCard"
import type { CmsBlogFilter, CmsBlogPost } from "@/lib/cms/types"

const POSTS_PER_PAGE = 6

const ANIMATION_CONFIG = {
  grid: {
    initial: { y: 20 },
    animate: { y: 0 },
    exit: { y: -20 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

function postMatchesFilter(
  post: CmsBlogPost,
  activeLabel: string,
  filters: CmsBlogFilter[]
): boolean {
  if (activeLabel === "All") return true
  const filter = filters.find((f) => f.label === activeLabel)
  if (!filter) return false
  return post.filterId === filter.id
}

function filterPosts(
  posts: CmsBlogPost[],
  filters: CmsBlogFilter[],
  activeTag: string,
  searchQuery: string
): CmsBlogPost[] {
  const query = searchQuery.toLowerCase()
  return posts.filter((post) => {
    const filterLabel = filters.find((f) => f.id === post.filterId)?.label ?? ""
    const matchesTag = postMatchesFilter(post, activeTag, filters)
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      filterLabel.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    return matchesTag && matchesSearch
  })
}

function paginatePosts(posts: CmsBlogPost[], currentPage: number): CmsBlogPost[] {
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  return posts.slice(startIndex, startIndex + POSTS_PER_PAGE)
}

export default function BlogPageClient({
  posts,
  filters,
}: {
  posts: CmsBlogPost[]
  filters: CmsBlogFilter[]
}) {
  const [activeTag, setActiveTag] = useState("All")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const router = useRouter()

  const filterTags = useMemo(() => {
    const labels = filters
      .filter((f) => f.isActive && posts.some((p) => p.filterId === f.id))
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((f) => f.label)
    return ["All", ...labels]
  }, [filters, posts])

  const filteredPosts = useMemo(
    () => filterPosts(posts, filters, activeTag, search),
    [posts, filters, activeTag, search]
  )

  const paginatedPosts = useMemo(() => paginatePosts(filteredPosts, page), [filteredPosts, page])
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  return (
    <>
      <div>
        <div className="pt-6 sm:pt-7 md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-14 pb-12 sm:pb-14 md:pb-16 lg:pb-18 xl:pb-20 2xl:pb-24 bg-background">
          <LandingListHeader
            searchValue={search}
            onSearchChange={(value) => {
              setSearch(value)
              setPage(1)
            }}
            searchPlaceholder="Search articles..."
          />

          <LandingFilterTags
            id="blog-filter"
            tags={filterTags}
            activeTag={activeTag}
            onTagChange={(tag) => {
              setActiveTag(tag)
              setPage(1)
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${activeTag}-${search}`}
              initial={ANIMATION_CONFIG.grid.initial}
              animate={ANIMATION_CONFIG.grid.animate}
              exit={ANIMATION_CONFIG.grid.exit}
              transition={ANIMATION_CONFIG.grid.transition}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 gap-6"
            >
              {paginatedPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={cmsPostToCard(
                    post,
                    filters.find((f) => f.id === post.filterId)?.label ?? "Studio",
                  )}
                  onReadMore={(id) => router.push(`/blog/${id}`)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 2xl:mt-12">
              <Pagination page={page} setPage={setPage} total={totalPages} />
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24">
              <p className="text-muted-foreground text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg">
                No articles found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>
      <Subscription />
    </>
  )
}
