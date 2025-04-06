"use client"

import { useEffect, useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"

export function UbiquitiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Grid point class
    class GridPoint {
      x: number
      y: number
      baseSize: number
      size: number
      color: string
      distanceFromMouse = 0
      originalX: number
      originalY: number

      constructor(x: number, y: number) {
        this.originalX = x
        this.originalY = y
        this.x = x
        this.y = y
        this.baseSize = 1
        this.size = this.baseSize
        this.color = "rgba(5, 89, 201, 0.15)" // Ubiquiti blue with low opacity
      }

      update(mouseX: number, mouseY: number) {
        // Calculate distance from mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        this.distanceFromMouse = Math.sqrt(dx * dx + dy * dy)

        // React to mouse with subtle movement
        const maxDistance = 100
        if (this.distanceFromMouse < maxDistance) {
          const force = (1 - this.distanceFromMouse / maxDistance) * 0.2
          this.size = this.baseSize + force * 2
        } else {
          this.size = this.baseSize
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create grid points
    const gridPoints: GridPoint[] = []
    const gridSize = 40

    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        gridPoints.push(new GridPoint(x, y))
      }
    }

    // Animation loop
    let animationFrameId: number

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouseXValue = springX.get()
      const mouseYValue = springY.get()

      // Fill with white background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw grid points
      gridPoints.forEach((point) => {
        point.update(mouseXValue, mouseYValue)
        point.draw(ctx)
      })

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(5, 89, 201, 0.05)" // Ubiquiti blue with very low opacity
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Add subtle gradient overlay at the top
      const gradient = ctx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, "rgba(245, 245, 247, 0.8)")
      gradient.addColorStop(1, "rgba(245, 245, 247, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, 300)

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mouseX, mouseY, springX, springY])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

