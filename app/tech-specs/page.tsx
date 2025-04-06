import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Cpu, MemoryStickIcon as Memory, HardDrive, Server } from "lucide-react"

export default function TechSpecsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-8">
          <Link href="/" passHref>
            <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Technical <span className="text-blue-500">Specifications</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Detailed specifications of our premium hardware infrastructure
          </p>
        </div>

        <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-8 mb-12">
          <div className="flex items-center mb-6">
            <Cpu className="h-10 w-10 text-red-400 mr-4" />
            <h2 className="text-3xl font-bold">AMD Ryzen 9 7950X</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Processor Specifications</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-white/70">Cores</span>
                  <span className="font-bold">16</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Threads</span>
                  <span className="font-bold">32</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Base Clock</span>
                  <span className="font-bold">4.5 GHz</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Max Boost Clock</span>
                  <span className="font-bold">5.7 GHz</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Total L3 Cache</span>
                  <span className="font-bold">64 MB</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Total L2 Cache</span>
                  <span className="font-bold">16 MB</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Default TDP</span>
                  <span className="font-bold">170W</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Architecture</span>
                  <span className="font-bold">Zen 4</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Minecraft Performance</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-white/70">Max Players Supported</span>
                  <span className="font-bold">Unlimited</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Chunk Loading Speed</span>
                  <span className="font-bold">230% faster</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Redstone Processing</span>
                  <span className="font-bold">185% faster</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">World Generation</span>
                  <span className="font-bold">210% faster</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Entity Processing</span>
                  <span className="font-bold">195% faster</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">TPS Stability</span>
                  <span className="font-bold">99.9%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
            <div className="flex items-center mb-4">
              <Memory className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-xl font-bold">Memory</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-white/70">Type</span>
                <span className="font-bold">DDR5 ECC</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/70">Speed</span>
                <span className="font-bold">5200 MHz</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/70">Capacity</span>
                <span className="font-bold">Up to 128GB</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
            <div className="flex items-center mb-4">
              <HardDrive className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-xl font-bold">Storage</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-white/70">Type</span>
                <span className="font-bold">NVMe SSD</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/70">Interface</span>
                <span className="font-bold">PCIe 4.0</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/70">Read Speed</span>
                <span className="font-bold">7000 MB/s</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
            <div className="flex items-center mb-4">
              <Server className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-xl font-bold">Network</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-white/70">Uplink</span>
                <span className="font-bold">10 Gbps</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/70">DDoS Protection</span>
                <span className="font-bold">Included</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/70">Global CDN</span>
                <span className="font-bold">Yes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

