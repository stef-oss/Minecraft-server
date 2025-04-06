import { Resend } from "resend"
import { RESEND_API_KEY } from "./api-keys"

// Initialize Resend with the API key from api-keys.ts
export const resend = new Resend(RESEND_API_KEY)

// Support email address
export const SUPPORT_EMAIL = "stef.vermeer@icloud.com"

