"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  className?: string
  glowColor?: string
  asChild?: boolean
}

export function AnimatedButton({
  children,
  variant = "default",
  size = "default",
  isLoading = false,
  loadingText,
  icon,
  className,
  glowColor = "rgba(59, 130, 246, 0.5)",
  asChild = false,
  ...props
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Define base button styles based on variant
  const getButtonClass = () => {
    if (variant === "premium") {
      return "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0"
    }
    return ""
  }

  return (
    <div className="relative">
      {/* Glow effect */}
      {variant === "premium" && (
        <motion.div
          className="absolute inset-0 rounded-md opacity-0"
          style={{
            boxShadow: `0 0 20px ${glowColor}`,
            backgroundColor: "transparent",
          }}
          animate={{
            opacity: isHovered ? 0.7 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      <Button
        variant={variant === "premium" ? "default" : variant}
        size={size}
        className={cn(getButtonClass(), "relative overflow-hidden transition-all duration-300", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isLoading || props.disabled}
        asChild={asChild}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {/* Shimmer effect */}
            {variant === "premium" && isHovered && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transform: "translateX(-100%)",
                }}
                animate={{ x: ["0%", "200%"] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
              />
            )}

            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingText || children}
              </>
            ) : (
              <>
                {icon && <span className="mr-2">{icon}</span>}
                {children}
              </>
            )}
          </>
        )}
      </Button>
    </div>
  )
}

