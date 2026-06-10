import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Studio Notes",
  description:
    "Read NEDF Studio notes on architecture, interior design, materials, and studio life. Insights from our design practice in Addis Ababa.",
  path: "/blog",
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
