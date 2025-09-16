"use client";

import { Search, Plus, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const portfolioData = [
  {
    id: 1,
    name: "Hidasse Telecom",
    client: "Snap Trading And Industry plc",
    status: "UnderConstruction",
  },
  {
    id: 2,
    name: "Hidasse Telecom",
    client: "Snap Trading And Industry plc",
    status: "UnderConstruction",
  },
  {
    id: 3,
    name: "Hidasse Telecom",
    client: "Snap Trading And Industry plc",
    status: "UnderConstruction",
  },
  {
    id: 4,
    name: "Hidasse Telecom",
    client: "Snap Trading And Industry plc",
    status: "UnderConstruction",
  },
  {
    id: 5,
    name: "Hidasse Telecom",
    client: "Snap Trading And Industry plc",
    status: "UnderConstruction",
  },
];

export default function ManagePortfolioPage() {
  return (
    <div className="space-y-6">
      {/* Header with search */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#001F4B] font-montserrat">Manage Portfolios</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search" className="pl-10 w-64 border-gray-200 font-montserrat" />
        </div>
      </div>

      {/* Add Project button */}
      <div className="mb-6">
        <Link href="/dashboard/manage-portfolio/add">
          <Button className="bg-[#001F4B] hover:bg-[#001F4B]/90 text-white font-montserrat flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      {/* Portfolio table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-[#001F4B] font-semibold font-montserrat">Name</TableHead>
              <TableHead className="text-[#001F4B] font-semibold font-montserrat">Client</TableHead>
              <TableHead className="text-[#001F4B] font-semibold font-montserrat">Status</TableHead>
              <TableHead className="text-[#001F4B] font-semibold font-montserrat">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioData.map((item, index) => (
              <TableRow key={item.id} className="border-b border-gray-100">
                <TableCell className="font-medium font-montserrat">
                  <span className="text-gray-600 mr-2">{index + 1}.</span>
                  {item.name}
                </TableCell>
                <TableCell className="text-gray-600 font-montserrat">{item.client}</TableCell>
                <TableCell>
                  <span className="text-gray-600 font-montserrat">{item.status}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/manage-portfolio/${item.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-500 hover:text-green-600 hover:bg-green-50 font-montserrat flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 font-montserrat flex items-center"
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

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent font-montserrat"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-gray-600 px-3 font-montserrat">1 of 3</span>
        <Button
          variant="outline"
          size="sm"
          className="border-[#001F4B] text-[#001F4B] hover:bg-[#001F4B] hover:text-white bg-transparent font-montserrat"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
