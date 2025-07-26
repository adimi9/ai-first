import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Trophy, Users, GaugeCircle, Lightbulb, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Data for problem statements, updated with 'shortSummary' and 'successLooksLike'
const problemStatements = [
  {
    id: 'A',
    title: 'Formal Meeting Efficiency',
    shortSummary: "Automate formal meeting minutes and action tracking to focus on high-value strategic work.",
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
    successLooksLike: "A dramatic reduction in the time spent on meeting administration, with higher quality outputs.",
  },
  {
    id: 'B',
    title: 'Informal Meeting Follow-ups',
    shortSummary: "Enable officers to capture and convert informal conversations into summaries, action items, and follow-ups to maintain momentum.",
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
    successLooksLike: "A dramatic reduction in the time spent on meeting administration, with higher quality outputs.",
  },
  {
    id: 'C',
    title: 'Data-Driven Reporting',
    shortSummary: "Empower officers to turn raw data into polished decks and insightful reports for fast, data-informed decisions.",
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
    successLooksLike: "Rapidly turning raw data into decision-ready insights for leadership.",
  },
];

// Modal component for the problem statement form
const ProblemStatementFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    intro: '',
    hmw: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', title: '', intro: '', hmw: '', email: '' }); // Clear form
  };

  if (!isOpen) return null;

  return (
    // Overlay for the modal, clicking this will close the modal
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      {/* Modal content container, prevent clicks inside from closing the modal */}
      <div
        className="bg-gray-800 rounded-2xl p-8 md:p-10 shadow-xl border border-gray-700 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          💡 Propose Your Problem Statement Idea
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8">
          Have a unique challenge that AI could solve? Share your ideas with us!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-200 mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-200 mb-2">
              Problem Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Automating Report Generation"
            />
          </div>

          <div>
            <label htmlFor="intro" className="block text-lg font-medium text-gray-200 mb-2">
              Introduction/Context <span className="text-red-500">*</span>
            </label>
            <textarea
              id="intro"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Briefly describe the problem and its current impact."
            ></textarea>
          </div>

          <div>
            <label htmlFor="hmw" className="block text-lg font-medium text-gray-200 mb-2">
              "How Might We" Question <span className="text-red-500">*</span>
            </label>
            <textarea
              id="hmw"
              name="hmw"
              value={formData.hmw}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Formulate it as a 'How might we...' question."
            ></textarea>
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-200 mb-2">
              Your Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
          >
            Submit Idea ✨
          </button>
        </form>
      </div>
    </div>
  );
};


