import { BarChart3, FileText, User } from "lucide-react"

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-[#001F4B]" />
            <div>
              <h3 className="font-semibold text-[#001F4B] font-montserrat">Total Projects</h3>
              <p className="text-2xl font-bold text-gray-900 font-montserrat">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#001F4B]" />
            <div>
              <h3 className="font-semibold text-[#001F4B] font-montserrat">Blog Posts</h3>
              <p className="text-2xl font-bold text-gray-900 font-montserrat">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-[#001F4B]" />
            <div>
              <h3 className="font-semibold text-[#001F4B] font-montserrat">Active Clients</h3>
              <p className="text-2xl font-bold text-gray-900 font-montserrat">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
