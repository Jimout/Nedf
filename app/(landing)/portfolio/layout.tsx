import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Browse NEDF Studio portfolio projects in architecture, interior design, and visualization across Addis Ababa and Ethiopia.",
  path: "/portfolio",
  image: "/room2.jpg",
})

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
