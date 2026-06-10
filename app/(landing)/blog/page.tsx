"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Pagination from "@/components/Pagination"
import Subscription from "@/components/Subscription"
import LandingListHeader from "@/components/LandingListHeader"
import LandingFilterTags from "@/components/LandingFilterTags"
import { BLOG_POSTS, type BlogPost as Post } from "@/lib/landing-blog-posts"

// ============================================================================
// CONSTANTS
// ============================================================================

const POSTS_PER_PAGE = 6

const BLOG_FILTER_TAGS = [
  "All",
  "Architecture",
  "Design",
  "Interior",
  "Studio Life",
  "Materials",
  "Tech",
] as const

type FilterTag = (typeof BLOG_FILTER_TAGS)[number]

const TAG_MATCHERS: Record<Exclude<FilterTag, "All">, string[]> = {
  Architecture: ["Architecture", "Case File"],
  Design: ["Design", "Design Thinking"],
  Interior: ["Interior", "Interior Design"],
  "Studio Life": ["Studio Life", "Behind the Scenes", "Workflow"],
  Materials: ["Materials"],
  Tech: ["Tech", "AI"],
}

function postMatchesTag(post: Post, activeTag: FilterTag): boolean {
  if (activeTag === "All") return true
  const matchers = TAG_MATCHERS[activeTag]
  return post.categories.some((cat) => matchers.includes(cat))
}

/** Same grid enter/exit as `PortfolioPageClient` (subtle vertical motion, no horizontal slide) */
const ANIMATION_CONFIG = {
  grid: {
    initial: { y: 20 },
    animate: { y: 0 },
    exit: { y: -20 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

const TEXT_CLAMP_CONFIG = {
  titleLengthThreshold: {
    medium: 40,
    long: 60,
  },
  categoryCountThreshold: {
    many: 2,
    tooMany: 3,
  },
  baseLines: 3,
  minLines: 1,
} as const

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function calculateTextLines(title: string, categories: string[]): number {
  let lines = TEXT_CLAMP_CONFIG.baseLines

  if (title.length > TEXT_CLAMP_CONFIG.titleLengthThreshold.medium) lines -= 1
  if (title.length > TEXT_CLAMP_CONFIG.titleLengthThreshold.long) lines -= 1
  if (categories.length > TEXT_CLAMP_CONFIG.categoryCountThreshold.many) lines -= 1
  if (categories.length > TEXT_CLAMP_CONFIG.categoryCountThreshold.tooMany) lines -= 1

  return Math.max(TEXT_CLAMP_CONFIG.minLines, lines)
}

function filterPosts(posts: Post[], activeTag: FilterTag, searchQuery: string): Post[] {
  const query = searchQuery.toLowerCase()

  return posts.filter((post) => {
    const matchesTag = postMatchesTag(post, activeTag)
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.categories.some((cat) => cat.toLowerCase().includes(query))

    return matchesTag && matchesSearch
  })
}

function paginatePosts(posts: Post[], currentPage: number): Post[] {
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  return posts.slice(startIndex, endIndex)
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Blog post card with responsive sizing
 */
function BlogPostCard({ post, onReadMore }: { post: Post; onReadMore: (id: number) => void }) {
  const textLines = calculateTextLines(post.title, post.categories)

  return (
    <article className="group bg-card text-card-foreground shadow-lg flex flex-col overflow-hidden transition-shadow hover:shadow-xl border border-border h-[400px]">
      <div className="relative w-full h-[170px]">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
        />
      </div>

      <div className="relative p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-2" style={{ minHeight: "24px" }}>
          {post.categories.map((cat, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground/70 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <h2 className="text-[18px] text-foreground font-normal leading-6 mb-2">
          {post.title}
        </h2>

        <div className="flex-1 mb-3">
          <p
            className="text-muted-foreground text-[12px] leading-[18px]"
            title={post.description}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: textLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {post.description}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onReadMore(post.id)}
            className="inline-flex items-center justify-center rounded-none bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
          >
            Read More
          </button>
        </div>
      </div>
    </article>
  )
}

/**
 * Blog grid with animation
 */
function BlogGrid({
  posts,
  animationKey,
  onReadMore,
}: {
  posts: Post[]
  animationKey: string
  onReadMore: (id: number) => void
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={ANIMATION_CONFIG.grid.initial}
        animate={ANIMATION_CONFIG.grid.animate}
        exit={ANIMATION_CONFIG.grid.exit}
        transition={ANIMATION_CONFIG.grid.transition}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 gap-6"
      >
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} onReadMore={onReadMore} />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Blog page with search, filtering, and pagination
 */
export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<FilterTag>("All")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const router = useRouter()

  const filteredPosts = useMemo(
    () => filterPosts(BLOG_POSTS, activeTag, search),
    [activeTag, search],
  )

  const paginatedPosts = useMemo(() => paginatePosts(filteredPosts, page), [filteredPosts, page])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleTagChange = (tag: FilterTag) => {
    setActiveTag(tag)
    setPage(1)
  }

  const handleReadMore = (id: number) => {
    router.push(`/blog/${id}`)
  }

  const animationKey = `${page}-${activeTag}-${search}`

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="pt-6 sm:pt-7 md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-14 pb-12 sm:pb-14 md:pb-16 lg:pb-18 xl:pb-20 2xl:pb-24 bg-background">
          <LandingListHeader
            searchValue={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search articles..."
          />

          <LandingFilterTags
            id="blog-filter"
            tags={BLOG_FILTER_TAGS}
            activeTag={activeTag}
            onTagChange={handleTagChange}
          />

          <BlogGrid posts={paginatedPosts} animationKey={animationKey} onReadMore={handleReadMore} />

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
