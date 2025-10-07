"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Footer from "@/components/Footer"
import { Menu } from "lucide-react"
import RelatedBlogs from "@/components/Related-blogs"

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

const currentBlogTags = ["Case File", "Architecture"]

const allPosts = [
  {
    id: 0,
    image: "/interior1.jpg",
    categories: ["Case File", "Architecture"],
    title: "From Concept To Concrete",
    description:
      "We Take You Through The Design Journey Of A Modern Home We Recently Completed In Addis Ababa From Rough Initial Sketches To Polished Renders To Final Construction.",
  },
  {
    id: 1,
    image: "/interior2.jpg",
    categories: ["Materials", "Design Thinking", "Interior Design"],
    title: "Why Clay Still Wins",
    description:
      "Clay Isn't Just A Material It's A Philosophy. In This Note, We Reflect On Why Traditional Materials Continue To Outperform Modern Alternatives.",
  },
  {
    id: 2,
    image: "/interior3.jpg",
    categories: ["Studio Life", "Behind The Scenes"],
    title: "Studio Mornings: What Fuels Our Process",
    description:
      "Every Monday At NEDF Starts With Music, Coffee, And Creative Chaos. We Give You A Glimpse Into Our Daily Rituals And The Small Moments That Spark Big Ideas.",
  },
  {
    id: 3,
    image: "/room3.jpg",
    categories: ["Design", "Architecture"],
    title: "The Power Of Simplicity",
    description:
      "Design Isn't Always About More. Sometimes It's About Less Done Right. We explore the principles of minimalist design and how restraint can create more impactful spaces.",
  },
  {
    id: 4,
    image: "/room2.jpg",
    categories: ["Tech", "AI", "Architecture"],
    title: "Using AI in Architecture",
    description:
      "How Artificial Intelligence is shaping how we plan, visualize, and build in the 21st century. From generative design to predictive modeling.",
  },
  {
    id: 5,
    image: "/visual2.jpg",
    categories: ["Case File", "Sustainability"],
    title: "Green Building Practices",
    description:
      "Exploring sustainable architecture practices that reduce environmental impact while creating beautiful, functional spaces for modern living.",
  },
]

