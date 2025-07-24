import React from 'react';
import { Link } from 'react-router-dom';

const problemStatements = [
  {
    id: 'A',
    title: 'The Formal Meeting Cycle',
    input: '🎙️ Audio recording of official (closed) project meetings',
    workflow: '➡️ Transcript → Formal Minutes → Matters Arising',
    goal: '⚡ Drastically reduce time on admin, boost clarity & quality.',
  },
  {
    id: 'B',
    title: 'The Informal Meeting Cycle',
    input: '🎙️ Audio recording of informal team syncs or brainstorming sessions', // Adjusted based on context for 'informal'
    workflow: '➡️ Transcript → Summary → Action Items → Draft Follow-up Email',
    goal: '🚀 Streamline meeting follow-ups, ensuring quick execution.', // Adjusted based on workflow for 'informal'
  },
  {
    id: 'C',
    title: 'The Reporting Cycle',
    input: '📊 Anonymized G2E survey results (CSV)',
    workflow: '➡️ Analysis & Insights → Key Charts → Draft Summary Slides',
    goal: '💡 Rapidly transform raw data into decision-ready insights.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎯 Introducing Sprint 1's Problem Statements 
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pinpoint the real bottlenecks. Choose one of three core challenges. Unleash AI to make it better.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problemStatements.map((p) => (
            <div
              key={p.id}
              className="flex flex-col text-center bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  Problem {p.id}: {p.title}
                </span>
              </h3>
             
              {/* Input Section */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4 text-left flex-grow flex flex-col justify-start">
                <p className="text-base font-semibold text-blue-400 uppercase tracking-wide mb-2 border-b border-blue-600 pb-1">
                  Input Data
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {p.input}
                </p>
              </div>

              {/* Workflow Section */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4 text-left flex-grow flex flex-col justify-start">
                <p className="text-base font-semibold text-purple-400 uppercase tracking-wide mb-2 border-b border-purple-600 pb-1">
                  The Workflow
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {p.workflow}
                </p>
              </div>

              {/* Goal Section */}
              <div className="bg-gray-800 rounded-lg p-4 text-left flex-grow flex flex-col justify-start">
                <p className="text-base font-semibold text-cyan-400 uppercase tracking-wide mb-2 border-b border-cyan-600 pb-1">
                  Success Looks Like
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {p.goal}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            🚀 Ready to build a solution?
          </h3>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Join the SCG AI-First movement. Transform these everyday challenges into high-impact AI solutions.
          </p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 inline-block"
          >
            Sign Up for the Sprint! ✨
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;