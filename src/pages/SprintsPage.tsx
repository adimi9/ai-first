import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Modal component for the problem statement form
const ProblemStatementFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '', // New field for user's name
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
              rows={3} // Reduced rows for modal
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
              rows={3} // Reduced rows for modal
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

// Data for problem statements, now with short summaries
const problemStatements = [
  {
    id: 'A',
    title: 'Formal Meeting Efficiency',
    shortSummary: "Automate the creation of formal meeting minutes and action tracking to focus on high-value strategic work.",
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
  },
];

const SprintsPage = () => {
  const [showIdeaModal, setShowIdeaModal] = useState(false);

  const handleIdeaSubmit = (data) => {
    console.log('Problem Statement Idea Submitted:', data);
    // In a real application, you would send this data to a backend server
    alert('Thank you for your submission! We will review your idea.'); // Using alert for now as per previous implementation
    setShowIdeaModal(false); // Close modal after submission
  };

  return (
    <>
    <Header />
    
    <div className="bg-gray-950 text-white min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8">
          Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">AI-First</span> Sprints
        </h1>

        <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          The SCG AI-First initiative is a dynamic 90-day journey structured into 3 distinct sprints, each focusing on key challenges to integrate AI into our daily workflows and drive innovation.
        </p>

        {/* Current Sprint Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            🚀 Sprint 1: Current Focus
          </h2>
          <p className="text-center text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            We're currently tackling these critical problem statements. Choose one and show us how AI can make a difference!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-12"> {/* Added mb-12 for spacing before the button */}
            {problemStatements.map((p) => (
              <div
                key={p.id}
                className="flex flex-col bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                      {p.title}
                    </span>
                  </h3>
                </div>

                {/* Added min-h-[96px] to ensure symmetric height for short summaries */}
                <p className="text-md text-gray-300 mb-6 leading-relaxed text-center flex-grow min-h-[96px] flex items-center justify-center">
                  {p.shortSummary}
                </p>

                {/* Removed individual "Join the Sprint Now!" buttons from here */}
              </div>
            ))}
          </div>
          {/* Consolidated "Join the Sprint Now!" button */}
          <div className="text-center mt-8">
            <Link
              to="/submit-use-case"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Join the Sprint Now! ✨
            </Link>
          </div>
        </section>

        {/* Upcoming Sprints Section */}
        <section className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🗓️ Sprints 2 & 3: Coming Soon!
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Stay tuned for exciting new problem statements and challenges in the upcoming sprints. We're constantly evolving to address the most pressing needs with AI.
          </p>
          <button
            onClick={() => setShowIdeaModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 inline-block"
          >
            Have an idea for a future problem statement? <br />Let us know here!
          </button>
        </section>

        {/* Problem Statement Idea Modal */}
        <ProblemStatementFormModal
          isOpen={showIdeaModal}
          onClose={() => setShowIdeaModal(false)}
          onSubmit={handleIdeaSubmit}
        />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SprintsPage;
