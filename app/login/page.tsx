import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Login | Nexonoia Host",
  description: "Login to your Nexonoia Host account to manage your Minecraft servers",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <div className="container relative flex flex-col items-center justify-center py-20">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
          <div className="mx-auto w-full max-w-md space-y-6 z-10">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">Account Login</h1>
              <p className="text-blue-300">Enter your credentials to access your Nexonoia Host dashboard</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

