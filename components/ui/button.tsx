import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const buttonVariants = (className?: string, variant: "default" | "outline" | "ghost" = "default", size: "default" | "sm" | "lg" = "default") => {
    const variants = {
        default: "bg-black text-white hover:opacity-90",
        outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-black",
        ghost: "hover:bg-gray-100 hover:text-black"
    }
    const sizes = {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-full px-8"
    }

    return cn(
        "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
    )
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={buttonVariants(className, variant)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
