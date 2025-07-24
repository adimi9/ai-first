import React from 'react';
import { Sparkles, Trophy, Users, GaugeCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WinFormula = () => {
  return (
    <>
      <Header />
      <section className="relative bg-black text-white px-6 py-16 sm:py-24 overflow-hidden">
        {/* Glowing Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-20 text-center">
          {/* Section Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Win Formula</h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Here’s how we’ll identify the most impactful{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
                AI-First
              </span>{' '}
              workflows.
            </p>
          </div>

          {/* Judging Criteria Scoreboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {/* Block */}
            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white font-bold text-xl">
                  <GaugeCircle className="h-5 w-5 text-cyan-400" />
                  Quality & Accuracy
                </div>
                <div className="text-3xl font-extrabold text-cyan-400">30%</div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                How insightful, relevant, and correct is the final product?
              </p>
            </div>

            {/* Block */}
            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white font-bold text-xl">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  Productivity Gain
                </div>
                <div className="text-3xl font-extrabold text-blue-400">30%</div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                How much time is saved compared to the manual baseline?
              </p>
            </div>

            {/* Block */}
            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white font-bold text-xl">
                  <Users className="h-5 w-5 text-purple-400" />
                  Officers’ Choice
                </div>
                <div className="text-3xl font-extrabold text-purple-400">30%</div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                Would your colleagues actually want to use this solution?
              </p>
            </div>

            {/* Block */}
            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white font-bold text-xl">
                  <Sparkles className="h-5 w-5 text-pink-400" />
                  Cross-Divisional Collab
                </div>
                <div className="text-3xl font-extrabold text-pink-400">10%</div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                Was this idea co-developed across different divisions?
              </p>
            </div>
          </div>

          {/* Grand Prizes Section */}
          <div className="mt-20 relative z-10 max-w-4xl mx-auto bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 border border-yellow-600/30 rounded-2xl shadow-lg p-8 text-center space-y-6 backdrop-blur-sm">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 flex items-center justify-center gap-3">
              <Trophy className="h-8 w-8 animate-bounce" />
              Grand Prizes
            </h3>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-white font-semibold text-2xl sm:text-3xl mt-6">
              <div className="flex flex-col items-center">
                <div className="text-5xl sm:text-6xl font-extrabold text-yellow-300 drop-shadow-sm">
                  $200
                </div>
                <div className="text-gray-300 text-base mt-1">GovWallet Credit</div>
              </div>

              <span className="text-gray-400 text-xl">+</span>

              <div className="flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-yellow-200 drop-shadow-sm">
                  2 Days Off
                </div>
                <div className="text-gray-300 text-base mt-1">From Work 🎉</div>
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Winners will pitch live at <strong>Closers</strong> each month.
              <br />
              A shortlisting round will be held if needed.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WinFormula;
