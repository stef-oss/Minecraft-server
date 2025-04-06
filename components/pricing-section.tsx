"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Cpu, X, AlertCircle } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$2.99",
    description: "Perfect for small friend groups",
    features: [
      "2GB RAM",
      "10 Player Slots",
      "Basic Support",
      "1 Server Backup",
      "Standard SSD Storage",
      "99.5% Uptime",
    ],
    notIncluded: ["Dedicated IP", "Modpack Installation", "DDoS Protection"],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$5.99",
    description: "Ideal for growing communities",
    features: [
      "4GB RAM",
      "25 Player Slots",
      "Priority Support",
      "Daily Backups",
      "NVMe SSD Storage",
      "99.9% Uptime",
      "Custom Domain",
      "One-Click Modpacks",
      "Bedrock Support",
    ],
    highlighted: true,
    bestValue: true,
  },
  {
    name: "Ultimate",
    price: "$12.99",
    description: "For serious Minecraft servers",
    features: [
      "8GB RAM",
      "60 Player Slots",
      "24/7 Premium Support",
      "Hourly Backups",
      "Premium NVMe Storage",
      "99.99% Uptime",
      "Custom Domain",
      "Dedicated IP",
      "Bedrock Support",
      "Plugin Manager",
    ],
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "$29.99",
    description: "For large communities and networks",
    features: [
      "16GB RAM",
      "Unlimited Player Slots",
      "24/7 Priority Support",
      "Continuous Backups",
      "Premium NVMe Storage",
      "99.99% Uptime",
      "Custom Domain",
      "Dedicated IP",
      "Ryzen 9 7950X CPU",
      "DDoS Protection",
      "Bedrock Support",
      "Plugin Manager",
      "Custom Mods Support",
    ],
    highlighted: false,
    enterprise: true,
  },
]

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent <span className="text-blue-500">Pricing</span>
          </motion.h2>
          <motion.p
            className="text-lg text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No hidden fees. Choose the plan that works for your needs.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className={`
              relative rounded-xl overflow-hidden
              ${
                plan.highlighted
                  ? "bg-gradient-to-b from-blue-600 to-blue-900 border-2 border-blue-400"
                  : plan.enterprise
                    ? "bg-gradient-to-b from-blue-900/50 to-blue-800/50 border border-blue-500/50"
                    : "bg-gradient-to-b from-white/5 to-white/10 border border-white/10"
              }
            `}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center text-sm py-1 font-medium">
                  Most Popular
                </div>
              )}
              {plan.enterprise && (
                <div className="absolute top-0 left-0 right-0 bg-blue-800 text-white text-center text-sm py-1 font-medium">
                  High Performance
                </div>
              )}
              {plan.bestValue && (
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white text-xs font-bold py-1 px-3 rounded-full transform rotate-12 shadow-lg">
                  BEST VALUE
                </div>
              )}
              <div className="p-6 pt-8">
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-white/70 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/70"> / month</span>
                </div>
                <Button
                  className={`w-full mb-6 ${
                    plan.highlighted
                      ? "bg-white text-blue-900 hover:bg-white/90"
                      : plan.enterprise
                        ? "bg-blue-700 hover:bg-blue-800 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check
                        className={`h-5 w-5 mr-2 flex-shrink-0 ${
                          plan.highlighted ? "text-blue-300" : plan.enterprise ? "text-blue-400" : "text-blue-500"
                        }`}
                      />
                      <span
                        className={`${plan.highlighted || plan.enterprise ? "text-white" : "text-white/70"} break-words`}
                      >
                        {feature}
                        {feature === "Ryzen 9 7950X CPU" && (
                          <span className="inline-flex items-center ml-1 text-blue-400">
                            <Cpu className="h-3 w-3 mr-1 flex-shrink-0" />
                          </span>
                        )}
                        {feature === "Bedrock Support" && (
                          <span className="inline-flex items-center ml-1 text-green-400">
                            <span className="text-xs bg-green-900/50 px-1.5 py-0.5 rounded-full">NEW</span>
                          </span>
                        )}
                      </span>
                    </li>
                  ))}

                  {plan.notIncluded &&
                    plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start text-white/40">
                        <X className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span className="break-words">{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-5 w-5 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold text-white">Need a custom solution?</h3>
            </div>
            <p className="text-white/70 mb-4">
              Contact our sales team for specialized enterprise plans with custom resource allocations.
            </p>
            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