const WinFormula = () => {
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const gradientClasses = "bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold";

  const handleIdeaSubmit = (data) => {
    console.log('Problem Statement Idea Submitted:', data);
    alert('Thank you for your submission! We will review your idea.');
    setShowIdeaModal(false);
  };

  return (
    <>
      <Header />
      <section className="relative bg-black text-white px-6 py-16 sm:py-24 overflow-hidden">
        {/* Glowing Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-20 text-center">

          {/* Section: Our Mission: Driving AI Impact - Background: Black */}
          <div id="our-mission" className="space-y-6 py-12 px-4">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6">
              Our Mission: Driving AI Impact
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              The AI-First initiative aims to bridge the gap between AI adoption and its <strong className="text-blue-300 underline underline-offset-4 decoration-blue-400">impactful</strong> application.
              While our organization has embraced basic AI, our officers' ambition for advanced workflows is outpacing current capabilities.
            </p>
            {/* Challenges and Bottom Line in new box format */}
            <div className="space-y-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">This creates two key challenges:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Capped Productivity Box */}
                <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col items-center text-left">
                  <h4 className="text-xl font-bold text-white mb-2">Capped Productivity</h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Staff are hitting a ceiling on efficiency gains for <strong className="text-purple-300">complex, high-value tasks</strong>, leading to limited productivity and discouragement.
                  </p>
                </div>
                {/* Untapped Potential Box */}
                <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col items-center text-left">
                  <h4 className="text-xl font-bold text-white mb-2">Untapped Potential</h4>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Our most proactive officers have found <strong className="text-cyan-300">powerful workflows</strong> that remain isolated and unshared.
                  </p>
                </div>
              </div>
              {/* Bottom Line Box */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-xl border border-blue-500/50 mt-6">
                <p className="text-lg font-semibold leading-relaxed">
                  <span className="font-bold">Bottom Line:</span> We have an opportunity to <strong className="text-yellow-200">harness your ambition</strong>. Our goal is to shift from merely providing tools to helping you <strong className="text-yellow-200">discover and share impactful, AI-driven workflows</strong>, leveraging collective creativity to unlock new levels of productivity.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Competition Journey & Mechanics - Background: Dark Blue */}
          <div id="competition-journey" className="space-y-6 py-12 px-4 bg-[#0B1120] rounded-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6">
              Competition Journey & Mechanics
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Join our focused <strong className="text-blue-300">90-day competition</strong> to discover, validate, and codify powerful AI workflows. This initiative empowers top users to define excellence, creating a scalable playbook for the organization.
            </p>

            <div className="bg-gray-900/70 p-8 rounded-2xl border border-gray-700 shadow-xl max-w-4xl mx-auto text-left space-y-6">
              <h3 className="text-3xl font-bold text-white mb-4 text-center">Competition Features:</h3>
              <ul className="list-none text-gray-300 space-y-3 text-lg">
                <li className="flex items-start">
                  <ChevronRight className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Workflow Discovery:</span> A competition for users to discover and optimize AI workflows for common tasks.
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Live Showcases:</span> Present your solutions in 3-minute pitches at monthly <strong className="text-purple-300">Closers</strong> events. (Preliminary rounds may be held if participation is high!)
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Tool Exploration:</span> Opportunities to test <strong className="text-cyan-300">new AI tools</strong> introduced between months, integrating them into existing workflows.
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Collaborative Workshops:</span> Participate in workshops (open to all SCG) to identify new problem statements and challenges.
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Expert Support:</span> Weekly office hours available to address your questions and provide guidance.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Section: Evaluation Scorecard - Background: Black */}
          <div id="evaluation-scorecard" className="space-y-6 py-12 px-4">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6">Evaluation Scorecard</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Here's how your innovative solutions will be evaluated to identify the most <strong className="text-blue-300 underline underline-offset-4 decoration-blue-400">impactful AI-driven workflows</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              {/* Quality & Accuracy */}
              <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white font-bold text-xl">
                    <GaugeCircle className="h-5 w-5 text-cyan-400" />
                    Quality & Accuracy
                  </div>
                  <div className="text-3xl font-extrabold text-cyan-400">30%</div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  How insightful, relevant, and accurate is the output?
                </p>
              </div>

              {/* Productivity Gain */}
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

              {/* User Adoption */}
              <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white font-bold text-xl">
                    <Users className="h-5 w-5 text-purple-400" />
                    User Adoption
                  </div>
                  <div className="text-3xl font-extrabold text-purple-400">30%</div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  Would your colleagues actually want to use this solution?
                </p>
              </div>

              {/* Cross-Divisional Collab */}
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
          </div>

          {/* Section: Sprint 1 Problem Statements - Background: Dark Blue */}
          <div id="sprint-problems-win-formula" className="py-10 bg-[#0B1120] rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-800">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                🎯 Sprint 1 Problem Statements
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Data reveals <strong className="text-blue-300">universal 'productivity drains'</strong> are the key to unlocking gains. We focus our discovery efforts on these universal workflows to create a powerful, organization-wide uplift in productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
              {problemStatements.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg"
                >
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-gray-300 mb-2">Problem {p.id}:</p>
                    <h3 className="text-2xl font-bold text-white">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        {p.title}
                      </span>
                    </h3>
                  </div>

                  <p className="text-md text-gray-300 mb-6 leading-relaxed text-center flex-grow min-h-[96px] flex items-center justify-center">
                    {p.shortSummary}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/submit-use-case"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 inline-block"
              >
                Sign Up for the Sprint! ✨
              </Link>
            </div>
          </div>


          {/* Section: Grand Prizes - Background: Black */}
          <div id="prizes" className="mt-20 relative z-10 max-w-4xl mx-auto bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 border border-yellow-600/30 rounded-2xl shadow-lg p-8 text-center space-y-6 backdrop-blur-sm">
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
              Winners will pitch live at <strong className="text-yellow-200">Closers</strong> each month.
              <br />
              A shortlisting round will be held if needed.
            </p>
          </div>

          {/* New Section: Idea for subsequent sprints? Let us know - Background: Dark Blue */}
          <div id="propose-idea" className="mt-20 text-center bg-[#0B1120] rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-800">
            <h3 className="text-3xl font-bold text-white mb-4">
              <Lightbulb className="inline-block h-8 w-8 mr-2 text-yellow-400" />
              Idea for Subsequent Sprints? Let Us Know!
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Have a brilliant problem statement that AI could solve for future sprints? Share it with us! We're always looking for new challenges to tackle and new ways to empower our officers.
            </p>
            <button
              onClick={() => setShowIdeaModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 inline-block"
            >
              Propose Your Idea Here!
            </button>
          </div>

        </div>
      </section>
      <Footer />

      {/* Problem Statement Idea Modal */}
      <ProblemStatementFormModal
        isOpen={showIdeaModal}
        onClose={() => setShowIdeaModal(false)}
        onSubmit={handleIdeaSubmit}
      />
    </>
  );
};

export default WinFormula;
