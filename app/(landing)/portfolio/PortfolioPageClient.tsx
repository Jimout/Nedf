"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Pagination from "@/components/Pagination"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import Subscription from "@/components/Subscription"
import LandingListHeader from "@/components/LandingListHeader"
import LandingFilterTags from "@/components/LandingFilterTags"
import { cn } from "@/lib/utils"
import type { CmsPortfolioCategory, CmsPortfolioProject } from "@/lib/cms/types"

type Project = {
  id: string
  title: string
  categoryId: string
  category: string
  img: string
}

function cmsToListProject(p: CmsPortfolioProject, categories: CmsPortfolioCategory[]): Project {
  return {
    id: p.id,
    title: p.title,
    categoryId: p.categoryId,
    category: categories.find((c) => c.id === p.categoryId)?.label ?? "Project",
    img: p.beforeImage || p.galleryImages[0] || "/placeholder.svg",
  }
}

function filterProjects(
  projects: Project[],
  categories: CmsPortfolioCategory[],
  activeLabel: string,
  searchQuery: string
): Project[] {
  return projects.filter((project) => {
    const category = categories.find((c) => c.id === project.categoryId)
    const matchesTag = activeLabel === "All" || category?.label === activeLabel
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })
}

const PAGINATION_CONFIG = {
  rowsPerPage: 3,
  projectsPerRow: 4,
} as const

const PROJECTS_PER_PAGE = PAGINATION_CONFIG.rowsPerPage * PAGINATION_CONFIG.projectsPerRow

const ANIMATION_CONFIG = {
  grid: {
    initial: { y: 20 },
    animate: { y: 0 },
    exit: { y: -20 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const

function paginateProjects(projects: Project[], currentPage: number): Project[] {
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  return projects.slice(startIndex, endIndex)
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [hoverCapable, setHoverCapable] = useState<boolean | null>(null)

  useEffect(() => {
    setHoverCapable(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  const showOverlay = hoverCapable === null ? false : hoverCapable ? hovered : true

  return (
    <Link
      href={`/portfolio/${project.id}`}
      className={cn(
        "relative block cursor-pointer overflow-hidden transition-all duration-700 ease-out will-change-transform active:scale-[0.98]",
        "h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] 2xl:h-[360px]",
        hovered && hoverCapable === true && "-translate-y-2",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Image
        src={project.img || "/placeholder.svg"}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 25vw"
        className={cn(
          "object-cover transition-transform duration-700 ease-out",
          hovered && hoverCapable === true && "scale-105 lg:scale-110",
        )}
        priority={index < 6}
      />

      <div
        className={cn(
          "absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-opacity duration-500 ease-out pointer-events-none",
          showOverlay ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "absolute inset-0 z-20 flex flex-col justify-end p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5 2xl:p-6 text-primary-foreground pointer-events-none transition-all duration-500 ease-out",
          showOverlay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        )}
      >
        <div className="backdrop-blur-sm bg-primary-foreground/10 p-2 sm:p-2 md:p-2.5 lg:p-3 xl:p-4 2xl:p-4 border border-primary-foreground/20">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold mb-1 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-2 2xl:mb-2 text-balance leading-tight">
            {project.title}
          </h3>
          <span className="inline-block px-2 sm:px-2 md:px-2.5 lg:px-3 xl:px-3 2xl:px-4 py-0.5 sm:py-0.5 md:py-0.5 lg:py-1 xl:py-1 2xl:py-1 bg-primary-foreground/20 rounded-full text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-sm font-medium backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0 z-30 border border-transparent transition-all duration-500 ease-out rounded-sm pointer-events-none",
          showOverlay && hoverCapable === true && "border-primary-foreground/20",
        )}
      />
    </Link>
  )
}

function ProjectGrid({
  projects,
  animationKey,
}: {
  projects: Project[]
  animationKey: string
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-5 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-6"
        initial={ANIMATION_CONFIG.grid.initial}
        animate={ANIMATION_CONFIG.grid.animate}
        exit={ANIMATION_CONFIG.grid.exit}
        transition={ANIMATION_CONFIG.grid.transition}
      >
        {projects.map((project, index) => (
          <ProjectCard key={`${project.id}-${index}`} project={project} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24">
      <p className="text-muted-foreground text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg">
        No projects found matching your search.
      </p>
    </div>
  )
}

const VALID_FILTER_TAGS: string[] = ["All"]

export default function PortfolioPageClient({
  projects: cmsProjects,
  categories,
}: {
  projects: CmsPortfolioProject[]
  categories: CmsPortfolioCategory[]
}) {
  const projects = useMemo(
    () => cmsProjects.map((p) => cmsToListProject(p, categories)),
    [cmsProjects, categories],
  )
  const filterTags = useMemo(() => {
    const labels = categories
      .filter((c) => c.isActive && projects.some((p) => p.categoryId === c.id))
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((c) => c.label)
    return ["All", ...labels]
  }, [categories, projects])

  const searchParams = useSearchParams()
  const [activeTag, setActiveTag] = useState("All")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const filter = searchParams.get("filter")
    if (filter && filterTags.includes(filter)) {
      setActiveTag(filter)
      setPage(1)
      document.getElementById("portfolio-filter")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [searchParams, filterTags])

  const filteredProjects = useMemo(
    () => filterProjects(projects, categories, activeTag, search),
    [projects, categories, activeTag, search]
  )

  const paginatedProjects = useMemo(
    () => paginateProjects(filteredProjects, page),
    [filteredProjects, page]
  )

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)

  const handleTagChange = (tag: string) => {
    setActiveTag(tag)
    setPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const animationKey = `${page}-${activeTag}-${search}`

  return (
    <>
      <div>
        <div className="pt-6 sm:pt-7 md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-14 pb-12 sm:pb-14 md:pb-16 lg:pb-18 xl:pb-20 2xl:pb-24 bg-background">
          <LandingListHeader
            searchValue={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search projects..."
          />

          <LandingFilterTags
            id="portfolio-filter"
            tags={filterTags}
            activeTag={activeTag}
            onTagChange={handleTagChange}
          />

          <ProjectGrid projects={paginatedProjects} animationKey={animationKey} />

          {paginatedProjects.length > 0 && (
            <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 2xl:mt-12">
              {totalPages > 1 && <Pagination page={page} setPage={setPage} total={totalPages} />}
            </div>
          )}

          {filteredProjects.length === 0 && <EmptyState />}
        </div>
      </div>
      <Subscription />
    </>
  )
}

