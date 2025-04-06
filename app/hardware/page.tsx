import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Cpu, Server } from "lucide-react"

export default function HardwarePage() {
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
            Our <span className="text-blue-500">Hardware</span> Infrastructure
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Explore the premium hardware that powers Nexonoia Host's Minecraft servers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
            <div className="flex items-center mb-4">
              <Cpu className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold">Processors</h2>
            </div>
            <p className="text-white/70 mb-4">
              Our servers are powered by the latest AMD Ryzen 9 7950X processors, delivering exceptional performance for
              your Minecraft server.
            </p>
            <Link href="/hardware/processors" passHref>
              <Button className="w-full">View Processors</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
            <div className="flex items-center mb-4">
              <Server className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold">Memory</h2>
            </div>
            <p className="text-white/70 mb-4">
              High-speed DDR5 ECC memory ensures stability and performance for even the most demanding Minecraft
              servers.
            </p>
            <Link href="/hardware/memory" passHref>
              <Button className="w-full">View Memory</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
            <div className="flex items-center mb-4">
              <Server className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold">Storage</h2>
            </div>
            <p className="text-white/70 mb-4">
              Ultra-fast NVMe SSD storage provides lightning-quick world loading and chunk generation for your Minecraft
              server.
            </p>
            <Link href="/hardware/storage" passHref>
              <Button className="w-full">View Storage</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

