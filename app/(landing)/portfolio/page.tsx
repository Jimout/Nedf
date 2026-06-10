import { Suspense } from "react"
import PortfolioPageClient from "./PortfolioPageClient"
import { getActivePortfolioCategories, getPublishedPortfolio } from "@/lib/cms/store"

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    getPublishedPortfolio(),
    getActivePortfolioCategories(),
  ])

  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-muted-foreground">Loading portfolio...</div>}>
      <PortfolioPageClient projects={projects} categories={categories} />
    </Suspense>
  )
}
