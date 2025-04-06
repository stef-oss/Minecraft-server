"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Smartphone, Laptop, ArrowRight, Download, Puzzle, Zap, Users, Globe } from "lucide-react"
import Image from "next/image"

export function BedrockSupport() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Puzzle className="h-6 w-6 text-green-400" />,
      title: "Easy Addon Installation",
      description: "Install Bedrock addons with just a few clicks through our custom panel.",
    },
    {
      icon: <Zap className="h-6 w-6 text-green-400" />,
      title: "Cross-Platform Play",
      description: "Connect from any device - mobile, console, or PC with seamless integration.",
    },
    {
      icon: <Users className="h-6 w-6 text-green-400" />,
      title: "Unified Community",
      description: "Bring Java and Bedrock players together on the same server.",
    },
    {
      icon: <Globe className="h-6 w-6 text-green-400" />,
      title: "Global Accessibility",
      description: "Reach more players with our Bedrock support across all platforms.",
    },
  ]

  return (
    <section id="bedrock" className="py-20 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 px-4 py-1 bg-green-900/30 backdrop-blur-sm rounded-full border border-green-500/30">
              <div className="flex items-center text-green-400 text-sm whitespace-nowrap">
                <Smartphone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Play Anywhere</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Full <span className="text-green-500">Bedrock Edition</span> Support
            </h2>

            <p className="text-lg text-blue-200 mb-8">
              Connect to your server from any device with our seamless Bedrock Edition support. Play on mobile, console,
              or PC - we've got you covered.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="bg-gradient-to-br from-green-900/20 to-green-800/20 backdrop-blur-sm p-4 rounded-xl border border-green-500/30"
                >
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-green-900/50 mr-3">{feature.icon}</div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                <Download className="mr-2 h-4 w-4" /> Get Bedrock Edition
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-green-600/10 to-green-400/10 rounded-lg blur-lg" />

            <div className="relative bg-gradient-to-br from-black/60 to-green-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-green-500/30 p-6">
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-green-500/20 to-transparent w-32 h-32" />
              <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-green-500/20 to-transparent w-32 h-32" />

              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <Smartphone className="h-8 w-8 text-green-400" />
                    <Laptop className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">Cross-Platform</h3>
                    <p className="text-white/70">Java & Bedrock Compatible</p>
                  </div>
                </div>

                <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Bedrock Edition Support"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                        <span className="text-green-400 text-sm font-medium">Bedrock Ready</span>
                      </div>
                      <span className="text-white/70 text-sm">All devices supported</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-lg p-3 border border-green-500/20">
                    <h4 className="text-green-400 font-medium mb-1">Mobile</h4>
                    <p className="text-white/70 text-sm">iOS & Android</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-green-500/20">
                    <h4 className="text-green-400 font-medium mb-1">Console</h4>
                    <p className="text-white/70 text-sm">Xbox, PlayStation, Switch</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-green-500/20">
                    <h4 className="text-green-400 font-medium mb-1">Windows 10/11</h4>
                    <p className="text-white/70 text-sm">Microsoft Store</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-green-500/20">
                    <h4 className="text-green-400 font-medium mb-1">Smart TV</h4>
                    <p className="text-white/70 text-sm">Fire TV, Android TV</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

