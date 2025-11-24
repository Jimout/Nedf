"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Pagination from "@/components/Pagination"
import { Button } from "@/components/ui/button"

// ============================================================================
// TYPES
// ============================================================================

interface Post {
  id: number
  image: string
  categories: string[]
  title: string
  description: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

const BLOG_POSTS: Post[] = [
  {
    id: 1,
    image: "/room1.jpg",
    categories: ["Case File", "Architecture"],
    title: "From Concept To Concrete",
    description:
      "We Take You Through The Design Journey Of A Modern Home We Recently Completed In Addis Ababa From Rough Initial Sketches To Polished Renders To Final Construction. This comprehensive case study explores every detail of our creative process and the challenges we overcame.",
  },
  {
    id: 2,
    image: "/room2.jpg",
    categories: ["Materials", "Design Thinking", "Interior Design"],
    title: "Why Clay Still Wins",
    description:
      "Clay Isn't Just A Material It's A Philosophy. In This Note, We Reflect On Why Traditional Materials Continue To Outperform Modern Alternatives In Both Sustainability And Aesthetic Appeal.",
  },
  {
    id: 3,
    image: "/interior1.jpg",
    categories: ["Studio Life", "Behind The Scenes"],
    title: "Studio Mornings: What Fuels Our Process",
    description:
      "Every Monday At NEDF Starts With Music, Coffee, And Creative Chaos. We Give You A Glimpse Into Our Daily Rituals And The Small Moments That Spark Big Ideas.",
  },
  {
    id: 4,
    image: "/interior2.jpg",
    categories: ["Design"],
    title: "The Power Of Simplicity",
    description:
      "Design Isn't Always About More. Sometimes It's About Less Done Right. We explore the principles of minimalist design and how restraint can create more impactful spaces.",
  },
  {
    id: 5,
    image: "/interior3.jpg",
    categories: ["Tech", "AI"],
    title: "Using AI in Architecture",
    description:
      "How Artificial Intelligence is shaping how we plan, visualize, and build in the 21st century. From generative design to predictive modeling, we examine the tools that are revolutionizing our industry.",
  },
  {
    id: 6,
    image: "/visual1.jpg",
    categories: ["Interior", "Design"],
    title: "Modern Minimalism",
    description:
      "Minimalist spaces are more than aesthetics; they are philosophy. We explore how to create spaces that breathe and inspire through thoughtful reduction and careful curation.",
  },
  {
    id: 7,
    image: "/visual1.jpg",
    categories: ["Studio Life", "Workflow"],
    title: "Workflow Optimization",
    description:
      "Tips on how to streamline your creative process and maintain productivity while preserving the spark of innovation.",
  },
  {
    id: 8,
    image: "/visual3.jpg",
    categories: ["Design", "Materials"],
    title: "Material Innovation",
    description:
      "Exploring new materials for sustainable interiors that don't compromise on beauty or functionality.",
  },
]

const POSTS_PER_PAGE = 6

const ANIMATION_CONFIG = {
  grid: {
    initial: { x: 50 },
    animate: { x: 0 },
    exit: { x: -50 },
    transition: { duration: 0.3 },
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

function filterPosts(posts: Post[], searchQuery: string): Post[] {
  if (!searchQuery) return posts

  const query = searchQuery.toLowerCase()

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.categories.some((cat) => cat.toLowerCase().includes(query))
  )
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
 * Search bar with responsive sizing
 */
function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex w-full max-w-md">
        <input
          type="text"
          placeholder="Search articles..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-[#15171a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] transition-all"
        />
        <button className="px-4 py-2 bg-[#001F4B] dark:bg-[#ec1e24] text-white hover:bg-[#003366] dark:hover:bg-[#d11920] transition-colors whitespace-nowrap">
          Search
        </button>
      </div>
    </div>
  )
}

/**
 * Blog post card with responsive sizing
 */
function BlogPostCard({ post, onReadMore }: { post: Post; onReadMore: (id: number) => void }) {
  const textLines = calculateTextLines(post.title, post.categories)

  return (
    <article className="group bg-white dark:bg-[#15171a] shadow-lg shadow-[#001F4B]/10 dark:shadow-[#ec1e24]/20 flex flex-col overflow-hidden transition-shadow hover:shadow-xl hover:shadow-[#001F4B]/20 dark:hover:shadow-[#ec1e24]/30 border border-[rgba(0,31,75,0.1)] dark:border-transparent h-[400px]">
      <div className="relative w-full h-[170px]">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
        />
        <div className="absolute inset-0 bg-[#15171a] opacity-0 dark:opacity-30 transition-all duration-300" />
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

        <h2 className="text-[18px] text-[#333333] dark:text-white font-regular leading-6 mb-2">
          {post.title}
        </h2>

        <div className="flex-1 mb-3">
          <p
            className="text-[#333333]/60 dark:text-white/60 text-[12px] leading-[18px]"
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
          <Button
            onClick={() => onReadMore(post.id)}
            className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#003366] dark:hover:bg-[#ec1e24]/80 text-white text-xs px-3 py-2"
          >
            Read More
          </Button>
        </div>
      </div>
    </article>
  )
}

/**
 * Blog grid with animation
 */
function BlogGrid({ posts, animationKey, onReadMore }: { posts: Post[]; animationKey: number; onReadMore: (id: number) => void }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={ANIMATION_CONFIG.grid.initial}
        animate={ANIMATION_CONFIG.grid.animate}
        exit={ANIMATION_CONFIG.grid.exit}
        transition={ANIMATION_CONFIG.grid.transition}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const router = useRouter()

  const filteredPosts = useMemo(() => filterPosts(BLOG_POSTS, search), [search])

  const paginatedPosts = useMemo(() => paginatePosts(filteredPosts, page), [filteredPosts, page])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleReadMore = (id: number) => {
    router.push(`/blog/${id}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#15171a]">
      {/* Header + Search */}
      <section className="w-full pt-12 pb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#001F4B] dark:text-white mb-6">
          Our Blog: Stories & Insights
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">
          Discover design thinking, project stories, and ideas shaping architecture & interior design.
        </p>

        <SearchBar value={search} onChange={handleSearchChange} />
      </section>

      {/* Blog Grid */}
      <section className="w-full pb-8">
        <BlogGrid posts={paginatedPosts} animationKey={page} onReadMore={handleReadMore} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-end">
            <Pagination page={page} setPage={setPage} total={totalPages} />
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-white/80 text-sm sm:text-base">
              No articles found matching your search.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
