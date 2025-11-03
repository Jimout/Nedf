"use client"

import React, { useState } from "react"

export default function Subscription() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // Here you would typically send the email to your backend
      console.log("Subscribed:", email)
    }
  }

  return (
    <div className="relative py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Title and Subtitle */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 font-montserrat tracking-tight text-center" style={{ color: '#ec1e24' }}>
            Stay Updated with NEDF
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
            Subscribe to get notified whenever we publish a new project or blog post.
          </p>
        </div>

        {/* Subscription Form */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="flex flex-row gap-0">
            {/* Email Input */}
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-900 dark:text-white bg-white dark:bg-[#15171a] border border-gray-300 dark:border-white/20 rounded-none focus:outline-none focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            
            {/* Subscribe Button */}
            <button
              type="submit"
              className="px-4 sm:px-8 py-3 sm:py-4 bg-[#001F4B] dark:bg-[#ec1e24] text-white font-bold text-xs sm:text-sm md:text-base rounded-none hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] focus:ring-offset-2 whitespace-nowrap flex-shrink-0"
            >
              Subscribe Now
            </button>
          </form>
          
          {/* Success Message */}
          {isSubscribed && (
            <div className="mt-4 text-center px-4">
              <p className="text-sm sm:text-base font-medium" style={{ color: '#ec1e24' }}>
                Thank you for subscribing! You'll receive updates from NEDF.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
