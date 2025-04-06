"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MathCaptchaProps {
  onVerify: (token: string) => void
}

export function MathCaptcha({ onVerify }: MathCaptchaProps) {
  const [firstNumber, setFirstNumber] = useState(0)
  const [secondNumber, setSecondNumber] = useState(0)
  const [answer, setAnswer] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  const generateNewProblem = () => {
    // Generate random numbers between 1 and 10
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setFirstNumber(num1)
    setSecondNumber(num2)
    setAnswer("")
    setError(null)
    setIsVerified(false)
  }

  useEffect(() => {
    generateNewProblem()
  }, [])

  const handleVerify = () => {
    const expectedAnswer = firstNumber + secondNumber
    const userAnswer = Number.parseInt(answer, 10)

    if (isNaN(userAnswer)) {
      setError("Please enter a valid number")
      return
    }

    if (userAnswer === expectedAnswer) {
      setIsVerified(true)
      setError(null)

      // Create a verification token (in a real app, this would be more secure)
      const token = btoa(
        JSON.stringify({
          verified: true,
          timestamp: Date.now(),
          problem: `${firstNumber}+${secondNumber}=${expectedAnswer}`,
        }),
      )

      onVerify(token)
    } else {
      setError("Incorrect answer, please try again")
      setAttempts(attempts + 1)

      // After 3 failed attempts, generate a new problem
      if (attempts >= 2) {
        setTimeout(() => {
          generateNewProblem()
          setAttempts(0)
        }, 1000)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="border border-blue-900/50 rounded-lg p-4 bg-black/50">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-300">Verification Challenge</h3>
            {!isVerified && (
              <Button
                variant="ghost"
                size="sm"
                onClick={generateNewProblem}
                className="h-8 px-2 text-blue-400 hover:text-blue-300"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                New Problem
              </Button>
            )}
          </div>

          {isVerified ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-green-400 bg-green-900/20 p-3 rounded-md"
            >
              <Check className="h-5 w-5" />
              <span>Verification successful!</span>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-center text-xl font-bold bg-blue-900/20 py-3 px-4 rounded-md">
                <span className="text-white">
                  {firstNumber} + {secondNumber} = ?
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha-answer" className="text-blue-100">
                  Enter the answer:
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="captcha-answer"
                    type="number"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value)
                      setError(null)
                    }}
                    placeholder="Your answer"
                    className="bg-black/50 border-blue-900/50 text-white"
                  />
                  <Button onClick={handleVerify} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Verify
                  </Button>
                </div>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 mt-1">
                  {error}
                </motion.p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

