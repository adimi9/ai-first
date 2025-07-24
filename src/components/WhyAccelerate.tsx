import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhyAccelerate = () => {
  const navigate = useNavigate();

  const scrollToTimeline = () => {
    const element = document.getElementById('timeline');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="h-6 bg-gradient-to-b from-black to-[#0B1120]" />

      {/* Main Section - Fixed mobile responsiveness */}
      <section className="bg-gray-900 px-4 sm:px-6 py-12 sm:py-20 text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20">
          {/* First section - Made mobile responsive */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Why {' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                AI-FIRST
              </span>
              
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed px-2">
              <span className="md:text-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text font-bold text-transparent"> AI-First </span>
              is a dedicated hackathon for{' '}
              <span className="font-bold">
                SCG
              </span>
              , empowering you to explore how AI can help us work smarter. It's
              an opportunity to rethink daily tasks and focus on what truly
              matters —
              <br className="hidden sm:block" />
              <span className="text-lg sm:text-xl md:text-3xl font-bold block mt-2">Strategic and High-Impact Work.</span>
            </p>
            
          </div>
          </div>
          </section>
    </>
  );
};

export default WhyAccelerate;