/** Shared Montserrat typography tiers for landing & marketing surfaces */
export const TYPE = {
  sectionTitle:
    "font-montserrat font-bold tracking-tight text-foreground/80 dark:text-primary",
  headline:
    "font-montserrat font-bold tracking-tight leading-tight text-foreground",
  cardHeadline:
    "font-montserrat font-bold tracking-tight leading-tight text-card-foreground",
  eyebrow:
    "font-montserrat font-medium uppercase tracking-[0.2em] text-muted-foreground",
  body: "font-montserrat font-normal leading-relaxed text-muted-foreground",
  cta: "font-montserrat font-semibold",
} as const

/** Responsive scale for centered landing section titles */
export const SECTION_TITLE_SCALE =
  "text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl"
