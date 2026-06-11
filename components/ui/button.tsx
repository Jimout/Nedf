import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation select-none [-webkit-tap-highlight-color:transparent] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:bg-primary/80 active:shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        ghost:
          "shadow-none hover:bg-accent hover:text-accent-foreground active:bg-accent/80 hover:shadow-none hover:translate-y-0",
        link:
          "text-primary underline-offset-4 shadow-none hover:underline hover:shadow-none hover:translate-y-0 active:translate-y-0",
        paginationPrev:
          "bg-white text-black shadow-none hover:bg-gray-100 active:bg-gray-200 hover:shadow-none hover:translate-y-0 disabled:opacity-40 dark:bg-white/10 dark:text-white/40 dark:hover:bg-white/20 dark:active:bg-white/30 dark:disabled:hover:bg-white/10",
        paginationNext:
          "bg-[#001F4B] text-white shadow-none hover:bg-[#001F4B]/80 active:bg-[#001F4B]/70 hover:shadow-none hover:translate-y-0 disabled:opacity-40 dark:bg-[#ec1e24] dark:hover:bg-[#ec1e24]/80 dark:active:bg-[#ec1e24]/70 dark:disabled:hover:bg-[#ec1e24]",
      },
      size: {
        default: "h-10 min-h-[44px] px-4 py-2",
        sm: "h-9 min-h-[44px] px-3 text-xs",
        lg: "h-11 min-h-[44px] px-8",
        icon: "h-10 w-10 min-h-[44px] min-w-[44px] p-0",
        pagination:
          "min-h-[44px] min-w-[44px] px-3 py-2 sm:px-4 2xl:px-6 2xl:py-3 3xl:px-8 3xl:py-4 4xl:px-10 4xl:py-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
