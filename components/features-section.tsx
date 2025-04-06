"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Zap, Globe, Clock, Server, Users } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-10 w-10 text-blue-500" />,
    title: "High Performance",
    description: "Powered by latest-gen CPUs and NVMe SSDs for lightning-fast response times and smooth gameplay.",
  },
  {
    icon: <Globe className="h-10 w-10 text-blue-500" />,
    title: "Global Network",
    description: "Servers in multiple locations worldwide to ensure low latency for players everywhere.",
  },
  {
    icon: <Shield className="h-10 w-10 text-blue-500" />,
    title: "DDoS Protection",
    description: "Enterprise-grade protection against attacks to keep your server online and secure.",
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-500" />,
    title: "24/7 Uptime",
    description: "99.9% uptime guarantee with constant monitoring and automatic backups.",
  },
  {
    icon: <Server className="h-10 w-10 text-blue-500" />,
    title: "One-Click Modpacks",
    description: "Install popular modpacks with a single click. No technical knowledge required.",
  },
  {
    icon: <Users className="h-10 w-10 text-blue-500" />,
    title: "Unlimited Players",
    description: "Scale your server as your community grows with our flexible resource allocation.",
  },
]

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose <span className="text-blue-500">NexusCraft</span>
          </motion.h2>
          <motion.p
            className="text-lg text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We provide the tools and infrastructure you need to create the perfect Minecraft experience.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg group"
            >
              <div className="mb-4 p-3 bg-blue-900/30 rounded-lg inline-block group-hover:bg-blue-900/50 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

