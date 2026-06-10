import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Meet the NEDF Studio team and founders. Learn how we work, our design philosophy, and what drives our architecture practice in Addis Ababa.",
  path: "/about",
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
