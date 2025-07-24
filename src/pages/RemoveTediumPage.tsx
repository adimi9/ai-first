import React from 'react'
import { ArrowLeft, Brain, Clock, Target, CheckCircle, Users, DollarSign, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const RemoveTediumPage = () => {
  const hrExamples = [
    {
      title: "Resume Screening",
      tedious: "HR person reads through 500 resumes, manually checking if candidates meet basic requirements (degree, years of experience, specific skills)",
      solution: "AI scans resumes instantly, automatically flags candidates who meet criteria, ranks them by relevance",
      result: "HR spends time interviewing qualified candidates instead of reading resumes"
    },
    {
      title: "Employee Query Handling",
      tedious: "HR answering the same questions repeatedly (\"How many leave days do I have?\" \"What's the maternity leave policy?\")",
      solution: "Chatbot trained on company policies answers routine questions instantly",
      result: "HR focuses on complex employee issues, not repetitive information requests"
    },
    {
      title: "Performance Review Data Compilation",
      tedious: "Collecting feedback from multiple sources, formatting reports, calculating ratings",
      solution: "AI automatically aggregates data from various systems, generates standardized reports",
      result: "Managers spend time on meaningful performance discussions, not paperwork"
    }
  ]

  const financeExamples = [
    {
      title: "Invoice Processing",
      tedious: "Manually entering data from thousands of invoices, checking for errors, matching with purchase orders",
      solution: "AI reads invoices (OCR + natural language processing), extracts key information, automatically matches with records, flags discrepancies",
      result: "Finance team focuses on analyzing spending patterns and strategic planning"
    },
    {
      title: "Expense Report Validation",
      tedious: "Checking each expense receipt, verifying against company policy, calculating totals",
      solution: "AI scans receipts, checks policy compliance automatically, pre-approves routine expenses",
      result: "Only unusual cases require human review"
    },
    {
      title: "Financial Data Reconciliation",
      tedious: "Comparing thousands of transactions across different systems to find mismatches",
      solution: "AI automatically compares records, identifies discrepancies, suggests corrections",
      result: "Accountants focus on investigating significant issues, not routine matching"
    }
  ]

  const corporateExamples = [
    {
      title: "Contract Review (Legal)",
      tedious: "Reading through standard contracts to check for compliance with company terms",
      solution: "AI scans contracts, highlights deviations from standard clauses, flags risky terms",
      result: "Lawyers focus on negotiating complex deals, not routine contract review"
    },
    {
      title: "Document Classification",
      tedious: "Manually sorting and filing thousands of documents by type and department",
      solution: "AI automatically categorizes documents based on content, routes them to appropriate teams",
      result: "Staff focus on acting on document content, not organizing files"
    },
    {
      title: "Meeting Scheduling",
      tedious: "Back-and-forth emails to find suitable times for multiple participants",
      solution: "AI assistant automatically finds optimal meeting times by checking all calendars, books rooms, sends invites",
      result: "More time for actual productive meetings"
    },
    {
      title: "Compliance Monitoring",
      tedious: "Manually checking if business processes follow regulations and internal policies",
      solution: "AI continuously monitors transactions and activities, automatically flags policy violations",
      result: "Compliance team focuses on investigating serious issues and improving policies"
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Speed",
      description: "AI processes information thousands of times faster than humans",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Target,
      title: "Consistency",
      description: "No \"Monday morning\" or \"Friday afternoon\" performance variations",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: CheckCircle,
      title: "Accuracy",
      description: "Reduces human error in repetitive tasks",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Brain,
      title: "Scalability",
      description: "Can handle increasing workload without additional staff",
      color: "from-amber-400 to-amber-600"
    }
  ]

  const ExampleCard = ({ example, index }: { example: any, index: number }) => (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
      <h4 className="text-xl font-bold text-white mb-4">{example.title}</h4>
      
      <div className="space-y-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <h5 className="text-red-400 font-semibold mb-2 flex items-center">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
            Tedious Manual Process
          </h5>
          <p className="text-gray-300 text-sm leading-relaxed">{example.tedious}</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <h5 className="text-blue-400 font-semibold mb-2 flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            AI Solution
          </h5>
          <p className="text-gray-300 text-sm leading-relaxed">{example.solution}</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <h5 className="text-emerald-400 font-semibold mb-2 flex items-center">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Result
          </h5>
          <p className="text-gray-300 text-sm leading-relaxed">{example.result}</p>
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
      <section className="py-20 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Remove <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Tedium</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            AI removes tedium by learning patterns from data and then automatically applying those patterns to new, similar situations. Instead of humans manually processing each case, AI can handle thousands of routine decisions instantly.
          </p>
        </div>
      </section>

      {/* Core Mechanism */}
      <section className="py-16 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How AI Eliminates Tedium</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Think of AI like training a very fast, tireless intern who learns by watching you do a task hundreds of times, then can replicate that task perfectly at superhuman speed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-8 border border-blue-500/20">
              <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pattern Recognition</h3>
              <p className="text-gray-300 leading-relaxed">AI analyzes historical data to understand "rules"</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl p-8 border border-purple-500/20">
              <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Decision Automation</h3>
              <p className="text-gray-300 leading-relaxed">AI applies these learned rules to new cases</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl p-8 border border-emerald-500/20">
              <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Continuous Processing</h3>
              <p className="text-gray-300 leading-relaxed">AI works 24/7 without fatigue or errors</p>
            </div>
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
              <FileText className="h-8 w-8 text-purple-400" />
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

      {/* Key Benefits */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Benefits Across All Functions</h2>
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
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Remove Tedium?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your AI transformation journey and free your team from repetitive tasks.
          </p>
          <Link 
            to="/submit-use-case"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1"
          >
            Submit Your Use Case
          </Link>
        </div>
      </section>
    </div>
  )
}

export default RemoveTediumPage
