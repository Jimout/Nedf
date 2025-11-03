import Footer from "@/components/Footer"
import type React from "react"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full">
        {children}
      </div>
      <Footer />
    </div>
  )
}
