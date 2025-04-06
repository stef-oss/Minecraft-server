"use server"

import { z } from "zod"
import { resend } from "@/lib/resend"

// Email validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  token: z.string().optional(),
})

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const token = formData.get("token") as string

    // Validate form data
    const result = contactFormSchema.safeParse({
      name,
      email,
      subject,
      message,
      token,
    })

    if (!result.success) {
      return {
        success: false,
        message: "Invalid form data. Please check your inputs.",
      }
    }

    // Verify the captcha token
    if (!token) {
      return {
        success: false,
        message: "Verification is required.",
      }
    }

    // In a production environment, you might want to add additional token validation
    // For now, we'll accept any token that's properly formatted (base64 encoded JSON)
    try {
      const decodedToken = JSON.parse(atob(token))
      const tokenTimestamp = decodedToken.timestamp

      // Check if token is expired (older than 10 minutes)
      if (Date.now() - tokenTimestamp > 10 * 60 * 1000) {
        return {
          success: false,
          message: "Verification expired. Please verify again.",
        }
      }
    } catch (e) {
      return {
        success: false,
        message: "Invalid verification token. Please try again.",
      }
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Nexonoia Host <support@hosting.stefvermeer.com>",
      to: ["stef.vermeer@icloud.com"],
      subject: `[Nexonoia Host] Support Request: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #111; color: #fff; border: 1px solid #333; border-radius: 8px;">
          <h2 style="color: #3b82f6; border-bottom: 1px solid #333; padding-bottom: 10px;">New Support Request</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3 style="color: #3b82f6; margin-top: 20px;">Message:</h3>
          <div style="background-color: #222; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">This message was sent from the contact form on Nexonoia Host.</p>
        </div>
      `,
      text: `
New Support Request
------------------

From: ${name} (${email})
Subject: ${subject}

Message:
${message}

This message was sent from the contact form on Nexonoia Host.
      `,
    })

    if (error) {
      console.error("Email sending error:", error)
      return {
        success: false,
        message: "Failed to send your message. Please try again later.",
      }
    }

    return {
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

