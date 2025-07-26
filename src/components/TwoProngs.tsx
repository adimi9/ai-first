import React from 'react';
import { Link } from 'react-router-dom';

const TwoProngs = () => {
  return (
    <section id="two-prongs-section" className="bg-black py-16 sm:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
          The Two Prongs of{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            AI-First
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-16">
          {/* Prong 1: Sprints */}
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-blue-500/10 transition-shadow duration-300">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              <span role="img" aria-label="rocket" className="text-white">🚀</span>{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Sprints
              </span>
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-md">
              Dive into problem statements over the course of 90 days to apply AI solutions to real problems within SCG.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-auto">
              <Link
                to="/sprints"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Learn More About Sprints
              </Link>
              <Link
                to="/submit-use-case"
                className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign Up Now!
              </Link>
            </div>
          </div>

          {/* Prong 2: Training & Resources Library */}
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-purple-500/10 transition-shadow duration-300">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              <span role="img" aria-label="book" className="text-white">📚</span>{' '}
              <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">
                Training & Resources Library
              </span>
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-md">
              Access a growing collection of guides, tutorials, and tools to enhance your AI skills and support your journey.
            </p>
            <div className="mt-auto">
              <Link
                to="/training-resources"
                className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoProngs;