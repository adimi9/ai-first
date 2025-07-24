import React from 'react';
// Assuming Header and Footer components are in '../components/'
import Header from '../components/Header'; // Adjust path if necessary based on your project structure
import Footer from '../components/Footer';// Adjust path if necessary based on your project structure

export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I form a team?',
      answer: 'You can form a team of 1 leader and up to 2 additional members. You can sign up with an existing team or as an individual. We will facilitate networking sessions to help solo participants find teammates.'
    },
    {
      question: 'Can I join as an individual?',
      answer: 'Yes, absolutely! You are welcome to sign up as an individual. We will organize team formation activities to help you connect with other participants and form a team for the sprint.'
    },
    {
      question: 'What are the expectations for work commitment? Am I given protected time?',
      answer: 'The AI Sprint requires a commitment of approximately [X] hours per week, which includes workshops, mentorship sessions, and team collaboration. While protected time is not formally allocated, we encourage participants to discuss flexibility with their managers to dedicate time to the sprint activities.'
    },
    {
      question: 'Who can I reach out to if I have any questions?',
      answer: 'Throughout the program, you will have access to dedicated mentors, technical experts, and community leads. You can reach out to them via our dedicated Slack channels or during scheduled office hours for any questions or support you need.'
    },
    {
      question: 'What are the tools that I can get access to?',
      answer: 'Participants will gain access to a suite of AI development tools and platforms, including [mention specific tools, e.g., cloud AI services, specialized IDEs, data analysis platforms]. Details will be provided during the onboarding process.'
    },
    {
      question: 'What is the data sensitivity we need to work with?',
      answer: 'All provided datasets are anonymized and non-sensitive, suitable for public sector innovation. Participants are strictly prohibited from using or processing any sensitive or classified data during the sprint. Guidelines on data handling and security will be thoroughly covered during onboarding.'
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative overflow-hidden">
        {/* Background glossy effect */}
        <div className="absolute inset-0 bg-gradient-radial from-black via-gray-900/80 to-black opacity-90 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              FAQs
            </span>
          </h1>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-purple-800/30 rounded-lg px-6 py-4 hover:bg-purple-700/40 transition-all"
              >
                <summary className="cursor-pointer text-lg font-semibold hover:text-purple-200">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm text-purple-100">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
