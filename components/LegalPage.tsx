"use client"

import { ChevronLeft, Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Subscription from "@/components/Subscription"
import type { LegalSection } from "@/lib/legal-content"

const LEGAL_PAGE_BACK_LABEL = "Back"

interface LegalPageProps {
  title: string
  lastUpdated: string
  sections: LegalSection[]
  backHref: string
}

interface TocItem {
  id: string
  label: string
  number: string
}

export function LegalPage({ title, lastUpdated, sections, backHref }: LegalPageProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id || "")
  const [showMobileTOC, setShowMobileTOC] = useState(false)
  const [tocExpanded, setTocExpanded] = useState(false)

  const toc: TocItem[] = sections.map((section, index) => ({
    id: section.id,
    label: section.title,
    number: `${index + 1}`,
  }))

  useEffect(() => {
    const handleScroll = () => {
      const offset = 150
      let current = toc[0]?.id || ""
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
  }, [toc])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 py-8 sm:py-10 lg:py-12 2xl:py-16 3xl:py-20 4xl:py-24 bg-background">
        <main className="flex-1 flex flex-col gap-6 sm:gap-8 lg:gap-10 2xl:gap-12 3xl:gap-14 4xl:gap-16">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors text-sm sm:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl"
            aria-label={LEGAL_PAGE_BACK_LABEL}
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20" strokeWidth={0.75} />
            <span>{LEGAL_PAGE_BACK_LABEL}</span>
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
            {/* Desktop TOC */}
            <aside className="hidden lg:block lg:w-1/4 h-fit lg:sticky lg:top-10 self-start">
              <div className="bg-primary/5 rounded">
                <div className="bg-primary text-primary-foreground text-center py-3 font-medium rounded-t text-sm sm:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl">
                  Table Of Content
                </div>
                <ul className="divide-y divide-primary/20">
                  {toc.map((item) => {
                    const isActive = activeId === item.id

                    return (
                      <li
                        key={item.id}
                        className={`py-3 text-sm sm:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl cursor-pointer transition-all duration-300 ease-in-out px-4 ${
                          isActive
                            ? "bg-primary/15 border-l-[3px] border-primary font-medium"
                            : "hover:bg-primary/10"
                        }`}
                      >
                        <a
                          href={`#${item.id}`}
                          className="block text-foreground"
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                            setActiveId(item.id)
                          }}
                        >
                          <span className="font-semibold mr-2">{item.number}</span>
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>

            {/* Legal Content */}
            <article className="flex-1 relative">
              {/* Mobile TOC Icon */}
              {showMobileTOC && (
                <div className="lg:hidden fixed left-4 top-4 z-50 flex flex-col items-start">
                  <button
                    className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg w-14 h-14 flex items-center justify-center"
                    onClick={() => setTocExpanded(!tocExpanded)}
                  >
                    <Menu size={24} />
                  </button>

                  <div
                    className={`mt-2 bg-background border rounded shadow-lg w-56 max-h-[70vh] flex flex-col transform origin-top transition-all duration-300 ease-in-out overflow-hidden ${
                      tocExpanded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
                  >
                    <div className="bg-primary text-primary-foreground text-center py-3 font-medium rounded-t text-sm">
                      Table Of Content
                    </div>
                    <ul className="overflow-y-auto flex-1 divide-y divide-primary/20">
                      {toc.map((item) => {
                        const isActive = activeId === item.id

                        return (
                          <li
                            key={item.id}
                            className={`py-3 text-sm cursor-pointer transition-all duration-300 ease-in-out px-4 ${
                              isActive
                                ? "bg-primary/15 border-l-[3px] border-primary font-medium"
                                : "hover:bg-primary/10"
                            }`}
                          >
                            <a
                              href={`#${item.id}`}
                              className="block text-foreground"
                              onClick={(e) => {
                                e.preventDefault()
                                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                                setActiveId(item.id)
                              }}
                            >
                              <span className="font-semibold mr-2">{item.number}</span>
                              {item.label}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )}

              <div className="max-w-3xl w-full lg:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-medium text-foreground mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6">
                  {title}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl mb-8 sm:mb-10 lg:mb-12 2xl:mb-14 3xl:mb-16 4xl:mb-20">
                  Last updated: {lastUpdated}
                </p>

                <div className="space-y-8 sm:space-y-10 lg:space-y-12 2xl:space-y-14 3xl:space-y-16 4xl:space-y-20">
                  {sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24 lg:scroll-mt-32 2xl:scroll-mt-40 3xl:scroll-mt-48 4xl:scroll-mt-56"
                    >
                      <h2 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl font-medium text-foreground mb-3 sm:mb-4 lg:mb-5 2xl:mb-6 3xl:mb-8 4xl:mb-10">
                        {section.title}
                      </h2>
                      <div className="space-y-3 sm:space-y-4 lg:space-y-5 2xl:space-y-6 3xl:space-y-7 4xl:space-y-8">
                        {section.paragraphs.map((para, i) => (
                          <p
                            key={i}
                            className="text-muted-foreground text-sm sm:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl leading-relaxed lg:leading-relaxed 2xl:leading-relaxed 3xl:leading-relaxed 4xl:leading-relaxed"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>

      <Subscription />
    </div>
  )
}
