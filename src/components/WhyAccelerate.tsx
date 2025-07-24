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
              What is{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                AiCCELERATE
              </span>
              ?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed px-2">
              <span className="md:text-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text font-bold text-transparent"> AiCCELERATE </span>
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
            <button
              onClick={() => navigate('/case-studies')}
              className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition text-sm sm:text-base font-bold"
            >
              See Case Studies!
            </button>
          </div>

          {/* Second section - Fixed mobile layout */}
<div className="flex flex-col items-center gap-6 sm:gap-8 max-w-6xl mx-auto text-center">
            <div className="px-4 sm:px-6">
              {/* Main headline with better visual hierarchy */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 leading-tight">
                <span className="block mb-4 sm:mb-5 font-bold">
                  It's time to{' '}
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold tracking-wide">
                    AiCCELERATE
                  </span>
                </span>
                
                  <span className="block text-lg sm:text-lg md:text-2xl lg:text-3xl text-gray-200 italic tracking-wide">
                     — where{' '}
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold not-italic">
                      AI
                    </span>{' '}
                    and{' '}
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold not-italic">
                      i
                    </span>{' '}
                    <span className="block sm:inline mt-2 sm:mt-0">
                      move forward, together.
                    </span>
                  </span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      <div className="h-6 bg-gradient-to-b from-[#0B1120] to-black" />
    </>
  );
};

export default WhyAccelerate;