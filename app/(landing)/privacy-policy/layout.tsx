import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for NEDF Studio website and services.",
  path: "/privacy-policy",
})

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
