import type { Metadata } from "next"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/animated-button"
import { PremiumCard } from "@/components/premium-card"

export const metadata: Metadata = {
  title: "Reset Password | Nexonoia Host",
  description: "Reset your Nexonoia Host account password",
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <div className="container relative flex flex-col items-center justify-center py-20">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
          <div className="mx-auto w-full max-w-md space-y-6 z-10">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">Reset Password</h1>
              <p className="text-blue-300">Enter your email address and we'll send you a link to reset your password</p>
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

                <AnimatedButton type="submit" className="w-full" variant="premium" glowColor="rgba(59, 130, 246, 0.5)">
                  Send Reset Link
                </AnimatedButton>

                <div className="text-center text-sm text-blue-300">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="text-blue-400 underline underline-offset-4 hover:text-blue-300 transition-colors"
                  >
                    Back to login
                  </Link>
                </div>
              </form>
            </PremiumCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

