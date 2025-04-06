import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Users, Zap, Server, Shield, CheckCircle2 } from "lucide-react"

export default function UnlimitedSlotsPage() {
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
            <span className="text-blue-500">Unlimited</span> Player Slots
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Scale your Minecraft community without limits with our unlimited player slot plans
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-8">
            <div className="flex items-center mb-6">
              <Users className="h-10 w-10 text-blue-400 mr-4" />
              <h2 className="text-3xl font-bold">Unlimited Player Slots</h2>
            </div>

            <p className="text-white/80 mb-6">
              Unlike other hosting providers that limit your player slots, Nexonoia Host offers truly unlimited player
              capacity on all plans. Our powerful Ryzen 9 7950X processors can handle massive player counts without
              compromising performance.
            </p>

            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                <div>
                  <span className="text-white font-medium">No Artificial Limits</span>
                  <p className="text-white/70 text-sm">
                    We don't impose arbitrary player slot restrictions on your server
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Scale With Your Community</span>
                  <p className="text-white/70 text-sm">
                    Grow your player base without worrying about upgrading your plan
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Optimized Performance</span>
                  <p className="text-white/70 text-sm">
                    Our servers are optimized to handle high player counts efficiently
                  </p>
                </div>
              </li>
            </ul>

            <Link href="/pricing" passHref>
              <Button className="w-full">View Pricing Plans</Button>
            </Link>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-yellow-400 mr-3" />
                <h3 className="text-xl font-bold">High Performance</h3>
              </div>
              <p className="text-white/70">
                Our Ryzen 9 7950X processors deliver exceptional performance even with hundreds of players online
                simultaneously.
              </p>
            </div>

            <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
              <div className="flex items-center mb-4">
                <Server className="h-8 w-8 text-green-400 mr-3" />
                <h3 className="text-xl font-bold">Resource Allocation</h3>
              </div>
              <p className="text-white/70">
                Dynamic resource allocation ensures your server gets the CPU, RAM, and I/O it needs as player count
                increases.
              </p>
            </div>

            <div className="bg-gradient-to-br from-black/60 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-red-400 mr-3" />
                <h3 className="text-xl font-bold">DDoS Protection</h3>
              </div>
              <p className="text-white/70">
                Enterprise-grade DDoS protection keeps your server online even during attacks, ensuring your players
                stay connected.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to host your community?</h2>
          <Link href="/pricing" passHref>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

