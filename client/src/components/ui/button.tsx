import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300",
  {
    variants: {
      variant: {
        default:
           // RED ANTLER: Premium gradient with hover lift
           "btn-premium bg-gradient-to-br from-coral to-[#D55A45] text-ivory shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] border-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
        outline:
          // Enhanced outline with animation
          " border-2 [border-color:var(--button-outline)] shadow-xs active:shadow-none hover:bg-parchment/50 transition-all",
        secondary:
          "border-2 bg-secondary text-secondary-foreground border-secondary-border hover:bg-opacity-90",
        ghost: "border border-transparent hover:bg-parchment/30",
        link: "text-primary underline-offset-4 hover:underline hover:text-ink transition-colors",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-12 rounded-lg px-12 py-7 text-lg", // RED ANTLER: More generous sizing
        icon: "h-9 w-9",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
