import type { CmsBlogFilter, CmsBlogPost, CmsPortfolioCategory, CmsPortfolioProject } from "@/lib/cms/types"

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(err.error || res.statusText)
  }
  return res.json() as Promise<T>
}

export const cmsApi = {
  getBlogFilters(admin = false) {
    return fetch(`/api/cms/blog-filters${admin ? "?admin=1" : ""}`).then((r) =>
      parseJson<CmsBlogFilter[]>(r)
    )
  },
  createBlogFilter(label: string) {
    return fetch("/api/cms/blog-filters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    }).then((r) => parseJson<CmsBlogFilter>(r))
  },
  updateBlogFilter(id: string, patch: Partial<CmsBlogFilter>) {
    return fetch(`/api/cms/blog-filters/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).then((r) => parseJson<CmsBlogFilter>(r))
  },
  deleteBlogFilter(id: string, reassignToId?: string) {
    return fetch(`/api/cms/blog-filters/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reassignToId }),
    }).then((r) => parseJson<{ success: boolean }>(r))
  },

  getPortfolioCategories(admin = false) {
    return fetch(`/api/cms/portfolio-categories${admin ? "?admin=1" : ""}`).then((r) =>
      parseJson<CmsPortfolioCategory[]>(r)
    )
  },
  createPortfolioCategory(label: string) {
    return fetch("/api/cms/portfolio-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    }).then((r) => parseJson<CmsPortfolioCategory>(r))
  },
  updatePortfolioCategory(id: string, patch: Partial<CmsPortfolioCategory>) {
    return fetch(`/api/cms/portfolio-categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).then((r) => parseJson<CmsPortfolioCategory>(r))
  },
  deletePortfolioCategory(id: string, reassignToId?: string) {
    return fetch(`/api/cms/portfolio-categories/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reassignToId }),
    }).then((r) => parseJson<{ success: boolean }>(r))
  },

  getBlogs(admin = false) {
    return fetch(`/api/cms/blogs${admin ? "?admin=1" : ""}`).then((r) => parseJson<CmsBlogPost[]>(r))
  },
  getBlog(id: string) {
    return fetch(`/api/cms/blogs/${id}`).then((r) => parseJson<CmsBlogPost>(r))
  },
  createBlog(post: CmsBlogPost) {
    return fetch("/api/cms/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then((r) => parseJson<CmsBlogPost>(r))
  },
  updateBlog(id: string, post: Partial<CmsBlogPost>) {
    return fetch(`/api/cms/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then((r) => parseJson<CmsBlogPost>(r))
  },
  deleteBlog(id: string) {
    return fetch(`/api/cms/blogs/${id}`, { method: "DELETE" }).then((r) =>
      parseJson<{ success: boolean }>(r)
    )
  },

  getPortfolio(admin = false) {
    return fetch(`/api/cms/portfolio${admin ? "?admin=1" : ""}`).then((r) =>
      parseJson<CmsPortfolioProject[]>(r)
    )
  },
  getPortfolioProject(id: string) {
    return fetch(`/api/cms/portfolio/${id}`).then((r) => parseJson<CmsPortfolioProject>(r))
  },
  createPortfolioProject(project: CmsPortfolioProject) {
    return fetch("/api/cms/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    }).then((r) => parseJson<CmsPortfolioProject>(r))
  },
  updatePortfolioProject(id: string, project: Partial<CmsPortfolioProject>) {
    return fetch(`/api/cms/portfolio/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    }).then((r) => parseJson<CmsPortfolioProject>(r))
  },
  deletePortfolioProject(id: string) {
    return fetch(`/api/cms/portfolio/${id}`, { method: "DELETE" }).then((r) =>
      parseJson<{ success: boolean }>(r)
    )
  },
}
