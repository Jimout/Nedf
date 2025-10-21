"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/Search-bar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Trash2 } from "lucide-react"

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

interface BlogSection {
  id: string
  title: string
  content: string
  level: number
  number: string
}

interface Blog {
  id: string
  title: string
  heroImage: string
  tags: string[]
  sections: BlogSection[]
  createdAt: string
}

export default function ManageBlogPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; blogId: string | null }>({
    isOpen: false,
    blogId: null,
  })

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs")
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs))
    } else {
      // Sample blog data
      const sampleBlogs: Blog[] = [
        {
        id: "blog-1",
          title: "From Concept To Concrete: A Complete Design Journey",
        heroImage: "/modern-construction-site-with-buildings.jpg",
          tags: ["Architecture", "Design Process", "Construction", "Modern Home", "NEDF Studio", "Case Study"],
        createdAt: "2024-01-15",
        sections: [
          {
            id: "introduction",
            title: "Introduction",
            content:
                "Turning An Idea Into Reality Is Never A Straight Path. At NEDF Studio, Every Project Begins With A Spark—An Initial Concept Inspired By Our Client's Vision, The Site Conditions, And The Surrounding Environment. This comprehensive guide takes you through our complete design process from initial concept to final construction.",
            level: 1,
            number: "1",
          },
          {
            id: "step1",
            title: "Step 1: Understanding The Client's Vision",
            content:
                "Every Successful Design Starts With Understanding The People Who Will Inhabit It. Our Client Desired A Contemporary Home That Balances Functionality With Aesthetic Elegance. We conducted extensive interviews, site visits, and lifestyle analysis to ensure every detail reflects their unique needs and aspirations.",
              level: 1,
              number: "2",
            },
            {
              id: "step2",
              title: "Step 2: Site Analysis and Constraints",
              content:
                "Understanding the site's opportunities and limitations is crucial for successful design. We analyzed topography, climate, views, access, and local regulations to inform our design decisions and maximize the site's potential.",
              level: 1,
              number: "3",
            },
            {
              id: "step3",
              title: "Step 3: Conceptual Design Development",
              content:
                "With a clear understanding of client needs and site conditions, we developed multiple conceptual approaches. Each concept explored different spatial relationships, material palettes, and design philosophies to find the perfect solution.",
              level: 1,
              number: "4",
            },
          ],
        },
        {
          id: "blog-2",
          title: "Sustainable Architecture Trends 2024: The Future is Green",
          heroImage: "/placeholder.svg",
          tags: ["Sustainability", "Green Design", "Eco-Friendly", "Innovation", "Future", "Technology"],
          createdAt: "2024-01-20",
          sections: [
            {
              id: "intro",
              title: "The Future of Green Building",
              content:
                "As we move into 2024, sustainable architecture continues to evolve with new technologies and innovative approaches to environmental design. The industry is witnessing a paradigm shift towards net-zero buildings, circular design principles, and regenerative architecture that not only minimizes environmental impact but actively contributes to ecosystem restoration.",
              level: 1,
              number: "1",
            },
            {
              id: "trends",
              title: "Key Trends to Watch",
              content:
                "From biophilic design to net-zero buildings, discover the trends shaping the future of sustainable architecture. We're seeing increased adoption of mass timber construction, smart building technologies, and innovative materials like mycelium-based composites and recycled ocean plastic.",
              level: 1,
              number: "2",
            },
            {
              id: "technology",
              title: "Emerging Technologies",
              content:
                "Advanced building simulation software, AI-powered energy optimization, and IoT sensors are revolutionizing how we design and operate buildings. These technologies enable real-time monitoring and adjustment of building performance, ensuring optimal energy efficiency and occupant comfort.",
              level: 1,
              number: "3",
            },
          ],
        },
        {
          id: "blog-3",
          title: "The Psychology of Interior Design: How Space Shapes Our Lives",
          heroImage: "/placeholder.svg",
          tags: ["Interior Design", "Psychology", "Wellness", "Mental Health", "Space", "Wellbeing"],
          createdAt: "2024-01-25",
          sections: [
            {
              id: "psychology",
              title: "How Space Affects Mood and Behavior",
              content:
                "The spaces we inhabit have a profound impact on our mental and emotional well-being. Research shows that well-designed spaces can reduce stress, improve productivity, and enhance overall quality of life. Understanding this connection is crucial for creating meaningful designs that support human flourishing.",
              level: 1,
              number: "1",
            },
            {
              id: "color",
              title: "Color Psychology in Design",
              content:
                "Colors evoke specific emotions and can significantly influence how we feel in a space. Blue promotes calmness and focus, while warm colors like orange and yellow create energy and optimism. Learn how to use color effectively in your designs to create the desired emotional response.",
              level: 1,
              number: "2",
            },
            {
              id: "lighting",
              title: "The Power of Natural Light",
              content:
                "Natural light is one of the most important elements in interior design. It regulates our circadian rhythms, improves mood, and reduces energy consumption. Strategic placement of windows, skylights, and reflective surfaces can maximize natural light throughout the day.",
              level: 1,
              number: "3",
            },
          ],
        },
        {
          id: "blog-4",
          title: "Modern Kitchen Design: Where Function Meets Aesthetics",
          heroImage: "/placeholder.svg",
          tags: ["Kitchen", "Modern Design", "Functionality", "Aesthetics", "Home", "Renovation"],
          createdAt: "2024-01-30",
          sections: [
            {
              id: "modern",
              title: "Contemporary Kitchen Features",
              content:
                "Modern kitchens blend functionality with sleek aesthetics, creating spaces that are both beautiful and practical for everyday use. Key features include clean lines, minimal hardware, integrated appliances, and smart storage solutions that maximize efficiency without compromising style.",
              level: 1,
              number: "1",
            },
            {
              id: "materials",
              title: "Popular Materials and Finishes",
              content:
                "From quartz countertops to matte black hardware, discover the materials that define contemporary kitchen design. We're seeing increased use of sustainable materials, mixed metal finishes, and textured surfaces that add visual interest while maintaining the clean, modern aesthetic.",
              level: 1,
              number: "2",
            },
            {
              id: "layout",
              title: "Efficient Kitchen Layouts",
              content:
                "The work triangle concept remains fundamental to kitchen design, but modern layouts also consider multiple users, entertaining needs, and technology integration. Open-concept designs, kitchen islands, and flexible storage solutions create versatile spaces that adapt to changing lifestyles.",
              level: 1,
              number: "3",
            },
          ],
        },
        {
          id: "blog-5",
          title: "Small Space Living: Maximizing Every Square Foot",
          heroImage: "/placeholder.svg",
          tags: ["Small Spaces", "Maximizing Space", "Storage", "Urban Living", "Efficiency", "Apartment"],
          createdAt: "2024-02-05",
          sections: [
            {
              id: "challenges",
              title: "Challenges of Small Space Living",
              content:
                "Living in small spaces presents unique challenges, but with thoughtful design, these limitations can become opportunities for creativity. The key is to prioritize functionality, embrace minimalism, and use every inch of space strategically. Small spaces can actually promote better organization and a more intentional lifestyle.",
              level: 1,
              number: "1",
            },
            {
              id: "solutions",
              title: "Smart Design Solutions",
              content:
                "Multi-functional furniture, clever storage solutions, and strategic use of light can transform even the smallest spaces into comfortable homes. Consider built-in storage, fold-down furniture, and vertical storage options to maximize your space. Mirrors and light colors can make spaces feel larger and more open.",
              level: 1,
              number: "2",
            },
            {
              id: "furniture",
              title: "Multi-Functional Furniture Ideas",
              content:
                "Invest in furniture that serves multiple purposes: a sofa bed for guests, a dining table that converts to a desk, or storage ottomans that provide seating and organization. These pieces maximize functionality while minimizing the furniture footprint in your space.",
              level: 1,
              number: "3",
            },
          ],
        },
        {
          id: "blog-6",
          title: "Biophilic Design: Bringing Nature Indoors",
          heroImage: "/placeholder.svg",
          tags: ["Biophilic Design", "Nature", "Wellness", "Indoor Plants", "Natural Materials", "Health"],
          createdAt: "2024-02-10",
          sections: [
            {
              id: "biophilia",
              title: "What is Biophilic Design?",
              content:
                "Biophilic design is an approach to architecture and interior design that seeks to connect building occupants more closely to nature. It incorporates natural elements, materials, and patterns to create spaces that promote health, well-being, and productivity. This design philosophy recognizes our innate need to connect with nature.",
              level: 1,
              number: "1",
            },
            {
              id: "elements",
              title: "Key Elements of Biophilic Design",
              content:
                "Essential elements include natural light, plants, water features, natural materials like wood and stone, and views of nature. These elements can be incorporated through large windows, living walls, indoor gardens, and the use of organic shapes and patterns that mimic natural forms.",
              level: 1,
              number: "2",
            },
            {
              id: "benefits",
              title: "Health and Wellness Benefits",
              content:
                "Studies show that biophilic design can reduce stress, improve cognitive function, and enhance overall well-being. Exposure to natural elements has been linked to lower blood pressure, improved mood, and increased productivity. It's not just about aesthetics—it's about creating healthier living and working environments.",
              level: 1,
              number: "3",
            },
          ],
        },
        {
          id: "blog-7",
          title: "Luxury Bathroom Design: Creating Your Personal Spa",
          heroImage: "/placeholder.svg",
          tags: ["Bathroom", "Luxury", "Spa", "Wellness", "Renovation", "Design"],
          createdAt: "2024-02-15",
          sections: [
            {
              id: "luxury",
              title: "Defining Luxury in Bathroom Design",
              content:
                "Luxury bathrooms go beyond basic functionality to create spa-like experiences that promote relaxation and well-being. Key elements include premium materials, thoughtful lighting, ample storage, and high-end fixtures that combine beauty with superior performance. The goal is to create a personal retreat within your home.",
              level: 1,
              number: "1",
            },
            {
              id: "materials",
              title: "Premium Materials and Finishes",
              content:
                "Luxury bathrooms often feature natural stone, high-end tile, and custom millwork. Consider marble or granite countertops, heated floors, and custom cabinetry. Attention to detail in hardware, lighting, and accessories elevates the overall design and creates a cohesive, high-end aesthetic.",
              level: 1,
              number: "2",
            },
            {
              id: "features",
              title: "Spa-Like Features and Amenities",
              content:
                "Incorporate features like steam showers, soaking tubs, heated towel racks, and smart mirrors. Consider adding a seating area, built-in storage for towels and toiletries, and ambient lighting that can be adjusted for different moods and times of day.",
              level: 1,
              number: "3",
            },
          ],
        },
        {
          id: "blog-8",
          title: "Smart Home Integration: Technology Meets Design",
          heroImage: "/placeholder.svg",
          tags: ["Smart Home", "Technology", "Automation", "Design", "Innovation", "Future"],
          createdAt: "2024-02-20",
          sections: [
            {
              id: "integration",
              title: "Seamlessly Integrating Technology",
              content:
                "Modern homes increasingly incorporate smart technology, but the key is integrating these systems seamlessly into the design. Smart home features should enhance rather than dominate the space, with controls that are intuitive and interfaces that complement the overall aesthetic of the home.",
              level: 1,
              number: "1",
            },
            {
              id: "systems",
              title: "Essential Smart Home Systems",
              content:
                "Key systems include lighting control, climate management, security, and entertainment. Smart lighting can create different moods and save energy, while automated climate control ensures comfort and efficiency. Security systems provide peace of mind, and integrated audio-visual systems create immersive entertainment experiences.",
            level: 1,
            number: "2",
          },
            {
              id: "design",
              title: "Design Considerations for Smart Homes",
              content:
                "Planning for smart home integration requires careful consideration of wiring, placement of devices, and user interfaces. Work with designers and technology specialists to ensure that smart features are both functional and aesthetically pleasing, with minimal visible technology and maximum user convenience.",
              level: 1,
              number: "3",
            },
          ],
        },
      ]
      setBlogs(sampleBlogs)
      localStorage.setItem("blogs", JSON.stringify(sampleBlogs))
    }
  }, [])

  const handleAddBlog = () => {
    router.push("/dashboard/manage-blog/add")
  }

  const handleViewBlog = (blogId: string) => {
    router.push(`/dashboard/manage-blog/view/${blogId}`)
  }

  const handleDeleteBlog = (blogId: string) => {
    setDeleteModal({ isOpen: true, blogId })
  }

  const confirmDelete = () => {
    if (deleteModal.blogId) {
      const updatedBlogs = blogs.filter((blog) => blog.id !== deleteModal.blogId)
      setBlogs(updatedBlogs)
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
    }
    setDeleteModal({ isOpen: false, blogId: null })
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#ec1e24]">Manage Blog</h1>
          <Button onClick={handleAddBlog} className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white w-full sm:w-auto">
          <PlusIcon />
          <span className="ml-2">Add New Blog</span>
        </Button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search blogs..." />

        <div className="mt-6">
          {filteredBlogs.length === 0 ? (
            <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 p-8 text-center">
              <p className="text-gray-500 dark:text-white/60">
                {searchTerm
                  ? "No blogs found matching your search."
                  : "No blogs found. Add your first blog to get started!"}
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-[#ec1e24]/10">
                      <TableHead className="font-medium dark:text-white">Title</TableHead>
                      <TableHead className="hidden sm:table-cell font-medium dark:text-white">Tags</TableHead>
                      <TableHead className="hidden md:table-cell font-medium dark:text-white">Created Date</TableHead>
                      <TableHead className="font-medium dark:text-white text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentBlogs.map((blog) => (
                      <TableRow key={blog.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2d35]/50">
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          <div>
                            <div className="text-sm sm:text-base">{blog.title}</div>
                            <div className="sm:hidden mt-1 flex flex-wrap gap-1">
                              {blog.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="bg-gray-100 dark:bg-[#2a2d35] text-gray-700 dark:text-white/80 px-2 py-0.5 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 2 && <span className="text-gray-500 dark:text-white/60 text-xs">+{blog.tags.length - 2}</span>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-gray-700 dark:text-white/80">
                          <div className="flex flex-wrap gap-1">
                            {blog.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="bg-gray-100 dark:bg-[#2a2d35] text-gray-700 dark:text-white/80 px-2 py-0.5 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            {blog.tags.length > 2 && <span className="text-gray-500 dark:text-white/60 text-xs">+{blog.tags.length - 2}</span>}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-700 dark:text-white/80 text-sm">{blog.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 sm:gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewBlog(blog.id)}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="p-4 border-t dark:border-gray-700">
                  <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
                </div>
              )}
            </div>
          )}
        </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blogId: null })}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        type="delete"
      />
      </div>
    </div>
  )
}
