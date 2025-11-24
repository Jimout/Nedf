"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import Pagination from "@/components/Pagination"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { PageTransition } from "@/components/Page-transition"

// ============================================================================
// TYPES
// ============================================================================

type ProjectCategory = "Architecture" | "Interior" | "Visualization"

interface Project {
  id: string
  title: string
  category: ProjectCategory
  img: string
}

type FilterTag = "All" | ProjectCategory

// ============================================================================
// CONSTANTS
// ============================================================================

const PROJECTS_DATA: Project[] = [
  { id: "p1", title: "Modern Loft Design", category: "Architecture", img: "/room1.jpg" },
  { id: "p2", title: "Minimalist Living Space", category: "Interior", img: "/room2.jpg" },
  { id: "p3", title: "Urban Apartment Render", category: "Visualization", img: "/room3.jpg" },
  { id: "p4", title: "Contemporary Office", category: "Architecture", img: "/interior1.jpg" },
  { id: "p5", title: "Scandinavian Kitchen", category: "Interior", img: "/interior2.jpg" },
  { id: "p6", title: "Luxury Bathroom", category: "Visualization", img: "/interior3.jpg" },
  { id: "p7", title: "Glass House Concept", category: "Architecture", img: "/visual1.jpg" },
  { id: "p8", title: "Cozy Bedroom Suite", category: "Interior", img: "/visual2.jpg" },
  { id: "p9", title: "Restaurant Visualization", category: "Visualization", img: "/visual3.jpg" },
  { id: "p10", title: "Modern Loft Design", category: "Architecture", img: "/room1.jpg" },
  { id: "p11", title: "Minimalist Living Space", category: "Interior", img: "/room2.jpg" },
  { id: "p12", title: "Urban Apartment Render", category: "Visualization", img: "/room3.jpg" },
  { id: "p13", title: "Contemporary Office", category: "Architecture", img: "/interior1.jpg" },
  { id: "p14", title: "Scandinavian Kitchen", category: "Interior", img: "/interior2.jpg" },
  { id: "p15", title: "Luxury Bathroom", category: "Visualization", img: "/interior3.jpg" },
  { id: "p16", title: "Glass House Concept", category: "Architecture", img: "/visual1.jpg" },
  { id: "p17", title: "Cozy Bedroom Suite", category: "Interior", img: "/visual2.jpg" },
  { id: "p18", title: "Restaurant Visualization", category: "Visualization", img: "/visual3.jpg" },
]

const FILTER_TAGS: FilterTag[] = ["All", "Architecture", "Interior", "Visualization"]

const PAGINATION_CONFIG = {
  rowsPerPage: 3,
  projectsPerRow: 4,
} as const

const PROJECTS_PER_PAGE = PAGINATION_CONFIG.rowsPerPage * PAGINATION_CONFIG.projectsPerRow

const RESPONSIVE_BREAKPOINT_MD = 768

