import type { Metadata } from "next"
import SupportCenter from "@/components/support-center"

export const metadata: Metadata = {
  title: "Support Center | Nexonoia Host",
  description:
    "Get help with your Minecraft server hosting. Our support team is here to assist you with any questions or issues.",
}

export default function SupportPage() {
  return <SupportCenter />
}

