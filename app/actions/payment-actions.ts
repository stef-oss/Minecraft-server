"use server"

import { z } from "zod"
import { resend, SUPPORT_EMAIL } from "@/lib/resend"
import { verifyTurnstileToken } from "@/lib/turnstile"

// Payment validation schema
const PaymentSchema = z.object({
  planId: z.string(),
  amount: z.number().positive(),
  paymentMethod: z.enum(["paypal", "card"]),
  orderId: z.string().optional(),
  transactionId: z.string().optional(),
  paymentMethodId: z.string().optional(),
  customerEmail: z.string().email(),
  customerName: z.string(),
  turnstileToken: z.string(),
})

export type PaymentData = z.infer<typeof PaymentSchema>

// Card details schema
const CardDetailsSchema = z.object({
  cardNumber: z.string().min(13).max(19),
  expiryMonth: z.string().min(1).max(2),
  expiryYear: z.string().min(2).max(4),
  cvc: z.string().min(3).max(4),
  cardholderName: z.string().min(1),
})

export type CardDetails = z.infer<typeof CardDetailsSchema>

export async function processPayment(data: PaymentData) {
  try {
    // Validate payment data
    const validatedData = PaymentSchema.parse(data)

    // Verify Turnstile token
    const turnstileVerification = await verifyTurnstileToken(validatedData.turnstileToken)

    if (!turnstileVerification.success) {
      console.error("Turnstile verification failed:", turnstileVerification.error_codes)
      return {
        success: false,
        message: "Captcha verification failed. Please try again.",
      }
    }

    // In a real implementation, you would:
    // 1. Verify the payment with PayPal or Stripe
    // 2. Update your database with the subscription information
    // 3. Provision the Minecraft server

    // For this example, we'll just send a confirmation email
    await sendPaymentConfirmation(validatedData)

    return {
      success: true,
      message: "Payment processed successfully! Check your email for details.",
      transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      orderId: `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    }
  } catch (error) {
    console.error("Payment processing error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error. Please check your payment details.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Failed to process payment. Please try again later.",
    }
  }
}

export async function validateCardDetails(data: CardDetails) {
  try {
    // Validate card details
    const validatedData = CardDetailsSchema.parse(data)

    // Basic Luhn algorithm check for card number (simplified)
    if (!isValidCardNumber(validatedData.cardNumber)) {
      return {
        success: false,
        message: "Invalid card number. Please check and try again.",
      }
    }

    // Check expiry date
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    const expiryYear = Number.parseInt(
      validatedData.expiryYear.length === 2 ? "20" + validatedData.expiryYear : validatedData.expiryYear,
    )
    const expiryMonth = Number.parseInt(validatedData.expiryMonth)

    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      return {
        success: false,
        message: "Card has expired. Please use a different card.",
      }
    }

    return {
      success: true,
      message: "Card details are valid.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error. Please check your card details.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Failed to validate card details. Please try again.",
    }
  }
}

async function sendPaymentConfirmation(data: PaymentData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `Nexonoia Host Billing <${SUPPORT_EMAIL}>`,
      to: [data.customerEmail],
      subject: "Payment Confirmation - Nexonoia Host",
      text: `
Hello ${data.customerName},

Thank you for your payment to Nexonoia Host!

Payment Details:
- Plan: ${getPlanName(data.planId)}
- Amount: $${data.amount.toFixed(2)}
- Payment Method: ${data.paymentMethod === "paypal" ? "PayPal" : "Credit Card"}
- Transaction ID: ${data.transactionId || "N/A"}

Your Minecraft server is now being set up and will be ready shortly. You'll receive another email with your server details and login information.

If you have any questions or need assistance, please contact our support team at ${SUPPORT_EMAIL}.

Thank you for choosing Nexonoia Host for your Minecraft server needs!

Best regards,
The Nexonoia Host Team
    `,
    })

    if (error) {
      console.error("Failed to send payment confirmation:", error)
    }
  } catch (error) {
    console.error("Error sending payment confirmation:", error)
  }
}

function getPlanName(planId: string): string {
  const plans: Record<string, string> = {
    starter: "Starter Plan",
    premium: "Premium Plan",
    ultimate: "Ultimate Plan",
    enterprise: "Enterprise Plan",
  }

  return plans[planId] || "Custom Plan"
}

// Basic Luhn algorithm implementation for card number validation
function isValidCardNumber(cardNumber: string): boolean {
  // Remove spaces and non-digit characters
  const digits = cardNumber.replace(/\D/g, "")

  if (digits.length < 13 || digits.length > 19) {
    return false
  }

  let sum = 0
  let shouldDouble = false

  // Loop through digits in reverse
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(digits.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

