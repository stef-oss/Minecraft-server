"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion, type Variant } from "framer-motion"

// Hook to safely check if we're on the client side
function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

// Hook to get responsive delay based on screen size
function useResponsiveDelay(baseDelay: number) {
  const isClient = useIsClient()
  const [delay, setDelay] = useState(baseDelay)

  useEffect(() => {
    if (isClient) {
      const handleResize = () => {
        // Reduce delay on mobile devices
        const isMobile = window.innerWidth < 768
        setDelay(isMobile ? Math.max(0, baseDelay - 0.2) : baseDelay)
      }

      // Initial check
      handleResize()

      // Add resize listener
      window.addEventListener("resize", handleResize)

      // Cleanup
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [isClient, baseDelay])

  return delay
}

interface AnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  // Allow passing additional motion props
  motionProps?: Record<string, any>
}

interface SlideInProps extends AnimationProps {
  direction?: "left" | "right" | "up" | "down"
  distance?: number
}

interface FeatureHighlightProps extends AnimationProps {
  pulseColor?: string
  pulseSize?: number
  pulseCount?: number
}

interface SpecsRevealProps extends AnimationProps {
  specs: Array<{
    label: string
    value: string | number
    icon?: ReactNode
  }>
  labelClassName?: string
  valueClassName?: string
  specClassName?: string
  staggerDelay?: number
  direction?: "horizontal" | "vertical"
}

// Animation presets for consistent animations
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideDirections: {
    up: (distance = 30) => ({ y: distance, x: 0 }),
    down: (distance = 30) => ({ y: -distance, x: 0 }),
    left: (distance = 30) => ({ x: distance, y: 0 }),
    right: (distance = 30) => ({ x: -distance, y: 0 }),
  },
  rotate: {
    initial: { opacity: 0, scale: 0.9, rotate: -5 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
  },
}

export function DarkFadeIn({ 
  children, 
  className = "", 
  delay: baseDelay = 0,
  duration = 0.5,
  motionProps = {}
}: AnimationProps) {
  const delay = useResponsiveDelay(baseDelay)
  const isClient = useIsClient()

  // Server-side rendering fallback
  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={animations.fadeIn.initial}
      animate={animations.fadeIn.animate}
      transition={{ duration, delay, ease: "easeOut" }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

export function DarkSlideIn({ 
  children, 
  className = "", 
  direction = "up", 
  delay: baseDelay = 0,
  duration = 0.5,
  distance = 30,
  motionProps = {}
}: SlideInProps) {
  const delay = useResponsiveDelay(baseDelay)
  const isClient = useIsClient()

  // Server-side rendering fallback
  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  const directionValues = animations.slideDirections[direction](distance)

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionValues }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut",
        opacity: { duration: duration * 0.8 }, // Fade in slightly faster
        x: { type: "spring", stiffness: 100, damping: 15 },
        y: { type: "spring", stiffness: 100, damping: 15 }
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

export function DarkRotate({ 
  children, 
  className = "", 
  delay: baseDelay = 0,
  duration = 0.5,
  motionProps = {}
}: AnimationProps) {
  const delay = useResponsiveDelay(baseDelay)
  const isClient = useIsClient()

  // Server-side rendering fallback
  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={animations.rotate.initial}
      animate={animations.rotate.animate}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut",
        rotate: { type: "spring", stiffness: 200, damping: 20 }
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

// Feature Highlight with pulse effect
export function DarkFeatureHighlight({ 
  children, 
  className = "", 
  delay: baseDelay = 0,
  duration = 1.5,
  pulseColor = "rgba(255, 255, 255, 0.15)",
  pulseSize = 16,
  pulseCount = 1,
  motionProps = {}
}: FeatureHighlightProps) {
  const delay = useResponsiveDelay(baseDelay)
  const isClient = useIsClient()
  
  // Server-side rendering fallback
  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  const pulseVariants = {
    initial: { 
      scale: 1,
      opacity: 0
    },
    animate: {
      scale: [1, 1 + pulseSize/100],
      opacity: [0, 0.6, 0],
      transition: {
        duration,
        delay,
        times: [0, 0.5, 1],
        repeat: pulseCount - 1,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut" 
      }}
      {...motionProps}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{ backgroundColor: pulseColor, zIndex: -1 }}
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      />
      {children}
    </motion.div>
  )
}

// New component: Specs Reveal
export function DarkSpecsReveal({ 
  children, 
  className = "", 
  specs = [],
  labelClassName = "text-gray-500 text-sm",
  valueClassName = "font-medium text-white",
  specClassName = "flex flex-col mb-4",
  direction = "vertical",
  delay: baseDelay = 0,
  duration = 0.5,
  staggerDelay = 0.1,
  motionProps = {}
}: SpecsRevealProps) {
  const delay = useResponsiveDelay(baseDelay)
  const isClient = useIsClient()
  
  // Server-side rendering fallback
  if (!isClient) {
    return (
      <div className={className}>
        {children}
        <div className={direction === "horizontal" ? "flex gap-6 flex-wrap mt-4" : "mt-4"}>
          {specs.map((spec, index) => (
            <div key={index} className={specClassName}>
              <div className={labelClassName}>{spec.label}</div>
              <div className={valueClassName}>
                {spec.icon && <span className="mr-2">{spec.icon}</span>}
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <DarkFadeIn delay={baseDelay} duration={duration}>
        {children}
      </DarkFadeIn>
      
      <div className={direction === "horizontal" ? "flex gap-6 flex-wrap mt-4" : "mt-4"}>
        {specs.map((spec, index) => (
          <motion.div
            key={index}
            className={specClassName}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration, 
              delay: delay + (index * staggerDelay),
              ease: "easeOut" 
            }}
            {...motionProps}
          >
            <div className={labelClassName}>{spec.label}</div>
            <div className={valueClassName}>
              {spec.icon && <span className="mr-2">{spec.icon}</span>}
              {spec.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Staggered children animation
interface StaggerProps extends AnimationProps {
  staggerDelay?: number
}

export function DarkStagger({ 
  children, 
  className = "", 
  delay: baseDelay = 0,
  staggerDelay = 0.1,
  motionProps = {}
}: StaggerProps) {
  const delay = useResponsiveDelay(baseDelay)
  const isClient = useIsClient()

  // Convert children to array for mapping
  const childrenArray = React.Children.toArray(children)
  
  // Server-side rendering fallback
  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: delay + (index * staggerDelay),
            ease: "easeOut" 
          }}
          {...motionProps}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

