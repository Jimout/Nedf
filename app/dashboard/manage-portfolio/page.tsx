"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/Search-bar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

interface CustomField {
  id: string
  type: "text" | "list"
  label: string
  value: string | string[]
}

interface Project {
  id: number
  name: string
  year: string
  client: string
  location: string
  area: string
  topology: string
  role: string
  status: string
  beforeImage: string
  afterImage: string
  inspiration: string
  description: string
  features: string[]
  materials: string[]
  colorPalette: string[]
  galleryImages: string[]
  customFields?: CustomField[]
}

export default function ManagePortfolioPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; projectId: number | null }>({
    isOpen: false,
    projectId: null,
  })

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolioProjects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      const sampleProject: Project = {
        id: 1,
        name: "Modern Luxury Villa Renovation",
        year: "2024",
        client: "The Johnson Family",
        location: "Beverly Hills, California",
        area: "4,500 sq ft",
        topology: "Hillside",
        role: "Lead Interior Designer",
        status: "Completed",
        beforeImage: "/old-traditional-house-before-renovation.jpg",
        afterImage: "/modern-luxury-villa-after-renovation.jpg",
        inspiration:
          "Contemporary minimalism meets warm Mediterranean influences. The design draws inspiration from mid-century modern architecture while incorporating sustainable materials and smart home technology.",
        description:
          "A complete transformation of a 1960s ranch-style home into a contemporary luxury villa. The project involved opening up the floor plan, adding floor-to-ceiling windows, and creating seamless indoor-outdoor living spaces. The design emphasizes natural light, clean lines, and a neutral color palette with warm wood accents.",
        features: [
          "Open-concept living spaces",
          "Floor-to-ceiling windows",
          "Smart home automation",
          "Sustainable materials",
          "Indoor-outdoor integration",
          "Custom built-in storage",
          "Energy-efficient lighting",
          "Heated floors",
          "Wine cellar",
          "Home theater",
        ],
        materials: [
          "White oak flooring",
          "Carrara marble countertops",
          "Blackened steel fixtures",
          "Natural stone accent walls",
          "Reclaimed wood beams",
          "Glass and aluminum windows",
          "Porcelain tile",
          "Brass hardware",
          "Concrete floors",
          "Natural fiber rugs",
        ],
        colorPalette: ["#F8F9FA", "#6C757D", "#8B4513", "#2C3E50", "#E9ECEF"],
        galleryImages: [
          "/modern-living-room-with-floor-to-ceiling-windows.jpg",
          "/luxury-marble-kitchen.png",
          "/master-bedroom-walk-in.png",
          "/spa-like-bathroom-with-freestanding-tub.jpg",
          "/outdoor-patio-with-infinity-pool.jpg",
          "/home-office-built-in-shelving.png",
          "/wine-cellar-with-custom-storage.jpg",
          "/home-theater-with-comfortable-seating.jpg",
        ],
      }

      setProjects([sampleProject])
      localStorage.setItem("portfolioProjects", JSON.stringify([sampleProject]))
    }
  }, [])

  const handleAddProject = () => {
    router.push("/dashboard/manage-portfolio/add")
  }

  const handleEditProject = (id: number) => {
    router.push(`/dashboard/manage-portfolio/edit/${id}`)
  }

  const handleDeleteProject = (id: number) => {
    setDeleteModal({ isOpen: true, projectId: id })
  }

  const confirmDelete = () => {
    if (deleteModal.projectId) {
      const updatedProjects = projects.filter((project) => project.id !== deleteModal.projectId)
      setProjects(updatedProjects)
      localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects))
    }
    setDeleteModal({ isOpen: false, projectId: null })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
      case "In Progress":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
      case "On Hold":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
      case "Planning":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
      case "UnderConstruction":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 font-montserrat">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Manage Portfolio</h1>
          <Button onClick={handleAddProject} className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            <PlusIcon />
            <span className="ml-2">Add New Project</span>
          </Button>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search projects..." />

        <div className="mt-6">
          {filteredProjects.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-muted-foreground font-montserrat">
                {searchTerm
                  ? "No projects found matching your search."
                  : "No projects found. Add your first project to get started!"}
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted border-b border-border">
                      <TableHead className="font-montserrat font-semibold text-foreground">Title</TableHead>
                      <TableHead className="hidden sm:table-cell font-montserrat font-semibold text-foreground">Client</TableHead>
                      <TableHead className="hidden md:table-cell font-montserrat font-semibold text-foreground">Status</TableHead>
                      <TableHead className="font-montserrat font-semibold text-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProjects.map((project) => (
                      <TableRow key={project.id} className="hover:bg-muted/50 border-b border-border">
                        <TableCell className="font-medium font-montserrat text-foreground">
                          <Link
                            href={`/portfolio/${project.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-left hover:underline cursor-pointer focus:outline-none focus:underline"
                          >
                            <div className="text-sm sm:text-base">{project.name}</div>
                          </Link>
                          <div className="sm:hidden text-xs text-muted-foreground mt-1">{project.client}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell font-montserrat text-muted-foreground">{project.client}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 sm:gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditProject(project.id)}
                              className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="p-4 border-t border-border">
                  <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
                </div>
              )}
            </div>
          )}
        </div>

        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, projectId: null })}
          onConfirm={confirmDelete}
          title="Delete Project"
          message="Are you sure you want to delete this project? This action cannot be undone."
          type="delete"
        />
      </div>
    </div>
  )
}
