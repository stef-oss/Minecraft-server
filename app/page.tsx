"use client"

import { useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DarkPremiumBackground } from "@/components/dark-premium-background"
import { Navbar } from "@/components/navbar" // Make sure this is imported correctly
import { Footer } from "@/components/footer"
import { DarkFadeIn } from "@/components/animation-utils"
import { AnimatedButton } from "@/components/animated-button"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { PlayerSlider } from "@/components/player-slider"
import { ServerStatusSection } from "@/components/server-status-section"
import { ModpackSection } from "@/components/modpack-section"
import { HardwareShowcase } from "@/components/hardware-showcase"
import { BedrockSupport } from "@/components/bedrock-support"

export default function Home() {
  // Enable smooth scrolling with improved performance
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Add smooth scrolling to the document
      document.documentElement.style.scrollBehavior = "smooth"

      // Smooth scroll function for navigation links with optimized performance
      const handleLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const link = target.closest("a")

        if (!link) return

        const href = link.getAttribute("href")
        if (!href || !href.startsWith("#")) return

        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Use requestAnimationFrame for smoother scrolling
          const headerOffset = 80
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })

          // Update URL without reload
          window.history.pushState(null, "", href)
        }
      }

      document.addEventListener("click", handleLinkClick, { passive: true })

      return () => {
        document.removeEventListener("click", handleLinkClick)
        document.documentElement.style.scrollBehavior = "auto"
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <DarkPremiumBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PlayerSlider />
          <ServerStatusSection />
          <HardwareShowcase />
          <BedrockSupport />
          <ModpackSection />
          <TestimonialsSection />
          <PricingSection />

          <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
            <div className="max-w-7xl mx-auto text-center">
              <DarkFadeIn>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                  Ready to start your <span className="text-blue-500">Minecraft journey</span>?
                </h2>
                <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-8">
                  Join thousands of players who trust Nexonoia Host for their Minecraft hosting needs.
                </p>
                <AnimatedButton variant="premium" size="lg" icon={<ChevronRight className="h-4 w-4" />}>
                  Get Started
                </AnimatedButton>
              </DarkFadeIn>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

