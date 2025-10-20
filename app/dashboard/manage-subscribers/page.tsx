"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@/components/Confirmation-modal"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/Search-bar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Mail, Users, TrendingUp } from "lucide-react"

interface Subscriber {
  id: string
  email: string
  subscribedAt: string
  status: "active" | "unsubscribed"
  source?: string
}

export default function ManageSubscribersPage() {
  const router = useRouter()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; subscriberId: string | null }>({
    isOpen: false,
    subscriberId: null,
  })

  useEffect(() => {
    const savedSubscribers = localStorage.getItem("subscribers")
    if (savedSubscribers) {
      setSubscribers(JSON.parse(savedSubscribers))
    } else {
      // Sample subscriber data
      const sampleSubscribers: Subscriber[] = [
        {
          id: "sub-1",
          email: "eden@gmail.com",
          subscribedAt: "2024-10-20",
          status: "active",
          source: "Website"
        },
        {
          id: "sub-2",
          email: "sam@company.com",
          subscribedAt: "2024-10-21",
          status: "active",
          source: "Blog"
        },
        {
          id: "sub-3",
          email: "bot123@fake.com",
          subscribedAt: "2024-10-22",
          status: "unsubscribed",
          source: "Website"
        },
        {
          id: "sub-4",
          email: "alex@designstudio.com",
          subscribedAt: "2024-10-23",
          status: "active",
          source: "Portfolio"
        },
        {
          id: "sub-5",
          email: "maria@architect.com",
          subscribedAt: "2024-10-24",
          status: "active",
          source: "Blog"
        },
        {
          id: "sub-6",
          email: "john@construction.com",
          subscribedAt: "2024-10-25",
          status: "unsubscribed",
          source: "Website"
        },
        {
          id: "sub-7",
          email: "sarah@interior.com",
          subscribedAt: "2024-10-26",
          status: "active",
          source: "Blog"
        },
        {
          id: "sub-8",
          email: "mike@realestate.com",
          subscribedAt: "2024-10-27",
          status: "active",
          source: "Portfolio"
        },
        {
          id: "sub-9",
          email: "lisa@design.com",
          subscribedAt: "2024-10-28",
          status: "active",
          source: "Website"
        },
        {
          id: "sub-10",
          email: "david@studio.com",
          subscribedAt: "2024-10-29",
          status: "unsubscribed",
          source: "Blog"
        },
        {
          id: "sub-11",
          email: "emma@creative.com",
          subscribedAt: "2024-10-30",
          status: "active",
          source: "Portfolio"
        },
        {
          id: "sub-12",
          email: "tom@architect.com",
          subscribedAt: "2024-11-01",
          status: "active",
          source: "Website"
        }
      ]
      setSubscribers(sampleSubscribers)
      localStorage.setItem("subscribers", JSON.stringify(sampleSubscribers))
    }
  }, [])

  const handleDeleteSubscriber = (subscriberId: string) => {
    setDeleteModal({ isOpen: true, subscriberId })
  }

  const confirmDelete = () => {
    if (deleteModal.subscriberId) {
      const updatedSubscribers = subscribers.filter((sub) => sub.id !== deleteModal.subscriberId)
      setSubscribers(updatedSubscribers)
      localStorage.setItem("subscribers", JSON.stringify(updatedSubscribers))
    }
    setDeleteModal({ isOpen: false, subscriberId: null })
  }

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSubscribers = filteredSubscribers.slice(startIndex, endIndex)

  const activeSubscribers = subscribers.filter(sub => sub.status === "active").length
  const newThisWeek = subscribers.filter(sub => {
    const subDate = new Date(sub.subscribedAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return subDate >= weekAgo
  }).length

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24]">
              Subscribers
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-white/60">Total Subscribers</p>
                <p className="text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24]">{subscribers.length}</p>
              </div>
              <Users className="w-8 h-8 text-[#001F4B] dark:text-[#ec1e24]" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-white/60">Active Subscribers</p>
                <p className="text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24]">{activeSubscribers}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#001F4B] dark:text-[#ec1e24]" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-white/60">New This Week</p>
                <p className="text-3xl font-bold text-[#001F4B] dark:text-[#ec1e24]">+{newThisWeek}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#001F4B] dark:text-[#ec1e24]" />
            </div>
          </div>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search subscribers by email..." />

        <div className="mt-6">
          {filteredSubscribers.length === 0 ? (
            <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 p-8 text-center">
              <p className="text-gray-500 dark:text-white/60">
                {searchTerm
                  ? "No subscribers found matching your search."
                  : "No subscribers found. Start building your audience!"}
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1a1d23] rounded-lg border dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-[#ec1e24]/10">
                      <TableHead className="font-medium dark:text-white">Email</TableHead>
                      <TableHead className="hidden md:table-cell font-medium dark:text-white">Subscribed On</TableHead>
                      <TableHead className="font-medium dark:text-white">Status</TableHead>
                      <TableHead className="font-medium dark:text-white text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentSubscribers.map((subscriber) => (
                      <TableRow key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-[#2a2d35]/50">
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          <div className="text-sm sm:text-base">{subscriber.email}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-700 dark:text-white/80 text-sm">
                          {formatDate(subscriber.subscribedAt)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              subscriber.status === "active"
                                ? "bg-[#001F4B]/10 text-[#001F4B] dark:bg-[#ec1e24]/10 dark:text-[#ec1e24]"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {subscriber.status === "active" ? "Active" : "Unsubscribed"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                            className="text-[#001F4B] dark:text-[#ec1e24] hover:bg-[#001F4B]/10 dark:hover:bg-[#ec1e24]/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
          onClose={() => setDeleteModal({ isOpen: false, subscriberId: null })}
          onConfirm={confirmDelete}
          title="Delete Subscriber"
          message="Are you sure you want to remove this subscriber? This action cannot be undone."
          type="delete"
        />
      </div>
    </div>
  )
}
