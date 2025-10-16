import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { DynamicBackground } from "@/components/dynamic-background"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Professional Next.js App",
  description: "A professional Next.js application with Tailwind CSS and shadcn/ui",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <DynamicBackground />
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="bg-white dark:bg-[#15171a] transition-colors duration-300">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
