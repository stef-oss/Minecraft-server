"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "./animated-button"
import { Cpu, Server, Shield, Zap, ArrowRight } from "lucide-react"
import Image from "next/image"

export function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    { icon: <Zap className="h-5 w-5" />, text: "Instant Setup" },
    { icon: <Cpu className="h-5 w-5" />, text: "Ryzen 9 7950X" },
    { icon: <Server className="h-5 w-5" />, text: "99.9% Uptime" },
    { icon: <Shield className="h-5 w-5" />, text: "DDoS Protection" },
  ]

  return (
    <section className="pt-32 pb-20 relative overflow-hidden" ref={containerRef}>
      {/* Animated light beams */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[800px] h-[200px] bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rotate-45 blur-xl"
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
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[150px] bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 -rotate-45 blur-xl"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-block mb-4 px-4 py-1 bg-blue-900/30 backdrop-blur-sm rounded-full border border-blue-500/30"
                >
                  <div className="flex items-center">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <div className="flex items-center text-blue-300 text-sm">
                      <Cpu className="h-4 w-4 mr-1 text-blue-400" />
                      <span>Powered by Ryzen 9 7950X</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVisible && (
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
                >
                  Premium Minecraft
                  <br />
                  <motion.span
                    className="text-blue-500 inline-block"
                    animate={{
                      textShadow: [
                        "0px 0px 0px rgba(59, 130, 246, 0)",
                        "0px 0px 10px rgba(59, 130, 246, 0.5)",
                        "0px 0px 0px rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Hosting
                  </motion.span>
                </motion.h1>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVisible && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-xl text-blue-200 mb-8 max-w-lg"
                >
                  Experience lag-free gameplay with our high-performance servers powered by
                  <span className="font-medium text-white"> Ryzen 9 7950X </span>
                  processors and premium DDR5 memory.
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <AnimatedButton variant="premium" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Get Started
                  </AnimatedButton>

                  <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                    View Plans
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-8 flex items-center space-x-4"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, x: -10 }}
                        animate={{ scale: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-900"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-blue-300">
                    <span className="font-medium text-white">5,000+</span> players trust Nexonoia Host
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, rotateY: 30, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="relative h-[400px] sm:h-[500px] w-full perspective-1000"
              >
                {/* Product highlight glow */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/10 rounded-lg blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 shadow-lg transform preserve-3d">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="Nexonoia Host Server Dashboard"
                    width={600}
                    height={500}
                    className="w-full h-full object-cover opacity-80"
                  />

                  {/* Product overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          className="w-3 h-3 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />
                        <span className="text-sm font-medium text-white">Online</span>
                      </div>
                      <span className="text-sm font-medium text-blue-300">20/100 Players</span>
                    </div>

                    <motion.div
                      className="h-2 bg-blue-900/50 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <motion.div
                        className="h-full w-1/5 bg-blue-500 rounded-full"
                        animate={{
                          width: ["20%", "22%", "19%", "21%", "20%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating product cards with fixed positioning */}
                {/* Top-left card */}
                <motion.div
                  className="absolute top-0 left-0 bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-4 shadow-lg transform -translate-y-1/2 -translate-x-1/2 sm:translate-y-0 sm:-translate-x-1/4"
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{
                    y: 5,
                    boxShadow: "0px 10px 25px rgba(59, 130, 246, 0.2)",
                    borderColor: "rgba(59, 130, 246, 0.5)",
                  }}
                >
                  <div className="flex items-center">
                    <Cpu className="h-5 w-5 text-blue-400 mr-2" />
                    <p className="text-white font-medium">Ryzen 9 7950X</p>
                  </div>
                  <p className="text-blue-300 text-sm">Premium Performance</p>
                </motion.div>

                {/* Bottom-right card */}
                <motion.div
                  className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-4 shadow-lg transform translate-y-1/2 translate-x-1/2 sm:translate-y-0 sm:translate-x-1/4"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0px 10px 25px rgba(59, 130, 246, 0.2)",
                    borderColor: "rgba(59, 130, 246, 0.5)",
                  }}
                >
                  <p className="text-white font-medium">Nexonoia Host</p>
                  <p className="text-blue-300 text-sm">Ready in 60 seconds</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

