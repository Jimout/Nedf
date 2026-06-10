import { notFound } from "next/navigation"
import PortfolioDetailClient from "./PortfolioDetailClient"
import {
  getAllPortfolioProjectIds,
  getPortfolioProjectById,
} from "@/lib/landing-portfolio-projects"

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllPortfolioProjectIds().map((id) => ({ id }))
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params
  const project = getPortfolioProjectById(id)

  if (!project) {
    notFound()
  }

  return <PortfolioDetailClient projectId={id} initialProject={project} />
}
