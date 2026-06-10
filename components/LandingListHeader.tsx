"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface LandingListSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
}

export function LandingListSearch({
  value,
  onChange,
  placeholder = "Search...",
  id = "search",
}: LandingListSearchProps) {
  return (
    <div className="relative" id={id}>
      <Search className="absolute left-3 sm:left-3 md:left-4 lg:left-4 xl:left-4 2xl:left-5 top-1/2 -translate-y-1/2 text-primary opacity-40 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 sm:pl-10 md:pl-12 lg:pl-12 xl:pl-12 2xl:pl-14 pr-4 sm:pr-4 md:pr-5 lg:pr-5 xl:pr-6 2xl:pr-6 py-2.5 sm:py-2.5 md:py-3 lg:py-3 xl:py-3.5 2xl:py-4 text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg rounded-2xl sm:rounded-2xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl 2xl:rounded-3xl text-foreground placeholder-muted-foreground/70 bg-muted/30 transition-all duration-300 ease-in-out focus:bg-background focus:border focus:border-border focus:text-foreground focus:placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}

interface LandingListHeaderProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  className?: string
}

export default function LandingListHeader({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  className,
}: LandingListHeaderProps) {
  return (
    <header
      className={cn(
        "mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10 2xl:mb-12",
        className,
      )}
    >
      <LandingListSearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
    </header>
  )
}
