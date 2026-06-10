export interface BlogPost {
  id: number
  image: string
  categories: string[]
  title: string
  description: string
  publishedAt: string
  updatedAt: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    image: "/room1.jpg",
    categories: ["Case File", "Architecture"],
    title: "From Concept To Concrete",
    description:
      "We Take You Through The Design Journey Of A Modern Home We Recently Completed In Addis Ababa From Rough Initial Sketches To Polished Renders To Final Construction. This comprehensive case study explores every detail of our creative process and the challenges we overcame.",
    publishedAt: "2024-09-15",
    updatedAt: "2025-01-10",
  },
  {
    id: 2,
    image: "/room2.jpg",
    categories: ["Materials", "Design Thinking", "Interior Design"],
    title: "Why Clay Still Wins",
    description:
      "Clay Isn't Just A Material It's A Philosophy. In This Note, We Reflect On Why Traditional Materials Continue To Outperform Modern Alternatives In Both Sustainability And Aesthetic Appeal.",
    publishedAt: "2024-10-02",
    updatedAt: "2025-01-10",
  },
  {
    id: 3,
    image: "/interior1.jpg",
    categories: ["Studio Life", "Behind the Scenes"],
    title: "Studio Mornings: What Fuels Our Process",
    description:
      "Every Monday At NEDF Starts With Music, Coffee, And Creative Chaos. We Give You A Glimpse Into Our Daily Rituals And The Small Moments That Spark Big Ideas.",
    publishedAt: "2024-10-20",
    updatedAt: "2025-01-10",
  },
  {
    id: 4,
    image: "/interior2.jpg",
    categories: ["Design"],
    title: "The Power Of Simplicity",
    description:
      "Design Isn't Always About More. Sometimes It's About Less Done Right. We explore the principles of minimalist design and how restraint can create more impactful spaces.",
    publishedAt: "2024-11-05",
    updatedAt: "2025-01-10",
  },
  {
    id: 5,
    image: "/interior3.jpg",
    categories: ["Tech", "AI"],
    title: "Using AI in Architecture",
    description:
      "How Artificial Intelligence is shaping how we plan, visualize, and build in the 21st century. From generative design to predictive modeling, we examine the tools that are revolutionizing our industry.",
    publishedAt: "2024-11-18",
    updatedAt: "2025-01-10",
  },
  {
    id: 6,
    image: "/visual1.jpg",
    categories: ["Interior", "Design"],
    title: "Modern Minimalism",
    description:
      "Minimalist spaces are more than aesthetics; they are philosophy. We explore how to create spaces that breathe and inspire through thoughtful reduction and careful curation.",
    publishedAt: "2024-12-01",
    updatedAt: "2025-01-10",
  },
  {
    id: 7,
    image: "/visual1.jpg",
    categories: ["Studio Life", "Workflow"],
    title: "Workflow Optimization",
    description:
      "Tips on how to streamline your creative process and maintain productivity while preserving the spark of innovation.",
    publishedAt: "2024-12-12",
    updatedAt: "2025-01-10",
  },
  {
    id: 8,
    image: "/visual3.jpg",
    categories: ["Design", "Materials"],
    title: "Material Innovation",
    description:
      "Exploring new materials for sustainable interiors that don't compromise on beauty or functionality.",
    publishedAt: "2025-01-05",
    updatedAt: "2025-01-10",
  },
]

export function getBlogPostById(id: string | number): BlogPost | undefined {
  return BLOG_POSTS.find((post) => String(post.id) === String(id))
}

export function getAllBlogPostIds(): string[] {
  return BLOG_POSTS.map((post) => String(post.id))
}
