"use client"

import { useState } from "react"

export default function FloatingSubscription() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      console.log("Subscribed:", email)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-[#ec1e24] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-xs flex items-center justify-center"
        >
          Subscribe
        </button>
      </div>

      {/* Subscription Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#15171a] rounded-lg shadow-2xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#001F4B] dark:text-[#ec1e24] mb-2 font-montserrat">
                Stay Updated with NEDF
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Subscribe to get notified whenever we publish a new project or blog post.
              </p>
              
              {/* Subscription Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F4B] dark:focus:ring-[#ec1e24] bg-white dark:bg-[#15171a] text-gray-900 dark:text-white"
                  required
                />
                
                <button
                  type="submit"
                  className="w-full bg-[#001F4B] dark:bg-[#ec1e24] text-white font-bold py-3 rounded-lg hover:bg-[#001F4B]/90 dark:hover:bg-[#ec1e24]/90 transition-all duration-300"
                >
                  Subscribe Now
                </button>
              </form>
              
              {/* Success Message */}
              {isSubscribed && (
                <div className="mt-4 text-center">
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    Thank you for subscribing!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
