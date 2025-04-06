"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, Clock, AlertCircle, CheckCircle2, Zap, Lock, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { validateCardDetails } from "@/app/actions/payment-actions"
import { AnimatedButton } from "./animated-button"
import { PremiumCard } from "./premium-card"
import { TurnstileCaptcha } from "./turnstile-captcha"
import { initPayPalSDK, createPayPalOrder } from "@/lib/paypal"
import { initStripeSDK, createPaymentMethod } from "@/lib/stripe"

// Subscription data - in a real app, this would come from your API
const subscriptionData = {
  plan: "Premium",
  status: "active",
  nextBillingDate: "2023-05-15",
  amount: "$19.99",
  paymentMethod: "PayPal",
  autoRenew: true,
  features: ["8GB RAM", "Unlimited Player Slots", "Premium Support", "Daily Backups", "Custom Domain"],
}

// Invoice data - in a real app, this would come from your API
const invoiceData = [
  { id: "INV-001", date: "2023-04-15", amount: "$19.99", status: "paid" },
  { id: "INV-002", date: "2023-03-15", amount: "$19.99", status: "paid" },
  { id: "INV-003", date: "2023-02-15", amount: "$19.99", status: "paid" },
]

export default function BillingDashboard() {
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card">("paypal")
  const [paymentStatus, setPaymentStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    cardholderName: "",
  })
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [subscription, setSubscription] = useState(subscriptionData)
  const [invoices, setInvoices] = useState(invoiceData)
  const [paymentMethods, setPaymentMethods] = useState<Array<{ type: string; last4?: string; isDefault: boolean }>>([
    { type: "paypal", isDefault: true },
  ])

  // Initialize payment SDKs
  useEffect(() => {
    const loadPaymentSDKs = async () => {
      try {
        // Initialize PayPal SDK
        await initPayPalSDK()

        // Initialize Stripe SDK
        await initStripeSDK()
      } catch (error) {
        console.error("Failed to load payment SDKs:", error)
      }
    }

    loadPaymentSDKs()
  }, [])

  // Handle PayPal connection
  const handlePayPalConnect = async () => {
    setIsProcessing(true)
    setPaymentStatus(null)

    try {
      // Create a PayPal order for $1 to verify the account
      const orderId = await createPayPalOrder({
        amount: 1,
        description: "Nexonoia Host - PayPal Verification",
      })

      // In a real app, you would render the PayPal buttons and let the user complete the flow
      // For this demo, we'll simulate a successful connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setPaypalLoaded(true)
      setPaymentMethods((prev) => [...prev, { type: "paypal", isDefault: false }])

      setPaymentStatus({
        success: true,
        message: "PayPal account connected successfully!",
      })
    } catch (error) {
      setPaymentStatus({
        success: false,
        message: "Failed to connect PayPal account. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle card payment method addition
  const handleAddCard = async () => {
    setIsProcessing(true)
    setPaymentStatus(null)

    try {
      if (!turnstileToken) {
        setPaymentStatus({
          success: false,
          message: "Please complete the captcha verification.",
        })
        setIsProcessing(false)
        return
      }

      // Validate card details
      const validation = await validateCardDetails(cardDetails)

      if (!validation.success) {
        setPaymentStatus({
          success: false,
          message: validation.message || "Invalid card details",
        })
        setIsProcessing(false)
        return
      }

      // Create a payment method with Stripe
      const paymentMethodResult = await createPaymentMethod(cardDetails)

      if (!paymentMethodResult.success) {
        setPaymentStatus({
          success: false,
          message: paymentMethodResult.error || "Failed to process card",
        })
        setIsProcessing(false)
        return
      }

      // Add the card to the payment methods
      const last4 = cardDetails.cardNumber.slice(-4)
      setPaymentMethods((prev) => [
        ...prev,
        {
          type: "card",
          last4,
          isDefault: false,
        },
      ])

      // Clear the form
      setCardDetails({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
        cardholderName: "",
      })

      setPaymentStatus({
        success: true,
        message: "Card added successfully!",
      })
    } catch (error) {
      setPaymentStatus({
        success: false,
        message: "Failed to add card. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle card input changes
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setCardDetails((prev) => ({ ...prev, [name]: formatted }))
    } else {
      setCardDetails((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error for this field
    if (cardErrors[name]) {
      setCardErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle captcha verification
  const handleCaptchaVerify = (token: string) => {
    setTurnstileToken(token)
  }

  // Handle setting a payment method as default
  const handleSetDefaultPaymentMethod = (index: number) => {
    setPaymentMethods((prev) =>
      prev.map((method, i) => ({
        ...method,
        isDefault: i === index,
      })),
    )

    setPaymentStatus({
      success: true,
      message: "Default payment method updated successfully!",
    })
  }

  // Handle removing a payment method
  const handleRemovePaymentMethod = (index: number) => {
    // Don't allow removing the default payment method
    if (paymentMethods[index].isDefault) {
      setPaymentStatus({
        success: false,
        message: "Cannot remove default payment method. Please set another method as default first.",
      })
      return
    }

    setPaymentMethods((prev) => prev.filter((_, i) => i !== index))

    setPaymentStatus({
      success: true,
      message: "Payment method removed successfully!",
    })
  }

  // Handle toggling auto-renew
  const handleToggleAutoRenew = () => {
    setSubscription((prev) => ({
      ...prev,
      autoRenew: !prev.autoRenew,
    }))

    setPaymentStatus({
      success: true,
      message: `Auto-renew ${subscription.autoRenew ? "disabled" : "enabled"} successfully!`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">Billing & Payments</h1>
        <p className="text-xl text-center text-blue-200 mb-12">
          Manage your subscription, payment methods, and view your billing history.
        </p>

        {paymentStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <Alert
              className={`border ${
                paymentStatus.success
                  ? "bg-blue-900/30 border-blue-500/30 text-blue-100"
                  : "bg-red-900/30 border-red-500/30 text-red-100"
              }`}
            >
              {paymentStatus.success ? (
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400" />
              )}
              <AlertTitle>{paymentStatus.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{paymentStatus.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <Tabs defaultValue="subscription" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-blue-900/20 border border-blue-500/30">
            <TabsTrigger
              value="subscription"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Subscription
            </TabsTrigger>
            <TabsTrigger
              value="payment-methods"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Payment Methods
            </TabsTrigger>
            <TabsTrigger
              value="billing-history"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Billing History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscription">
            <PremiumCard
              title="Current Subscription"
              description="View and manage your current Minecraft hosting subscription."
              glowOnHover={true}
              borderGradient={true}
              hoverEffect="lift"
              glowColor="rgba(59, 130, 246, 0.5)"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{subscription.plan} Plan</h3>
                  <Badge
                    variant={subscription.status === "active" ? "default" : "destructive"}
                    className={`mt-2 ${subscription.status === "active" ? "bg-blue-600" : ""}`}
                  >
                    {subscription.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{subscription.amount}</p>
                  <p className="text-sm text-blue-300">per month</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4 bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                      <span className="text-blue-100">Next billing date</span>
                    </div>
                    <span className="text-white">{subscription.nextBillingDate}</span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-blue-400" />
                      <span className="text-blue-100">Payment method</span>
                    </div>
                    <span className="text-white">{subscription.paymentMethod}</span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      <span className="text-blue-100">Auto-renew</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleToggleAutoRenew}
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    >
                      {subscription.autoRenew ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <Zap className="h-4 w-4 text-blue-400 mr-2" />
                    Plan Features
                  </h4>
                  <ul className="space-y-2">
                    {subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                        <span className="text-blue-100">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  Cancel Subscription
                </Button>
                <AnimatedButton
                  variant="premium"
                  icon={<Zap className="h-4 w-4" />}
                  glowColor="rgba(59, 130, 246, 0.5)"
                >
                  Upgrade Plan
                </AnimatedButton>
              </div>
            </PremiumCard>
          </TabsContent>

          <TabsContent value="payment-methods">
            <PremiumCard
              title="Payment Methods"
              description="Manage your payment methods and add new ones."
              glowOnHover={true}
              borderGradient={true}
              hoverEffect="lift"
              glowColor="rgba(59, 130, 246, 0.5)"
            >
              <div className="space-y-6">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-md flex items-center justify-center mr-4 ${
                            method.type === "paypal" ? "bg-blue-600" : "bg-blue-900"
                          }`}
                        >
                          {method.type === "paypal" ? (
                            <div className="text-white font-bold text-sm">
                              <span>Pay</span>
                              <span className="text-blue-200">Pal</span>
                            </div>
                          ) : (
                            <CreditCard className="h-6 w-6 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {method.type === "paypal" ? "PayPal" : `Card ending in ${method.last4}`}
                          </p>
                          <p className="text-sm text-blue-300">
                            {method.isDefault ? "Default payment method" : "Connected"}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefaultPaymentMethod(index)}
                            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                          >
                            Set Default
                          </Button>
                        )}
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemovePaymentMethod(index)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            Remove
                          </Button>
                        )}
                        {method.isDefault && <Badge className="bg-blue-600">Default</Badge>}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 border-dashed"
                >
                  <div className="text-center py-6">
                    <h3 className="font-medium mb-2 text-white">Add a new payment method</h3>
                    <p className="text-sm text-blue-300 mb-4">Connect a new payment method to your account.</p>

                    <RadioGroup
                      defaultValue="paypal"
                      className="flex justify-center space-x-4 mb-6"
                      onValueChange={(value) => setPaymentMethod(value as "paypal" | "card")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center text-white">
                          <span className="text-blue-400 font-bold mr-1">Pay</span>
                          <span className="text-blue-300 font-bold">Pal</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center text-white">
                          <CreditCard className="h-4 w-4 mr-1 text-blue-400" />
                          <span>Credit Card</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    <AnimatePresence mode="wait">
                      {paymentMethod === "card" ? (
                        <motion.div
                          key="card-form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 text-left">
                            <div>
                              <Label htmlFor="cardholderName" className="text-blue-100">
                                Cardholder Name
                              </Label>
                              <Input
                                id="cardholderName"
                                name="cardholderName"
                                placeholder="John Doe"
                                value={cardDetails.cardholderName}
                                onChange={handleCardInputChange}
                                className="mt-1 bg-blue-900/30 border-blue-500/30 text-white"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardNumber" className="text-blue-100">
                                Card Number
                              </Label>
                              <div className="relative">
                                <Input
                                  id="cardNumber"
                                  name="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  value={cardDetails.cardNumber}
                                  onChange={handleCardInputChange}
                                  className="mt-1 pl-10 bg-blue-900/30 border-blue-500/30 text-white"
                                  maxLength={19}
                                />
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="col-span-1">
                                <Label htmlFor="expiryMonth" className="text-blue-100">
                                  Month
                                </Label>
                                <Input
                                  id="expiryMonth"
                                  name="expiryMonth"
                                  placeholder="MM"
                                  value={cardDetails.expiryMonth}
                                  onChange={handleCardInputChange}
                                  className="mt-1 bg-blue-900/30 border-blue-500/30 text-white"
                                  maxLength={2}
                                />
                              </div>
                              <div className="col-span-1">
                                <Label htmlFor="expiryYear" className="text-blue-100">
                                  Year
                                </Label>
                                <Input
                                  id="expiryYear"
                                  name="expiryYear"
                                  placeholder="YY"
                                  value={cardDetails.expiryYear}
                                  onChange={handleCardInputChange}
                                  className="mt-1 bg-blue-900/30 border-blue-500/30 text-white"
                                  maxLength={2}
                                />
                              </div>
                              <div className="col-span-1">
                                <Label htmlFor="cvc" className="text-blue-100">
                                  CVC
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="cvc"
                                    name="cvc"
                                    placeholder="123"
                                    value={cardDetails.cvc}
                                    onChange={handleCardInputChange}
                                    className="mt-1 pl-8 bg-blue-900/30 border-blue-500/30 text-white"
                                    maxLength={4}
                                  />
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-blue-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="paypal-button"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={handlePayPalConnect}
                            disabled={paypalLoaded || isProcessing}
                          >
                            {paypalLoaded ? "PayPal Connected" : "Connect with PayPal"}
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-6">
                      <TurnstileCaptcha onVerify={handleCaptchaVerify} theme="dark" />
                      <AnimatedButton
                        className="w-full"
                        onClick={paymentMethod === "paypal" ? handlePayPalConnect : handleAddCard}
                        isLoading={isProcessing}
                        loadingText="Processing..."
                        disabled={isProcessing}
                        variant="premium"
                        glowColor="rgba(59, 130, 246, 0.5)"
                      >
                        Add Payment Method
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              </div>
            </PremiumCard>
          </TabsContent>

          <TabsContent value="billing-history">
            <PremiumCard
              title="Billing History"
              description="View your past invoices and payment history."
              glowOnHover={true}
              borderGradient={true}
              hoverEffect="lift"
              glowColor="rgba(59, 130, 246, 0.5)"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-500/30">
                      <th className="text-left py-3 px-4 text-blue-300">Invoice</th>
                      <th className="text-left py-3 px-4 text-blue-300">Date</th>
                      <th className="text-left py-3 px-4 text-blue-300">Amount</th>
                      <th className="text-left py-3 px-4 text-blue-300">Status</th>
                      <th className="text-right py-3 px-4 text-blue-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-blue-500/20 hover:bg-blue-900/30"
                      >
                        <td className="py-3 px-4 text-white">{invoice.id}</td>
                        <td className="py-3 px-4 text-white">{invoice.date}</td>
                        <td className="py-3 px-4 text-white">{invoice.amount}</td>
                        <td className="py-3 px-4">
                          <Badge className={invoice.status === "paid" ? "bg-blue-600" : "bg-red-600"}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PremiumCard>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

