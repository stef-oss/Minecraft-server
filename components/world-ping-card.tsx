"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Wifi, Clock, MapPin, BarChart, Copy, Check } from "lucide-react"

// Simulated server locations
const serverLocations = [
  { name: "North America", location: "New York", ping: "12-35" },
  { name: "Europe", location: "Frankfurt", ping: "15-40" },
  { name: "Asia", location: "Singapore", ping: "30-60" },
  { name: "Australia", location: "Sydney", ping: "40-70" },
]

export function WorldPingCard() {
  const [selectedLocation, setSelectedLocation] = useState(0)
  const [copied, setCopied] = useState(false)
  const [userPing, setUserPing] = useState<number | null>(null)
  const controls = useAnimation()
  const pingRef = useRef<HTMLDivElement>(null)

  // Simulate ping calculation
  useEffect(() => {
    const calculatePing = () => {
      // In a real app, you would measure actual ping to your servers
      // This is just a simulation
      const basePing = Number.parseInt(serverLocations[selectedLocation].ping.split("-")[0])
      const randomVariation = Math.floor(Math.random() * 15)
      return basePing + randomVariation
    }

    const interval = setInterval(() => {
      setUserPing(calculatePing())
    }, 2000)

    setUserPing(calculatePing())

    return () => clearInterval(interval)
  }, [selectedLocation])

  // Animate ping indicator
  useEffect(() => {
    if (userPing !== null) {
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.3 },
      })
    }
  }, [userPing, controls])

  const copyServerAddress = () => {
    navigator.clipboard.writeText(`play.nexonoia.com`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-blue-500/30 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-blue-400" />
          <h3 className="font-bold text-white">Global Server Network</h3>
        </div>
        <div className="flex items-center">
          <div className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Wifi className="h-3.5 w-3.5 mr-1.5" />
            <span>Live Status</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M400,100 Q550,150 500,250 T400,400 T300,250 T400,100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-500"
              />
              <circle cx="400" cy="100" r="5" fill="currentColor" className="text-blue-500" />
              <circle cx="500" cy="250" r="5" fill="currentColor" className="text-blue-500" />
              <circle cx="400" cy="400" r="5" fill="currentColor" className="text-blue-500" />
              <circle cx="300" cy="250" r="5" fill="currentColor" className="text-blue-500" />
            </svg>
          </div>

          <h4 className="text-lg font-bold text-white mb-4">Server Locations</h4>
          <div className="space-y-3">
            {serverLocations.map((server, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedLocation === index
                    ? "bg-blue-600/30 border border-blue-500/50"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
                onClick={() => setSelectedLocation(index)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <MapPin
                      className={`h-4 w-4 mr-2 ${selectedLocation === index ? "text-blue-400" : "text-white/70"}`}
                    />
                    <span className={selectedLocation === index ? "text-white" : "text-white/70"}>{server.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock
                      className={`h-4 w-4 mr-1 ${selectedLocation === index ? "text-blue-400" : "text-white/50"}`}
                    />
                    <span className={selectedLocation === index ? "text-blue-300" : "text-white/50"}>
                      {server.ping} ms
                    </span>
                  </div>
                </div>
                {selectedLocation === index && (
                  <div className="mt-2 text-sm text-blue-200">{server.location} Data Center</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t md:border-t-0 md:border-l border-blue-500/30 flex flex-col">
          <h4 className="text-lg font-bold text-white mb-4">Your Connection</h4>

          <div className="bg-blue-900/30 rounded-lg p-4 mb-4 border border-blue-500/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70">Current Ping</span>
              <motion.div ref={pingRef} animate={controls} className="flex items-center">
                <BarChart className="h-4 w-4 mr-1 text-blue-400" />
                <span className="text-blue-300 font-bold">{userPing !== null ? `${userPing} ms` : "Measuring..."}</span>
              </motion.div>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  userPing && userPing < 30
                    ? "bg-green-500"
                    : userPing && userPing < 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: userPing ? `${Math.min(100, (userPing / 100) * 100)}%` : "0%" }}
                initial={{ width: "0%" }}
                animate={{ width: userPing ? `${Math.min(100, (userPing / 100) * 100)}%` : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="mt-2 text-xs text-white/50 flex justify-between">
              <span>Excellent</span>
              <span>Good</span>
              <span>Poor</span>
            </div>
          </div>

          <div className="bg-blue-900/30 rounded-lg p-4 mb-4 border border-blue-500/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70">Server Address</span>
            </div>
            <div className="flex items-center">
              <div className="bg-black/30 rounded px-3 py-2 text-white flex-1 font-mono text-sm">play.nexonoia.com</div>
              <Button
                variant="outline"
                size="sm"
                className="ml-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                onClick={copyServerAddress}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mt-2 text-xs text-white/50">Works with Java & Bedrock Edition</div>
          </div>

          <div className="mt-auto">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Connect Now</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

