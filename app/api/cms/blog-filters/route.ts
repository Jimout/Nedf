import { NextResponse } from "next/server"
import {
  createBlogFilter,
  getActiveBlogFilters,
  getBlogFiltersForAdmin,
} from "@/lib/cms/store"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const admin = searchParams.get("admin") === "1"
  const filters = admin ? await getBlogFiltersForAdmin() : await getActiveBlogFilters()
  return NextResponse.json(filters)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { label?: string }
    if (!body.label?.trim()) {
      return NextResponse.json({ error: "Label is required" }, { status: 400 })
    }
    const filter = await createBlogFilter({ label: body.label })
    return NextResponse.json(filter, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create filter" }, { status: 500 })
  }
}