const ANIMATION_CONFIG = {
  grid: {
    initial: { y: 20 },
    animate: { y: 0 },
    exit: { y: -20 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function filterProjects(projects: Project[], activeTag: FilterTag, searchQuery: string): Project[] {
  return projects.filter((project) => {
    const matchesTag = activeTag === "All" || project.category === activeTag
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })
}

function paginateProjects(projects: Project[], currentPage: number): Project[] {
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  return projects.slice(startIndex, endIndex)
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Search input with icon
 */
function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-12" id="search">
      <Search className="absolute left-3 sm:left-3 md:left-4 lg:left-4 xl:left-4 2xl:left-5 top-1/2 -translate-y-1/2 text-[#001F4B] dark:text-[#ec1e24] opacity-40 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
      <input
        type="text"
        placeholder="Search projects..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 sm:pl-10 md:pl-12 lg:pl-12 xl:pl-12 2xl:pl-14 pr-4 sm:pr-4 md:pr-5 lg:pr-5 xl:pr-6 2xl:pr-6 py-2.5 sm:py-2.5 md:py-3 lg:py-3 xl:py-3.5 2xl:py-4 text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg rounded-2xl sm:rounded-2xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl 2xl:rounded-3xl text-[#001F4B] dark:text-white/60 placeholder-[#001F4B]/40 dark:placeholder-white/60 bg-[#001F4B]/[0.03] dark:bg-white/5 transition-all duration-300 ease-in-out
        focus:bg-white dark:focus:bg-white/10 focus:border focus:border-[#CBD5E1] dark:focus:border-[#ec1e24]/20 focus:text-[#001F4B] dark:focus:text-white/60 focus:placeholder-[#94A3B8] dark:focus:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#001F4B]/10 dark:focus:ring-[#ec1e24]/20"
      />
    </div>
  )
}

/**
 * Filter tags for project categories
 */
function FilterTags({
  tags,
  activeTag,
  onTagChange,
}: {
  tags: FilterTag[]
  activeTag: FilterTag
  onTagChange: (tag: FilterTag) => void
}) {
  return (
    <div className="flex gap-8 sm:gap-9 md:gap-10 lg:gap-11 xl:gap-12 2xl:gap-14 border-b border-gray-300 dark:border-white/20 mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-12 overflow-x-auto no-scrollbar">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`pb-1 sm:pb-1 md:pb-1.5 lg:pb-1.5 xl:pb-2 2xl:pb-2 text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium whitespace-nowrap transition-all duration-300 ${
            activeTag === tag
              ? "text-[#001F4B] dark:text-[#ec1e24] border-b-2 border-[#001F4B] dark:border-[#ec1e24]/80"
              : "text-gray-500 dark:text-white/80 hover:text-[#001F4B]/60 dark:hover:text-[#ec1e24]/60"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

/**
 * Individual project card with hover effects
 */
function ProjectCard({ project, index, isDesktop }: { project: Project; index: number; isDesktop: boolean }) {
  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="relative group cursor-pointer overflow-hidden transition-all duration-700 ease-out transform hover:-translate-y-2 will-change-transform active:scale-98 h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] 2xl:h-[360px]"
    >
      <Image
        src={project.img || "/placeholder.svg"}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 25vw"
        className={`object-cover transition-transform duration-700 ease-out ${
          isDesktop ? "group-hover:scale-105 md:group-hover:scale-110" : ""
        }`}
        priority={index < 6}
      />

      {isDesktop && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
      )}

      {/* Dark mode overlay */}
      <div className="absolute inset-0 bg-[#15171a]/20 opacity-0 dark:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5 2xl:p-6 text-white dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 sm:translate-y-2 md:translate-y-3 lg:translate-y-3 xl:translate-y-4 2xl:translate-y-4 group-hover:translate-y-0">
        <div className="backdrop-blur-sm bg-white/10 dark:bg-white/10 p-2 sm:p-2 md:p-2.5 lg:p-3 xl:p-4 2xl:p-4 border border-white/20 dark:border-white/20">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold mb-1 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-2 2xl:mb-2 text-balance leading-tight">
            {project.title}
          </h3>
          <span className="inline-block px-2 sm:px-2 md:px-2.5 lg:px-3 xl:px-3 2xl:px-4 py-0.5 sm:py-0.5 md:py-0.5 lg:py-1 xl:py-1 2xl:py-1 bg-white/20 dark:bg-white/20 rounded-full text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-sm font-medium backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 dark:group-hover:border-white/20 transition-all duration-500 ease-out rounded-sm" />
    </Link>
  )
}

/**
 * Grid of project cards with animation
 */
function ProjectGrid({
  projects,
  animationKey,
  isDesktop,
}: {
  projects: Project[]
  animationKey: string
  isDesktop: boolean
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-6"
        initial={ANIMATION_CONFIG.grid.initial}
        animate={ANIMATION_CONFIG.grid.animate}
        exit={ANIMATION_CONFIG.grid.exit}
        transition={ANIMATION_CONFIG.grid.transition}
      >
        {projects.map((project, index) => (
          <ProjectCard key={`${project.id}-${index}`} project={project} index={index} isDesktop={isDesktop} />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Empty state when no projects match filters
 */
function EmptyState() {
  return (
    <div className="text-center py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24">
      <p className="text-gray-500 dark:text-white/80 text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg">
        No projects found matching your search.
      </p>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Portfolio page with filterable project grid
 */
export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState<FilterTag>("All")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIfDesktop = () => setIsDesktop(window.innerWidth >= RESPONSIVE_BREAKPOINT_MD)
    checkIfDesktop()

    window.addEventListener("resize", checkIfDesktop)
    return () => window.removeEventListener("resize", checkIfDesktop)
  }, [])

  const filteredProjects = useMemo(
    () => filterProjects(PROJECTS_DATA, activeTag, search),
    [activeTag, search]
  )

  const paginatedProjects = useMemo(
    () => paginateProjects(filteredProjects, page),
    [filteredProjects, page]
  )

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)

  const handleTagChange = (tag: FilterTag) => {
    setActiveTag(tag)
    setPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const animationKey = `${page}-${activeTag}-${search}`

  return (
    <PageTransition>
      <div className="overflow-x-hidden">
        <div className="pt-6 sm:pt-7 md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-14 pb-12 sm:pb-14 md:pb-16 lg:pb-18 xl:pb-20 2xl:pb-24 bg-white dark:bg-[#15171a]">
          <SearchBar value={search} onChange={handleSearchChange} />

          <FilterTags tags={FILTER_TAGS} activeTag={activeTag} onTagChange={handleTagChange} />

          <ProjectGrid projects={paginatedProjects} animationKey={animationKey} isDesktop={isDesktop} />

          {paginatedProjects.length > 0 && (
            <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 2xl:mt-12">
              {totalPages > 1 && <Pagination page={page} setPage={setPage} total={totalPages} />}
            </div>
          )}

          {filteredProjects.length === 0 && <EmptyState />}
        </div>
      </div>
    </PageTransition>
  )
}
