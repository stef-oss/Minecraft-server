"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Server, Users, Clock, Cpu, HardDrive, BarChart, RefreshCw, Info } from "lucide-react"

export function ServerStatusSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [serverData, setServerData] = useState({
    status: "Online",
    players: 42,
    maxPlayers: 100,
    uptime: "99.98%",
    cpuUsage: 32,
    ramUsage: 68,
    tps: 19.8, // Ticks per second
    lastRestart: "2 days ago",
  })

  const controls = useAnimation()

  const refreshData = () => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      // Simulate new data
      setServerData({
        ...serverData,
        players: Math.floor(Math.random() * 60) + 30,
        cpuUsage: Math.floor(Math.random() * 40) + 20,
        ramUsage: Math.floor(Math.random() * 30) + 60,
        tps: (19 + Math.random()).toFixed(1),
      })
      setIsLoading(false)

      // Animate the card
      controls.start({
        scale: [1, 1.01, 1],
        transition: { duration: 0.3 },
      })
    }, 800)
  }

  useEffect(() => {
    // Initial animation
    controls.start({
      y: [20, 0],
      opacity: [0, 1],
      transition: { duration: 0.5 },
    })
  }, [controls])

  return (
    <section id="server-status" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Real-Time <span className="text-blue-500">Server Monitoring</span>
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Keep track of your server's performance with our advanced monitoring dashboard.
          </p>
        </div>

        <motion.div
          animate={controls}
          className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-500/30 overflow-hidden shadow-xl"
        >
          <div className="p-6 border-b border-blue-500/30 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Server className="h-5 w-5 text-blue-400" />
              <h3 className="font-bold text-white">Server Dashboard</h3>
              <div className="flex items-center space-x-1 bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded-full text-xs">
                <Info className="h-3 w-3" />
                <span>Demo</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              onClick={refreshData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            <Card className="bg-white/5 border-white/10">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm flex items-center">
                    <Activity className="h-4 w-4 mr-1" /> Status
                  </div>
                  <div
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      serverData.status === "Online" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                    }`}
                  >
                    {serverData.status}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{serverData.uptime}</div>
                <div className="text-white/60 text-xs">Uptime</div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm flex items-center">
                    <Users className="h-4 w-4 mr-1" /> Players
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {serverData.players}/{serverData.maxPlayers}
                </div>
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(serverData.players / serverData.maxPlayers) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm flex items-center">
                    <Cpu className="h-4 w-4 mr-1" /> CPU
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{serverData.cpuUsage}%</div>
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${serverData.cpuUsage > 80 ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${serverData.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm flex items-center">
                    <HardDrive className="h-4 w-4 mr-1" /> RAM
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{serverData.ramUsage}%</div>
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${serverData.ramUsage > 80 ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${serverData.ramUsage}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 pt-0">
            <Card className="bg-white/5 border-white/10">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm flex items-center">
                    <BarChart className="h-4 w-4 mr-1" /> TPS
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{serverData.tps}</div>
                <div className="text-white/60 text-xs">Ticks per second</div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Last Restart
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{serverData.lastRestart}</div>
                <div className="text-white/60 text-xs">Server stability</div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 md:col-span-2">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white/60 text-sm flex items-center">
                    <Activity className="h-4 w-4 mr-1" /> Performance
                  </div>
                </div>
                <div className="h-16 flex items-end space-x-1">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const height = Math.floor(Math.random() * 70) + 30
                    return (
                      <div key={i} className="flex-1 bg-blue-500/80 rounded-t" style={{ height: `${height}%` }}></div>
                    )
                  })}
                </div>
                <div className="text-white/60 text-xs mt-2">24-hour performance history</div>
              </div>
            </Card>
          </div>

          <div className="p-6 border-t border-blue-500/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm flex items-center">
              <Info className="h-4 w-4 mr-2 text-blue-400" />
              <span>
                This is a demonstration of our monitoring dashboard. Your actual server metrics will be displayed here.
              </span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">View Full Dashboard</Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

