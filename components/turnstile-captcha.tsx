"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void
  onError?: (error: string) => void
}

export function TurnstileCaptcha({ onVerify, onError }: TurnstileCaptchaProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleVerify = async () => {
    try {
      setStatus("loading")

      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a custom token
      const mockToken = `custom_verification_${Date.now()}`

      setStatus("success")
      onVerify(mockToken)
    } catch (error) {
      setStatus("error")
      setErrorMessage("Verification failed. Please try again.")
      if (onError) onError("Verification failed")
    }
  }

  const handleRetry = () => {
    setStatus("idle")
    setErrorMessage("")
  }

  return (
    <div className="w-full mb-4">
      <div className="bg-black border border-blue-900 rounded-lg p-4">
        <div className="flex flex-col items-center justify-center">
          {status === "idle" && (
            <div className="text-center">
              <p className="text-white mb-3">Please verify that you are human</p>
              <Button onClick={handleVerify} className="bg-blue-600 hover:bg-blue-700 text-white">
                Verify Now
              </Button>
            </div>
          )}

          {status === "loading" && (
            <div className="text-center py-2">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-2" />
              <p className="text-white">Verifying...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center py-2">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-white">Verification successful!</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-2">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-white mb-2">{errorMessage}</p>
              <Button
                onClick={handleRetry}
                variant="outline"
                className="border-blue-500 text-white hover:bg-blue-900/50"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

