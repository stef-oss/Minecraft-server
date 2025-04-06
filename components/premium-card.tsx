"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PremiumCardProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  glowOnHover?: boolean
  borderGradient?: boolean
  hoverEffect?: "lift" | "scale" | "none"
  glowColor?: string
}

export function PremiumCard({
  title,
  description,
  children,
  className,
  glowOnHover = false,
  borderGradient = false,
  hoverEffect = "none",
  glowColor = "rgba(59, 130, 246, 0.5)",
}: PremiumCardProps) {
  const hoverStyles = {
    lift: {
      whileHover: { y: -5 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    scale: {
      whileHover: { scale: 1.02 },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    none: {},
  }

  const hoverProps = hoverEffect !== "none" ? hoverStyles[hoverEffect] : {}

  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden backdrop-blur-sm",
        glowOnHover && "transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        className,
      )}
      style={
        {
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
      {...hoverProps}
    >
      {borderGradient && (
        <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-blue-500/30 via-blue-800/30 to-blue-900/30" />
      )}
      <div className="relative bg-black/80 rounded-xl p-6 md:p-8 border border-blue-900/50">
        {title && <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{title}</h3>}
        {description && <p className="text-blue-200 mb-6">{description}</p>}
        {children}
      </div>
    </motion.div>
  )
}

