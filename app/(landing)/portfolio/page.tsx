import { Suspense } from "react"
import PortfolioPageClient from "./PortfolioPageClient"

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-gray-500 dark:text-white/70">Loading portfolio...</div>}>
      <PortfolioPageClient />
    </Suspense>
  )
}

