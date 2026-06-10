import { NextResponse } from "next/server"
import { getPortfolioForAdmin, getPublishedPortfolio, upsertPortfolioProject } from "@/lib/cms/store"
import type { CmsPortfolioProject } from "@/lib/cms/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const admin = searchParams.get("admin") === "1"
  const projects = admin ? await getPortfolioForAdmin() : await getPublishedPortfolio()
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CmsPortfolioProject
    if (!body.title?.trim() || !body.categoryId) {
      return NextResponse.json({ error: "Title and categoryId are required" }, { status: 400 })
    }
    const today = new Date().toISOString().slice(0, 10)
    const project: CmsPortfolioProject = {
      ...body,
      id: body.id || `p-${Date.now()}`,
      published: body.published ?? true,
      updatedAt: today,
    }
    const saved = await upsertPortfolioProject(project)
    return NextResponse.json(saved, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 })
  }
}
