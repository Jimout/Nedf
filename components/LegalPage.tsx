"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Subscription from "@/components/Subscription"
import type { LegalSection } from "@/lib/legal-content"

const LEGAL_PAGE_BACK_LABEL = "Back"

interface LegalPageProps {
  title: string
  lastUpdated: string
  sections: LegalSection[]
  backHref: string
}

export function LegalPage({ title, lastUpdated, sections, backHref }: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 py-8 sm:py-10 lg:py-12 bg-background">
        <main className="flex-1 flex flex-col gap-6 sm:gap-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors text-sm sm:text-base"
            aria-label={LEGAL_PAGE_BACK_LABEL}
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={0.75} />
            <span>{LEGAL_PAGE_BACK_LABEL}</span>
          </Link>

          <article className="max-w-3xl w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-10">
              Last updated: {lastUpdated}
            </p>

            <div className="space-y-8 sm:space-y-10">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  <h2 className="text-lg sm:text-xl font-medium text-foreground mb-3 sm:mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </main>
      </div>

      <Subscription />
    </div>
  )
}
