import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const TrainingAndResources = () => {
  return (
    <>
      <Header />
      {/* Assuming header is 64px (h-16) and footer is 48px (h-12) */}
      <div className="bg-gray-950 text-white min-h-[calc(100vh-64px-48px)] flex items-center justify-center pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Training & Resources
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            We're working hard to curate the best training materials and resources to help you excel in the AI-First sprint.
          </p>
          <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Stay Tuned for More Information!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrainingAndResources;