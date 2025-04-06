"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MathCaptcha } from "./math-captcha"
import { AnimatedButton } from "./animated-button"
import { PremiumCard } from "./premium-card"
import { sendContactEmail } from "@/app/actions/email-actions"

export default function SupportCenter() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleCaptchaVerify = (token: string) => {
    console.log("Captcha verified")
    setCaptchaToken(token)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!captchaToken) {
      setSubmitResult({
        success: false,
        message: "Please complete the verification challenge first.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append("token", captchaToken)

      const result = await sendContactEmail(formData)
      setSubmitResult(result)

      if (result.success && formRef.current) {
        formRef.current.reset()
        setCaptchaToken(null)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Support Center
            </h1>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto">
              We're here to help you with any questions or issues you might have with your Minecraft server.
            </p>
          </div>

          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-black border border-blue-900/50">
              <TabsTrigger value="contact" className="data-[state=active]:bg-blue-900 data-[state=active]:text-white">
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-blue-900 data-[state=active]:text-white">
                FAQ
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="data-[state=active]:bg-blue-900 data-[state=active]:text-white">
                Knowledge Base
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <PremiumCard
                    title="Contact Our Support Team"
                    description="Fill out the form below and we'll get back to you as soon as possible."
                    glowOnHover={true}
                    borderGradient={true}
                    hoverEffect="lift"
                    glowColor="rgba(59, 130, 246, 0.5)"
                  >
                    <AnimatePresence mode="wait">
                      {submitResult && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Alert
                            className={`mb-6 ${
                              submitResult.success
                                ? "bg-blue-900/30 border-blue-900/50 text-blue-100"
                                : "bg-red-900/30 border-red-900/50 text-red-100"
                            }`}
                          >
                            {submitResult.success ? (
                              <CheckCircle2 className="h-4 w-4 text-blue-400" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-400" />
                            )}
                            <AlertTitle>{submitResult.success ? "Success" : "Error"}</AlertTitle>
                            <AlertDescription>{submitResult.message}</AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-blue-100">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                            className="bg-black/50 border-blue-900/50 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-blue-100">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                            className="bg-black/50 border-blue-900/50 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-blue-100">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What is your inquiry about?"
                          required
                          className="bg-black/50 border-blue-900/50 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-blue-100">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your issue or question in detail"
                          rows={6}
                          required
                          className="bg-black/50 border-blue-900/50 text-white"
                        />
                      </div>

                      <MathCaptcha onVerify={handleCaptchaVerify} />

                      <AnimatedButton
                        type="submit"
                        className="w-full"
                        isLoading={isSubmitting}
                        loadingText="Sending..."
                        variant="premium"
                        glowColor="rgba(59, 130, 246, 0.5)"
                        disabled={isSubmitting || !captchaToken}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </AnimatedButton>
                    </form>
                  </PremiumCard>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <PremiumCard
                      title="Contact Information"
                      description="Here are the ways you can reach our support team."
                      glowOnHover={true}
                      borderGradient={true}
                      hoverEffect="lift"
                      glowColor="rgba(59, 130, 246, 0.5)"
                    >
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-900/50">
                          <h3 className="font-medium text-blue-400 mb-1">Email Support</h3>
                          <p className="text-white">support@hosting.stefvermeer.com</p>
                          <p className="text-sm text-blue-200 mt-1">Response time: 24-48 hours</p>
                        </div>

                        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-900/50">
                          <h3 className="font-medium text-blue-400 mb-1">Discord Community</h3>
                          <p className="text-white">Join our Discord server for real-time support</p>
                          <a
                            href="https://discord.gg/nexonoia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
                          >
                            Join Discord
                          </a>
                        </div>

                        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-900/50">
                          <h3 className="font-medium text-blue-400 mb-1">Support Hours</h3>
                          <p className="text-white">Monday - Friday: 9AM - 6PM CET</p>
                          <p className="text-white">Saturday - Sunday: 10AM - 4PM CET</p>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard
                      title="Emergency Support"
                      description="For urgent server issues requiring immediate attention."
                      glowOnHover={true}
                      borderGradient={true}
                      hoverEffect="lift"
                      glowColor="rgba(59, 130, 246, 0.5)"
                    >
                      <div className="p-4 bg-red-900/20 rounded-lg border border-red-900/50">
                        <h3 className="font-medium text-red-400 mb-1">Server Down?</h3>
                        <p className="text-white mb-3">
                          For critical issues affecting your server's operation, please use our emergency support
                          channel.
                        </p>
                        <a
                          href="/emergency-support"
                          className="inline-block text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
                        >
                          Emergency Support
                        </a>
                      </div>
                    </PremiumCard>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <PremiumCard
                title="Frequently Asked Questions"
                description="Find answers to common questions about our Minecraft hosting services."
                glowOnHover={true}
                borderGradient={true}
                hoverEffect="lift"
                glowColor="rgba(59, 130, 246, 0.5)"
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-blue-900/50">
                    <AccordionTrigger className="text-white hover:text-blue-400">
                      How do I connect to my Minecraft server?
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200">
                      After purchasing a plan, you'll receive server connection details via email. Open Minecraft, click
                      on "Multiplayer," then "Add Server," and enter your server IP address. Your server will be ready
                      to connect within minutes of purchase.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-blue-900/50">
                    <AccordionTrigger className="text-white hover:text-blue-400">
                      How do I install mods or plugins on my server?
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200">
                      You can install mods and plugins through our control panel. Simply navigate to the "Mods" or
                      "Plugins" section, search for what you want to install, and click "Install." For custom mods, you
                      can upload the files directly through the "File Manager."
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-blue-900/50">
                    <AccordionTrigger className="text-white hover:text-blue-400">
                      What payment methods do you accept?
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200">
                      We accept PayPal, credit/debit cards, and bank transfers. All payments are processed securely, and
                      we never store your payment information on our servers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-blue-900/50">
                    <AccordionTrigger className="text-white hover:text-blue-400">
                      How do I upgrade my hosting plan?
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200">
                      You can upgrade your plan at any time through your client area. Go to "Services," select your
                      Minecraft server, and click on "Upgrade/Downgrade." Choose your new plan, and the changes will be
                      applied immediately with no downtime.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-blue-900/50">
                    <AccordionTrigger className="text-white hover:text-blue-400">
                      Do you offer refunds?
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200">
                      Yes, we offer a 7-day money-back guarantee if you're not satisfied with our service. Contact our
                      support team within 7 days of your purchase to request a refund.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="border-blue-900/50">
                    <AccordionTrigger className="text-white hover:text-blue-400">
                      How do I back up my Minecraft server?
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200">
                      We provide automatic daily backups for all hosting plans. You can also create manual backups at
                      any time through the control panel by going to the "Backups" section and clicking "Create Backup."
                      Backups can be downloaded or restored with a single click.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </PremiumCard>
            </TabsContent>

            <TabsContent value="knowledge">
              <PremiumCard
                title="Knowledge Base"
                description="Detailed guides and tutorials to help you get the most out of your Minecraft server."
                glowOnHover={true}
                borderGradient={true}
                hoverEffect="lift"
                glowColor="rgba(59, 130, 246, 0.5)"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Getting Started Guide",
                      description: "Learn how to set up and configure your new Minecraft server.",
                      link: "/support/guides/getting-started",
                      icon: "🚀",
                    },
                    {
                      title: "Server Optimization",
                      description: "Tips and tricks to improve your server's performance.",
                      link: "/support/guides/optimization",
                      icon: "⚡",
                    },
                    {
                      title: "Plugin Installation",
                      description: "Step-by-step guide to installing and configuring plugins.",
                      link: "/support/guides/plugins",
                      icon: "🧩",
                    },
                    {
                      title: "World Management",
                      description: "Learn how to manage, backup, and restore your Minecraft worlds.",
                      link: "/support/guides/worlds",
                      icon: "🌍",
                    },
                    {
                      title: "Permissions Setup",
                      description: "Configure player permissions and roles on your server.",
                      link: "/support/guides/permissions",
                      icon: "🔒",
                    },
                    {
                      title: "Troubleshooting Common Issues",
                      description: "Solutions to frequently encountered problems.",
                      link: "/support/guides/troubleshooting",
                      icon: "🔧",
                    },
                    {
                      title: "Modpack Installation",
                      description: "How to install and configure popular modpacks on your server.",
                      link: "/support/guides/modpacks",
                      icon: "📦",
                    },
                    {
                      title: "Server Security",
                      description: "Best practices for keeping your Minecraft server secure.",
                      link: "/support/guides/security",
                      icon: "🛡️",
                    },
                    {
                      title: "Custom Configuration",
                      description: "Advanced configuration options for experienced users.",
                      link: "/support/guides/configuration",
                      icon: "⚙️",
                    },
                  ].map((guide, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow hover:border-blue-900/50 bg-black/50 border-blue-900/50">
                        <CardHeader className="pb-2">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{guide.icon}</span>
                            <CardTitle className="text-lg text-white">{guide.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                          <p className="text-sm text-blue-200 mb-4 flex-grow">{guide.description}</p>
                          <AnimatedButton
                            variant="outline"
                            className="w-full mt-auto border-blue-900/50 text-blue-400 hover:bg-blue-900/20"
                            asChild
                          >
                            <a href={guide.link}>Read Guide</a>
                          </AnimatedButton>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </PremiumCard>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

