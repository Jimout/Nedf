"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/Search-bar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
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
  const itemsPerPage = 5
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

  const handleViewProject = (id: number) => {
    router.push(`/dashboard/manage-portfolio/view/${id}`)
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
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      case "Planning":
        return "bg-purple-100 text-purple-800"
      case "UnderConstruction":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#001F4B] font-montserrat">Manage Portfolio</h1>
        <Button onClick={handleAddProject} className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white font-montserrat w-full sm:w-auto">
          <PlusIcon />
          <span className="ml-2">Add New Project</span>
        </Button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search projects..." />

      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500 font-montserrat">
            {searchTerm
              ? "No projects found matching your search."
              : "No projects found. Add your first project to get started!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-montserrat font-semibold text-[#001F4B]">Title</TableHead>
                  <TableHead className="hidden sm:table-cell font-montserrat font-semibold text-[#001F4B]">Client</TableHead>
                  <TableHead className="hidden md:table-cell font-montserrat font-semibold text-[#001F4B]">Status</TableHead>
                  <TableHead className="font-montserrat font-semibold text-[#001F4B] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium font-montserrat text-[#001F4B]">
                      <div>
                        <div className="text-sm sm:text-base">{project.name}</div>
                        <div className="sm:hidden text-xs text-gray-500 mt-1">{project.client}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell font-montserrat text-gray-700">{project.client}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 sm:gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProject(project.id)}
                          className="font-montserrat text-xs sm:text-sm"
                        >
                          <EyeIcon />
                          <span className="ml-1 hidden sm:inline">View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 font-montserrat"
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t">
              <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
            </div>
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, projectId: null })}
        onConfirm={confirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        type="delete"
      />
    </div>
  )
}
