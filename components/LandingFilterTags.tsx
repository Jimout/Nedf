"use client"

import { useEffect, useRef } from "react"
import { LANDING_MAIN_GUTTERS, LANDING_MAIN_GUTTERS_BLEED } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LandingFilterTagsProps<T extends string> {
  id: string
  tags: readonly T[]
  activeTag: T
  onTagChange: (tag: T) => void
}

export default function LandingFilterTags<T extends string>({
  id,
  tags,
  activeTag,
  onTagChange,
}: LandingFilterTagsProps<T>) {
  const activeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
      block: "nearest",
    })
  }, [activeTag])

  return (
    <div
      id={id}
      className={cn(
        "border-b border-border mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-12",
        LANDING_MAIN_GUTTERS_BLEED,
      )}
    >
      <div
        className={cn(
          "overflow-x-auto overscroll-x-contain scroll-smooth touch-pan-x",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          LANDING_MAIN_GUTTERS,
        )}
      >
        <div className="flex w-max min-w-full gap-8 sm:gap-9 md:gap-10 lg:gap-11 xl:gap-12 2xl:gap-14">
          {tags.map((tag) => {
            const isActive = activeTag === tag
            return (
              <Button
                key={tag}
                ref={isActive ? activeButtonRef : undefined}
                type="button"
                variant="ghost"
                onClick={() => onTagChange(tag)}
                className={cn(
                  "inline-flex h-auto min-h-[44px] items-end rounded-none px-0 pb-1 sm:pb-1 md:pb-1.5 lg:pb-1.5 xl:pb-2 2xl:pb-2",
                  "text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium whitespace-nowrap shrink-0",
                  "border-b-2 shadow-none hover:shadow-none hover:translate-y-0 active:translate-y-0",
                  isActive
                    ? "text-primary border-primary hover:bg-transparent hover:text-primary/75"
                    : "text-muted-foreground border-transparent hover:bg-transparent hover:text-primary hover:border-primary/40",
                )}
              >
                {tag}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
