"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cpu,
  MemoryStickIcon as Memory,
  Zap,
  HardDrive,
  Gauge,
  ArrowRight,
  Users,
  CheckCircle2,
  Clock,
  Server,
  Globe,
  Info,
  ChevronRight,
  Maximize,
  BarChart3,
  Shield,
  Network,
} from "lucide-react"
import { DarkFadeIn, DarkSlideIn, DarkFeatureHighlight, DarkSpecsReveal } from "./animation-utils"

export function HardwareShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("overview")
  const [showComparisonChart, setShowComparisonChart] = useState(false)

  const specs = [
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AMD Ryzen 9 7950X",
      description: "16 cores, 32 threads, up to 5.7GHz",
      color: "from-red-500/20 to-red-600/20 border-red-500/30",
      textColor: "text-red-400",
    },
    {
      icon: <Memory className="h-6 w-6" />,
      title: "DDR5 ECC Memory",
      description: "128GB high-frequency, error-correcting RAM",
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
      textColor: "text-blue-400",
    },
    {
      icon: <HardDrive className="h-6 w-6" />,
      title: "NVMe SSD Storage",
      description: "Ultra-fast read/write speeds with RAID configuration",
      color: "from-green-500/20 to-green-600/20 border-green-500/30",
      textColor: "text-green-400",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Redundant Power",
      description: "99.99% uptime guarantee with UPS backup",
      color: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
      textColor: "text-yellow-400",
    },
  ]

  const performanceMetrics = [
    { label: "CPU Performance", value: 98, icon: <Cpu className="h-4 w-4" />, benchmark: "PassMark: 45,000+" },
    { label: "Memory Speed", value: 95, icon: <Memory className="h-4 w-4" />, benchmark: "7,200MT/s DDR5" },
    { label: "Storage I/O", value: 99, icon: <HardDrive className="h-4 w-4" />, benchmark: "7,000MB/s read" },
    { label: "Network Latency", value: 97, icon: <Zap className="h-4 w-4" />, benchmark: "<10ms EU ping" },
  ]

  const ryzenBenefits = [
    {
      icon: <Clock className="h-4 w-4 text-red-400" />,
      text: "Faster world generation and chunk loading",
      detail: "Generate new chunks up to 2.5x faster than previous generation servers",
    },
    {
      icon: <Server className="h-4 w-4 text-red-400" />,
      text: "Smoother gameplay even with complex redstone",
      detail: "Handle complex automation without TPS drops",
    },
    {
      icon: <Users className="h-4 w-4 text-red-400" />,
      text: "Support for more concurrent players",
      detail: "Maintain 20 TPS with 100+ active players",
    },
    {
      icon: <Zap className="h-4 w-4 text-red-400" />,
      text: "Reduced server lag and TPS drops",
      detail: "Consistently maintain 20 TPS even under heavy load",
    },
  ]

  const processorSpecs = [
    { label: "Cores", value: "16" },
    { label: "Threads", value: "32" },
    { label: "Max Boost", value: "5.7GHz" },
    { label: "Cache", value: "80MB" },
  ]

  const competitorComparison = [
    {
      competitor: "Budget Host",
      cpu: "Shared vCPU",
      players: "20-30",
      tps: "~16",
      chunkLoad: "Slow",
      color: "bg-gray-400",
    },
    {
      competitor: "Standard Host",
      cpu: "Intel i7",
      players: "50-60",
      tps: "~18",
      chunkLoad: "Moderate",
      color: "bg-blue-400",
    },
    {
      competitor: "Our Ryzen 9",
      cpu: "AMD Ryzen 9 7950X",
      players: "100+",
      tps: "20",
      chunkLoad: "Fast",
      color: "bg-red-400",
    },
  ]

  const locationData = [
    { region: "Western Europe", latency: "<10ms", capacity: "High" },
    { region: "Eastern Europe", latency: "<25ms", capacity: "High" },
    { region: "North America", latency: "<100ms", capacity: "Medium" },
    { region: "Asia/Pacific", latency: "<150ms", capacity: "Medium" },
  ]

  const animatedBackgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const pulseVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1.1, 0.8],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 4,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section id="hardware" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black" ref={containerRef}>
      {/* Enhanced animated background effects */}
      <motion.div
        variants={animatedBackgroundVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div
          variants={pulseVariant}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
        />
        <motion.div
          variants={pulseVariant}
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-red-500/5 blur-3xl"
        />
        <motion.div
          className="absolute top-1/3 -right-1/4 w-[800px] h-[200px] bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 -rotate-45 blur-xl"
          animate={{
            x: ["100%", "-200%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            repeatType: "loop",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <DarkFadeIn className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-red-500 to-blue-500 rounded-full p-1 mb-4">
            <div className="bg-black rounded-full px-4 py-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400 font-medium">
                PREMIUM HARDWARE
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            Powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
              AMD Ryzen 9 7950X
            </span>
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Experience unparalleled Minecraft performance with our enterprise-grade hardware infrastructure
          </p>
        </DarkFadeIn>

        <Tabs defaultValue="overview" className="mb-12" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-blue-900/20 border border-blue-500/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Benchmarks
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Network
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <DarkSlideIn direction="left" delay={0.2}>
                {/* Enhanced processor card with interactive elements */}
                <div className="relative bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6 shadow-lg group">
                  {/* Animation enhance on hover */}
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Premium badge - enhanced */}
                  <motion.div
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-blue-600 rounded-full p-0.5 shadow-lg z-10"
                    initial={{ rotate: 12 }}
                    whileHover={{ rotate: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-black rounded-full p-2">
                      <div className="text-white font-medium text-sm">PREMIUM</div>
                    </div>
                  </motion.div>

                  {/* Header with performance tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-3 rounded-lg mr-4 border border-blue-500/30">
                        <Cpu className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">AMD Ryzen 9 7950X</h3>
                        <p className="text-blue-300">Enterprise-Grade Server Processor</p>
                      </div>
                    </div>
                    <motion.div
                      className="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg p-0.5 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-black/80 rounded-lg p-2">
                        <div className="flex items-center">
                          <Gauge className="h-5 w-5 text-white mr-2" />
                          <p className="font-medium">230% Faster</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Processor image with enhanced overlay */}
                  <div className="relative h-[200px] rounded-lg overflow-hidden mb-6 border border-blue-500/30 group-hover:border-blue-400/50 transition-colors duration-300">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="AMD Ryzen 9 7950X Processor"
                      fill
                      className="object-cover"
                    />

                    {/* Enhanced dark-style product highlight overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-500/5"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Fullscreen button */}
                    <motion.button
                      className="absolute top-2 right-2 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Maximize className="h-4 w-4 text-white" />
                    </motion.button>

                    {/* Key specs overlay - enhanced */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <DarkSpecsReveal specs={processorSpecs} delay={0.5} />
                    </div>
                  </div>

                  {/* Benefits section - enhanced with expandable details */}
                  <div className="mb-6">
                    <h4 className="text-white font-bold mb-3 flex items-center">
                      <Zap className="h-5 w-5 text-blue-400 mr-2" />
                      Minecraft Server Benefits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ryzenBenefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col bg-blue-900/20 rounded-lg p-3 border border-blue-500/20 hover:border-blue-400/40 transition-colors duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                          whileHover={{ y: -2 }}
                        >
                          <div className="flex items-start">
                            <div className="mr-2 mt-0.5 flex-shrink-0">{benefit.icon}</div>
                            <span className="text-blue-100 font-medium">{benefit.text}</span>
                          </div>
                          <p className="text-blue-300 text-xs mt-2 ml-6">{benefit.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced player slots callout */}
                  <DarkFeatureHighlight
                    delay={0.9}
                    className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300"
                  >
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-400 mr-2" />
                      <h4 className="text-white font-bold">Unlimited Player Slots</h4>
                    </div>
                    <p className="text-blue-200 text-sm mt-1">
                      All our plans support unlimited player slots, powered by our Ryzen 9 7950X infrastructure. Scale
                      your community without artificial limits.
                    </p>
                    <div className="mt-3 flex space-x-2">
                      <Link href="/unlimited-slots" passHref>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                        >
                          Learn More <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href="/pricing" passHref>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          View Plans
                        </Button>
                      </Link>
                    </div>
                  </DarkFeatureHighlight>
                </div>
              </DarkSlideIn>

              <DarkSlideIn direction="right" delay={0.4}>
                <div className="space-y-6">
                  {specs.map((spec, index) => (
                    <DarkFeatureHighlight
                      key={index}
                      delay={0.5 + index * 0.1}
                      className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-5 shadow-lg hover:border-blue-400/50 transition-colors duration-300"
                    >
                      <div className="flex items-start">
                        <div
                          className={`p-3 rounded-lg ${spec.textColor} bg-blue-900/50 mr-4 border border-blue-500/30`}
                        >
                          {spec.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{spec.title}</h3>
                          <p className="text-blue-200">{spec.description}</p>
                        </div>
                      </div>
                    </DarkFeatureHighlight>
                  ))}

                  {/* Technical advantages section - enhanced */}
                  <DarkFeatureHighlight
                    delay={1.5}
                    className="mt-8 bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Info className="h-5 w-5 text-blue-400 mr-2" />
                      Technical Advantages
                    </h3>
                    <ul className="space-y-3">
                      {[
                        {
                          title: "Zen 4 Architecture",
                          desc: "Latest AMD architecture with improved IPC and efficiency",
                        },
                        {
                          title: "5nm Process Technology",
                          desc: "Advanced manufacturing for better performance per watt",
                        },
                        { title: "PCIe 5.0 Support", desc: "Faster data transfer for storage and networking" },
                        { title: "Optimized JVM Performance", desc: "Custom tuned for Minecraft's Java environment" },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start bg-blue-900/20 rounded-lg p-3 border border-blue-500/20"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                          whileHover={{ x: 2 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                          <div>
                            <span className="text-white font-medium">{item.title}</span>
                            <p className="text-blue-200 text-sm">{item.desc}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <Link href="/tech-specs" passHref>
                        <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                          View Full Specifications
                        </Button>
                      </Link>
                    </div>
                  </DarkFeatureHighlight>

                  <DarkFadeIn delay={2.0} className="mt-8 flex space-x-4">
                    <Link href="/hardware" passHref className="flex-1">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                        Explore Hardware <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/signup" passHref className="flex-1">
                      <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white w-full">
                        Get Started
                      </Button>
                    </Link>
                  </DarkFadeIn>
                </div>
              </DarkSlideIn>
            </div>
          </TabsContent>

          <TabsContent value="benchmarks" className="pt-6">
            <div className="grid lg:grid-cols-2 gap-12">
              <DarkSlideIn direction="left" delay={0.2}>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <BarChart3 className="h-5 w-5 text-blue-400 mr-2" />
                    Performance Metrics
                  </h3>
                  <div className="space-y-6">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-white">
                            <span className="mr-2 text-blue-400">{metric.icon}</span>
                            {metric.label}
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-blue-400 font-medium">{metric.value}%</span>
                            <span className="text-blue-300 text-xs">{metric.benchmark}</span>
                          </div>
                        </div>
                        <div className="h-3 bg-blue-900/50 rounded-full overflow-hidden border border-blue-500/30">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={
                              isInView && activeTab === "benchmarks" ? { width: `${metric.value}%` } : { width: "0%" }
                            }
                            transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button
                      onClick={() => setShowComparisonChart(!showComparisonChart)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {showComparisonChart ? "Hide Comparison" : "Compare to Other Hosts"}
                    </Button>
                  </div>
                </div>
              </DarkSlideIn>

              <DarkSlideIn direction="right" delay={0.4}>
                <AnimatePresence>
                  {showComparisonChart ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg"
                    >
                      <h3 className="text-xl font-bold text-white mb-6">Competitor Comparison</h3>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="text-lg text-white font-medium">Max Players While Maintaining 20 TPS</h4>
                          <div className="space-y-3">
                            {competitorComparison.map((comparison, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-blue-200">{comparison.competitor}</span>
                                  <span className="text-white font-medium">{comparison.players}</span>
                                </div>
                                <div className="h-2 bg-blue-900/50 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: index === 0 ? "30%" : index === 1 ? "60%" : "100%" }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                                    className={`h-full ${comparison.color} rounded-full`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg text-white font-medium">Chunk Loading Speed</h4>
                          <div className="space-y-3">
                            {competitorComparison.map((comparison, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-blue-200">{comparison.competitor}</span>
                                  <span className="text-white font-medium">{comparison.chunkLoad}</span>
                                </div>
                                <div className="h-2 bg-blue-900/50 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: index === 0 ? "25%" : index === 1 ? "50%" : "100%" }}
                                    transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                                    className={`h-full ${comparison.color} rounded-full`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <p className="text-sm text-blue-300 mt-4 bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                          * Comparison based on benchmarks run with identical Minecraft server configurations and
                          identical world seeds. Tests performed with simulated player load using custom stress testing
                          tools.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg"
                    >
                      <h3 className="text-xl font-bold text-white mb-6">Minecraft-Specific Optimizations</h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Java Garbage Collection",
                            desc: "Custom-tuned JVM arguments that leverage the Ryzen 9's multi-threading capabilities",
                            value: 95,
                          },
                          {
                            title: "Thread Allocation",
                            desc: "Intelligent distribution of server processes across all 32 threads",
                            value: 98,
                          },
                          {
                            title: "Memory Management",
                            desc: "Optimized RAM allocation with G1GC garbage collector tuning",
                            value: 97,
                          },
                          {
                            title: "I/O Operations",
                            desc: "NVMe SSDs with optimized filesystem for chunk loading/saving",
                            value: 99,
                          },
                        ].map((item, index) => (
                          <div key={index} className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
                            <div className="flex justify-between mb-2">
                              <h4 className="text-white font-medium">{item.title}</h4>
                              <span className="text-blue-400 font-medium">{item.value}% efficient</span>
                            </div>
                            <p className="text-blue-200 text-sm mb-3">{item.desc}</p>
                            <div className="h-2 bg-blue-900/50 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={
                                  isInView && activeTab === "benchmarks" ? { width: `${item.value}%` } : { width: "0%" }
                                }
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </DarkSlideIn>
            </div>

            <DarkFadeIn delay={0.6} className="mt-12 text-center">
              <Link href="/benchmarks" passHref>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  View All Benchmarks <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </DarkFadeIn>
          </TabsContent>

          <TabsContent value="network" className="pt-6">
            <div className="grid lg:grid-cols-2 gap-12">
              <DarkSlideIn direction="left" delay={0.2}>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Globe className="h-5 w-5 text-blue-400 mr-2" />
                    Global Network Infrastructure
                  </h3>
                  <div className="relative h-60 mb-6 rounded-lg overflow-hidden border border-blue-500/30">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Global Network Map"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* This would be replaced with actual network nodes */}
                    {[
                      { x: "25%", y: "40%", region: "NA" },
                      { x: "45%", y: "35%", region: "EU" },
                      { x: "75%", y: "50%", region: "APAC" },
                    ].map((node, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-3 h-3 bg-blue-400 rounded-full"
                        style={{ left: node.x, top: node.y }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        }}
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg text-white font-medium">Data Center Locations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {locationData.map((location, index) => (
                        <motion.div
                          key={index}
                          className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView && activeTab === "network" ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                          whileHover={{ y: -2 }}
                        >
                          <h5 className="text-white font-medium">{location.region}</h5>
                          <div className="flex justify-between mt-1 text-sm">
                            <span className="text-blue-300">Latency: {location.latency}</span>
                            <span className="text-blue-300">Capacity: {location.capacity}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </DarkSlideIn>

              <DarkSlideIn direction="right" delay={0.4}>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-6">Network Features</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "DDoS Protection",
                        desc: "Enterprise-grade protection against attacks up to 10 Tbps",
                        icon: <Shield className="h-5 w-5 text-blue-400" />,
                      },
                      {
                        title: "Dedicated IP Addresses",
                        desc: "Static IPs with reverse DNS support included with all plans",
                        icon: <Network className="h-5 w-5 text-blue-400" />,
                      },
                      {
                        title: "Global CDN",
                        desc: "Faster resource pack downloads and web map rendering",
                        icon: <Globe className="h-5 w-5 text-blue-400" />,
                      },
                      {
                        title: "99.9% Uptime SLA",
                        desc: "Guaranteed network availability with automatic failover",
                        icon: <CheckCircle2 className="h-5 w-5 text-blue-400" />,
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start p-4 bg-blue-900/20 rounded-lg border border-blue-500/20"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView && activeTab === "network" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 2 }}
                      >
                        <div className="mr-3 mt-1">{feature.icon}</div>
                        <div>
                          <h4 className="text-white font-medium">{feature.title}</h4>
                          <p className="text-blue-200 text-sm">{feature.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <DarkFeatureHighlight
                    delay={1.0}
                    className="mt-6 bg-blue-900/20 p-4 rounded-lg border border-blue-500/20"
                  >
                    <h4 className="text-white font-medium flex items-center">
                      <Info className="h-5 w-5 text-blue-400 mr-2" />
                      Network Performance Guarantee
                    </h4>
                    <p className="text-blue-200 text-sm mt-2">
                      We guarantee less than 10ms ping within Europe and less than 100ms from North America. If you
                      experience consistent latency issues, we offer a full refund for the affected period.
                    </p>
                    <div className="mt-4">
                      <Link href="/network-sla" passHref>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                        >
                          View SLA Details <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </DarkFeatureHighlight>
                </div>
              </DarkSlideIn>
            </div>

            <DarkFadeIn delay={0.6} className="mt-12 text-center">
              <Link href="/network" passHref>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Explore Network Infrastructure <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </DarkFadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

