import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Import images from src/assets
import okreatorImage from '../assets/okreator-1.jpeg';
import intelligentProjectImage from '../assets/intelligent-project-assistant.jpeg';
import systemRiskImage from '../assets/system-risk- assistant.jpeg';
import securityGapImage from '../assets/security-gap-analysis.png';

// Define a list of specific phrases you want to bold.
// You can add or remove phrases from this array.
const phrasesToBold = [
  'reduction',
  'increase',
  'time savings',
  'improving quality by',
  'reducing completion time by',
  'goal achievement rates',
  'man-days annually',
  'man-day savings annually',
  'improved security posture', 
  'of users'
];

// Helper function to format the impact text by highlighting specific phrases AND numbers/percentages
const formatImpact = (impactText) => {
  let formattedText = impactText;

  // 1. First, bold the predefined phrases
  phrasesToBold.forEach(phrase => {
    // Create a RegExp for the phrase, 'gi' for global and case-insensitive
    const regex = new RegExp(`\\b(${phrase})\\b`, 'gi');
    formattedText = formattedText.replace(regex, `<span class="font-bold">$1</span>`);
  });

  // 2. Then, bold numbers (integers, decimals, with commas) and optional '%' sign.
  // This is applied to the text after the phrases have been bolded.
  formattedText = formattedText.replace(
    /\b(\d{1,3}(?:,\d{3})*(?:\.\d+)?%?)\b/g,
    (match) => `<span class="font-bold">${match}</span>`
  );

  // Using dangerouslySetInnerHTML is used here as we are injecting HTML directly.
  // This is considered safe in this context because the 'impactText' data is hardcoded
  // within the application and not sourced from untrusted user input.
  return <p dangerouslySetInnerHTML={{ __html: formattedText }} />;
};


const caseStudies = [
  {
    id: 1,
    title: 'OKReator',
    imageUrl: okreatorImage, // Added image URL
    painPoints: [
      'Current method of using Excel is not user-friendly tool for creating & updating OKRs',
      'It is difficult to visualise progress made on OKRs, making it difficult for managers to be focussed and motivated',
      'Each manager is left on their own, no way for managers to learn from others about strategies to create and manage OKRs.',
    ],
    solution: [
      'OKReator, an internal Objectives and Key Results (OKR) management tool with an intuitive front-end interface that enables users to align organisational goals, track progress in real-time, and achieve measurable results',
      'Features an integrated AI assistant that helps users create well-structured OKRs, refine existing goals, and identify cross-team dependencies',
    ],
    impact: '72% of users managed to achieve their OKRs; 80% of users had cross-team collaboration; Overall scored 3.92/5 in terms of "how easy is it to update your OKRs"',
    summary: 'Unlocked goal clarity and momentum — 72% of users hit their OKRs and cross-team collaboration soared.',
  },
  {
    id: 2,
    title: 'Intelligent Project Proposal Assistant',
    imageUrl: intelligentProjectImage, // Added image URL
    painPoints: [
      'Time-consuming to digest complex policy/ops/tech information about ICT projects into one coherent proposal addressing needs of approvals',
      'Many stressful iterations with approvers to meet their ‘intended quality bar’ despite not knowing what the templated question is looking for, and the level of detail in answer to provide',
    ],
    solution: [
      'An Intelligent Project Proposal Assistant that helps project teams to quickly synthesis key information from their internal documents into a standard template',
      'The Assistant will also provide users with feedback on areas where their ICT project proposals can be improved',
      'The ICT project proposal document can then be exported for onward review or submission',
    ],
    impact: 'POC users have indicated >90% time savings in drafting their ICT project proposals; Project can be scaled up for use in agency-specific processes',
    summary: 'Accelerated project proposal drafting with over 90% time savings and improved approval processes.',
  },
  {
    id: 3,
    title: 'System Risk Advisor',
    imageUrl: systemRiskImage, // Added image URL
    painPoints: [
      'Only 40% of risk assessments adequately detail risk scenarios and controls, raising concerns that risks are missed',
      'It takes approximately 2 months for project teams to complete a risk assessment',
      'It takes 26,224 man-days to perform assessments annually',
    ],
    solution: [
      'A Generative AI-enabled System Risk Advisor to assist agencies with generation of threat attack paths, risk scenarios and controls using system information and system architecture diagram for better system risk and control identification',
    ],
    impact: 'Improved quality for 80% of risk assessments; 50% reduction in time to complete a risk assessment, both for individual projects and annually',
    summary: 'Enhanced risk assessments, improving quality by 80% and reducing completion time by 50%.',
  },
  {
    id: 4,
    title: 'Security Gap Analysis Assistant',
    imageUrl: securityGapImage, // Added image URL
    painPoints: [
      'Manual security checks consume ~5,400 man-days annually for SUDO configurations alone, straining limited IT resources',
      'Process demands specialised UNIX security expertise, making it challenging to maintain consistent standards across agencies',
    ],
    solution: [
      'A Security Gap Analysis Tool that automatically detects security gaps by analysing ingested system configuration files against security benchmarks',
      'Output includes a generated report with the security gap analysis results, highlighting identified exceptions, risk statements, test procedures and recommendations to address the gaps',
    ],
    impact: '5,400 Total Manday savings per year; Provide improved security posture across WoG',
    summary: 'Automated security checks resulting in 5,400 man-day savings annually and improved security posture.',
  },
];

const CaseStudiesPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative overflow-hidden">
        {/* Background gradient effect for visual depth */}
        <div className="absolute inset-0 bg-gradient-radial from-black via-gray-900/80 to-black opacity-90 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Page Title and Subtitle */}
          <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Featured Case Studies
          </h1>
          <p className="text-lg text-purple-200 mb-12 text-center">
            Explore how our AI-driven initiatives have transformed operations and delivered real impact.
          </p>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {caseStudies.map(({ id, title, summary, imageUrl }) => ( // Destructure imageUrl
              <div
                key={id}
                className="bg-purple-900/50 rounded-2xl shadow-lg backdrop-blur-md p-6 transition-transform transform hover:-translate-y-1 hover:shadow-cyan-400/30 flex flex-col justify-between text-center"
              >
                <div>
                  {/* Image for the case study */}
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                  />

                  {/* Case Study Title */}
                  <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>

                  {/* Concise Summary/Key Impact */}
                  <div className={`text-lg text-cyan-200 mb-6`}>
                    {formatImpact(summary)}
                  </div>
                </div>

                {/* Call to Action Button to view full case study */}
                <Link
                  to={`/case-studies/${id}`}
                  className="inline-block self-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  View Case Study
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
