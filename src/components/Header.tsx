import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 45; // Adjust as needed
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
    setIsHomeDropdownOpen(false);
  };

  const handleNavLinkClick = (targetPath, sectionId = null) => {
    setIsMenuOpen(false);
    setIsHomeDropdownOpen(false);

    if (targetPath === location.pathname) {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (sectionId) {
        scrollToSection(sectionId);
      }
    } else {
      if (sectionId) {
        window.location.href = `${targetPath}#${sectionId}`;
      } else {
        window.location.href = targetPath;
      }
    }
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-1 sm:space-x-2"
            onClick={() => handleNavLinkClick('/')}
          >
            <img
              src="/websitelogo_new.png"
              alt="SCG AIFirst Logo"
              className="w-12 h-14 sm:w-16 sm:h-18 md:w-24 md:h-28 object-contain"
            />
            <span className="font-bold text-sm sm:text-lg md:text-xl">
              <span className="text-white">SCG</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                AI-First
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Home Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                setIsHomeDropdownOpen(true);
              }}
              onMouseLeave={() => {
                dropdownTimeoutRef.current = setTimeout(() => {
                  setIsHomeDropdownOpen(false);
                }, 150);
              }}
            >
              <Link
                to="/"
                onClick={() => handleNavLinkClick('/')}
                className="font-bold text-base lg:text-lg text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              {isHomeDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-700">
                  <Link
                    to="/"
                    onClick={() => handleNavLinkClick('/', 'why-accelerate')}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Why AI-First
                  </Link>
                  <Link
                    to="/"
                    onClick={() => handleNavLinkClick('/', 'two-prongs-section')}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    How will it work
                  </Link>
                  <Link
                    to="/"
                    onClick={() => handleNavLinkClick('/', 'sprint-problems')}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Sprint 1 Problem Statements
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/timeline"
              onClick={() => handleNavLinkClick('/timeline')}
              className="font-bold text-base lg:text-lg text-gray-300 hover:text-white transition-colors"
            >
              Timeline
            </Link>
            <Link
              to="/win-formula"
              onClick={() => handleNavLinkClick('/win-formula')}
              className="font-bold text-base lg:text-lg text-gray-300 hover:text-white transition-colors"
            >
              Sprints
            </Link>
            <Link
              to="/training-resources"
              onClick={() => handleNavLinkClick('/training-resources')}
              className="font-bold text-base lg:text-lg text-gray-300 hover:text-white transition-colors"
            >
              Training & Resources
            </Link>
            <Link
              to="/faq"
              onClick={() => handleNavLinkClick('/faq')}
              className="font-bold text-base lg:text-lg text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              to="/submit-use-case"
              onClick={() => handleNavLinkClick('/submit-use-case')}
              className="text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Join the Sprint!
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => handleNavLinkClick('/')}
              className="block text-lg text-gray-300 hover:text-white font-bold py-2"
            >
              Home
            </Link>
            <Link
              to="/timeline"
              onClick={() => handleNavLinkClick('/timeline')}
              className="block text-lg text-gray-300 hover:text-white font-bold py-2"
            >
              Timeline
            </Link>
            <Link
              to="/win-formula"
              onClick={() => handleNavLinkClick('/win-formula')}
              className="block text-lg text-gray-300 hover:text-white font-bold py-2"
            >
              Sprints
            </Link>
            <Link
              to="/training-resources"
              onClick={() => handleNavLinkClick('/training-resources')}
              className="block text-lg text-gray-300 hover:text-white font-bold py-2"
            >
              Training & Resources
            </Link>
            <Link
              to="/faq"
              onClick={() => handleNavLinkClick('/faq')}
              className="block text-lg text-gray-300 hover:text-white font-bold py-2"
            >
              FAQ
            </Link>
            <Link
              to="/submit-use-case"
              onClick={() => handleNavLinkClick('/submit-use-case')}
              className="block w-full text-center px-4 py-3 mt-3 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold"
            >
              Join the Sprint!
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
