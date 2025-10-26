"use client"

import { useState } from "react"

export default function Subscription() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // Here you would typically send the email to your backend
      console.log("Subscribed:", email)
    }
  }

  return (
    <div className="relative py-16 sm:py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold sm:text-5xl mb-4 font-montserrat tracking-tight text-center" style={{ color: '#ec1e24' }}>
            Stay Updated with NEDF
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Subscribe to get notified whenever we publish a new project or blog post.
          </p>
        </div>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
            {/* Email Input */}
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full px-6 py-4 text-gray-900 dark:text-white bg-white dark:bg-[#15171a] border border-gray-300 dark:border-white/20 rounded-none focus:outline-none focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            
            {/* Subscribe Button */}
            <button
              type="submit"
              className="px-8 py-4 bg-[#001F4B] dark:bg-[#ec1e24] text-white font-bold text-sm rounded-none hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:ring-offset-2"
            >
              Subscribe Now
            </button>
          </form>
          
          {/* Success Message */}
          {isSubscribed && (
            <div className="mt-4 text-center">
              <p className="text-green-600 dark:text-green-400 font-medium">
                Thank you for subscribing! You'll receive updates from NEDF.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
