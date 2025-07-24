import React from 'react'
import { ArrowLeft, Lightbulb, Brain, Zap, Target, Users, DollarSign, Building2, Sparkles, Network, Eye, Shuffle } from 'lucide-react'
import { Link } from 'react-router-dom'

const DriveInnovationPage = () => {
  const hrExamples = [
    {
      title: "Talent Strategy Innovation",
      traditional: "HR relies on standard recruitment channels and historical hiring patterns",
      breakthrough: "AI analyzes successful employees' backgrounds, discovers unexpected patterns (e.g., people with gaming experience excel in data analysis roles), suggests non-traditional talent sources",
      outcome: "HR develops innovative recruitment strategies, tapping into previously overlooked talent pools"
    },
    {
      title: "Employee Engagement Solutions",
      traditional: "Annual surveys and generic wellness programs",
      breakthrough: "AI analyzes communication patterns, project assignments, and performance data to identify what truly drives engagement for different personality types",
      outcome: "Personalized career development paths and team compositions that maximize both satisfaction and productivity"
    },
    {
      title: "Workforce Planning Innovation",
      traditional: "Linear projections based on past trends",
      breakthrough: "AI simulates multiple future scenarios, identifies skills that will be crucial but aren't obvious yet, suggests creative reskilling combinations",
      outcome: "Proactive workforce transformation strategies that prepare for unexpected market shifts"
    }
  ]

  const financeExamples = [
    {
      title: "Revenue Optimization Strategies",
      traditional: "Standard pricing models and historical customer segmentation",
      breakthrough: "AI discovers hidden customer behavior patterns, identifies unexpected revenue opportunities (e.g., certain customers willing to pay premium for specific service combinations)",
      outcome: "Dynamic pricing strategies and new service bundles that dramatically increase profitability"
    },
    {
      title: "Risk Management Innovation",
      traditional: "Standard risk assessments based on known factors",
      breakthrough: "AI identifies subtle early warning signals by analyzing seemingly unrelated data (social media sentiment, supplier payment patterns, weather data)",
      outcome: "Predictive risk mitigation strategies that prevent problems before they appear"
    },
    {
      title: "Investment Strategy Breakthroughs",
      traditional: "Portfolio management based on standard financial metrics",
      breakthrough: "AI discovers correlations between unconventional data sources (satellite imagery of retail parking lots, social media trends, patent filings) and investment performance",
      outcome: "Novel investment approaches that outperform traditional methods"
    }
  ]

  const corporateExamples = [
    {
      title: "Strategic Planning Innovation",
      traditional: "Strategic plans based on industry benchmarks and past performance",
      breakthrough: "AI analyzes competitor moves, market signals, and emerging technologies to identify strategic opportunities others miss",
      outcome: "First-mover advantage in new markets or innovative business model pivots"
    },
    {
      title: "Product Development Breakthroughs",
      traditional: "R&D based on customer surveys and competitor analysis",
      breakthrough: "AI analyzes user behavior data, identifies unmet needs customers can't articulate, suggests feature combinations from different industries",
      outcome: "Revolutionary products that create entirely new market categories"
    },
    {
      title: "Operational Excellence Innovation",
      traditional: "Process improvement based on best practices and efficiency metrics",
      breakthrough: "AI simulates thousands of process variations, discovers counter-intuitive optimizations (e.g., strategic delays that improve overall speed)",
      outcome: "Breakthrough operational models that redefine industry standards"
    },
    {
      title: "Customer Experience Revolution",
      traditional: "Customer service based on standard protocols and feedback forms",
      breakthrough: "AI analyzes customer journey across all touchpoints, identifies emotional triggers and moments of truth humans miss",
      outcome: "Transformative customer experiences that create unprecedented loyalty"
    }
  ]

  const breakthroughMechanisms = [
    {
      icon: Network,
      title: "Cross-Pollination",
      example: "AI notices that techniques used in video game design could solve supply chain visualization problems",
      result: "Interactive, gamified dashboards that make complex logistics intuitive",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Eye,
      title: "Weak Signal Detection",
      example: "AI spots early indicators of market shifts in seemingly unrelated data streams",
      result: "Strategic pivots months ahead of competitors",
      color: "from-purple-400 to-violet-500"
    },
    {
      icon: Shuffle,
      title: "Combinatorial Creativity",
      example: "AI suggests combining drone technology + AI vision + blockchain for supply chain transparency",
      result: "Entirely new business models emerge",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: Target,
      title: "Constraint Reframing",
      example: "Instead of \"how to reduce costs,\" AI reframes as \"how to increase value perception while maintaining margins\"",
      result: "Solutions that seemed impossible become obvious",
      color: "from-amber-400 to-orange-500"
    }
  ]

  const coreMechanisms = [
    {
      icon: Brain,
      title: "Pattern Discovery",
      description: "AI finds hidden relationships in vast amounts of data",
      color: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: Lightbulb,
      title: "Idea Generation",
      description: "AI creates multiple solution pathways by combining existing knowledge in novel ways",
      color: "from-amber-500/10 to-amber-600/5",
      borderColor: "border-amber-500/20",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400"
    },
    {
      icon: Target,
      title: "Scenario Modeling",
      description: "AI simulates \"what if\" situations to test creative approaches",
      color: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Sparkles,
      title: "Cross-Domain Inspiration",
      description: "AI draws connections from completely different fields",
      color: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400"
    }
  ]

  const ExampleCard = ({ example, index }: { example: any, index: number }) => (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
      <h4 className="text-xl font-bold text-white mb-4">{example.title}</h4>
      
      <div className="space-y-4">
        <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-4">
          <h5 className="text-gray-400 font-semibold mb-2 flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            Traditional Approach
          </h5>
          <p className="text-gray-300 text-sm leading-relaxed">{example.traditional}</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h5 className="text-blue-400 font-semibold mb-2 flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            AI-Powered Breakthrough
          </h5>
          <p className="text-gray-300 text-sm leading-relaxed">{example.breakthrough}</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <h5 className="text-emerald-400 font-semibold mb-2 flex items-center">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Creative Outcome
          </h5>
          <p className="text-gray-300 text-sm leading-relaxed">{example.outcome}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black via-amber-900/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Drive <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Innovation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            AI unlocks creative solutions by acting as a "creative amplifier" - it doesn't replace human creativity but supercharges it by revealing hidden patterns, generating multiple possibilities, and combining ideas in ways humans might never consider.
          </p>
        </div>
      </section>

      {/* Core Mechanism */}
      <section className="py-16 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How AI Enables Breakthrough Thinking</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Think of AI like having a research team of thousands working 24/7, each exploring different angles of your problem, then presenting you with insights and connections you'd never discover alone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreMechanisms.map((mechanism, index) => (
              <div key={index} className={`bg-gradient-to-br ${mechanism.color} rounded-2xl p-6 border ${mechanism.borderColor}`}>
                <div className={`${mechanism.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <mechanism.icon className={`h-8 w-8 ${mechanism.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{mechanism.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{mechanism.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HR Examples */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <div className="bg-blue-500/20 p-4 rounded-2xl mr-4">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-4xl font-bold text-white">Human Resources Examples</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {hrExamples.map((example, index) => (
              <ExampleCard key={index} example={example} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Finance Examples */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <div className="bg-emerald-500/20 p-4 rounded-2xl mr-4">
              <DollarSign className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-4xl font-bold text-white">Finance Examples</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {financeExamples.map((example, index) => (
              <ExampleCard key={index} example={example} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Examples */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <div className="bg-purple-500/20 p-4 rounded-2xl mr-4">
              <Building2 className="h-8 w-8 text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold text-white">Corporate Functions Examples</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {corporateExamples.map((example, index) => (
              <ExampleCard key={index} example={example} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Breakthrough Thinking Mechanisms */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Breakthrough Thinking Mechanisms</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI enables revolutionary approaches by fundamentally changing how we discover and combine ideas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {breakthroughMechanisms.map((mechanism, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-r ${mechanism.color} w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
                    <mechanism.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{mechanism.title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <h5 className="text-blue-400 font-semibold mb-2">Example</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{mechanism.example}</p>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <h5 className="text-emerald-400 font-semibold mb-2">Result</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{mechanism.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Drive Innovation?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Unlock your team's creative potential with AI-powered breakthrough thinking.
          </p>
          <Link 
            to="/submit-use-case"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-1"
          >
            Submit Your Use Case
          </Link>
        </div>
      </section>
    </div>
  )
}

export default DriveInnovationPage
