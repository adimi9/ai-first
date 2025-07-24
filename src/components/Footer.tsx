import React from 'react'

const Footer = () => {
  return (
      <footer className="bg-gray-900 bg-opacity-50 text-gray-400 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm">
            <p>&copy; 2025 Government Technology Agency of Singapore | GovTech</p>
            <p>Last Updated 18 June 2025</p>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://www.tech.gov.sg/privacy" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Privacy Statement</a>
            <a href="https://www.tech.gov.sg/terms-of-use" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Terms of Use</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer