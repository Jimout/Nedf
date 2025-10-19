"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"

const posts = [
  {
    id: 0,
    image: "/room1.jpg",
    categories: ["Case File", "Architecture"],
    title: "From Concept To Concrete",
    description:
      "We Take You Through The Design Journey Of A Modern Home We Recently Completed In Addis Ababa From Rough Initial Sketches To Polished Renders To Final Construction. This comprehensive case study explores every detail of our creative process and the challenges we overcame.",
  },
  {
    id: 1,
    image: "/interior2.jpg",
    categories: ["Materials", "Design Thinking", "Interior Design"],
    title: "Why Clay Still Wins",
    description:
      "Clay Isn&apos;t Just A Material It&apos;s A Philosophy. In This Note, We Reflect On Why Traditional Materials Continue To Outperform Modern Alternatives In Both Sustainability And Aesthetic Appeal. Discover the timeless beauty and practical benefits of working with clay.",
  },
  {
    id: 2,
    image: "/visual1.jpg",
    categories: ["Studio Life", "Behind The Scenes"],
    title: "Studio Mornings: What Fuels Our Process",
    description:
      "Every Monday At NEDF Starts With Music, Coffee, And Creative Chaos. We Give You A Glimpse Into Our Daily Rituals And The Small Moments That Spark Big Ideas. From brainstorming sessions to collaborative sketching, see how we maintain our creative energy.",
  },
  {
    id: 3,
    image: "/interior1.jpg",
    categories: ["Design"],
    title: "The Power Of Simplicity",
    description:
      "Design Isn&apos;t Always About More. Sometimes It&apos;s About Less Done Right. We explore the principles of minimalist design and how restraint can create more impactful spaces. Learn why simplicity requires the most sophisticated thinking.",
  },
  {
    id: 4,
    image: "/room3.jpg",
    categories: ["Tech", "AI"],
    title: "Using AI in Architecture",
    description:
      "How Artificial Intelligence is shaping how we plan, visualize, and build in the 21st century. From generative design to predictive modeling, we examine the tools that are revolutionizing our industry and changing the way we approach complex architectural challenges.",
  },
  {
    id: 5,
    image: "/visual2.jpg",
    categories: ["Process", "Design"],
    title: "Designing for the Future",
    description:
      "We explore how forward-thinking design principles shape spaces that adapt to changing needs. From flexible layouts to sustainable materials, discover our approach to creating timeless architecture that stands the test of time.",
  },
]

export default function StudioNotes() {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  const handleReadMore = (postId: number) => {
    // Map post IDs to blog pages
    // First card (id: 0) goes to the existing blog-1 page
    const blogSlug = postId === 0 ? "blog-1" : `blog-${postId + 1}`
    router.push(`/blog/${blogSlug}`)
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: false,
            containScroll: "trimSnaps",
          }}
          className="w-full max-w-[calc(100%-180px)] mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map(({ id, image, categories, title, description }, i) => {
              return (
                <CarouselItem key={i} className="pl-2 md:pl-4 basis-1/3">
                  <article className="group bg-white dark:bg-[#15171a] shadow-lg shadow-[#001F4B]/10 dark:shadow-[#ec1e24]/20 flex flex-col overflow-hidden transition-shadow hover:shadow-xl hover:shadow-[#001F4B]/20 dark:hover:shadow-[#ec1e24]/30 h-[400px] border border-[rgba(0,31,75,0.1)] dark:border-transparent">
                    <div className="relative w-full h-[170px]">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes={isMobile ? "260px" : "300px"}
                      />
                      <div className="absolute inset-0 bg-[#15171a] opacity-0 dark:opacity-30 transition-all duration-300 group-hover:scale-105" />
                    </div>

                    <div className="relative p-4 flex flex-col h-[230px]">
                      <div className="flex flex-wrap gap-2 mb-2" style={{ minHeight: "24px" }}>
                        {categories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium px-3 py-1 bg-secondary text-secondary-foreground/70 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-[18px] text-[#333333] dark:text-white font-regular leading-6 mb-2">{title}</h2>

                      <div className="flex-1 mb-3">
                        <p
                          className="text-[#333333]/60 dark:text-white/60 text-[12px] line-clamp-3"
                         
                        >
                          {description}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleReadMore(id)}>
                          Read More
                        </Button>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 sm:-left-16 lg:-left-20 xl:-left-24 2xl:-left-28 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute -right-12 sm:-right-16 lg:-right-20 xl:-right-24 2xl:-right-28 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </section>
  )
}
