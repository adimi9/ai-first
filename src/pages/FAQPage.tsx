import React, { useState, useRef } from 'react';
// Assuming Header and Footer components are in '../components/'
import Header from '../components/Header'; // Adjust path if necessary based on your project structure
import Footer from '../components/Footer'; // Adjust path if necessary based on your project structure

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is Project AI-First?',
      answer: 'Project AI-First is a 90-day sprint competition where SCG officers can form teams to discover and document the best AI-driven workflows for common productivity challenges we face. It aims to build an AI-first mindset in our daily work.'
    },
    {
      question: 'Who can participate?',
      answer: "The competition is open to all SCG officers, regardless of your current AI expertise. Whether you're just starting to explore AI or are already a power user, we welcome your participation. This initiative is designed to be inclusive and help all officers adopt an AI-first mindset. We'll provide support through office hours and workshops to help everyone to get started."
    },
    {
      question: 'How do I form a team?',
      answer: 'You can form a team of 1 leader and up to 2 additional members (maximum team size of 3). We strongly encourage cross-division collaboration - teams with members from different divisions will receive bonus points in the competition! This approach helps promote knowledge sharing and creates opportunities to learn from different perspectives across SCG.'
    },
    {
      question: 'Am I given protected time to work on Project AI-First?',
      answer: `Yes, participants are allocated 4 hours per week to work on this initiative. This time covers:
- Team collaboration discussions
- Attending workshops and clinic sessions
- Developing and validating your solutions
You should discuss with your manager on the best way to schedule these 4 hours around your core responsibilities. While the time is protected, you're expected to manage it flexibly to ensure your daily work commitments are not affected. Some teams find it helpful to block out specific time slots each week for this project.`
    },
    {
      question: 'How long will teams have to present their solutions?',
      answer: 'Teams will have 5 minutes to showcase their solutions during the monthly Closers session. If we receive overwhelming participation, we may conduct preliminary rounds.'
    },
    {
      question: 'What happens to the winning solutions?',
      answer: 'The best workflows discovered during the competition will be properly documented and turned into clear, step-by-step guides that can be shared across the organisation. This will help all officers learn from and adopt these effective approaches.'
    },
    {
      question: 'What AI tools can we use?',
      answer: 'Teams can use any combination of approved AI tools. This includes internal tools like Pair, and teams are encouraged to explore different tools to achieve the best results. Some officers currently use a combination of tools for different purposes (e.g., ChatGPT for brainstorming, Pair for official drafts).'
    },
    {
      question: 'What tools will I get access to?',
      answer: 'Participants will gain access to a suite of AI development tools and platforms, including [Claude, ChatGPT etc]. Details will be provided during the onboarding process.'
    },
    {
      question: 'What is the data sensitivity we need to work with?',
      answer: 'All provided datasets are anonymized and non-sensitive, suitable for public sector innovation. Participants are strictly prohibited from using or processing any sensitive or classified data during the sprint. Guidelines on data handling and security will be thoroughly covered during onboarding.'
    },
    {
      question: 'Will we be provided with test data?',
      answer: 'This is still being finalised. We may either provide standardised test data or allow teams to use their own datasets (subject to confidentiality requirements).'
    },
    {
      question: 'Who can I reach out to if I have any questions?',
      answer: 'You may reach out to Project leads (Adrian Goh and Bertram Lim) for any questions or support you need.'
    }
  ];

  // State to manage whether all FAQs are expanded
  const [allExpanded, setAllExpanded] = useState(false);
  // useRef to get direct access to the details elements
  const detailsRefs = useRef([]);

  // Helper function to render answers, handling bullet points
  const renderAnswer = (answerText) => {
    const lines = answerText.split('\n');
    const elements = [];
    let currentList = [];

    lines.forEach((line, index) => {
      if (line.startsWith('- ')) {
        currentList.push(<li key={index}>{line.substring(2)}</li>);
      } else {
        if (currentList.length > 0) {
          elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside ml-4">{currentList}</ul>);
          currentList = [];
        }
        if (line.trim() !== '') {
          elements.push(<p key={index}>{line}</p>);
        }
      }
    });

    // Add any remaining list items
    if (currentList.length > 0) {
      elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside ml-4">{currentList}</ul>);
    }

    return <div className="mt-2 text-sm text-purple-100">{elements}</div>;
  };

  // Function to toggle all FAQ items
  const toggleAllFaqs = () => {
    const newState = !allExpanded;
    detailsRefs.current.forEach(detail => {
      if (detail) {
        detail.open = newState;
      }
    });
    setAllExpanded(newState);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative overflow-hidden">
        {/* Background glossy effect */}
        <div className="absolute inset-0 bg-gradient-radial from-black via-gray-900/80 to-black opacity-90 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Title and Expand All Button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-center flex-grow">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                FAQs
              </span>
            </h1>
            <button
              onClick={toggleAllFaqs}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
            >
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                // Assign a ref to each details element
                ref={el => detailsRefs.current[index] = el}
                className="bg-purple-800/30 rounded-lg px-6 py-4 hover:bg-purple-700/40 transition-all"
              >
                <summary className="cursor-pointer text-lg font-semibold hover:text-purple-200">
                  {faq.question}
                </summary>
                {renderAnswer(faq.answer)}
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}