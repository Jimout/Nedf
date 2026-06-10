import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { getBlogById } from "@/lib/cms/store"
import {
  createArticleMetadata,
  createPageMetadata,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/seo"

type Props = {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getBlogById(id)

  if (!post || !post.published) {
    return createPageMetadata({
      title: "Studio Note",
      description: "Studio note from NEDF Studio.",
      path: `/blog/${id}`,
      noIndex: true,
    })
  }

  return createArticleMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.id}`,
    image: post.heroImage,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  })
}

export default async function BlogDetailLayout({ children, params }: Props) {
  const { id } = await params
  const post = await getBlogById(id)

  return (
    <>
      {post && post.published ? (
        <>
          <JsonLd
            data={getArticleJsonLd({
              title: post.title,
              description: post.description,
              path: `/blog/${post.id}`,
              image: post.heroImage,
              publishedAt: post.publishedAt,
              updatedAt: post.updatedAt,
            })}
          />
          <JsonLd
            data={getBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Studio Notes", path: "/blog" },
              { name: post.title, path: `/blog/${post.id}` },
            ])}
          />
        </>
      ) : null}
      {children}
    </>
  )
}
