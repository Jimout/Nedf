import { NextResponse } from "next/server"
import { deleteBlogFilter, updateBlogFilter } from "@/lib/cms/store"

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json()) as {
      label?: string
      sortOrder?: number
      isActive?: boolean
    }
    const updated = await updateBlogFilter(id, body)
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: "Failed to update filter" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json().catch(() => ({}))) as { reassignToId?: string }
    const ok = await deleteBlogFilter(id, body.reassignToId)
    if (!ok) {
      return NextResponse.json(
        { error: "Filter is in use. Provide reassignToId or reassign posts first." },
        { status: 409 }
      )
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete filter" }, { status: 500 })
  }
}
