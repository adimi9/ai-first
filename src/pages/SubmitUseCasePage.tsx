import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import HackathonForm from '../components/HackV2'

const SubmitUseCasePage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header with back navigation */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            
            
          </div>
        </div>
      </header>

      {/* Form Content */}
      <HackathonForm />

     {/* Footer */}
<footer className="bg-gray-900 border-t border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center">
      {/* Logo and Name */}
      <div className="flex flex-col items-center space-y-2 mb-4">
        <img
          src="/websitelogo_new.png"
          alt="SCG AIccelerate Logo"
          className="w-24 h-28 object-contain"
        />
        <span className="font-bold text-xl">
          <span className="text-white"> SCG </span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            AiCCELERATE
          </span>
        </span>
      </div>

      {/* Footer text */}
      <p className="text-gray-400">
        © 2025 AiCCELERATE. It's time to AiCCELERATE — where AI and i move forward, together.
      </p>
    </div>
  </div>
</footer>
    </div>
  )
}

export default SubmitUseCasePage
