"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Server Owner",
    content:
      "NexusCraft has been a game-changer for our community. The performance is incredible and the support team is always there when we need them.",
    avatar: "/placeholder.svg?height=80&width=80",
    stars: 5,
  },
  {
    name: "Sarah Williams",
    role: "Minecraft Streamer",
    content:
      "I've tried many hosting providers, but NexusCraft offers the best performance for my streams. No lag, no downtime, just perfect gameplay.",
    avatar: "/placeholder.svg?height=80&width=80",
    stars: 5,
  },
  {
    name: "Michael Chen",
    role: "Modpack Creator",
    content:
      "The one-click modpack installation is fantastic. It makes setting up complex modpacks so easy that anyone can do it.",
    avatar: "/placeholder.svg?height=80&width=80",
    stars: 4,
  },
  {
    name: "Emma Rodriguez",
    role: "Community Manager",
    content:
      "Managing our server has never been easier. The control panel is intuitive and the performance is consistently excellent.",
    avatar: "/placeholder.svg?height=80&width=80",
    stars: 5,
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            What Our <span className="text-blue-500">Customers</span> Say
          </motion.h2>
          <motion.p
            className="text-lg text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of satisfied server owners who trust NexusCraft.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 rounded-full overflow-hidden border-2 border-blue-500 h-12 w-12">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-blue-300">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 flex-shrink-0 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                  />
                ))}
              </div>
              <p className="text-white/80">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

