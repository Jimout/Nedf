"use client"

import type React from "react"

import RelatedBlogs from "@/components/Related-blogs"
import Subscription from "@/components/Subscription"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { RichTextContent } from "@/components/rich-text-content"
import {
  LANDING_LIST_BOTTOM_PADDING,
  LANDING_LIST_TOP_PADDING,
} from "@/lib/constants"
import type { CmsBlogPost } from "@/lib/cms/types"
import { cn } from "@/lib/utils"
import { BlogSubscribeSidebar } from "@/components/BlogSubscribeSidebar"

/** Same scroll-in animation as `app/(landing)/portfolio/[id]/page.tsx` */
const ANIMATION_CONFIG = {
  fadeUp: {
    hidden: { y: 30 },
    visible: { y: 0, transition: { duration: 0.6 } },
  },
} as const

const VIEWPORT_CONFIG = {
  once: true,
  margin: "-100px",
} as const

function AnimatedSection({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={ANIMATION_CONFIG.fadeUp}
    >
      {children}
    </motion.section>
  )
}

const BLOG_DETAIL_GRID =
  "flex flex-col lg:grid lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-10 2xl:grid-cols-[380px_minmax(0,1fr)_380px] 3xl:grid-cols-[400px_minmax(0,1fr)_400px] 4xl:grid-cols-[420px_minmax(0,1fr)_420px]"
const STICKY_TOC_ASIDE = "hidden lg:block"
const STICKY_TOC_INNER = "sticky top-14 z-10"
const STICKY_TOC_PANEL =
  "bg-card border border-border overflow-hidden flex flex-col max-h-[calc(100vh-0.75rem)]"

interface TocItem {
  id: string
  label: string
  number: string
  level: number
}

const toc: TocItem[] = [
  { id: "intro", label: "Introduction", number: "1", level: 1 },
  { id: "step1", label: "Understanding The Client's Vision", number: "1.1", level: 2 },
  { id: "step1-1", label: "Initial Consultation", number: "1.1.1", level: 3 },
  { id: "step1-2", label: "Requirements Gathering", number: "1.1.2", level: 3 },
  { id: "step2", label: "Conceptual Design", number: "2", level: 1 },
  { id: "step2-1", label: "Sketching Phase", number: "2.1", level: 2 },
  { id: "step2-2", label: "Client Feedback", number: "2.2", level: 2 },
  { id: "step3", label: "Material Selection & Sustainability", number: "3", level: 1 },
  { id: "step3-1", label: "Sustainable Materials", number: "3.1", level: 2 },
  { id: "step4", label: "From 3D Models To Construction", number: "4", level: 1 },
  { id: "step5", label: "The Finished Home", number: "5", level: 1 },
  { id: "conclusion", label: "Conclusion", number: "6", level: 1 },
]

interface CmsBlogSection {
  id: string
  title: string
  content: string
  level: number
  number: string
  images?: string[]
}

interface CmsBlog {
  id: string
  title: string
  heroImage: string
  tags: string[]
  sections: CmsBlogSection[]
}

