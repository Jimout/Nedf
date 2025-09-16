"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye, Plus, Linkedin, Twitter, Github, Globe } from "lucide-react"
import { Users } from "lucide-react" // Import Users component

interface TeamMember {
  id: string
  name: string
  position: string
  description: string
  email: string
  socialMedia: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  avatar?: string
}

export default function ManageTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Smith",
      position: "Senior Developer",
      description:
        "Experienced full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about creating scalable solutions.",
      email: "john.smith@nedf.com",
      socialMedia: {
        linkedin: "https://linkedin.com/in/johnsmith",
        github: "https://github.com/johnsmith",
        website: "https://johnsmith.dev",
      },
    },
    {
      id: "2",
      name: "Sarah Johnson",
      position: "UI/UX Designer",
      description:
        "Creative designer focused on user-centered design principles. Specializes in creating intuitive and beautiful digital experiences.",
      email: "sarah.johnson@nedf.com",
      socialMedia: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahdesigns",
      },
    },
  ])

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    position: "",
    description: "",
    email: "",
    socialMedia: {},
  })

  const handleAddMember = () => {
    if (newMember.name && newMember.position && newMember.email) {
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newMember.name,
        position: newMember.position,
        description: newMember.description || "",
        email: newMember.email,
        socialMedia: newMember.socialMedia || {},
      }
      setTeamMembers([...teamMembers, member])
      setNewMember({ name: "", position: "", description: "", email: "", socialMedia: {} })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member)
    setIsViewDialogOpen(true)
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="w-4 h-4" />
      case "twitter":
        return <Twitter className="w-4 h-4" />
      case "github":
        return <Github className="w-4 h-4" />
      case "website":
        return <Globe className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Team</h1>
          <p className="text-gray-600 mt-2">Manage your team members and their information</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#001F4B] hover:bg-[#001F4B]/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newMember.name || ""}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={newMember.position || ""}
                    onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                    placeholder="Enter job position"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email || ""}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMember.description || ""}
                  onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                  placeholder="Brief description about the team member"
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="linkedin" className="text-sm">
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={newMember.socialMedia?.linkedin || ""}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: { ...newMember.socialMedia, linkedin: e.target.value },
                        })
                      }
                      placeholder="LinkedIn profile URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter" className="text-sm">
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={newMember.socialMedia?.twitter || ""}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: { ...newMember.socialMedia, twitter: e.target.value },
                        })
                      }
                      placeholder="Twitter profile URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github" className="text-sm">
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      value={newMember.socialMedia?.github || ""}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: { ...newMember.socialMedia, github: e.target.value },
                        })
                      }
                      placeholder="GitHub profile URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-sm">
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={newMember.socialMedia?.website || ""}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          socialMedia: { ...newMember.socialMedia, website: e.target.value },
                        })
                      }
                      placeholder="Personal website URL"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMember} className="bg-[#001F4B] hover:bg-[#001F4B]/90">
                  Add Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Members List */}
      <div className="grid gap-4">
        {teamMembers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="w-12 h-12 text-gray-400 mb-4" /> {/* Users component imported */}
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
              <p className="text-gray-500 text-center mb-4">
                Start building your team by adding your first team member.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#001F4B] hover:bg-[#001F4B]/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </CardContent>
          </Card>
        ) : (
          teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#001F4B] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {member.position}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewMember(member)}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
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
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* View Member Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle>Team Member Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#001F4B] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">
                      {selectedMember.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                    <Badge className="mt-1 bg-[#001F4B]">{selectedMember.position}</Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Email</Label>
                  <p className="text-gray-900 mt-1">{selectedMember.email}</p>
                </div>

                {selectedMember.description && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                    <p className="text-gray-900 mt-1 leading-relaxed">{selectedMember.description}</p>
                  </div>
                )}

                {Object.keys(selectedMember.socialMedia).length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Social Media</Label>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {Object.entries(selectedMember.socialMedia).map(
                        ([platform, url]) =>
                          url && (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              {getSocialIcon(platform)}
                              <span className="text-sm font-medium capitalize">{platform}</span>
                            </a>
                          ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
