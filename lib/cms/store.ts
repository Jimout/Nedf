import fs from "fs/promises"
import path from "path"
import { DEFAULT_CMS_STORE } from "@/lib/cms/defaults"
import type {
  CmsBlogFilter,
  CmsBlogPost,
  CmsBlogSection,
  CmsPortfolioCategory,
  CmsPortfolioProject,
  CmsStore,
} from "@/lib/cms/types"

const CMS_FILE = path.join(process.cwd(), "content", "cms", "store.json")

async function ensureStoreFile(): Promise<CmsStore> {
  try {
    const raw = await fs.readFile(CMS_FILE, "utf-8")
    const parsed = JSON.parse(raw) as CmsStore
    return {
      blogFilters: parsed.blogFilters ?? DEFAULT_CMS_STORE.blogFilters,
      portfolioCategories: parsed.portfolioCategories ?? DEFAULT_CMS_STORE.portfolioCategories,
      blogs: parsed.blogs ?? DEFAULT_CMS_STORE.blogs,
      portfolio: parsed.portfolio ?? DEFAULT_CMS_STORE.portfolio,
    }
  } catch {
    if (process.env.NODE_ENV === "development") {
      await writeStore(DEFAULT_CMS_STORE).catch(() => undefined)
    }
    return DEFAULT_CMS_STORE
  }
}

async function writeStore(store: CmsStore): Promise<void> {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("CMS writes are only persisted in local development.")
  }
  await fs.mkdir(path.dirname(CMS_FILE), { recursive: true })
  await fs.writeFile(CMS_FILE, JSON.stringify(store, null, 2), "utf-8")
}

export async function readCmsStore(): Promise<CmsStore> {
  return ensureStoreFile()
}

