import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 45
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  const handleTimelineClick = () => {
    // If already on homepage, just scroll
    if (window.location.pathname === '/') {
      scrollToSection('timeline');
    } else {
      // Navigate to homepage and scroll to timeline
      window.location.href = '/#timeline';
    }
  }

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
          {/* Logo - Mobile responsive, laptop unchanged */}
          <Link 
            to="/" 
            className="flex items-center space-x-1 sm:space-x-2"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
              window.scrollTo({
                top: 40,
                behavior: 'smooth'
              });
            }}
          >
            <img
              src="/websitelogo_new.png"
              alt="SCG AIFirst Logo"
              className="w-12 h-14 sm:w-16 sm:h-18 md:w-24 md:h-28 object-contain"
            />
            <span className="font-bold text-sm sm:text-lg md:text-xl">
              <span className="text-white"> SCG </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                AI-First
              </span>
            </span>
          </Link>

          {/* Desktop Navigation - Unchanged */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/timeline"
              className="font-bold text-lg text-gray-300 hover:text-white transition-colors"
            >
              Timeline
            </Link>

            <Link
              to="/win-formula"
              className="font-bold text-lg text-gray-300 hover:text-white transition-colors"
            >
              How You Win
            </Link>

            <Link
              to="/faq"
              className="font-bold text-lg text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
        
            <Link
              to="/submit-use-case"
              className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Submit Problem Statement
            </Link>


            
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Improved spacing */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
              to="/timeline"
              className="font-bold text-lg text-gray-300 hover:text-white transition-colors"
            >
              Timeline
            </Link>
            
              <Link
                to="/case-studies"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-3 text-gray-300 hover:text-white transition-colors w-full text-left"
              >
                Featured Case Studies
              </Link>
              <Link
                to="/faq"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-3 text-gray-300 hover:text-white transition-colors w-full text-left"
              >
                FAQ
              </Link>
              <Link
                to="/submit-use-case"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-3 mx-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-center mt-2"
              >
                Submit Problem Statement
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header