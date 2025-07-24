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

      <section className="bg-gray-900 px-2 sm:px-6 py-12 sm:py-20 text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20">
          <div className="text-center mx-auto">
            <h5 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
              Why{'   '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                AI-First
              </span>
            </h5>

            <p className="text-xl sm:text-2xl font-semibold text-gray-100 leading-snug mb-6 px-2">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold">
                AI-First
              </span>{' '}
              isn’t just a hackathon — it’s SCG’s <span className="text-white font-bold whitespace-nowrap">90-day sprint</span> to redefine how we work.
            </p>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed px-2">
              AI tools are everywhere.
              <br className="hidden sm:block" />
              Officers are already experimenting — switching between <strong>ChatGPT</strong>, <strong>Pair</strong>, and even paying <span className="whitespace-nowrap">out-of-pocket</span>. <br />
              But without <span className="text-white font-medium">clear, repeatable workflows</span>, progress stalls — and frustration sets in.
            </p>

            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-6 px-2">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold">
                AI-First
              </span>{' '}
              is your chance to lead.
              <br />
              Turn trial-and-error into{' '}
              <span className="underline underline-offset-4 decoration-blue-400">repeatable success</span>{' '}
              others can learn from.
            </p>

            
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyAccelerate;
