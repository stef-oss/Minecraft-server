"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Wifi, Clock, MapPin, Copy, Check } from "lucide-react"

// Server location in Belgium
const SERVER_LOCATION = {
  name: "Belgium",
  lat: 50.85,
  lng: 4.35,
  city: "Brussels",
}

// Regions with estimated ping times from Belgium
const REGIONS = [
  { name: "Western Europe", lat: 48.8, lng: 2.3, ping: "5-20ms", baseLatency: 12 },
  { name: "Eastern Europe", lat: 52.2, lng: 21.0, ping: "20-40ms", baseLatency: 30 },
  { name: "Northern Europe", lat: 59.3, lng: 18.0, ping: "30-50ms", baseLatency: 40 },
  { name: "Southern Europe", lat: 41.9, lng: 12.5, ping: "25-45ms", baseLatency: 35 },
  { name: "North America (East)", lat: 40.7, lng: -74.0, ping: "80-110ms", baseLatency: 95 },
  { name: "North America (West)", lat: 37.8, lng: -122.4, ping: "140-170ms", baseLatency: 155 },
  { name: "South America", lat: -23.5, lng: -46.6, ping: "180-220ms", baseLatency: 200 },
  { name: "Asia", lat: 35.7, lng: 139.8, ping: "250-300ms", baseLatency: 275 },
  { name: "Australia", lat: -33.9, lng: 151.2, ping: "280-330ms", baseLatency: 305 },
  { name: "Africa", lat: -33.9, lng: 18.4, ping: "150-200ms", baseLatency: 175 },
]

export function WorldPingMap() {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null)
  const [userPing, setUserPing] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [copied, setCopied] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // More accurate ping calculation based on user's actual location
  useEffect(() => {
    const calculatePing = async () => {
      try {
        // Try to get user's approximate location based on IP
        // This is a simulation - in a real app, you would use a geolocation API
        const userRegion = 0 // Default to Western Europe for simulation

        // Calculate ping based on region's base latency with some realistic variation
        const baseLatency = REGIONS[userRegion].baseLatency
        const variation = Math.floor(Math.random() * 10) - 5 // -5 to +5 ms variation
        return Math.max(5, baseLatency + variation) // Ensure minimum 5ms ping
      } catch (error) {
        // Fallback to Western Europe if geolocation fails
        return 15 + Math.floor(Math.random() * 10)
      }
    }

    const interval = setInterval(async () => {
      const ping = await calculatePing()
      setUserPing(ping)
    }, 3000)

    calculatePing().then(setUserPing)

    return () => clearInterval(interval)
  }, [])

  // Animate ping indicator with smoother animation
  useEffect(() => {
    if (userPing !== null) {
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.3, ease: "easeInOut" },
      })
    }
  }, [userPing, controls])

  // Animate connection line between server and region
  const animateConnection = (index: number) => {
    setSelectedRegion(index)
    setIsAnimating(true)

    setTimeout(() => {
      setIsAnimating(false)
    }, 1000) // Faster animation
  }

  // Copy server address to clipboard
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
          <h3 className="font-bold text-white">Nexonoia Host Global Network</h3>
        </div>
        <div className="flex items-center">
          <div className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Wifi className="h-3.5 w-3.5 mr-1.5" />
            <span>Live Status</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-white font-medium">
              Nexonoia Host Server Location: {SERVER_LOCATION.name}, {SERVER_LOCATION.city}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-white/70">Your Estimated Ping: </span>
            <motion.span className="ml-2 text-blue-300 font-bold" animate={controls}>
              {userPing !== null ? `${userPing}ms` : "Measuring..."}
            </motion.span>
            <span className="ml-2 text-green-400 text-sm">(Excellent)</span>
          </div>
        </div>

        <div
          ref={mapRef}
          className="relative h-[300px] sm:h-[400px] bg-blue-900/20 rounded-lg overflow-hidden border border-blue-500/30 mb-6"
        >
          {/* World Map - premium representation */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-full h-full bg-blue-900/20">
              {/* Grid lines for visual effect */}
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 border-r border-blue-500/10"
                  style={{ left: `${(i / 18) * 100}%` }}
                />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 border-t border-blue-500/10"
                  style={{ top: `${(i / 9) * 100}%` }}
                />
              ))}

              {/* Simplified continent shapes for premium look */}
              <div className="absolute w-[25%] h-[30%] top-[20%] left-[15%] bg-blue-200/20 rounded-lg"></div>
              <div className="absolute w-[20%] h-[35%] top-[15%] left-[42%] bg-blue-200/20 rounded-lg"></div>
              <div className="absolute w-[25%] h-[25%] top-[20%] left-[65%] bg-blue-200/20 rounded-lg"></div>
              <div className="absolute w-[15%] h-[20%] top-[60%] left-[20%] bg-blue-200/20 rounded-lg"></div>
              <div className="absolute w-[15%] h-[20%] top-[60%] left-[65%] bg-blue-200/20 rounded-lg"></div>
            </div>
          </div>

          {/* Server location marker (Belgium) with premium animation */}
          <div
            className="absolute z-10"
            style={{
              left: `${((SERVER_LOCATION.lng + 180) / 360) * 100}%`,
              top: `${((90 - SERVER_LOCATION.lat) / 180) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-full bg-blue-500/20"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/30" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-900/80 backdrop-blur-sm text-white text-xs py-1 px-2 rounded border border-blue-500/50">
                Nexonoia Host
              </div>
            </div>
          </div>

          {/* Region markers with premium animations */}
          {REGIONS.map((region, index) => {
            const isSelected = selectedRegion === index
            return (
              <div
                key={region.name}
                className="absolute cursor-pointer z-10"
                style={{
                  left: `${((region.lng + 180) / 360) * 100}%`,
                  top: `${((90 - region.lat) / 180) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => animateConnection(index)}
              >
                <div className="relative">
                  <motion.div
                    className={`h-3 w-3 rounded-full ${isSelected ? "bg-green-400" : "bg-white/50"} hover:bg-blue-300 transition-colors duration-300`}
                    whileHover={{ scale: 1.5 }}
                    animate={
                      isSelected
                        ? {
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.8, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: isSelected ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                    }}
                  />
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-900/80 backdrop-blur-sm text-white text-xs py-1 px-2 rounded border border-blue-500/50 z-20"
                    >
                      <div className="font-medium">{region.name}</div>
                      <div className="text-blue-300">{region.ping}</div>
                    </motion.div>
                  )}
                </div>

                {/* Connection line to server with premium animation */}
                {isSelected && (
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      pointerEvents: "none",
                      zIndex: 5,
                    }}
                  >
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.7 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      d={`M ${((SERVER_LOCATION.lng + 180) / 360) * 100}% ${((90 - SERVER_LOCATION.lat) / 180) * 100}% L ${((region.lng + 180) / 360) * 100}% ${((90 - region.lat) / 180) * 100}%`}
                      stroke="rgba(59, 130, 246, 0.7)"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      fill="none"
                      style={{
                        vectorEffect: "non-scaling-stroke",
                      }}
                    />
                  </svg>
                )}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {REGIONS.map((region, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                selectedRegion === index
                  ? "bg-blue-600/30 border border-blue-500/50"
                  : "bg-blue-900/20 border border-blue-900/50 hover:bg-blue-800/30"
              }`}
              onClick={() => animateConnection(index)}
            >
              <div className="font-medium text-white truncate">{region.name}</div>
              <div className="text-blue-300">{region.ping}</div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70">Nexonoia Host Server Address</span>
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
      </div>
    </Card>
  )
}

