"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function UbiquitiPremiumBackground() {
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

    // Particle class for subtle background effect
    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      distanceFromMouse = 0
      originalX: number
      originalY: number

      constructor() {
        this.originalX = Math.random() * canvas.width
        this.originalY = Math.random() * canvas.height
        this.x = this.originalX
        this.y = this.originalY
        this.baseSize = Math.random() * 1.5 + 0.5
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * 0.1
        this.speedY = (Math.random() - 0.5) * 0.1
        this.color = "rgba(5, 89, 201, 0.08)" // Ubiquiti blue with low opacity
      }

      update(mouseX: number, mouseY: number) {
        // Basic movement
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

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

    // Light ray class for Ubiquiti-style light beams
    class LightRay {
      x: number
      y: number
      width: number
      height: number
      angle: number
      speed: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.width = Math.random() * 800 + 400
        this.height = Math.random() * 100 + 50
        this.angle = Math.random() * 180
        this.speed = Math.random() * 0.2 + 0.1
        this.opacity = Math.random() * 0.05 + 0.02
      }

      update() {
        this.x += Math.cos((this.angle * Math.PI) / 180) * this.speed
        this.y += Math.sin((this.angle * Math.PI) / 180) * this.speed

        // Reset when it goes off-screen
        if (
          this.x > canvas.width + this.width ||
          this.x < -this.width ||
          this.y > canvas.height + this.height ||
          this.y < -this.height
        ) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.angle = Math.random() * 180
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.angle * Math.PI) / 180)

        // Create gradient for light ray
        const gradient = ctx.createLinearGradient(-this.width / 2, 0, this.width / 2, 0)
        gradient.addColorStop(0, `rgba(5, 89, 201, 0)`)
        gradient.addColorStop(0.5, `rgba(5, 89, 201, ${this.opacity})`)
        gradient.addColorStop(1, `rgba(5, 89, 201, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        ctx.restore()
      }
    }

    // Create particles and light rays
    const particles: Particle[] = []
    const lightRays: LightRay[] = []

    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000))
    const rayCount = 5

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    for (let i = 0; i < rayCount; i++) {
      lightRays.push(new LightRay())
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

      // Draw light rays
      lightRays.forEach((ray) => {
        ray.update()
        ray.draw(ctx)
      })

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mouseXValue, mouseYValue)
        particle.draw(ctx)
      })

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

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* Ubiquiti-style light rays overlay */}
      <div className="fixed top-0 left-0 w-full h-full -z-5 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[800px] h-[200px] bg-gradient-to-r from-ubiquiti-blue/0 via-ubiquiti-blue/5 to-ubiquiti-blue/0 rotate-45 blur-xl"
          animate={{
            x: ["-100%", "200%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute top-3/4 -right-1/4 w-[600px] h-[150px] bg-gradient-to-r from-ubiquiti-blue/0 via-ubiquiti-blue/3 to-ubiquiti-blue/0 -rotate-45 blur-xl"
          animate={{
            x: ["100%", "-200%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatType: "loop",
            delay: 5,
          }}
        />
      </div>
    </>
  )
}

