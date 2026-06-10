import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with NEDF Studio in Addis Ababa, Ethiopia. Contact us for architecture, interior design, and visualization projects.",
  path: "/contact",
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
