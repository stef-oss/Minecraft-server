import type { Metadata } from "next"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/animated-button"
import { PremiumCard } from "@/components/premium-card"

export const metadata: Metadata = {
  title: "Register | Nexonoia Host",
  description: "Create a new account with Nexonoia Host for premium Minecraft server hosting",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <div className="container relative flex flex-col items-center justify-center py-20">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
          <div className="mx-auto w-full max-w-md space-y-6 z-10">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">Create an Account</h1>
              <p className="text-blue-300">Sign up for Nexonoia Host to get started with premium Minecraft hosting</p>
            </div>

            <PremiumCard
              title=""
              description=""
              glowOnHover={true}
              borderGradient={true}
              hoverEffect="lift"
              glowColor="rgba(59, 130, 246, 0.5)"
            >
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-blue-200">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="bg-blue-950/40 border-blue-500/30 text-white focus:border-blue-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-blue-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-blue-950/40 border-blue-500/30 text-white focus:border-blue-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-blue-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="bg-blue-950/40 border-blue-500/30 text-white focus:border-blue-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirm-password" className="text-blue-200">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    className="bg-blue-950/40 border-blue-500/30 text-white focus:border-blue-400"
                  />
                </div>

                <AnimatedButton type="submit" className="w-full" variant="premium" glowColor="rgba(59, 130, 246, 0.5)">
                  Create Account
                </AnimatedButton>

                <div className="text-center text-sm text-blue-300">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-400 underline underline-offset-4 hover:text-blue-300 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </PremiumCard>

            <div className="text-balance text-center text-xs text-blue-400 [&_a]:text-blue-300 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-200">
              By signing up, you agree to our <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

