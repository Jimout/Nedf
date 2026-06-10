import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { cmsProjectToSeo } from "@/lib/cms/mappers"
import { getPortfolioById } from "@/lib/cms/store"
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
  const project = await getPortfolioById(id)

  if (!project || !project.published) {
    return createPageMetadata({
      title: "Project",
      description: "Architecture and design project by NEDF Studio.",
      path: `/portfolio/${id}`,
      noIndex: true,
    })
  }

  const seo = cmsProjectToSeo(project)
  return createArticleMetadata({
    title: seo.title,
    description: seo.description,
    path: `/portfolio/${seo.id}`,
    image: seo.image,
  })
}

export default async function PortfolioDetailLayout({ children, params }: Props) {
  const { id } = await params
  const project = await getPortfolioById(id)

  if (!project || !project.published) {
    return children
  }

  const seo = cmsProjectToSeo(project)

  return (
    <>
      <JsonLd
        data={getCreativeWorkJsonLd({
          title: seo.title,
          description: seo.description,
          path: `/portfolio/${seo.id}`,
          image: seo.image,
        })}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: seo.title, path: `/portfolio/${seo.id}` },
        ])}
      />
      {children}
    </>
  )
}
