import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Globe } from "lucide-react"
import { BrusselsPingMap } from "@/components/brussels-ping-map"
import { UbiquitiBackground } from "@/components/ubiquiti-background"

export default function PingMapPage() {
  return (
    <div className="min-h-screen bg-white relative">
      <UbiquitiBackground />

      <div className="relative z-10">
        <div className="ubiquiti-container py-24">
          <div className="mb-8">
            <Link href="/" passHref>
              <Button variant="outline" className="border-ubiquiti-border text-ubiquiti-blue hover:bg-ubiquiti-hover">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-semibold mb-6 text-ubiquiti-black">
              Global <span className="text-ubiquiti-blue">Network</span> Status
            </h1>
            <p className="text-xl text-ubiquiti-darkgray max-w-3xl mx-auto">
              Check your ping to our servers in Brussels, Belgium and find the optimal connection for your Minecraft
              experience
            </p>
          </div>

          <BrusselsPingMap />

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-ubiquiti-black">Why Ping Matters for Minecraft</h2>
            <p className="text-lg text-ubiquiti-darkgray max-w-3xl mx-auto mb-8">
              Lower ping means smoother gameplay, less lag, and a better overall experience. Our servers in Brussels
              provide excellent connectivity throughout Europe and good connections worldwide.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg border border-ubiquiti-border shadow-ubiquiti p-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-ubiquiti-blue mr-3" />
                  <h3 className="text-xl font-semibold text-ubiquiti-black">Low Latency</h3>
                </div>
                <p className="text-ubiquiti-darkgray">
                  Experience responsive gameplay with minimal delay between your actions and server response.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-ubiquiti-border shadow-ubiquiti p-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-ubiquiti-blue mr-3" />
                  <h3 className="text-xl font-semibold text-ubiquiti-black">Stable Connection</h3>
                </div>
                <p className="text-ubiquiti-darkgray">
                  Our network infrastructure ensures consistent ping with minimal fluctuations for a smooth experience.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-ubiquiti-border shadow-ubiquiti p-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-ubiquiti-blue mr-3" />
                  <h3 className="text-xl font-semibold text-ubiquiti-black">Global Reach</h3>
                </div>
                <p className="text-ubiquiti-darkgray">
                  Our strategic location in Brussels provides excellent connectivity to players around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