function CmsBlogDetail({ blog }: { blog: CmsBlog }) {
  const [activeId, setActiveId] = useState(blog.sections[0]?.id ?? "")

  const scrollToSection = (sectionId: string) => {
    setActiveId(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <div className={cn("flex-1 bg-background", LANDING_LIST_TOP_PADDING, LANDING_LIST_BOTTOM_PADDING)}>
        <main className="flex-1 flex flex-col relative w-full">
          <div className={BLOG_DETAIL_GRID}>
            <aside className={STICKY_TOC_ASIDE}>
              <div className={STICKY_TOC_INNER}>
                <div className={STICKY_TOC_PANEL}>
                <div className="border-b border-border px-6 py-5 bg-muted shrink-0">
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Table of Contents</h2>
                </div>
                <nav className="p-3 overflow-y-auto flex-1 min-h-0">
                  <ul className="space-y-1">
                    {blog.sections.map((section) => {
                      const isActive = activeId === section.id
                      const paddingLeft = section.level === 1 ? "12px" : section.level === 2 ? "28px" : "44px"
                      return (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(section.id)}
                            className={`flex w-full items-start gap-3 py-2 px-3 text-sm text-left transition-all duration-300 ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                            style={{ paddingLeft }}
                          >
                            <span className="text-xs font-medium mt-0.5 min-w-[32px]">{section.number}</span>
                            <span className="flex-1 leading-relaxed">{section.title}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
                </div>
              </div>
            </aside>

            <article className="flex-1 relative min-w-0">
              <AnimatedSection className="mb-6">
                <div className="w-full h-48 md:h-56 lg:h-64 relative mb-6">
                  <Image
                    src={blog.heroImage || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h1
                  className="mb-6 text-foreground"
                  style={{ fontFamily: "Montserrat", fontWeight: 500, fontSize: "36px" }}
                >
                  {blog.title}
                </h1>
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm border border-border rounded-full font-normal text-foreground"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </AnimatedSection>

              {blog.sections.map((section) => {
                const headingSize = section.level === 1 ? "text-2xl" : section.level === 2 ? "text-xl" : "text-lg"
                const marginTop = section.level === 1 ? "mt-10" : section.level === 2 ? "mt-6" : "mt-4"
                return (
                  <AnimatedSection
                    key={section.id}
                    id={section.id}
                    className={`scroll-mt-24 mb-6 ${marginTop}`}
                  >
                    <h2 className={`${headingSize} font-medium mb-4 text-foreground`} style={{ fontFamily: "Montserrat" }}>
                      <span className="font-semibold mr-2">{section.number}</span>
                      {section.title}
                    </h2>
                    <RichTextContent
                      content={section.content}
                      className="text-foreground/80 text-sm mb-4 leading-7 text-justify"
                      style={{ fontFamily: "Montserrat", fontWeight: 400 }}
                    />
                    {section.images && section.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {section.images.map((image, index) => (
                          <div key={index} className="relative h-48 w-full">
                            <Image
                              src={image}
                              alt={`${section.title} ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </AnimatedSection>
                )
              })}
            </article>

            <BlogSubscribeSidebar />
          </div>
        </main>
      </div>
      <Subscription />
    </div>
  )
}

const allPosts: CmsBlogPost[] = []

function StaticBlogDetailPage({ post }: { post: CmsBlogPost }) {
  const [activeId, setActiveId] = useState("intro")
  const [showMobileTOC, setShowMobileTOC] = useState(false)
  const [tocExpanded, setTocExpanded] = useState(false)
  const isClickScrolling = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return

      const offset = 150
      let current = toc[0].id
      toc.forEach((item) => {
        const section = document.getElementById(item.id)
        if (section) {
          const top = section.getBoundingClientRect().top
          if (top - offset <= 0) {
            current = item.id
          }
        }
      })
      setActiveId(current)

      const article = document.querySelector("article")
      if (article) {
        const top = article.getBoundingClientRect().top
        setShowMobileTOC(top < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    e.preventDefault()

    setActiveId(itemId)

    isClickScrolling.current = true

    const element = document.getElementById(itemId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }

    setTimeout(() => {
      isClickScrolling.current = false
    }, 1000)
  }

  const relatedPosts = allPosts
    .filter((item) => {
      if (item.id === post.id) return false
      return item.categories.some((category) => post.categories.includes(category))
    })
    .slice(0, 3)

  return (
    <div className="relative min-h-screen flex flex-col scroll-smooth">
      <div className={cn("flex-1 bg-background", LANDING_LIST_TOP_PADDING, LANDING_LIST_BOTTOM_PADDING)}>
        <main className="flex-1 flex flex-col relative w-full">
          <div className={BLOG_DETAIL_GRID}>
            <aside className={STICKY_TOC_ASIDE}>
              <div className={STICKY_TOC_INNER}>
                <div className={STICKY_TOC_PANEL}>
                <div className="border-b border-border px-6 py-5 bg-muted shrink-0">
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Table of Contents</h2>
                </div>
                <nav className="p-3 overflow-y-auto flex-1 min-h-0">
                  <ul className="space-y-1">
                    {toc.map((item) => {
                      const isActive = activeId === item.id
                      const paddingLeft = item.level === 1 ? "12px" : item.level === 2 ? "28px" : "44px"

                      return (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`flex items-start gap-3 py-2 px-3 text-sm transition-all duration-300 ease-in-out group ${
                              isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                            style={{ paddingLeft }}
                            onClick={(e) => handleTocClick(e, item.id)}
                          >
                            <span
                              className={`text-xs font-medium mt-0.5 min-w-[32px] transition-colors duration-300 ${
                                isActive ? "text-primary-foreground/80" : "text-muted-foreground group-hover:text-foreground"
                              }`}
                            >
                              {item.number}
                            </span>
                            <span className={`flex-1 leading-relaxed ${isActive ? "font-medium" : "font-normal"}`}>
                              {item.label}
                            </span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
                </div>
              </div>
            </aside>

            {/* Blog Content - top padding on lg so content aligns with TOC */}
            <article className="flex-1 relative min-w-0">
              {showMobileTOC && (
              <div className="lg:hidden fixed left-4 top-4 z-50 flex flex-col items-start">
                <button
                  className="bg-primary text-primary-foreground p-3 shadow-lg w-12 h-12 flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
                  onClick={() => setTocExpanded(!tocExpanded)}
                  aria-label="Toggle table of contents"
                >
                  <Menu size={20} />
                </button>

                <div
                  className={`mt-3 bg-card border border-border shadow-xl w-72 max-h-[70vh] flex flex-col transform origin-top transition-all duration-200 ease-out overflow-hidden ${
                    tocExpanded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                  }`}
                >
                  <div className="border-b border-border px-6 py-5 bg-muted">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Table of Contents</h2>
                  </div>
                  <nav className="overflow-y-auto flex-1 p-3">
                    <ul className="space-y-1">
                      {toc.map((item) => {
                        const isActive = activeId === item.id
                        const paddingLeft = item.level === 1 ? "12px" : item.level === 2 ? "28px" : "44px"

                        return (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={`flex items-start gap-3 py-2 px-3 text-sm transition-all duration-300 ease-in-out ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              style={{ paddingLeft }}
                              onClick={(e) => {
                                handleTocClick(e, item.id)
                                setTocExpanded(false)
                              }}
                            >
                              <span
                                className={`text-xs font-medium mt-0.5 min-w-[32px] transition-colors duration-300 ${
                                  isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                                }`}
                              >
                                {item.number}
                              </span>
                              <span className={`flex-1 leading-relaxed ${isActive ? "font-medium" : "font-normal"}`}>
                                {item.label}
                              </span>
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                </div>
              </div>
            )}

              <AnimatedSection className="mb-6">
                <div className="w-full h-48 md:h-56 lg:h-64 relative mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <h1
                  className="mb-6 text-foreground"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    fontSize: "36px",
                  }}
                >
                  {post.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  {post.categories.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm border border-border rounded-full font-normal text-foreground"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </AnimatedSection>

            {toc.map((item) => {
              const headingSize = item.level === 1 ? "text-2xl" : item.level === 2 ? "text-xl" : "text-lg"
              const marginTop = item.level === 1 ? "mt-10" : item.level === 2 ? "mt-6" : "mt-4"

              return (
                <AnimatedSection
                  key={item.id}
                  id={item.id}
                  className={`scroll-mt-24 mb-6 ${marginTop}`}
                >
                  <h2 className={`${headingSize} font-medium mb-4 text-foreground`} style={{ fontFamily: "Montserrat" }}>
                    <span className="font-semibold mr-2">{item.number}</span>
                    {item.label}
                  </h2>
                  <p
                    className="text-foreground/80 text-sm mb-4 leading-7 text-justify"
                    style={{ fontFamily: "Montserrat", fontWeight: "400" }}
                  >
                    {getSectionContent(item.id, post.description)}
                  </p>
                  {Array.from({ length: 2 }).map((_, idx) => (
                    <p
                      key={idx}
                      className="text-foreground/80 text-sm mb-4 leading-7 text-justify"
                      style={{ fontFamily: "Montserrat", fontWeight: "400" }}
                    >
                      {getSectionContent(item.id, post.description)}
                    </p>
                  ))}
                </AnimatedSection>
              )
            })}

            </article>

            <BlogSubscribeSidebar />
          </div>
        </main>
      </div>

      {relatedPosts.length > 0 && (
        <>
          <div className="py-4 bg-background">
            <hr
              className="border-primary opacity-30 dark:opacity-50"
              style={{
                border: "none",
                borderTop: "1px solid",
              }}
            />
          </div>

          <AnimatedSection className="bg-background py-6 w-full">
            <RelatedBlogs posts={relatedPosts} />
          </AnimatedSection>
        </>
      )}

      <Subscription />
    </div>
  )
}

export default function BlogDetailClient({
  staticPost,
}: {
  blogId: string
  staticPost: CmsBlogPost | null
}) {
  if (!staticPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-sm" style={{ fontFamily: "Montserrat" }}>
          Studio note not found.
        </p>
      </div>
    )
  }

  const blog = {
    id: staticPost.id,
    title: staticPost.title,
    heroImage: staticPost.heroImage,
    tags: staticPost.tags.length > 0 ? staticPost.tags : ["Studio"],
    sections:
      staticPost.sections.length > 0
        ? staticPost.sections
        : [
            {
              id: "intro",
              title: "Introduction",
              content: staticPost.description,
              level: 1,
              number: "1",
            },
          ],
  }

  return <CmsBlogDetail blog={blog} />
}

function getSectionContent(id: string, introText: string) {
  switch (id) {
    case "intro":
      return introText
    case "step1":
      return "The client desired a contemporary home that embraces natural light and open spaces. They emphasized sustainability and a seamless connection between indoor and outdoor areas. Understanding these priorities set the foundation for our design approach."
    case "step1-1":
      return "During the initial consultation, we spent time understanding the client's lifestyle, preferences, and long-term vision for their home. This phase involved detailed discussions about daily routines, entertaining needs, and future family plans."
    case "step1-2":
      return "We documented all functional requirements, spatial needs, and aesthetic preferences. This comprehensive requirements gathering ensured that every design decision would be informed by the client's actual needs rather than assumptions."
    case "step2":
      return "Initial sketches explored spatial layouts, lighting, and functional flow. We presented several concepts emphasizing simplicity, openness, and harmony with the surrounding environment. Feedback from the client guided refinement toward the final conceptual plan."
    case "step2-1":
      return "The sketching phase involved rapid iteration of ideas, exploring different spatial configurations and architectural forms. We created multiple concept sketches to visualize various approaches to the design challenge."
    case "step2-2":
      return "Client feedback sessions were crucial in refining the design direction. Through collaborative discussions, we identified which concepts resonated most strongly and which elements needed further development."
    case "step3":
      return "Materials were chosen for durability, aesthetics, and environmental impact. Sustainable wood, local stone, and energy-efficient glazing were prioritized, ensuring longevity and low environmental footprint without compromising style."
    case "step3-1":
      return "We carefully selected materials that met strict sustainability criteria while maintaining the aesthetic vision. Each material choice was evaluated for its lifecycle impact, sourcing practices, and contribution to the overall design language."
    case "step4":
      return "3D models allowed the client to visualize the final layout and finishes. Adjustments were made based on these visualizations to optimize space, lighting, and material placement. Construction followed precise plans to maintain design integrity."
    case "step5":
      return "The completed home embodies the client's vision, blending modern design with practical living spaces. Natural light floods each room, materials feel warm and sustainable, and every detail reflects careful planning and attention to aesthetics."
    case "conclusion":
      return "From concept to concrete, this project showcases the power of collaboration between client and designer. Thoughtful planning, sustainable materials, and precise execution transform visions into functional, elegant homes."
    default:
      return ""
  }
}
