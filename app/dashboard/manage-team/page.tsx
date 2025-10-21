"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye, Plus, Users } from "lucide-react"
import Link from "next/link"
import ConfirmationModal from "@/components/Confirmation-modal"
import { useData } from "@/lib/data-context"
import SearchBar from "@/components/Search-bar"
import Pagination from "@/components/Pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TeamPage() {
  const { teamMembers, deleteTeamMember } = useData()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const handleDeleteMember = (id: string) => {
    setMemberToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (memberToDelete) deleteTeamMember(memberToDelete)
    setShowDeleteModal(false)
    setMemberToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setMemberToDelete(null)
  }

  const filteredMembers = teamMembers.filter((member) => {
    const search = searchTerm.toLowerCase()
    return (
      member.name.toLowerCase().includes(search) ||
      member.position.toLowerCase().includes(search) ||
      member.description.toLowerCase().includes(search)
    )
  })

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

  return (
    <div className="space-y-6 dark:bg-[#15171a] min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#ec1e24]">Manage Team</h1>
        </div>

        <Link href="/dashboard/manage-team/add" className="w-full sm:w-auto">
          <Button className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </Link>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search team members..." />

      {/* Team Table */}
      {filteredMembers.length === 0 ? (
        <Card className="dark:bg-[#1a1d23] dark:border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-gray-400 dark:text-white/60 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? "No team members found" : "No team members yet"}
            </h3>
            <p className="text-gray-500 dark:text-white/60 text-center mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Start building your team by adding your first team member."}
            </p>
            {!searchTerm && (
              <Link href="/dashboard/manage-team/add">
                <Button className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-[#ec1e24]/10">
                    <TableHead className="font-medium text-[#001F4B] dark:text-white">Name</TableHead>
                    <TableHead className="hidden sm:table-cell font-medium text-[#001F4B] dark:text-white">Position</TableHead>
                    <TableHead className="hidden lg:table-cell font-medium text-[#001F4B] dark:text-white">Description</TableHead>
                    <TableHead className="font-medium text-[#001F4B] dark:text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMembers.map((member) => (
                    <TableRow key={member.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2d35]/50">
                      <TableCell className="font-medium text-[#001F4B] dark:text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-[#001F4B] dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                            {member.avatar ? (
                              <img
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-bold text-xs sm:text-sm">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="text-sm sm:text-base dark:text-white">{member.name}</div>
                            <div className="sm:hidden text-xs text-gray-500 dark:text-white/60 mt-1">{member.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-gray-700 dark:text-white/80 text-sm">{member.position}</TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-600 dark:text-white/60 max-w-md">
                        <p className="line-clamp-2 text-sm">{member.description}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Link href={`/dashboard/manage-team/view/${member.id}`}>
                            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
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
          </div>

          {totalPages > 1 && (
            <Pagination page={currentPage} setPage={setCurrentPage} total={totalPages} />
          )}
        </>
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        type="delete"
      />
    </div>
  )
}
