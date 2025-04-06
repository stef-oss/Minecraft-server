import type { Metadata } from "next"
import BillingDashboard from "@/components/billing-dashboard"

export const metadata: Metadata = {
  title: "Billing & Payments | Nexonoia Host",
  description: "Manage your billing information, view payment history, and update your subscription.",
}

export default function BillingPage() {
  return <BillingDashboard />
}

