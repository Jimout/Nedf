import type { Metadata } from "next"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants"

export const SITE_NAME = "NEDF Studio"
export const SITE_DESCRIPTION =
  "We are a fully integrated design firm based in Addis Ababa, Ethiopia. We craft perfection through every line and form."

export const DEFAULT_OG_IMAGE = "/room1.jpg"

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

function getPublicSocialUrls(): string[] {
  return SOCIAL_LINKS.map((link) => link.href).filter(
    (href) => href.startsWith("http") && href !== "#"
  )
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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
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
  publishedAt,
  updatedAt,
}: {
  title: string
  description: string
  path: string
  image?: string
  publishedAt?: string
  updatedAt?: string
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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
      ...(updatedAt ? { modifiedTime: updatedAt } : {}),
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
  const sameAs = getPublicSocialUrls()

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    logo: absoluteImageUrl("/logo.png"),
    image: absoluteImageUrl(DEFAULT_OG_IMAGE),
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    areaServed: "Ethiopia",
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

export function getArticleJsonLd({
  title,
  description,
  path,
  image,
  publishedAt,
  updatedAt,
}: {
  title: string
  description: string
  path: string
  image: string
  publishedAt?: string
  updatedAt?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    image: absoluteImageUrl(image),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
      logo: {
        "@type": "ImageObject",
        url: absoluteImageUrl("/logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
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

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
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
