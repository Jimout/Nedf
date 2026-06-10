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
import type { CmsPortfolioCategory, CmsPortfolioProject } from "@/lib/cms/types"

type Project = {
  id: string
  title: string
  categoryId: string
  img: string
}

function cmsToListProject(p: CmsPortfolioProject): Project {
  return {
    id: p.id,
    title: p.title,
    categoryId: p.categoryId,
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

const RESPONSIVE_BREAKPOINT_MD = 768

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

      <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5 2xl:p-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 sm:translate-y-2 md:translate-y-3 lg:translate-y-3 xl:translate-y-4 2xl:translate-y-4 group-hover:translate-y-0">
        <div className="backdrop-blur-sm bg-primary-foreground/10 p-2 sm:p-2 md:p-2.5 lg:p-3 xl:p-4 2xl:p-4 border border-primary-foreground/20">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold mb-1 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-2 2xl:mb-2 text-balance leading-tight">
            {project.title}
          </h3>
          <span className="inline-block px-2 sm:px-2 md:px-2.5 lg:px-3 xl:px-3 2xl:px-4 py-0.5 sm:py-0.5 md:py-0.5 lg:py-1 xl:py-1 2xl:py-1 bg-primary-foreground/20 rounded-full text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-sm font-medium backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 border border-transparent group-hover:border-primary-foreground/20 transition-all duration-500 ease-out rounded-sm" />
    </Link>
  )
}

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
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-5 gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-6"
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
  const projects = useMemo(() => cmsProjects.map(cmsToListProject), [cmsProjects])
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
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const filter = searchParams.get("filter")
    if (filter && filterTags.includes(filter)) {
      setActiveTag(filter)
      setPage(1)
      document.getElementById("portfolio-filter")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [searchParams, filterTags])

  useEffect(() => {
    const checkIfDesktop = () => setIsDesktop(window.innerWidth >= RESPONSIVE_BREAKPOINT_MD)
    checkIfDesktop()

    window.addEventListener("resize", checkIfDesktop)
    return () => window.removeEventListener("resize", checkIfDesktop)
  }, [])

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
      <div className="overflow-x-hidden">
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

          <ProjectGrid projects={paginatedProjects} animationKey={animationKey} isDesktop={isDesktop} />

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

