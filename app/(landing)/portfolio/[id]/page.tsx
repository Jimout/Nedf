import { notFound } from "next/navigation"
import PortfolioDetailClient from "./PortfolioDetailClient"
import { cmsProjectToDetail } from "@/lib/cms/mappers"
import { getPortfolioById, getPublishedPortfolio } from "@/lib/cms/store"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const projects = await getPublishedPortfolio()
  return projects.map((project) => ({ id: project.id }))
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params
  const project = await getPortfolioById(id)

  if (!project || !project.published) {
    notFound()
  }

  return <PortfolioDetailClient projectId={id} initialProject={cmsProjectToDetail(project)} />
}
