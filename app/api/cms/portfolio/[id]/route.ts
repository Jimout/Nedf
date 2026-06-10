import { NextResponse } from "next/server"
import { deletePortfolioProject, getPortfolioById, upsertPortfolioProject } from "@/lib/cms/store"
import type { CmsPortfolioProject } from "@/lib/cms/types"

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const project = await getPortfolioById(id)
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json()) as CmsPortfolioProject
    const existing = await getPortfolioById(id)
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
    const saved = await upsertPortfolioProject({
      ...existing,
      ...body,
      id,
      updatedAt: new Date().toISOString().slice(0, 10),
    })
    return NextResponse.json(saved)
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params
  const ok = await deletePortfolioProject(id)
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
