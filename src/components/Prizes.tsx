import React from 'react'
import { Gift, Award, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const Prizes = () => {
  return (
    <section className="py-12 sm:py-20 bg-gray-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8">
            Prizes
          </h2>
          
          {/* For Shortlisted Teams - Made mobile responsive */}
          <div className="mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-4 sm:mb-6 font-medium">
              For shortlisted teams:
            </p>
            
            {/* Mobile-first responsive prize card - Original layout style */}
            <div className="inline-block bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-2 border-gray-600 rounded-2xl sm:rounded-3xl px-3 sm:px-6 md:px-8 py-4 sm:py-6 shadow-2xl max-w-full">
              
              {/* Single layout for all screen sizes - like original but responsive */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
                <Gift className="h-6 w-6 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white">
                  $200
                </span>
                <span className="text-base sm:text-xl md:text-xl lg:text-2xl text-white font-medium">
                  GovWallet credits and
                </span>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white">2</span>
                  <span className="text-base sm:text-xl md:text-xl lg:text-2xl text-white font-medium">days off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Prizes