export default function BlogDetailPage() {
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
    .filter((post) => {
      if (post.id === 0) return false
      return post.categories.some((category) => currentBlogTags.includes(category))
    })
    .slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-10 md:px-[122px] pt-8">
        <Link href="/blog">
          <button
            className="flex items-center text-[#001f4b] hover:text-black mb-6 transition-colors"
            aria-label="Back to Blog"
          >
            <span className="text-4xl">←</span>
          </button>
        </Link>
      </div>

      <div
        className="flex-1 px-10 md:px-[122px] py-8"
        style={{
          background: "white",
          maskImage:
            "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 0%, white 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 0%, white 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "intersect",
        }}
      >
        <main className="flex-1 flex flex-col lg:flex-row gap-10 relative">
          <aside className="hidden lg:block lg:w-1/4 h-fit lg:sticky lg:top-10 self-start">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-5 bg-gray-50">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Table of Contents</h2>
              </div>
              <nav className="p-3">
                <ul className="space-y-1">
                  {toc.map((item) => {
                    const isActive = activeId === item.id
                    const paddingLeft = item.level === 1 ? "12px" : item.level === 2 ? "28px" : "44px"

                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`flex items-start gap-3 py-2 px-3 rounded-md text-sm transition-all duration-300 ease-in-out group ${
                            isActive ? "bg-[#001F4B] text-white" : "text-gray-700 hover:bg-gray-50 hover:text-[#001F4B]"
                          }`}
                          style={{ paddingLeft }}
                          onClick={(e) => handleTocClick(e, item.id)}
                        >
                          <span
                            className={`text-xs font-medium mt-0.5 min-w-[32px] transition-colors duration-300 ${
                              isActive ? "text-white/80" : "text-gray-400 group-hover:text-[#001F4B]"
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
          </aside>

          {/* Blog Content */}
          <article className="flex-1 relative">
            {showMobileTOC && (
              <div className="lg:hidden fixed left-4 top-4 z-50 flex flex-col items-start">
                <button
                  className="bg-[#001F4B] text-white p-3 rounded-lg shadow-lg w-12 h-12 flex items-center justify-center hover:bg-[#003875] transition-colors duration-200"
                  onClick={() => setTocExpanded(!tocExpanded)}
                  aria-label="Toggle table of contents"
                >
                  <Menu size={20} />
                </button>

                <div
                  className={`mt-3 bg-white border border-gray-200 rounded-lg shadow-xl w-72 max-h-[70vh] flex flex-col transform origin-top transition-all duration-200 ease-out overflow-hidden ${
                    tocExpanded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                  }`}
                >
                  <div className="border-b border-gray-200 px-6 py-5 bg-gray-50">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Table of Contents</h2>
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
                              className={`flex items-start gap-3 py-2 px-3 rounded-md text-sm transition-all duration-300 ease-in-out ${
                                isActive
                                  ? "bg-[#001F4B] text-white"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-[#001F4B]"
                              }`}
                              style={{ paddingLeft }}
                              onClick={(e) => {
                                handleTocClick(e, item.id)
                                setTocExpanded(false)
                              }}
                            >
                              <span
                                className={`text-xs font-medium mt-0.5 min-w-[32px] transition-colors duration-300 ${
                                  isActive ? "text-white/80" : "text-gray-400"
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

            <div className="w-full h-48 md:h-56 lg:h-64 relative mb-6">
              <Image
                src="/room1.jpg"
                alt="From Concept To Concrete"
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1
              className="mb-6"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                color: "#001F4B",
                fontSize: "36px",
              }}
            >
              From Concept To Concrete
            </h1>

            <div className="flex gap-2 mb-8">
              {currentBlogTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm border border-gray-400 rounded-full font-normal text-[#333333]"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {toc.map((item) => {
              const headingSize = item.level === 1 ? "text-2xl" : item.level === 2 ? "text-xl" : "text-lg"
              const marginTop = item.level === 1 ? "mt-10" : item.level === 2 ? "mt-6" : "mt-4"

              return (
                <section key={item.id} id={item.id} className={`scroll-mt-24 mb-6 ${marginTop}`}>
                  <h2 className={`${headingSize} font-medium mb-4 text-[#333333]`} style={{ fontFamily: "Montserrat" }}>
                    <span className="font-semibold mr-2">{item.number}</span>
                    {item.label}
                  </h2>
                  <p
                    className="text-[#333333] text-sm mb-4 leading-7 text-justify"
                    style={{ fontFamily: "Montserrat", fontWeight: "400" }}
                  >
                    {getSectionContent(item.id)}
                  </p>
                  {Array.from({ length: 2 }).map((_, idx) => (
                    <p
                      key={idx}
                      className="text-[#333333] text-sm mb-4 leading-7 text-justify"
                      style={{ fontFamily: "Montserrat", fontWeight: "400" }}
                    >
                      {getSectionContent(item.id)}
                    </p>
                  ))}
                </section>
              )
            })}
          </article>
        </main>
      </div>

      {relatedPosts.length > 0 && (
        <>
          <div
            className="px-10 md:px-[122px] py-4"
            style={{
              background: "white",
              maskImage:
                "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 0%, white 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 0%, white 100%)",
            }}
          >
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #001F4B",
                opacity: 0.3,
              }}
            />
          </div>

          <section
            className="bg-white py-6 px-10 md:px-[122px]"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 0%, white 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%), linear-gradient(to top, transparent 0%, white 0%, white 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "intersect",
            }}
          >
            <RelatedBlogs posts={relatedPosts} />
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}

function getSectionContent(id: string) {
  switch (id) {
    case "intro":
      return "Designing a home is a journey from vision to reality. This case study highlights how NEDF Studio transforms client dreams into modern, functional living spaces while respecting context, sustainability, and material quality."
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
