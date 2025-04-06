"use client"

import { useEffect, useRef, useState } from "react"
import { useMotionValue, useSpring, motion } from "framer-motion"

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set(e.touches[0].clientX)
        mouseY.set(e.touches[0].clientY)
        setIsClicking(true)
      }
    }

    const handleTouchEnd = () => {
      setIsClicking(false)
    }

    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchstart", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    // Minecraft-themed elements
    class Block {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      color: string
      type: "cube" | "diamond" | "emerald" | "redstone"
      opacity: number
      pulseSpeed: number
      pulseAmount: number
      pulseOffset: number
      distanceFromMouse = 0
      originalX: number
      originalY: number

      constructor() {
        this.originalX = Math.random() * canvas.width
        this.originalY = Math.random() * canvas.height
        this.x = this.originalX
        this.y = this.originalY
        this.baseSize = Math.random() * 15 + 8
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * 0.15
        this.speedY = (Math.random() - 0.5) * 0.15
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.004
        this.opacity = Math.random() * 0.2 + 0.05
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseAmount = Math.random() * 0.2 + 0.1
        this.pulseOffset = Math.random() * Math.PI * 2

        // Enhanced color palette
        const colors = [
          "rgba(59, 81, 139, opacity)", // Blue
          "rgba(55, 97, 140, opacity)", // Dark blue
          "rgba(74, 128, 255, opacity)", // Light blue
          "rgba(80, 140, 200, opacity)", // Sky blue
          "rgba(80, 200, 120, opacity)", // Green (for Bedrock)
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)].replace("opacity", this.opacity.toString())

        // Block types
        const types = ["cube", "diamond", "emerald", "redstone"]
        this.type = types[Math.floor(Math.random() * types.length)] as "cube" | "diamond" | "emerald" | "redstone"
      }

      update(mouseX: number, mouseY: number, time: number, isClicking: boolean) {
        // Basic movement
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

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

        const maxDistance = isClicking ? 300 : 200
        if (this.distanceFromMouse < maxDistance) {
          const force = (1 - this.distanceFromMouse / maxDistance) * (isClicking ? 0.4 : 0.2)
          this.x -= dx * force * (isClicking ? 0.1 : 0.05)
          this.y -= dy * force * (isClicking ? 0.1 : 0.05)
          this.rotation += force * (isClicking ? 0.2 : 0.1)

          // Increase size when clicking
          if (isClicking) {
            this.size += force * 5
          }
        } else {
          // Slowly return to original position when not affected by mouse
          this.x += (this.originalX - this.x) * 0.01
          this.y += (this.originalY - this.y) * 0.01
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        // Adjust opacity based on mouse proximity
        let adjustedOpacity = this.opacity
        if (this.distanceFromMouse < 200) {
          adjustedOpacity = this.opacity + (0.3 - this.opacity) * (1 - this.distanceFromMouse / 200)
        }

        if (this.type === "cube") {
          // Draw an enhanced cube
          const s = this.size / 2

          // Top face (lighter)
          ctx.fillStyle = this.color.replace("opacity", (adjustedOpacity + 0.05).toString())
          ctx.beginPath()
          ctx.moveTo(0, -s)
          ctx.lineTo(s, 0)
          ctx.lineTo(0, s)
          ctx.lineTo(-s, 0)
          ctx.closePath()
          ctx.fill()

          // Left face (darker)
          ctx.fillStyle = this.color.replace("opacity", (adjustedOpacity - 0.02).toString())
          ctx.beginPath()
          ctx.moveTo(-s, 0)
          ctx.lineTo(0, s)
          ctx.lineTo(0, 0)
          ctx.closePath()
          ctx.fill()

          // Right face (medium)
          ctx.fillStyle = this.color.replace("opacity", adjustedOpacity.toString())
          ctx.beginPath()
          ctx.moveTo(s, 0)
          ctx.lineTo(0, s)
          ctx.lineTo(0, 0)
          ctx.closePath()
          ctx.fill()

          // Add subtle glow effect when near mouse
          if (this.distanceFromMouse < 150) {
            const glowSize = (1 - this.distanceFromMouse / 150) * 10
            ctx.shadowColor = this.color.replace("opacity", "0.5")
            ctx.shadowBlur = glowSize
          }
        } else if (this.type === "diamond") {
          // Draw an enhanced diamond shape
          const s = this.size / 2
          ctx.fillStyle = "rgba(80, 200, 255, " + adjustedOpacity + ")"
          ctx.beginPath()
          ctx.moveTo(0, -s)
          ctx.lineTo(s, 0)
          ctx.lineTo(0, s)
          ctx.lineTo(-s, 0)
          ctx.closePath()
          ctx.fill()

          // Inner highlight with pulsing
          const innerSize = s * (0.5 + Math.sin(time * 2) * 0.1)
          ctx.fillStyle = "rgba(120, 220, 255, " + (adjustedOpacity + 0.1) + ")"
          ctx.beginPath()
          ctx.moveTo(0, -innerSize)
          ctx.lineTo(innerSize, 0)
          ctx.lineTo(0, innerSize)
          ctx.lineTo(-innerSize, 0)
          ctx.closePath()
          ctx.fill()

          // Add glow effect
          if (this.distanceFromMouse < 150) {
            const glowSize = (1 - this.distanceFromMouse / 150) * 15
            ctx.shadowColor = "rgba(80, 200, 255, 0.8)"
            ctx.shadowBlur = glowSize
          }
        } else if (this.type === "emerald") {
          // Draw an emerald shape
          const s = this.size / 2
          ctx.fillStyle = "rgba(80, 220, 120, " + adjustedOpacity + ")"
          ctx.beginPath()
          ctx.moveTo(0, -s)
          ctx.lineTo(s, 0)
          ctx.lineTo(0, s)
          ctx.lineTo(-s, 0)
          ctx.closePath()
          ctx.fill()

          // Inner highlight with pulsing
          const innerSize = s * (0.5 + Math.sin(time * 2.5) * 0.1)
          ctx.fillStyle = "rgba(120, 255, 160, " + (adjustedOpacity + 0.1) + ")"
          ctx.beginPath()
          ctx.moveTo(0, -innerSize)
          ctx.lineTo(innerSize, 0)
          ctx.lineTo(0, innerSize)
          ctx.lineTo(-innerSize, 0)
          ctx.closePath()
          ctx.fill()

          // Add glow effect
          if (this.distanceFromMouse < 150) {
            const glowSize = (1 - this.distanceFromMouse / 150) * 15
            ctx.shadowColor = "rgba(80, 220, 120, 0.8)"
            ctx.shadowBlur = glowSize
          }
        } else if (this.type === "redstone") {
          // Draw a redstone shape
          const s = this.size / 2
          ctx.fillStyle = "rgba(220, 80, 80, " + adjustedOpacity + ")"
          ctx.beginPath()
          ctx.moveTo(0, -s)
          ctx.lineTo(s, 0)
          ctx.lineTo(0, s)
          ctx.lineTo(-s, 0)
          ctx.closePath()
          ctx.fill()

          // Inner highlight with pulsing
          const innerSize = s * (0.5 + Math.sin(time * 3) * 0.15)
          ctx.fillStyle = "rgba(255, 120, 120, " + (adjustedOpacity + 0.1) + ")"
          ctx.beginPath()
          ctx.moveTo(0, -innerSize)
          ctx.lineTo(innerSize, 0)
          ctx.lineTo(0, innerSize)
          ctx.lineTo(-innerSize, 0)
          ctx.closePath()
          ctx.fill()

          // Add glow effect
          if (this.distanceFromMouse < 150) {
            const glowSize = (1 - this.distanceFromMouse / 150) * 15
            ctx.shadowColor = "rgba(220, 80, 80, 0.8)"
            ctx.shadowBlur = glowSize
          }
        }

        ctx.restore()
      }
    }

    // Particle class for additional effects
    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number
      distanceFromMouse = 0

      constructor() {
        this.originalX = Math.random() * canvas.width
        this.originalY = Math.random() * canvas.height
        this.x = this.originalX
        this.y = this.originalY
        this.baseSize = Math.random() * 1.5 + 0.5
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3

        // Enhanced colors
        const r = Math.floor(Math.random() * 100)
        const g = Math.floor(Math.random() * 150)
        const b = Math.floor(Math.random() * 255 + 100)
        const a = Math.random() * 0.15 + 0.05
        this.color = `rgba(${r}, ${g}, ${b}, ${a})`
      }

      update(mouseX: number, mouseY: number, time: number, isClicking: boolean) {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Pulse size
        this.size = this.baseSize + Math.sin(time * 2) * 0.2

        // React to mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        this.distanceFromMouse = Math.sqrt(dx * dx + dy * dy)

        const maxDistance = isClicking ? 200 : 150
        if (this.distanceFromMouse < maxDistance) {
          const force = (1 - this.distanceFromMouse / maxDistance) * (isClicking ? 0.4 : 0.2)
          this.x -= dx * force * (isClicking ? 0.2 : 0.1)
          this.y -= dy * force * (isClicking ? 0.2 : 0.1)
          this.size += force * (isClicking ? 3 : 1.5)
        } else {
          // Slowly return to original position
          this.x += (this.originalX - this.x) * 0.01
          this.y += (this.originalY - this.y) * 0.01
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Adjust opacity based on mouse proximity
        let adjustedColor = this.color
        if (this.distanceFromMouse < 150) {
          const alpha = Number.parseFloat(this.color.split(",")[3].replace(")", ""))
          const newAlpha = alpha + (0.4 - alpha) * (1 - this.distanceFromMouse / 150)
          adjustedColor = this.color.replace(/[^,]+\)/, newAlpha + ")")

          // Add glow effect
          ctx.shadowColor = this.color.replace(/[^,]+\)/, "0.5)")
          ctx.shadowBlur = (1 - this.distanceFromMouse / 150) * 10
        }

        ctx.fillStyle = adjustedColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Reset shadow
        ctx.shadowBlur = 0
      }
    }

    // Create blocks and particles
    const blocksArray: Block[] = []
    const particlesArray: Particle[] = []

    const numberOfBlocks = Math.min(15, Math.floor((canvas.width * canvas.height) / 80000))
    const numberOfParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000))

    for (let i = 0; i < numberOfBlocks; i++) {
      blocksArray.push(new Block())
    }

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Connect particles with lines
    function connect(ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number, isClicking: boolean) {
      const maxDistance = isClicking ? 180 : 150

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Base opacity on distance
            const opacity = 1 - distance / maxDistance

            // Increase opacity for particles near mouse
            let adjustedOpacity = opacity * 0.1
            const mouseDistA = Math.sqrt(
              Math.pow(mouseX - particlesArray[a].x, 2) + Math.pow(mouseY - particlesArray[a].y, 2),
            )
            const mouseDistB = Math.sqrt(
              Math.pow(mouseX - particlesArray[b].x, 2) + Math.pow(mouseY - particlesArray[b].y, 2),
            )

            if (mouseDistA < 150 || mouseDistB < 150) {
              adjustedOpacity = opacity * (isClicking ? 0.5 : 0.3)
            }

            ctx.strokeStyle = `rgba(100, 150, 255, ${adjustedOpacity})`
            ctx.lineWidth = isClicking ? 0.8 : 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
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
      gradient.addColorStop(0, "rgba(8, 12, 24, 1)")
      gradient.addColorStop(1, "rgba(12, 20, 35, 1)")
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

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouseXValue, mouseYValue, currentTime, isClicking)
        particlesArray[i].draw(ctx)
      }

      // Connect particles
      connect(ctx, mouseXValue, mouseYValue, isClicking)

      // Update and draw blocks
      for (let i = 0; i < blocksArray.length; i++) {
        blocksArray[i].update(mouseXValue, mouseYValue, currentTime, isClicking)
        blocksArray[i].draw(ctx, currentTime)
      }

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
      gradient2.addColorStop(1, "rgba(0,0,0,0.4)")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add click effect
      if (isClicking) {
        const clickRadius = 50
        const clickGradient = ctx.createRadialGradient(
          mouseXValue,
          mouseYValue,
          0,
          mouseXValue,
          mouseYValue,
          clickRadius,
        )
        clickGradient.addColorStop(0, "rgba(100, 150, 255, 0.3)")
        clickGradient.addColorStop(1, "rgba(100, 150, 255, 0)")
        ctx.fillStyle = clickGradient
        ctx.beginPath()
        ctx.arc(mouseXValue, mouseYValue, clickRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchstart", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mouseX, mouseY, springX, springY, isClicking])

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-xs bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        Click or tap to interact with the background
      </motion.div>
    </>
  )
}

