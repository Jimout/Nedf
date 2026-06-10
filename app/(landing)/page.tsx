import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Architecture & Interior Design Studio",
  description:
    "NEDF Studio is a fully integrated architecture and interior design firm in Addis Ababa, Ethiopia. Explore our portfolio, services, and studio notes.",
  path: "/",
  image: "/room1.jpg",
})

export default function HomePage() {
  return <HomePageClient />
}
