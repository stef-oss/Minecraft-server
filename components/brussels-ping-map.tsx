"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Globe, Clock, MapPin, Copy, Check, RefreshCw, Info } from "lucide-react"

// Brussels server location
const BRUSSELS_LOCATION = {
  name: "Brussels",
  country: "Belgium",
  lat: 50.85,
  lng: 4.35,
}

// Regions with estimated ping times from Brussels
const REGIONS = [
  { name: "Western Europe", lat: 48.8, lng: 2.3, baseLatency: 15 },
  { name: "Eastern Europe", lat: 52.2, lng: 21.0, baseLatency: 30 },
  { name: "Northern Europe", lat: 59.3, lng: 18.0, baseLatency: 40 },
  { name: "Southern Europe", lat: 41.9, lng: 12.5, baseLatency: 35 },
  { name: "UK & Ireland", lat: 51.5, lng: -0.12, baseLatency: 25 },
  { name: "North America (East)", lat: 40.7, lng: -74.0, baseLatency: 90 },
  { name: "North America (West)", lat: 37.8, lng: -122.4, baseLatency: 150 },
  { name: "South America", lat: -23.5, lng: -46.6, baseLatency: 180 },
  { name: "Asia (East)", lat: 35.7, lng: 139.8, baseLatency: 250 },
  { name: "Asia (South)", lat: 19.1, lng: 72.9, baseLatency: 200 },
  { name: "Australia", lat: -33.9, lng: 151.2, baseLatency: 280 },
  { name: "Africa", lat: -33.9, lng: 18.4, baseLatency: 170 },
]

