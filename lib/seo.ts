import type { Metadata } from "next"
import { CONTACT_INFO } from "@/lib/constants"

export const SITE_NAME = "NEDF Studio"
export const SITE_DESCRIPTION =
  "We are a fully integrated design firm based in Addis Ababa, Ethiopia. We craft perfection through every line and form."

const DEFAULT_OG_IMAGE = "/room1.jpg"

/** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://nedfstudio.com) */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (envUrl) return envUrl.replace(/\/$/, "")
  return "https://nedfstudio.com"
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${getSiteUrl()}${normalized}`
}

export function absoluteImageUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return absoluteUrl(path)
}

type PageMetadataInput = {
  title: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteImageUrl(image)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

export function createArticleMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteImageUrl(image)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
  }
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    areaServed: "Ethiopia",
    sameAs: [],
  }
}

export function getArticleJsonLd({
  title,
  description,
  path,
  image,
}: {
  title: string
  description: string
  path: string
  image: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    image: absoluteImageUrl(image),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  }
}

export function getCreativeWorkJsonLd({
  title,
  description,
  path,
  image,
}: {
  title: string
  description: string
  path: string
  image: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: absoluteUrl(path),
    image: absoluteImageUrl(image),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  }
}

export const PUBLIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" as const },
]
