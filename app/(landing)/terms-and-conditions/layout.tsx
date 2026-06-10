import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Terms and Conditions",
  description: "Terms and conditions for using the NEDF Studio website and services.",
  path: "/terms-and-conditions",
})

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
