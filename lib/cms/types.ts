export interface CmsBlogFilter {
  id: string
  label: string
  sortOrder: number
  isActive: boolean
}

export interface CmsBlogSection {
  id: string
  title: string
  content: string
  level: number
  number: string
  images?: string[]
}

export interface CmsBlogPost {
  id: string
  title: string
  description: string
  heroImage: string
  filterId: string
  tags: string[]
  sections: CmsBlogSection[]
  published: boolean
  publishedAt: string
  updatedAt: string
}

export interface CmsPortfolioCategory {
  id: string
  label: string
  sortOrder: number
  isActive: boolean
}

export interface CmsPortfolioProject {
  id: string
  title: string
  categoryId: string
  year: string
  client: string
  location: string
  area: string
  topology: string
  role: string
  status: string
  inspiration: string
  description: string
  features: string[]
  materials: string[]
  colorPalette: string[]
  beforeImage: string
  afterImage: string
  galleryImages: string[]
  published: boolean
  updatedAt: string
}

export interface CmsStore {
  blogFilters: CmsBlogFilter[]
  portfolioCategories: CmsPortfolioCategory[]
  blogs: CmsBlogPost[]
  portfolio: CmsPortfolioProject[]
}
