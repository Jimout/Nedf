"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { CmsBlogPost } from "@/lib/cms/types"

export type BlogPostCardData = {
  id: string
  title: string
  description: string
  image: string
  categories: string[]
}

export function cmsPostToCard(post: CmsBlogPost, categoryLabel?: string): BlogPostCardData {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.heroImage || "/placeholder.svg",
    categories: categoryLabel ? [categoryLabel] : post.tags.length > 0 ? post.tags.slice(0, 3) : ["Studio"],
  }
}

type BlogPostCardProps = {
  post: BlogPostCardData
  onReadMore: (id: string) => void
}

export default function BlogPostCard({ post, onReadMore }: BlogPostCardProps) {
  return (
    <article className="group bg-card text-card-foreground shadow-lg flex flex-col overflow-hidden transition-shadow hover:shadow-xl border border-border h-[400px]">
      <div className="relative w-full h-[170px] shrink-0">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
        />
      </div>

      <div className="relative p-4 flex flex-col flex-1 min-h-0">
        <div className="mb-2 min-h-6 shrink-0 flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <span
              key={category}
              className="inline-block text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <h2 className="text-base font-medium text-foreground mb-2 line-clamp-2 h-[2.5rem] leading-5 shrink-0 overflow-hidden">
          {post.title}
        </h2>

        <p className="text-sm text-muted-foreground line-clamp-3 h-[3.75rem] leading-5 shrink-0 overflow-hidden">
          {post.description}
        </p>

        <div className="mt-auto flex justify-end shrink-0 pt-2">
          <Button type="button" size="sm" onClick={() => onReadMore(post.id)} className="relative z-10">
            Read more
          </Button>
        </div>
      </div>
    </article>
  )
}
