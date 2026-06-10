import Link from "next/link"
import { PAGE_GUTTERS } from "@/lib/constants"

export default function NotFound() {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-background text-foreground ${PAGE_GUTTERS}`}>
      <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-medium mb-4 text-center">Page not found</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The page you are looking for may have moved or no longer exists.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}
