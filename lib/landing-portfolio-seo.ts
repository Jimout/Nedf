export interface PortfolioListItem {
  id: string
  title: string
  category: string
  img: string
}

export interface PortfolioDetailSeo {
  id: string
  title: string
  description: string
  image: string
}

export const PORTFOLIO_LIST: PortfolioListItem[] = [
  { id: "p1", title: "Modern Loft Design", category: "Architecture", img: "/room1.jpg" },
  { id: "p2", title: "Minimalist Living Space", category: "Interior", img: "/room2.jpg" },
  { id: "p3", title: "Urban Apartment Render", category: "Visualization", img: "/room3.jpg" },
  { id: "p4", title: "Contemporary Office", category: "Architecture", img: "/interior1.jpg" },
  { id: "p5", title: "Scandinavian Kitchen", category: "Interior", img: "/interior2.jpg" },
  { id: "p6", title: "Luxury Bathroom", category: "Visualization", img: "/interior3.jpg" },
  { id: "p7", title: "Glass House Concept", category: "Architecture", img: "/visual1.jpg" },
  { id: "p8", title: "Cozy Bedroom Suite", category: "Interior", img: "/visual2.jpg" },
  { id: "p9", title: "Restaurant Visualization", category: "Visualization", img: "/visual3.jpg" },
  { id: "p10", title: "Modern Loft Design", category: "Architecture", img: "/room1.jpg" },
  { id: "p11", title: "Minimalist Living Space", category: "Interior", img: "/room2.jpg" },
  { id: "p12", title: "Urban Apartment Render", category: "Visualization", img: "/room3.jpg" },
  { id: "p13", title: "Contemporary Office", category: "Architecture", img: "/interior1.jpg" },
  { id: "p14", title: "Scandinavian Kitchen", category: "Interior", img: "/interior2.jpg" },
  { id: "p15", title: "Luxury Bathroom", category: "Visualization", img: "/interior3.jpg" },
  { id: "p16", title: "Glass House Concept", category: "Architecture", img: "/visual1.jpg" },
  { id: "p17", title: "Cozy Bedroom Suite", category: "Interior", img: "/visual2.jpg" },
  { id: "p18", title: "Restaurant Visualization", category: "Visualization", img: "/visual3.jpg" },
]

const PORTFOLIO_DETAIL_SEO: PortfolioDetailSeo[] = [
  {
    id: "p1",
    title: "HIDASSE TELECOM",
    description:
      "Residential project emphasizing open-plan living and seamless integration with the surrounding environment in Addis Ababa.",
    image: "/room1.jpg",
  },
  {
    id: "p2",
    title: "ARROW PROJECT",
    description:
      "A contemporary commercial building designed for optimal functionality and aesthetic appeal in Bole, Addis Ababa.",
    image: "/room2.jpg",
  },
]

export function getPortfolioSeoById(id: string): PortfolioDetailSeo | undefined {
  const detail = PORTFOLIO_DETAIL_SEO.find((p) => p.id === id)
  if (detail) return detail

  const listItem = PORTFOLIO_LIST.find((p) => p.id === id)
  if (!listItem) return undefined

  return {
    id: listItem.id,
    title: listItem.title,
    description: `${listItem.title} — ${listItem.category} project by NEDF Studio in Addis Ababa, Ethiopia.`,
    image: listItem.img,
  }
}
