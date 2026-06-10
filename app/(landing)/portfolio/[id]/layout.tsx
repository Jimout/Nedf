import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { getPortfolioSeoById } from "@/lib/landing-portfolio-seo"
import {
  createArticleMetadata,
  createPageMetadata,
  getBreadcrumbJsonLd,
  getCreativeWorkJsonLd,
} from "@/lib/seo"

type Props = {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = getPortfolioSeoById(id)

  if (!project) {
    return createPageMetadata({
      title: "Project",
      description: "Architecture and design project by NEDF Studio.",
      path: `/portfolio/${id}`,
      noIndex: true,
    })
  }

  return createArticleMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${project.id}`,
    image: project.image,
  })
}

export default async function PortfolioDetailLayout({ children, params }: Props) {
  const { id } = await params
  const project = getPortfolioSeoById(id)

  return (
    <>
      {project ? (
        <>
          <JsonLd
            data={getCreativeWorkJsonLd({
              title: project.title,
              description: project.description,
              path: `/portfolio/${project.id}`,
              image: project.image,
            })}
          />
          <JsonLd
            data={getBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Portfolio", path: "/portfolio" },
              { name: project.title, path: `/portfolio/${project.id}` },
            ])}
          />
        </>
      ) : null}
      {children}
    </>
  )
}
