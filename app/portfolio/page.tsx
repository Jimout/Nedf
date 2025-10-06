"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import { Search } from "lucide-react"
import Pagination from "@/components/Pagination"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { PageTransition } from "@/components/Page-transition"

const projects = [
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

export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState("All")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredProjects = projects.filter((p) => {
    const matchesTag = activeTag === "All" || p.category === activeTag
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchesTag && matchesSearch
  })

  const rowsPerPage = 3
  const projectsPerRow = 4
  const projectsPerPage = rowsPerPage * projectsPerRow
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const paginatedProjects = filteredProjects.slice((page - 1) * projectsPerPage, page * projectsPerPage)
  const imageHeight = 300

  return (
    <PageTransition>
      <div className="overflow-x-hidden">
        <Navbar />

        <div
          className="px-3 sm:px-6 md:px-12 lg:px-20 xl:px-24 2xl:px-32 pt-6 pb-16"
          style={{
            background: "white",
            maskImage:
              "linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%), linear-gradient(to top, transparent 0%, white 8%, white 88%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%), linear-gradient(to top, transparent 0%, white 8%, white 88%)",
            WebkitMaskComposite: "intersect",
          }}
        >
          {/* Search */}
          <div className="relative mb-6 sm:mb-8" id="search">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#001F4B] opacity-40 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-2xl sm:rounded-3xl text-[#001F4B] placeholder-[#001F4B]/40 bg-[#001F4B]/[0.03] transition-all duration-300 ease-in-out
              focus:bg-white focus:border focus:border-[#CBD5E1] focus:text-[#001F4B] focus:placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#001F4B]/10"
            />
          </div>

          {/* Tags */}
          <div className="flex gap-10 sm:gap-12 border-b border-gray-300 mb-8 overflow-x-auto no-scrollbar">
            {["All", "Architecture", "Interior", "Visualization"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag)
                  setPage(1)
                }}
                className={`pb-1 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTag === tag
                    ? "text-[#001F4B] border-b-2 border-[#001F4B]"
                    : "text-gray-500 hover:text-[#001F4B]/60"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid with smooth transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={page + activeTag + search}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {paginatedProjects.map((project, index) => (
                <Link
                  key={`${project.id}-${index}`}
                  href={`/portfolio/${project.id}`}
                  className="relative group cursor-pointer overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-2 will-change-transform active:scale-98"
                  style={{ height: `${imageHeight}px` }}
                >
                  <Image
                    src={project.img || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 25vw"
                    className={`object-cover transition-transform duration-700 ease-out ${
                      windowWidth >= 768 ? "group-hover:scale-105 sm:group-hover:scale-110" : ""
                    }`}
                    priority={index < 6}
                  />

                  {windowWidth >= 768 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                  )}

                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-5 lg:p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-3 sm:translate-y-4 group-hover:translate-y-0">
                    <div className="backdrop-blur-sm bg-white/10 p-2.5 sm:p-3 md:p-4 border border-white/20">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-balance leading-tight">
                        {project.title}
                      </h3>
                      <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 ease-out rounded-sm" />
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6">
            {totalPages > 1 && <Pagination page={page} setPage={setPage} total={totalPages} />}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <p className="text-gray-500 text-sm sm:text-base">No projects found matching your search.</p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}
