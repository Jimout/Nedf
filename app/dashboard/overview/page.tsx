import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, FileText, Briefcase, MessageSquare, TrendingUp, Mail } from "lucide-react"

export default function OverviewPage() {
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      description: "Active portfolio items",
      icon: Briefcase,
      trend: "+2 this month",
    },
    {
      title: "Blog Posts",
      value: "24",
      description: "Published articles",
      icon: FileText,
      trend: "+3 this week",
    },
    {
      title: "Team Members",
      value: "8",
      description: "Active collaborators",
      icon: Users,
      trend: "+1 this month",
    },
    {
      title: "Reviews",
      value: "47",
      description: "Client testimonials",
      icon: MessageSquare,
      trend: "+5 this month",
    },
    {
      title: "Subscribers",
      value: "1,248",
      description: "Newsletter subscribers",
      icon: Mail,
      trend: "+20 this week",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#15171a] p-4 sm:p-6 font-['Montserrat']">
      <div className="w-full">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#ec1e24]">Dashboard Overview</h1>
            <p className="text-gray-600 dark:text-white/60 mt-2">Welcome back! Here's what's happening with your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-[#1a1d23] dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-white/80">{stat.title}</CardTitle>
                    <Icon className="h-4 w-4 text-[#001F4B] dark:text-[#ec1e24]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <p className="text-xs text-gray-600 dark:text-white/60 mt-1">{stat.description}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-3 w-3 text-[#001F4B] dark:text-[#ec1e24] mr-1" />
                      <span className="text-xs text-[#001F4B] dark:text-[#ec1e24]">{stat.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dark:bg-[#1a1d23] dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <BarChart3 className="h-5 w-5 text-[#001F4B] dark:text-[#ec1e24]" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-white/60">Your latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-[#001F4B]/5 dark:bg-[#ec1e24]/10 rounded-lg">
                    <div className="w-2 h-2 bg-[#001F4B] dark:bg-[#ec1e24] rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">New blog post published</p>
                      <p className="text-xs text-gray-500 dark:text-white/60">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#001F4B]/5 dark:bg-[#ec1e24]/10 rounded-lg">
                    <div className="w-2 h-2 bg-[#001F4B] dark:bg-[#ec1e24] rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Portfolio project updated</p>
                      <p className="text-xs text-gray-500 dark:text-white/60">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#001F4B]/5 dark:bg-[#ec1e24]/10 rounded-lg">
                    <div className="w-2 h-2 bg-[#001F4B] dark:bg-[#ec1e24] rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">New team member added</p>
                      <p className="text-xs text-gray-500 dark:text-white/60">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
