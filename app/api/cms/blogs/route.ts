import { NextResponse } from "next/server"
import { getBlogsForAdmin, getPublishedBlogs, upsertBlog } from "@/lib/cms/store"
import type { CmsBlogPost } from "@/lib/cms/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const admin = searchParams.get("admin") === "1"
  const blogs = admin ? await getBlogsForAdmin() : await getPublishedBlogs()
  return NextResponse.json(blogs)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CmsBlogPost
    if (!body.title?.trim() || !body.filterId) {
      return NextResponse.json({ error: "Title and filterId are required" }, { status: 400 })
    }
    const today = new Date().toISOString().slice(0, 10)
    const post: CmsBlogPost = {
      ...body,
      id: body.id || `blog-${Date.now()}`,
      published: body.published ?? true,
      publishedAt: body.publishedAt || today,
      updatedAt: today,
    }
    const saved = await upsertBlog(post)
    return NextResponse.json(saved, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 })
  }
}
