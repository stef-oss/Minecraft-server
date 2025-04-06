"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, ChevronRight, ChevronLeft } from "lucide-react"

const modpacks = [
  {
    name: "RLCraft",
    description: "A challenging modpack focused on realism and difficulty.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Adventure", "Hardcore", "Challenging"],
  },
  {
    name: "SkyFactory 4",
    description: "Start on a single tree and build your way to automation.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Skyblock", "Tech", "Automation"],
  },
  {
    name: "All The Mods 7",
    description: "A kitchen sink modpack with something for everyone.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Kitchen Sink", "Magic", "Tech"],
  },
  {
    name: "Better Minecraft",
    description: "An enhanced vanilla experience with quality of life improvements.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Vanilla+", "Exploration", "Adventure"],
  },
]

export function ModpackSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextModpack = () => {
    setCurrentIndex((prev) => (prev + 1) % modpacks.length)
  }

  const prevModpack = () => {
    setCurrentIndex((prev) => (prev - 1 + modpacks.length) % modpacks.length)
  }

  return (
    <section id="modpacks" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            One-Click <span className="text-blue-500">Modpack Installation</span>
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Install popular modpacks with a single click. No technical knowledge required.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-blue-400"
              onClick={prevModpack}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative h-[300px] sm:h-[400px] w-full">
                  <Image
                    src={modpacks[currentIndex].image || "/placeholder.svg"}
                    alt={modpacks[currentIndex].name}
                    fill
                    className="object-cover brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {modpacks[currentIndex].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-900/70 text-blue-200 px-3 py-1 rounded-full text-xs inline-block"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{modpacks[currentIndex].name}</h3>
                    <p className="text-white/80 mb-4 max-w-2xl">{modpacks[currentIndex].description}</p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="mr-2 h-4 w-4" /> Install with One Click
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-blue-400"
              onClick={nextModpack}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {modpacks.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? "bg-blue-500" : "bg-white/30"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/70 mb-6">
            We support over 100+ popular modpacks with automatic updates and configuration.
          </p>
          <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
            View All Supported Modpacks
          </Button>
        </div>
      </div>
    </section>
  )
}

