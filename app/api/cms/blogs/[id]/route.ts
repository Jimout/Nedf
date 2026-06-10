import { NextResponse } from "next/server"
import { deleteBlog, getBlogById, upsertBlog } from "@/lib/cms/store"
import type { CmsBlogPost } from "@/lib/cms/types"

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const blog = await getBlogById(id)
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(blog)
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json()) as CmsBlogPost
    const existing = await getBlogById(id)
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
    const saved = await upsertBlog({
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString().slice(0, 10),
    })
    return NextResponse.json(saved)
  } catch {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params
  const ok = await deleteBlog(id)
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
