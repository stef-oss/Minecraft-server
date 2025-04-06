"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Server } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Export as a named export instead of default export
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <Server className="h-7 w-7 text-blue-500 transition-colors duration-300" />
          <span className="text-xl font-bold text-white">Nexonoia Host</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-white/80 hover:text-blue-400 transition-colors">
            Features
          </Link>
          <Link href="#hardware" className="text-white/80 hover:text-blue-400 transition-colors">
            Hardware
          </Link>
          <Link href="#server-finder" className="text-white/80 hover:text-blue-400 transition-colors">
            Server Finder
          </Link>
          <Link href="#server-status" className="text-white/80 hover:text-blue-400 transition-colors">
            Monitoring
          </Link>
          <Link href="#bedrock" className="text-white/80 hover:text-blue-400 transition-colors flex items-center">
            <span>Bedrock</span>
            <span className="ml-1.5 text-xs bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-400 flex-shrink-0">NEW</span>
          </Link>
          <Link href="#modpacks" className="text-white/80 hover:text-blue-400 transition-colors">
            Modpacks
          </Link>
          <Link href="#pricing" className="text-white/80 hover:text-blue-400 transition-colors">
            Pricing
          </Link>
          <Link href="/support" className="text-white/80 hover:text-blue-400 transition-colors">
            Support
          </Link>
          <Link href="/billing" className="text-white/80 hover:text-blue-400 transition-colors">
            Billing
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
            Login
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/90 backdrop-blur-sm shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#hardware"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hardware
              </Link>
              <Link
                href="#server-finder"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Server Finder
              </Link>
              <Link
                href="#server-status"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Monitoring
              </Link>
              <Link
                href="#bedrock"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Bedrock</span>
                <span className="ml-1.5 text-xs bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-400 flex-shrink-0">
                  NEW
                </span>
              </Link>
              <Link
                href="#modpacks"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Modpacks
              </Link>
              <Link
                href="#pricing"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/support"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
              <Link
                href="/billing"
                className="text-white/80 hover:text-blue-400 transition-colors py-2 border-b border-blue-900/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Billing
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 w-full">
                  Login
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">Sign Up</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