export function BrusselsPingMap() {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [userRegion, setUserRegion] = useState(0);
  const [userPing, setUserPing] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);

  // Estimate user's region based on browser timezone
  useEffect(() => {
    const estimateUserRegion = () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Simple timezone to region mapping
        if (timezone.includes("Europe")) {
          if (timezone.includes("London") || timezone.includes("Dublin")) {
            return 4; // UK & Ireland
          } else if (timezone.includes("Moscow") || timezone.includes("Bucharest")) {
            return 1; // Eastern Europe
          } else if (timezone.includes("Stockholm") || timezone.includes("Helsinki")) {
            return 2; // Northern Europe
          } else if (timezone.includes("Rome") || timezone.includes("Madrid")) {
            return 3; // Southern Europe
          } else {
            return 0; // Western Europe
          }
        } else if (timezone.includes("America")) {
          if (timezone.includes("New_York") || timezone.includes("Eastern")) {
            return 5; // North America (East)
          } else {
            return 6; // North America (West)
          }
        } else if (timezone.includes("Asia")) {
          if (timezone.includes("Tokyo") || timezone.includes("Hong_Kong")) {
            return 8; // Asia (East)
          } else {
            return 9; // Asia (South)
          }
        } else if (timezone.includes("Australia")) {
          return 10; // Australia
        } else if (timezone.includes("Africa")) {
          return 11; // Africa
        } else {
          return 7; // South America as fallback
        }
      } catch (error) {
        console.error("Error estimating region:", error);
        return 0; // Default to Western Europe
      }
    };

    const region = estimateUserRegion();
    setUserRegion(region);
    setSelectedRegion(region);
  }, []);

  // Calculate ping based on user's region
  useEffect(() => {
    const calculatePing = () => {
      // Base latency for the user's region
      const baseLatency = REGIONS[userRegion].baseLatency;

      // Add some realistic variation (±10ms)
      const variation = Math.floor(Math.random() * 20) - 10;

      // Add some jitter that changes slightly over time
      const jitter = Math.floor(Math.random() * 5);

      return Math.max(5, baseLatency + variation + jitter);
    };

    const updatePing = () => {
      setUserPing(calculatePing());
    };

    // Initial ping calculation
    updatePing();

    // Update ping periodically
    const interval = setInterval(updatePing, 3000);

    return () => clearInterval(interval);
  }, [userRegion]);

  // Animate connection line between Brussels and selected region
  const animateConnection = (index) => {
    setSelectedRegion(index);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Copy server address to clipboard
  const copyServerAddress = () => {
    navigator.clipboard.writeText(`play.nexonoia.com`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Refresh ping calculation
  const refreshPing = () => {
    setIsLoading(true);

    setTimeout(() => {
      const baseLatency = REGIONS[userRegion].baseLatency;
      const variation = Math.floor(Math.random() * 20) - 10;
      setUserPing(Math.max(5, baseLatency + variation));
      setIsLoading(false);
    }, 800);
  };

  // Get ping quality description and color
  const getPingQuality = (ping) => {
    if (ping === null) return { text: "Unknown", color: "text-gray-400" };

    if (ping < 50) return { text: "Excellent", color: "text-green-400" };
    if (ping < 100) return { text: "Very Good", color: "text-green-400" };
    if (ping < 150) return { text: "Good", color: "text-blue-400" };
    if (ping < 200) return { text: "Average", color: "text-yellow-400" };
    if (ping < 300) return { text: "Poor", color: "text-orange-400" };
    return { text: "High Latency", color: "text-red-400" };
  };

  // Get ping bar color
  const getPingBarColor = (ping) => {
    if (ping === null) return "bg-gray-600";

    if (ping < 50) return "bg-green-500";
    if (ping < 100) return "bg-green-500";
    if (ping < 150) return "bg-blue-500";
    if (ping < 200) return "bg-yellow-500";
    if (ping < 300) return "bg-orange-500";
    return "bg-red-500";
  };

  const pingQuality = getPingQuality(userPing);
  const pingBarColor = getPingBarColor(userPing);

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Global <span className="text-blue-400">Ping Map</span>
          </h2>
          <p className="text-gray-400 text-lg">Check your estimated ping to our servers in Brussels, Belgium</p>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-gray-200">Nexonoia Host Network</h3>
            </div>
            <div className="flex items-center">
              <button
                className="px-4 py-2 border border-gray-600 rounded-md text-blue-400 hover:bg-gray-700 text-sm flex items-center"
                onClick={refreshPing}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh Ping
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-200 font-medium">
                  Nexonoia Host Server Location: {BRUSSELS_LOCATION.name}, {BRUSSELS_LOCATION.country}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300">Your Estimated Ping: </span>
                <motion.span 
                  className="ml-2 text-blue-400 font-medium"
                  animate={{ scale: userPing ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {userPing !== null ? `${userPing}ms` : "Measuring..."}
                </motion.span>
                <span className={`ml-2 ${pingQuality.color} text-sm`}>({pingQuality.text})</span>
              </div>

              <div className="mt-3 space-y-2">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
                  <motion.div
                    className={`h-full rounded-full ${pingBarColor}`}
                    initial={{ width: "0%" }}
                    animate={{ width: userPing ? `${Math.min(100, (userPing / 300) * 100)}%` : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0ms</span>
                  <span>100ms</span>
                  <span>200ms</span>
                  <span>300ms+</span>
                </div>
              </div>
            </div>

            <div
              ref={mapRef}
              className="relative h-[300px] sm:h-[400px] bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mb-6"
            >
              {/* World Map representation */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-full h-full bg-gray-900">
                  {/* Grid lines */}
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute top-0 bottom-0 border-r border-gray-700"
                      style={{ left: `${(i / 18) * 100}%` }}
                    />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute left-0 right-0 border-t border-gray-700"
                      style={{ top: `${(i / 9) * 100}%` }}
                    />
                  ))}

                  {/* Simplified continent shapes */}
                  <div className="absolute w-1/4 h-3/10 top-1/5 left-[15%] bg-blue-900 opacity-30 rounded-lg"></div>
                  <div className="absolute w-1/5 h-[35%] top-[15%] left-[42%] bg-blue-900 opacity-30 rounded-lg"></div>
                  <div className="absolute w-1/4 h-1/4 top-1/5 left-[65%] bg-blue-900 opacity-30 rounded-lg"></div>
                  <div className="absolute w-[15%] h-1/5 top-3/5 left-1/5 bg-blue-900 opacity-30 rounded-lg"></div>
                  <div className="absolute w-[15%] h-1/5 top-3/5 left-[65%] bg-blue-900 opacity-30 rounded-lg"></div>
                </div>
              </div>

              {/* Brussels server location marker */}
              <div
                className="absolute z-10"
                style={{
                  left: `${((BRUSSELS_LOCATION.lng + 180) / 360) * 100}%`,
                  top: `${((90 - BRUSSELS_LOCATION.lat) / 180) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-blue-500 opacity-30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-gray-800 shadow-md" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-gray-200 text-xs py-1 px-2 rounded border border-gray-700 shadow-sm">
                    Brussels, Belgium
                  </div>
                </div>
              </div>

              {/* Region markers */}
              {REGIONS.map((region, index) => {
                const isSelected = selectedRegion === index;
                const isUserRegion = userRegion === index;
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
                        className={`h-3 w-3 rounded-full ${
                          isSelected ? "bg-blue-400" : isUserRegion ? "bg-yellow-500" : "bg-gray-500"
                        } hover:bg-blue-400 transition-colors duration-300`}
                        whileHover={{ scale: 1.5 }}
                        animate={
                          isSelected || isUserRegion
                            ? {
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.8, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 1.5,
                          repeat: isSelected || isUserRegion ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-gray-200 text-xs py-1 px-2 rounded border border-gray-700 shadow-sm z-20"
                        >
                          <div className="font-medium">{region.name}</div>
                          <div className="text-blue-400">
                            {region.baseLatency - 10}-{region.baseLatency + 10}ms
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Connection line to Brussels */}
                    {isSelected && (
                      <svg
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{
                          position: "absolute",
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
                          d={`M ${((BRUSSELS_LOCATION.lng + 180) / 360) * 100}% ${
                            ((90 - BRUSSELS_LOCATION.lat) / 180) * 100
                          }% L ${((region.lng + 180) / 360) * 100}% ${((90 - region.lat) / 180) * 100}%`}
                          stroke="rgba(96, 165, 250, 0.7)"
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
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
              {REGIONS.map((region, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    selectedRegion === index
                      ? "bg-gray-800 border-2 border-blue-500"
                      : userRegion === index
                        ? "bg-gray-800 border border-yellow-500"
                        : "bg-gray-800 border border-gray-700 hover:border-blue-500"
                  }`}
                  onClick={() => animateConnection(index)}
                >
                  <div className="font-medium text-gray-200 truncate">{region.name}</div>
                  <div className="text-blue-400">
                    {region.baseLatency - 10}-{region.baseLatency + 10}ms
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Nexonoia Host Server Address</span>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-800 rounded px-3 py-2 text-gray-200 flex-1 font-mono text-sm border border-gray-600">
                  play.nexonoia.com
                </div>
                <button
                  className="ml-2 px-3 py-2 border border-gray-600 rounded-md text-blue-400 hover:bg-gray-700"
                  onClick={copyServerAddress}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-400 flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Works with Java & Bedrock Edition
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

