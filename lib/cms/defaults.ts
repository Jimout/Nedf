import { BLOG_POSTS } from "@/lib/landing-blog-posts"
import { createCaseStudyBlogSections } from "@/lib/cms/sample-blog-sections"
import { PORTFOLIO_LIST } from "@/lib/landing-portfolio-seo"
import { getPortfolioProjectById } from "@/lib/landing-portfolio-projects"
import type {
  CmsBlogFilter,
  CmsBlogPost,
  CmsBlogSection,
  CmsPortfolioCategory,
  CmsPortfolioProject,
  CmsStore,
} from "@/lib/cms/types"

export const DEFAULT_BLOG_FILTERS: CmsBlogFilter[] = [
  { id: "architecture", label: "Architecture", sortOrder: 1, isActive: true },
  { id: "design", label: "Design", sortOrder: 2, isActive: true },
  { id: "interior", label: "Interior", sortOrder: 3, isActive: true },
  { id: "studio-life", label: "Studio Life", sortOrder: 4, isActive: true },
  { id: "materials", label: "Materials", sortOrder: 5, isActive: true },
  { id: "tech", label: "Tech", sortOrder: 6, isActive: true },
]

export const DEFAULT_PORTFOLIO_CATEGORIES: CmsPortfolioCategory[] = [
  { id: "architecture", label: "Architecture", sortOrder: 1, isActive: true },
  { id: "interior", label: "Interior", sortOrder: 2, isActive: true },
  { id: "visualization", label: "Visualization", sortOrder: 3, isActive: true },
]

const CATEGORY_TO_FILTER: Record<string, string> = {
  Architecture: "architecture",
  "Case File": "architecture",
  Design: "design",
  "Design Thinking": "design",
  Interior: "interior",
  "Interior Design": "interior",
  "Studio Life": "studio-life",
  "Behind the Scenes": "studio-life",
  Workflow: "studio-life",
  Materials: "materials",
  Tech: "tech",
  AI: "tech",
}

function resolveBlogFilterId(categories: string[]): string {
  for (const cat of categories) {
    const mapped = CATEGORY_TO_FILTER[cat]
    if (mapped) return mapped
  }
  return "design"
}

function defaultBlogSections(description: string): CmsBlogSection[] {
  return [
    {
      id: "intro",
      title: "Introduction",
      content: description,
      level: 1,
      number: "1",
    },
  ]
}

function mapListCategoryToId(category: string): string {
  const normalized = category.toLowerCase()
  if (normalized === "architecture") return "architecture"
  if (normalized === "interior") return "interior"
  if (normalized === "visualization") return "visualization"
  return "architecture"
}

export function createDefaultBlogs(): CmsBlogPost[] {
  return BLOG_POSTS.map((post) => ({
    id: String(post.id),
    title: post.title,
    description: post.description,
    heroImage: post.image,
    filterId: resolveBlogFilterId(post.categories),
    tags: post.categories,
    sections:
      post.id === 1
        ? createCaseStudyBlogSections(post.description)
        : defaultBlogSections(post.description),
    published: true,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  }))
}

export function createDefaultPortfolio(): CmsPortfolioProject[] {
  return PORTFOLIO_LIST.map((item) => {
    const detailed = getPortfolioProjectById(item.id)
    const categoryId = mapListCategoryToId(item.category)

    if (detailed) {
      return {
        id: item.id,
        title: detailed.title,
        categoryId,
        year: detailed.year,
        client: detailed.client,
        location: detailed.location,
        area: detailed.area,
        topology: detailed.topology,
        role: detailed.role,
        status: detailed.status,
        inspiration: detailed.inspiration,
        description: detailed.description,
        features: detailed.features,
        materials: detailed.materials,
        colorPalette: detailed.colorPalette,
        beforeImage: detailed.beforeAfterImages[0],
        afterImage: detailed.beforeAfterImages[1],
        galleryImages: detailed.galleryImages,
        published: true,
        updatedAt: "2025-06-01",
      }
    }

    return {
      id: item.id,
      title: item.title,
      categoryId,
      year: "2024",
      client: "Private Client",
      location: "Addis Ababa, Ethiopia",
      area: "—",
      topology: item.category,
      role: "Architecture & Design",
      status: "Completed",
      inspiration: `${item.title} by NEDF Studio.`,
      description: `${item.title} — ${item.category} project in Addis Ababa, Ethiopia.`,
      features: ["Context-driven design", "Integrated delivery"],
      materials: ["Wood", "Stone", "Glass"],
      colorPalette: ["#E3E3D8", "#FDFDFD", "#54514A"],
      beforeImage: item.img,
      afterImage: item.img,
      galleryImages: [item.img],
      published: true,
      updatedAt: "2025-06-01",
    }
  })
}

export const DEFAULT_CMS_STORE: CmsStore = {
  blogFilters: DEFAULT_BLOG_FILTERS,
  portfolioCategories: DEFAULT_PORTFOLIO_CATEGORIES,
  blogs: createDefaultBlogs(),
  portfolio: createDefaultPortfolio(),
}
