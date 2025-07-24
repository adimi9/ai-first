import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';import { ArrowLeft, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react'; // Import new icons

// Data for case studies (copied from your existing caseStudies array for self-containment)
// IMPORTANT: The 'impact' property is now an array of strings for bullet points.
const caseStudies = [
  {
    id: 1,
    title: 'OKReator',
    painPoints: [
      'Current method of using Excel is not user-friendly tool for creating & updating OKRs',
      'It is difficult to visualise progress made on OKRs, making it difficult for managers to be focussed and motivated',
      'Each manager is left on their own, no way for managers to learn from others about strategies to create and manage OKRs.',
    ],
    solution: [
      'OKReator, an internal Objectives and Key Results (OKR) management tool with an intuitive front-end interface that enables users to align organisational goals, track progress in real-time, and achieve measurable results',
      'Features an integrated AI assistant that helps users create well-structured OKRs, refine existing goals, and identify cross-team dependencies',
    ],
    impact: [ // Changed to array
      '72% of users managed to achieve their OKRs', 
      '80% of users had cross-team collaboration',
      'Overall scored 3.92/5 in terms of "how easy is it to update your OKRs"',
    ],
    summary: 'Streamlined OKR management leading to a 90% reduction in drafting time and a 200% increase in goal achievement.',
  },
  {
    id: 2,
    title: 'Intelligent Project Proposal Assistant',
    painPoints: [
      'Time-consuming to digest complex policy/ops/tech information about ICT projects into one coherent proposal addressing needs of approvals',
      'Many stressful iterations with approvers to meet their ‘intended quality bar’ despite not knowing what the templated question is looking for, and the level of detail in answer to provide',
    ],
    solution: [
      'An Intelligent Project Proposal Assistant that helps project teams to quickly synthesis key information from their internal documents into a standard template',
      'The Assistant will also provide users with feedback on areas where their ICT project proposals can be improved',
      'The ICT project proposal document can then be exported for onward review or submission',
    ],
    impact: [ // Changed to array
      'POC users have indicated >90% time savings in drafting their ICT project proposals',
      'Project can be scaled up for use in agency-specific processes',
    ],
    summary: 'Accelerated project proposal drafting with over 90% time savings and improved approval processes.',
  },
  {
    id: 3,
    title: 'System Risk Advisor',
    painPoints: [
      'Only 40% of risk assessments adequately detail risk scenarios and controls, raising concerns that risks are missed',
      'It takes approximately 2 months for project teams to complete a risk assessment',
      'It takes 26,224 man-days to perform assessments annually',
    ],
    solution: [
      'A Generative AI-enabled System Risk Advisor to assist agencies with generation of threat attack paths, risk scenarios and controls using system information and system architecture diagram for better system risk and control identification',
    ],
    impact: [ // Changed to array
      'Improved quality for 80% of risk assessments',
      '50% reduction in time to complete a risk assessment, both for individual projects and annually',
    ],
    summary: 'Enhanced risk assessments, improving quality by 80% and reducing completion time by 50%.',
  },
  {
    id: 4,
    title: 'Security Gap Analysis Assistant',
    painPoints: [
      'Manual security checks consume ~5,400 man-days annually for SUDO configurations alone, straining limited IT resources',
      'Process demands specialised UNIX security expertise, making it challenging to maintain consistent standards across agencies',
      'IT teams are diverted from critical cybersecurity tasks due to time spent on repetitive manual checks',
    ],
    solution: [
      'A Security Gap Analysis Tool that automatically detects security gaps by analysing ingested system configuration files against security benchmarks',
      'Output includes a generated report with the security gap analysis results, highlighting identified exceptions, risk statements, test procedures and recommendations to address the gaps',
    ],
    impact: [ // Changed to array
      '5,400 Total Manday savings per year',
      'Provide improved security posture across WoG',
    ],
    summary: 'Automated security checks resulting in 5,400 man-day savings annually and improved security posture.',
  },
];

// Helper function to format the impact text by highlighting numbers and percentages
// Now returns a string instead of a <p> tag, suitable for use inside <li>
const formatImpact = (impactText) => {
  const formattedText = impactText.replace(
    /(\d+%?[\s]* (?:reduction|increase|savings|Improved quality|time savings|goal achievement rates|man-days annually|reduction in time spent|increase in goal achievement rates))/gi,
    (match) => `<span class="text-emerald-300 font-bold">${match}</span>` // Changed color for emphasis
  );
  return formattedText; // Return string directly
};

const CaseStudyDetailPage = () => {
  // Get the 'id' parameter from the URL
  const { id } = useParams();
  const caseStudy = caseStudies.find((cs) => cs.id === parseInt(id)); // Parse id to integer for comparison

  // If case study not found, display a message
  if (!caseStudy) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-radial from-black via-gray-900/80 to-black opacity-90 pointer-events-none"></div>
          <div className="relative z-10 text-center p-8 rounded-lg bg-gray-800/70 shadow-xl">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Case Study Not Found</h1>
            <p className="text-lg text-gray-300 mb-6">The case study you are looking for does not exist.</p>
            <Link
              to="/case-studies"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Back to All Case Studies
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render the detailed case study
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative overflow-hidden">
        {/* Background gradient effect for visual depth */}
        <div className="absolute inset-0 bg-gradient-radial from-black via-gray-900/80 to-black opacity-90 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back to Case Studies Link */}
          <Link
            to="/case-studies"
            className="flex items-center text-purple-300 hover:text-purple-100 transition-colors mb-10 group" // Increased mb
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">Back to All Case Studies</span>
          </Link>

          {/* Main Case Study Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            {caseStudy.title}
          </h1>

          {/* Pain Points Section - Red/Purple Theme */}
          <div className="bg-purple-900/30 rounded-xl p-8 mb-8 border border-red-500/20 shadow-lg">
            <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center justify-center"> {/* Centered heading */}
              <AlertTriangle className="h-7 w-7 mr-3 text-red-500" /> {/* Larger, more prominent icon */}
              The Challenge (Pain Points)
            </h2>
            <ul className="list-disc list-inside text-purple-200 space-y-3 text-lg"> {/* Increased space-y */}
              {caseStudy.painPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Solution Section - Blue/Cyan Theme */}
          <div className="bg-blue-900/30 rounded-xl p-8 mb-8 border border-blue-500/20 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center justify-center"> {/* Centered heading */}
              <Lightbulb className="h-7 w-7 mr-3 text-blue-500" /> {/* Larger, more prominent icon */}
              Our Innovative Solution
            </h2>
            <ul className="list-disc list-inside text-cyan-200 space-y-3 text-lg"> {/* Increased space-y */}
              {caseStudy.solution.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Impact Section - Green/Emerald Theme */}
          <div className="bg-emerald-900/30 rounded-xl p-8 mb-8 border border-emerald-500/20 shadow-lg">
            <h2 className="text-2xl font-extrabold text-emerald-400 mb-4 flex items-center justify-center">
              <TrendingUp className="h-7 w-7 mr-3 text-emerald-500" /> {/* Larger, more prominent icon */}
              Tangible Impact
            </h2>
            {/* Render as a bulleted list */}
            <ul className="list-disc list-inside text-green-100 space-y-3 text-lg leading-relaxed text-center"> {/* Increased space-y and centered */}
              {caseStudy.impact.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: formatImpact(item) }}></li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyDetailPage;
