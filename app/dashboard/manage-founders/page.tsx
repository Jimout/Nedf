"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit, Trash2, Search } from "lucide-react"
import Link from "next/link"
import { useData } from "@/lib/data-context"

interface Founder {
  id: string
  name: string
  position: string
  description: string
  socialMedia: {
    instagram?: string
    tiktok?: string
    behance?: string
    pinterest?: string
    linkedin?: string
    twitter?: string
  }
  avatar?: string
}

export default function ManageFoundersPage() {
  const [founders, setFounders] = useState<Founder[]>([])

  const { founders: contextFounders, deleteFounder } = useData()

  useEffect(() => {
    setFounders(contextFounders)
  }, [contextFounders])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this founder?")) {
      deleteFounder(id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] font-['Montserrat']">
      <div className="w-full p-4 sm:p-6">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24] uppercase tracking-wide">
                Manage Founders
              </h1>
              <p className="text-gray-600 dark:text-white/60 mt-1">
                Manage your company founders
              </p>
            </div>
            <Link href="/dashboard/manage-founders/add">
              <Button className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Founder
              </Button>
            </Link>
          </div>


          {/* Founders Grid */}
          {founders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {founders.map((founder) => (
                <Card key={founder.id} className="dark:bg-[#1a1d23] dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#001F4B] dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                          {founder.avatar ? (
                            <img
                              src={founder.avatar}
                              alt={founder.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {founder.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#001F4B] dark:text-white">{founder.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-white/60">{founder.position}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-white/70 mb-4 line-clamp-2">
                      {founder.description}
                    </p>

                    <div className="flex gap-2">
                      <Link href={`/dashboard/manage-founders/view/${founder.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/manage-founders/edit/${founder.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(founder.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="dark:bg-[#1a1d23] dark:border-gray-700">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 dark:text-white/40 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No founders yet
                </h3>
                <p className="text-gray-600 dark:text-white/60 mb-6">
                  Get started by adding your first founder
                </p>
                  <Link href="/dashboard/manage-founders/add">
                    <Button className="bg-[#001F4B] dark:bg-[#ec1e24] hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Founder
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}