export async function getActiveBlogFilters(): Promise<CmsBlogFilter[]> {
  const store = await readCmsStore()
  return store.blogFilters
    .filter((f) => f.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getActivePortfolioCategories(): Promise<CmsPortfolioCategory[]> {
  const store = await readCmsStore()
  return store.portfolioCategories
    .filter((c) => c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getPublishedBlogs(): Promise<CmsBlogPost[]> {
  const store = await readCmsStore()
  return store.blogs.filter((b) => b.published)
}

export async function getPublishedPortfolio(): Promise<CmsPortfolioProject[]> {
  const store = await readCmsStore()
  return store.portfolio.filter((p) => p.published)
}

export async function getBlogById(id: string): Promise<CmsBlogPost | undefined> {
  const store = await readCmsStore()
  return store.blogs.find((b) => b.id === id)
}

export async function getPortfolioById(id: string): Promise<CmsPortfolioProject | undefined> {
  const store = await readCmsStore()
  return store.portfolio.find((p) => p.id === id)
}

export async function getBlogFiltersForAdmin(): Promise<CmsBlogFilter[]> {
  const store = await readCmsStore()
  return [...store.blogFilters].sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getPortfolioCategoriesForAdmin(): Promise<CmsPortfolioCategory[]> {
  const store = await readCmsStore()
  return [...store.portfolioCategories].sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getBlogsForAdmin(): Promise<CmsBlogPost[]> {
  const store = await readCmsStore()
  return store.blogs
}

export async function getPortfolioForAdmin(): Promise<CmsPortfolioProject[]> {
  const store = await readCmsStore()
  return store.portfolio
}

function slugify(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function createBlogFilter(input: { label: string }): Promise<CmsBlogFilter> {
  const store = await readCmsStore()
  const baseId = slugify(input.label) || `filter-${Date.now()}`
  let id = baseId
  let counter = 1
  while (store.blogFilters.some((f) => f.id === id)) {
    id = `${baseId}-${counter++}`
  }
  const filter: CmsBlogFilter = {
    id,
    label: input.label.trim(),
    sortOrder: store.blogFilters.length + 1,
    isActive: true,
  }
  store.blogFilters.push(filter)
  await writeStore(store)
  return filter
}

export async function updateBlogFilter(
  id: string,
  patch: Partial<Pick<CmsBlogFilter, "label" | "sortOrder" | "isActive">>
): Promise<CmsBlogFilter | null> {
  const store = await readCmsStore()
  const index = store.blogFilters.findIndex((f) => f.id === id)
  if (index < 0) return null
  store.blogFilters[index] = { ...store.blogFilters[index], ...patch }
  await writeStore(store)
  return store.blogFilters[index]
}

export async function deleteBlogFilter(id: string, reassignToId?: string): Promise<boolean> {
  const store = await readCmsStore()
  const inUse = store.blogs.some((b) => b.filterId === id)
  if (inUse && !reassignToId) return false
  if (inUse && reassignToId) {
    store.blogs = store.blogs.map((b) =>
      b.filterId === id ? { ...b, filterId: reassignToId, updatedAt: new Date().toISOString().slice(0, 10) } : b
    )
  }
  store.blogFilters = store.blogFilters.filter((f) => f.id !== id)
  await writeStore(store)
  return true
}

export async function createPortfolioCategory(input: { label: string }): Promise<CmsPortfolioCategory> {
  const store = await readCmsStore()
  const baseId = slugify(input.label) || `category-${Date.now()}`
  let id = baseId
  let counter = 1
  while (store.portfolioCategories.some((c) => c.id === id)) {
    id = `${baseId}-${counter++}`
  }
  const category: CmsPortfolioCategory = {
    id,
    label: input.label.trim(),
    sortOrder: store.portfolioCategories.length + 1,
    isActive: true,
  }
  store.portfolioCategories.push(category)
  await writeStore(store)
  return category
}

export async function updatePortfolioCategory(
  id: string,
  patch: Partial<Pick<CmsPortfolioCategory, "label" | "sortOrder" | "isActive">>
): Promise<CmsPortfolioCategory | null> {
  const store = await readCmsStore()
  const index = store.portfolioCategories.findIndex((c) => c.id === id)
  if (index < 0) return null
  store.portfolioCategories[index] = { ...store.portfolioCategories[index], ...patch }
  await writeStore(store)
  return store.portfolioCategories[index]
}

export async function deletePortfolioCategory(id: string, reassignToId?: string): Promise<boolean> {
  const store = await readCmsStore()
  const inUse = store.portfolio.some((p) => p.categoryId === id)
  if (inUse && !reassignToId) return false
  if (inUse && reassignToId) {
    store.portfolio = store.portfolio.map((p) =>
      p.categoryId === id
        ? { ...p, categoryId: reassignToId, updatedAt: new Date().toISOString().slice(0, 10) }
        : p
    )
  }
  store.portfolioCategories = store.portfolioCategories.filter((c) => c.id !== id)
  await writeStore(store)
  return true
}

export async function upsertBlog(post: CmsBlogPost): Promise<CmsBlogPost> {
  const store = await readCmsStore()
  const index = store.blogs.findIndex((b) => b.id === post.id)
  if (index >= 0) store.blogs[index] = post
  else store.blogs.push(post)
  await writeStore(store)
  return post
}

export async function deleteBlog(id: string): Promise<boolean> {
  const store = await readCmsStore()
  const before = store.blogs.length
  store.blogs = store.blogs.filter((b) => b.id !== id)
  if (store.blogs.length === before) return false
  await writeStore(store)
  return true
}

export async function upsertPortfolioProject(project: CmsPortfolioProject): Promise<CmsPortfolioProject> {
  const store = await readCmsStore()
  const index = store.portfolio.findIndex((p) => p.id === project.id)
  if (index >= 0) store.portfolio[index] = project
  else store.portfolio.push(project)
  await writeStore(store)
  return project
}

export async function deletePortfolioProject(id: string): Promise<boolean> {
  const store = await readCmsStore()
  const before = store.portfolio.length
  store.portfolio = store.portfolio.filter((p) => p.id !== id)
  if (store.portfolio.length === before) return false
  await writeStore(store)
  return true
}

export type { CmsBlogPost, CmsBlogSection, CmsPortfolioProject }
