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

export default function TeamPage() {
  const { teamMembers, deleteTeamMember } = useData()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Team</h1>
          <p className="text-gray-600 mt-2">Manage your team members and their information</p>
        </div>

        <Link href="/dashboard/manage-team/add">
          <Button className="bg-[#001F4B] hover:bg-[#001F4B]/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </Link>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search team members..." />

      {/* Team List */}
      <div className="space-y-4">
        {filteredMembers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No team members found" : "No team members yet"}
              </h3>
              <p className="text-gray-500 text-center mb-4">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Start building your team by adding your first team member."}
              </p>
              {!searchTerm && (
                <Link href="/dashboard/manage-team/add">
                  <Button className="bg-[#001F4B] hover:bg-[#001F4B]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#001F4B] flex items-center justify-center">
                      {member.avatar ? (
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-lg">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {member.position}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link href={`/dashboard/manage-team/view/${member.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 pl-16">
                  <p className="text-sm text-gray-500">{member.description}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

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
