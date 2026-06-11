"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Pagination from "@/components/Pagination"
import Subscription from "@/components/Subscription"
import LandingListHeader from "@/components/LandingListHeader"
import LandingFilterTags from "@/components/LandingFilterTags"
import { Button } from "@/components/ui/button"
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

function BlogPostCard({
  post,
  filterLabel,
  onReadMore,
}: {
  post: CmsBlogPost
  filterLabel: string
  onReadMore: (id: string) => void
}) {
  return (
    <article className="group bg-card text-card-foreground shadow-lg flex flex-col overflow-hidden transition-shadow hover:shadow-xl border border-border h-[400px]">
      <div className="relative w-full h-[170px] shrink-0">
        <Image
          src={post.heroImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
        />
      </div>
      <div className="relative p-4 flex flex-col flex-1 min-h-0">
        <div className="mb-2 min-h-6 shrink-0">
          <span className="inline-block text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
            {filterLabel}
          </span>
        </div>
        <h2 className="text-base font-medium text-foreground mb-2 line-clamp-2 h-[2.5rem] leading-5 shrink-0 overflow-hidden">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-3 h-[3.75rem] leading-5 shrink-0 overflow-hidden">
          {post.description}
        </p>
        <div className="mt-auto flex justify-end shrink-0 pt-2">
          <Button
            type="button"
            size="sm"
            onClick={() => onReadMore(post.id)}
            className="relative z-10 min-h-[44px] min-w-[44px] rounded-none touch-manipulation select-none [-webkit-tap-highlight-color:transparent] shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:bg-primary/80 active:shadow-sm focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Read more
          </Button>
        </div>
      </div>
    </article>
  )
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
                  post={post}
                  filterLabel={filters.find((f) => f.id === post.filterId)?.label ?? "Studio"}
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
