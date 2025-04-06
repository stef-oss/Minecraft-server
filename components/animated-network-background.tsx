"use client"

import { useEffect, useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"

export function AnimatedNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

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

    // Network node class
    class NetworkNode {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      connections: NetworkNode[]
      maxConnections: number
      isServer: boolean
      pulseSpeed: number
      pulseAmount: number
      pulseOffset: number
      distanceFromMouse = 0
      originalX: number
      originalY: number
      glowIntensity = 0

      constructor(isServer = false) {
        this.originalX = Math.random() * canvas.width
        this.originalY = Math.random() * canvas.height
        this.x = this.originalX
        this.y = this.originalY
        this.isServer = isServer
        this.baseSize = isServer ? 8 : Math.random() * 2 + 1
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * 0.2
        this.speedY = (Math.random() - 0.5) * 0.2
        this.connections = []
        this.maxConnections = isServer ? 20 : Math.floor(Math.random() * 5) + 2
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseAmount = Math.random() * 0.2 + 0.1
        this.pulseOffset = Math.random() * Math.PI * 2

        // Colors
        if (isServer) {
          this.color = "rgba(59, 130, 246, 0.8)" // Blue for servers
        } else {
          const r = Math.floor(Math.random() * 100)
          const g = Math.floor(Math.random() * 150)
          const b = Math.floor(Math.random() * 255 + 100)
          const a = Math.random() * 0.5 + 0.3
          this.color = `rgba(${r}, ${g}, ${b}, ${a})`
        }
      }

      update(mouseX: number, mouseY: number, time: number, nodes: NetworkNode[]) {
        // Basic movement
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen
        if (this.x > canvas.width + this.size) this.x = -this.size
        else if (this.x < -this.size) this.x = canvas.width + this.size

        if (this.y > canvas.height + this.size) this.y = -this.size
        else if (this.y < -this.size) this.y = canvas.height + this.size

        // Pulse size
        this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * this.pulseAmount

        // React to mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        this.distanceFromMouse = Math.sqrt(dx * dx + dy * dy)

        const maxDistance = 150
        if (this.distanceFromMouse < maxDistance) {
          const force = (1 - this.distanceFromMouse / maxDistance) * 0.2
          this.x -= dx * force * 0.05
          this.y -= dy * force * 0.05
          this.glowIntensity = force * 2
        } else {
          // Slowly return to original position
          this.x += (this.originalX - this.x) * 0.01
          this.y += (this.originalY - this.y) * 0.01
          this.glowIntensity *= 0.95 // Fade out glow
        }

        // Find connections if needed
        if (this.connections.length < this.maxConnections) {
          // Sort nodes by distance
          const sortedNodes = [...nodes]
            .filter((node) => node !== this && !this.connections.includes(node))
            .sort((a, b) => {
              const distA = Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2))
              const distB = Math.sqrt(Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2))
              return distA - distB
            })

          // Connect to closest nodes
          const connectCount = Math.min(this.maxConnections - this.connections.length, sortedNodes.length)

          for (let i = 0; i < connectCount; i++) {
            this.connections.push(sortedNodes[i])
            sortedNodes[i].connections.push(this)
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.save()

        // Draw node
        ctx.fillStyle = this.color

        // Add glow effect
        if (this.glowIntensity > 0.05 || this.isServer) {
          ctx.shadowBlur = this.isServer ? 15 : this.glowIntensity * 10
          ctx.shadowColor = this.color
        }

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        this.connections.forEach((node) => {
          const dx = this.x - node.x
          const dy = this.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only draw if this node's index is lower to avoid duplicate lines
          if (this.isServer || (!node.isServer && this.originalX < node.originalX)) {
            // Calculate opacity based on distance
            const maxDistance = 300
            const opacity = Math.max(0, 1 - distance / maxDistance) * 0.5

            // Data packet animation
            const packetPosition = (time * 0.5) % 1
            const packetX = this.x + dx * packetPosition
            const packetY = this.y + dy * packetPosition

            // Draw connection line
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`
            ctx.lineWidth = this.isServer || node.isServer ? 0.8 : 0.3
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(node.x, node.y)
            ctx.stroke()

            // Draw data packet if this is a server connection
            if (this.isServer || node.isServer) {
              ctx.fillStyle = `rgba(100, 200, 255, ${opacity * 2})`
              ctx.beginPath()
              ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        })

        ctx.restore()
      }
    }

    // Create network nodes
    const nodes: NetworkNode[] = []
    const serverCount = 5
    const nodeCount = 80

    // Create server nodes
    for (let i = 0; i < serverCount; i++) {
      nodes.push(new NetworkNode(true))
    }

    // Create regular nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new NetworkNode())
    }

    // Animation loop
    let animationFrameId: number
    const startTime = Date.now()

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentTime = (Date.now() - startTime) / 1000
      const mouseXValue = springX.get()
      const mouseYValue = springY.get()

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(5, 10, 20, 1)")
      gradient.addColorStop(0.4, "rgba(8, 15, 30, 1)")
      gradient.addColorStop(1, "rgba(10, 20, 40, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add a subtle grid pattern
      ctx.strokeStyle = "rgba(50, 70, 120, 0.03)"
      ctx.lineWidth = 1
      const gridSize = 40

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

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update(mouseXValue, mouseYValue, currentTime, nodes)
      })

      // Draw nodes after updating all (to ensure connections are established)
      nodes.forEach((node) => {
        node.draw(ctx, currentTime)
      })

      // Add subtle vignette effect
      const gradient2 = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width,
      )
      gradient2.addColorStop(0, "rgba(0,0,0,0)")
      gradient2.addColorStop(0.7, "rgba(0,0,0,0.1)")
      gradient2.addColorStop(1, "rgba(0,0,0,0.5)")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add interactive mouse highlight effect
      if (mouseXValue > 0 && mouseYValue > 0) {
        const radius = 120
        const gradient3 = ctx.createRadialGradient(mouseXValue, mouseYValue, 0, mouseXValue, mouseYValue, radius)
        gradient3.addColorStop(0, "rgba(59, 130, 246, 0.15)")
        gradient3.addColorStop(0.5, "rgba(59, 130, 246, 0.08)")
        gradient3.addColorStop(1, "rgba(59, 130, 246, 0)")
        ctx.fillStyle = gradient3
        ctx.beginPath()
        ctx.arc(mouseXValue, mouseYValue, radius, 0, Math.PI * 2)
        ctx.fill()
      }

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

