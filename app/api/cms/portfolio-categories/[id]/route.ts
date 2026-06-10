import { NextResponse } from "next/server"
import { deletePortfolioCategory, updatePortfolioCategory } from "@/lib/cms/store"

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json()) as {
      label?: string
      sortOrder?: number
      isActive?: boolean
    }
    const updated = await updatePortfolioCategory(id, body)
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json().catch(() => ({}))) as { reassignToId?: string }
    const ok = await deletePortfolioCategory(id, body.reassignToId)
    if (!ok) {
      return NextResponse.json(
        { error: "Category is in use. Provide reassignToId or reassign projects first." },
        { status: 409 }
      )
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
