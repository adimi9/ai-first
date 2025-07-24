import React from 'react';
import { ArrowLeft, Brain, Users, DollarSign, Building2, Zap, Lightbulb, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkSmarterPage = () => {
  // Data for the page content
  const hrExamples = [
    {
      title: "Strategic Interviewing",
      problem: "Managers spend hours in interviews asking repetitive screening questions instead of assessing strategic fit.",
      solution: "AI pre-screens candidates for technical skills and provides a detailed report. The interview focuses on high-level problem-solving and cultural alignment.",
    },
    {
      title: "Personalized Training",
      problem: "Generic training programs have low engagement and don't address individual skill gaps effectively.",
      solution: "AI analyzes an employee's work and identifies specific areas for improvement, suggesting personalized micro-learning modules.",
    },
  ];

  const financeExamples = [
    {
      title: "Budget Forecasting",
      problem: "Analysts spend weeks manually consolidating spreadsheets, leaving little time for strategic analysis.",
      solution: "AI connects to various data sources, generates multiple budget scenarios instantly, and highlights key trends for discussion.",
    },
    {
      title: "Investment Analysis",
      problem: "Analysts are limited by the number of financial reports they can read and process.",
      solution: "AI summarizes thousands of analyst reports, earnings calls, and news articles, presenting a condensed brief of risks and opportunities.",
    },
  ];

  const corporateExamples = [
    {
      title: "Effective Meetings",
      problem: "Meetings lack clear agendas, decisions aren't tracked, and follow-up is inconsistent.",
      solution: "AI generates agendas based on project status, records action items automatically, and sends smart reminders to owners.",
    },
    {
      title: "Strategic Decision-Making",
      problem: "Leaders rely on gut feel and backward-looking reports.",
      solution: "AI provides predictive models and data simulations, allowing leaders to test potential outcomes before making a final decision.",
    },
  ];

  const coreMechanisms = [
    {
      icon: Brain,
      title: "Contextual Awareness",
      description: "AI understands the task at hand and provides relevant information just-in-time.",
    },
    {
      icon: Lightbulb,
      title: "Strategic Suggestion",
      description: "AI analyzes the situation and suggests high-value next steps or alternative approaches.",
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      description: "AI handles the preparatory work, allowing humans to focus on judgment and execution.",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Focus on High-Value Work",
      description: "Shift from data gathering to strategic decision-making.",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: CheckCircle,
      title: "Better Decisions",
      description: "Make choices based on comprehensive data and predictive insights.",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: Zap,
      title: "Increased Capacity",
      description: "Achieve more with the same team by amplifying individual capabilities.",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Brain,
      title: "Enhanced Expertise",
      description: "Gain deeper insights and learn faster with an AI partner.",
      color: "from-amber-400 to-amber-600"
    }
  ];

  // Reusable Example Card Component
  const ExampleCard = ({ example }: { example: { title: string; problem: string; solution: string } }) => (
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <h4 className="text-xl font-bold text-white mb-4">{example.title}</h4>
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <h5 className="text-red-400 font-semibold mb-2">The Problem</h5>
            <p className="text-gray-300 text-sm leading-relaxed">{example.problem}</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h5 className="text-emerald-400 font-semibold mb-2">The AI-Enhanced Workflow</h5>
            <p className="text-gray-300 text-sm leading-relaxed">{example.solution}</p>
          </div>
        </div>
      </div>
  );

  return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-black via-blue-900/10 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Work <span className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">Smarter</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              AI helps you work smarter by acting as an intelligent assistant. It handles the mundane, preparatory tasks, freeing you to concentrate on strategy, creativity, and high-impact decisions.
            </p>
          </div>
        </section>

        {/* Core Mechanism Section */}
        <section className="py-16 bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">How AI Helps You Work Smarter</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Instead of just doing tasks faster, AI changes the nature of your work, elevating your focus from execution to strategy.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {coreMechanisms.map((mechanism, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-8 border border-blue-500/20">
                    <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                      <mechanism.icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{mechanism.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{mechanism.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* HR Examples */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-12">
              <div className="bg-blue-500/20 p-4 rounded-2xl mr-4"><Users className="h-8 w-8 text-blue-400" /></div>
              <h2 className="text-4xl font-bold text-white">Human Resources Examples</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {hrExamples.map((example, i) => <ExampleCard key={i} example={example} />)}
            </div>
          </div>
        </section>

        {/* Finance Examples */}
        <section className="py-20 bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-12">
              <div className="bg-emerald-500/20 p-4 rounded-2xl mr-4"><DollarSign className="h-8 w-8 text-emerald-400" /></div>
              <h2 className="text-4xl font-bold text-white">Finance Examples</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {financeExamples.map((example, i) => <ExampleCard key={i} example={example} />)}
            </div>
          </div>
        </section>

        {/* Corporate Examples */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-12">
              <div className="bg-purple-500/20 p-4 rounded-2xl mr-4"><Building2 className="h-8 w-8 text-purple-400" /></div>
              <h2 className="text-4xl font-bold text-white">Corporate Functions Examples</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {corporateExamples.map((example, i) => <ExampleCard key={i} example={example} />)}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Key Benefits of Working Smarter</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className={`bg-gradient-to-r ${benefit.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Work Smarter?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Empower your team to focus on what matters most. Let AI handle the rest.
            </p>
            <Link
                to="/submit-use-case"
                className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Submit Your Use Case
            </Link>
          </div>
        </section>
      </div>
  );
};

export default WorkSmarterPage;