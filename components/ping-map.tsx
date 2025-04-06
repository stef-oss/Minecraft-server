"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Globe, Wifi, Clock, BarChart } from "lucide-react"

// Simulated ping data for various locations
const pingData = [
  { location: "New York", ping: "40-60" },
  { location: "Los Angeles", ping: "80-100" },
  { location: "London", ping: "15-35" },
  { location: "Frankfurt", ping: "10-25" },
  { location: "Singapore", ping: "180-220" },
  { location: "Sydney", ping: "250-300" },
  { location: "Sao Paulo", ping: "120-150" },
  { location: "Mumbai", ping: "200-240" },
]

export function PingMap() {
  const [selectedLocation, setSelectedLocation] = useState(0)
  const [userPing, setUserPing] = useState<number | null>(null)
  const controls = useAnimation()

  // Simulate ping calculation
  useEffect(() => {
    const calculatePing = () => {
      // In a real app, you would measure actual ping to your servers
      // This is just a simulation
      const basePing = Number.parseInt(pingData[selectedLocation].ping.split("-")[0])
      const randomVariation = Math.floor(Math.random() * 20)
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

  return (
    <section id="ping-map" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Global <span className="text-blue-500">Ping Map</span>
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            See estimated ping times from your location to our servers around the world.
          </p>
        </div>

        <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-blue-500/30 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-blue-400" />
              <h3 className="font-bold text-white">Server Locations</h3>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Wifi className="h-3.5 w-3.5 mr-1.5" />
                <span>Live Status</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pingData.map((location, index) => (
                <button
                  key={index}
                  className={`bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 text-left hover:bg-blue-800/30 transition-colors duration-200 ${
                    selectedLocation === index ? "border-blue-400 bg-blue-700/30" : ""
                  }`}
                  onClick={() => setSelectedLocation(index)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">{location.location}</h4>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-blue-300" />
                      <span className="text-blue-300 text-sm">{location.ping} ms</span>
                    </div>
                  </div>
                  {selectedLocation === index && (
                    <div className="mt-2 flex items-center">
                      <BarChart className="h-4 w-4 mr-1 text-blue-400" />
                      <motion.span animate={controls} className="text-blue-400 text-sm font-medium">
                        Estimated Ping: {userPing !== null ? `${userPing} ms` : "Measuring..."}
                      </motion.span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-blue-500/30">
            <p className="text-white/60 text-sm">
              These are estimated ping times. Actual ping may vary depending on your location and internet connection.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

