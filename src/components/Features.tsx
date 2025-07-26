import React from 'react';
import { Link } from 'react-router-dom';

const problemStatements = [
  {
    id: 'A',
    title: 'Formal Meeting Efficiency',
    intro: "Ever feel like your post-meeting hours are just swallowed up by the tedious process of transcribing audio and meticulously drafting official minutes?",
    hmw: (
      <>
        How might we help officers{" "}
        <span className="text-gradient-highlight">automate the creation</span>{" "}
        of{" "}
        <span className="text-gradient-highlight underline decoration-blue-400">
          formal meeting minutes
        </span>{" "}
        and{" "}
        <span className="text-gradient-highlight underline decoration-blue-400">
          action tracking
        </span>
        ?
        <br />
        <br />
        So they can focus on{" "}
        <span className="text-gradient-highlight">
          high-value strategic work
        </span>{" "}
        instead of manual documentation.
      </>
    ),
  },
  {
    id: 'B',
    title: 'Informal Meeting Follow-ups',
    intro: "Great ideas often spark in informal chats, but turning those spontaneous discussions into concrete next steps can feel like a mountain of manual work.",
    hmw: (
      <>
        How might we enable officers to{" "}
        <span className="text-gradient-highlight">
          capture and convert informal conversations
        </span>{" "}
        into{" "}
        <span className="text-gradient-highlight underline decoration-blue-400">
          summaries, action items, and follow-ups
        </span>
        ?
        <br />
        <br />
        So they can{" "}
        <span className="text-gradient-highlight">keep momentum</span>{" "}
        without spending hours on post-meeting tasks.
      </>
    ),
  },
  {
    id: 'C',
    title: 'Data-Driven Reporting',
    intro: "Struggling to effectively transform complex raw data into compelling reports and presentations that capture leadership's attention and ignite change?",
    hmw: (
      <>
        How might we empower officers to{" "}
        <span className="text-gradient-highlight">turn raw data</span>{" "}
        into{" "}
        <span className="text-gradient-highlight underline decoration-blue-400">
          polished decks and insightful reports
        </span>
        ?
        <br />
        <br />
        So leadership can make{" "}
        <span className="text-gradient-highlight">
          fast, data-informed decisions
        </span>{" "}
        with confidence.
      </>
    ),
  },
];


const Features = () => {
  const gradientClasses = "bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold";

  return (
    <section id="sprint-problems" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🎯 Introducing Sprint 1's Problem Statements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pinpoint the real bottlenecks. Choose one of three core challenges. Unleash AI to make it better.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {problemStatements.map((p) => (
            <div
              key={p.id}
              className="flex flex-col bg-gray-800 rounded-2xl p-6 border border-gray-800 shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-4">
                {/* Changed text-lg to text-2xl to match the title size */}
                <p className="text-2xl font-bold text-white mb-2">Problem {p.id}:</p>
                <h3 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    {p.title}
                  </span>
                </h3>
              </div>

              <p className="text-md text-gray-300 mb-6 leading-relaxed text-center">
                {p.intro}
              </p>

              {/* Spacer to push "Challenge" to consistent location */}
              <div className="flex flex-col justify-between flex-grow">
                <div className="bg-black rounded-lg p-6 text-center flex flex-col justify-start h-full">
                  <p className="text-base font-bold text-gray-300 uppercase tracking-wide mb-4">
                    {/* The emoji is now outside the gradient span */}
                    <span className="text-3xl">🎯</span>
                    <span className={`${gradientClasses} text-2xl`}>The Challenge:</span>
                  </p>
                  <p className="text-xl text-white leading-relaxed font-normal">
                    {React.Children.map(p.hmw.props.children, child => {
                      if (typeof child === 'string') return child;
                      return React.cloneElement(child, {
                        className: `${gradientClasses} ${child.props.className || ''}`.trim()
                      });
                    })}
                  </p>
                </div>
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
            to="/submit-use-case"
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
