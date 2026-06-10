import { NextResponse } from "next/server"
import {
  createPortfolioCategory,
  getActivePortfolioCategories,
  getPortfolioCategoriesForAdmin,
} from "@/lib/cms/store"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const admin = searchParams.get("admin") === "1"
  const categories = admin
    ? await getPortfolioCategoriesForAdmin()
    : await getActivePortfolioCategories()
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { label?: string }
    if (!body.label?.trim()) {
      return NextResponse.json({ error: "Label is required" }, { status: 400 })
    }
    const category = await createPortfolioCategory({ label: body.label })
    return NextResponse.json(category, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
