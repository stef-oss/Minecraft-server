import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PremiumCard } from "@/components/premium-card"
import { AnimatedButton } from "@/components/animated-button"

export const metadata: Metadata = {
  title: "Dashboard | Nexonoia Host",
  description: "Manage your Minecraft servers with Nexonoia Host",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-blue-300">Manage your Minecraft servers and account settings</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Server Card */}
            <PremiumCard
              title="My Minecraft Server"
              description=""
              glowOnHover={true}
              borderGradient={true}
              hoverEffect="lift"
              glowColor="rgba(59, 130, 246, 0.5)"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] mr-2"></div>
                    <span className="text-green-400">Online</span>
                  </div>
                  <span className="text-white">12/50 players</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-300">CPU:</span>
                    <span className="text-white">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">RAM:</span>
                    <span className="text-white">4.2GB/8GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Uptime:</span>
                    <span className="text-white">3d 14h 22m</span>
                  </div>
                </div>
                <div className="pt-2">
                  <AnimatedButton className="w-full" variant="premium" glowColor="rgba(59, 130, 246, 0.5)">
                    Manage Server
                  </AnimatedButton>
                </div>
              </div>
            </PremiumCard>

            {/* Add Server Card */}
            <PremiumCard
              title="Add New Server"
              description="Deploy a new Minecraft server with just a few clicks"
              glowOnHover={true}
              borderGradient={true}
              hoverEffect="lift"
              glowColor="rgba(59, 130, 246, 0.5)"
            >
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-full bg-blue-900/50 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400 h-8 w-8"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <AnimatedButton variant="premium" glowColor="rgba(59, 130, 246, 0.5)">
                  Create Server
                </AnimatedButton>
              </div>
            </PremiumCard>

            {/* Account Card */}
            <PremiumCard
              title="Account"
              description=""
              glowOnHover={true}
              borderGradient={true}
              hoverEffect="lift"
              glowColor="rgba(59, 130, 246, 0.5)"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Plan:</span>
                    <span className="text-white">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Next billing:</span>
                    <span className="text-white">May 15, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Support:</span>
                    <span className="text-green-400">Priority</span>
                  </div>
                </div>
                <div className="pt-2 flex space-x-2">
                  <Button variant="outline" className="flex-1 border-blue-500/30 text-blue-300 hover:bg-blue-900/40">
                    Billing
                  </Button>
                  <AnimatedButton className="flex-1" variant="premium" glowColor="rgba(59, 130, 246, 0.5)">
                    Upgrade
                  </AnimatedButton>
                </div>
              </div>
            </PremiumCard>
          </div>

          <div className="mt-12">
            <Link href="/">
              <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-900/40">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

