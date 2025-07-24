import React from 'react';
import { Link } from 'react-router-dom';

const problemStatements = [
  {
    id: 'A',
    title: 'The Formal Meeting Cycle',
    input: 'Audio recording of official (closed) project meetings',
    workflow: 'Transcript → Formal minutes → Matters arising',
    goal: 'Save time on formal meeting write-ups while boosting clarity and quality.',
  },
  {
    id: 'B',
    title: 'The Weekly Report Ritual',
    input: 'Progress updates from officers, often via chat, calls, or documents',
    workflow: 'Raw updates → Alignment by lead → Summary email/report to directors',
    goal: 'Reduce time spent wrangling updates and improve visibility across teams.',
  },
  {
    id: 'C',
    title: 'The Intranet-as-FAQ Problem',
    input: 'Officers answering the same internal queries again and again',
    workflow: 'Chat messages → Search for files → Copy-paste reused answers',
    goal: 'Enable AI to provide smart, self-serve responses using our internal resources.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Solve What Slows Us Down
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose one of three common SCG challenges — and use AI to make it better.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problemStatements.map((p) => (
            <div
              key={p.id}
              className="flex flex-col text-center bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transition-all"
            >
              <h4 className="text-lg sm:text-xl font-bold text-blue-400 uppercase mb-2">
                Problem Statement {p.id}
              </h4>
              <h3 className="text-2xl font-semibold text-white mb-6">
                {p.title}
              </h3>

              {/* Input Section */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4 text-left">
                <p className="text-base font-bold text-blue-400 uppercase tracking-wide mb-2">Input</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {p.input}
                </p>
              </div>

              {/* Workflow Section */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4 text-left">
                <p className="text-base font-bold text-purple-400 uppercase tracking-wide mb-2">Workflow</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {p.workflow}
                </p>
              </div>

              {/* Goal Section */}
              <div className="bg-gray-800 rounded-lg p-4 text-left">
                <p className="text-base font-bold text-cyan-400 uppercase tracking-wide mb-2">Goal</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {p.goal}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to tackle one of these?
          </h3>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Join us to turn these everyday challenges into high-impact AI solutions. Be part of SCG's AI-First movement.
          </p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 inline-block"
          >
            Join the Sprint!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;