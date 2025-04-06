"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Users, Server, Cpu } from "lucide-react"

// Define plan thresholds and details
const planThresholds = {
  Starter: { min: 1, max: 10 },
  Premium: { min: 11, max: 30 },
  Ultimate: { min: 31, max: 60 },
  Enterprise: { min: 61, max: 100 },
}

const planDetails = {
  Starter: {
    ram: "2GB",
    cpu: "2 vCores",
    storage: "25GB NVMe SSD",
    price: "$4.99",
  },
  Premium: {
    ram: "4GB",
    cpu: "4 vCores",
    storage: "50GB NVMe SSD",
    price: "$9.99",
  },
  Ultimate: {
    ram: "8GB",
    cpu: "6 vCores",
    storage: "100GB NVMe SSD",
    price: "$19.99",
  },
  Enterprise: {
    ram: "16GB",
    cpu: "8 vCores (Ryzen 9 7950X)",
    storage: "250GB NVMe SSD",
    price: "$39.99",
  },
}

export function PlayerSlider() {
  const [playerCount, setPlayerCount] = useState(20)
  const [recommendedPlan, setRecommendedPlan] = useState("Premium")
  const [recommendedSpecs, setRecommendedSpecs] = useState(planDetails.Premium)

  useEffect(() => {
    // Determine recommended plan based on player count
    if (playerCount <= planThresholds.Starter.max) {
      setRecommendedPlan("Starter")
      setRecommendedSpecs(planDetails.Starter)
    } else if (playerCount <= planThresholds.Premium.max) {
      setRecommendedPlan("Premium")
      setRecommendedSpecs(planDetails.Premium)
    } else if (playerCount <= planThresholds.Ultimate.max) {
      setRecommendedPlan("Ultimate")
      setRecommendedSpecs(planDetails.Ultimate)
    } else {
      setRecommendedPlan("Enterprise")
      setRecommendedSpecs(planDetails.Enterprise)
    }
  }, [playerCount])

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10">
      <h3 className="text-2xl font-bold mb-8 text-center text-white">Find Your Perfect Server</h3>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-blue-300">How many players will connect?</span>
          <span className="text-white font-bold">{playerCount} Players</span>
        </div>
        <Slider
          value={[playerCount]}
          min={1}
          max={100}
          step={1}
          onValueChange={(value) => setPlayerCount(value[0])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-white/60">
          <span>1</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100+</span>
        </div>
      </div>

      <motion.div
        className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-6 rounded-lg border border-blue-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={recommendedPlan} // Re-animate when plan changes
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-bold text-white">
            Recommended Plan: <span className="text-blue-400">{recommendedPlan}</span>
          </h4>
          <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
            {recommendedSpecs.price}/month
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900/50 p-2 rounded-lg">
              <Server className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="text-white/60 text-xs">RAM</div>
              <div className="text-white font-medium">{recommendedSpecs.ram}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-blue-900/50 p-2 rounded-lg">
              <Cpu className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="text-white/60 text-xs">CPU</div>
              <div className="text-white font-medium">{recommendedSpecs.cpu}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-blue-900/50 p-2 rounded-lg">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="text-white/60 text-xs">Ideal For</div>
              <div className="text-white font-medium">
                {planThresholds[recommendedPlan as keyof typeof planThresholds].min}-
                {planThresholds[recommendedPlan as keyof typeof planThresholds].max} players
              </div>
            </div>
          </div>
        </div>

        {recommendedPlan === "Enterprise" && (
          <div className="mb-6 bg-gradient-to-r from-blue-900/30 to-blue-700/30 p-3 rounded-lg border border-blue-500/30">
            <div className="flex items-center space-x-2">
              <Cpu className="h-5 w-5 text-blue-300" />
              <span className="text-blue-300 font-medium">Powered by Ryzen 9 7950X</span>
            </div>
            <p className="text-white/70 text-sm mt-1">
              Our Enterprise plans utilize AMD Ryzen 9 7950X processors for maximum performance and reliability.
            </p>
          </div>
        )}

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started with {recommendedPlan}</Button>
      </motion.div>
    </div>
  )
}

