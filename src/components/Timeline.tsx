import { Brain, Users, Target, Search, Lightbulb, Code, Trophy } from 'lucide-react'

const timeline = [
    {
        phase: 'Discover & Team Up',
        period: 'Jul 1 - Jul 25',
        description: 'Identify real business problems you face daily, form your team, and submit your challenge. Focus on impact, not technology - what frustrates you most at work?',
        icon: Search,
        status: 'upcoming'
    },
    {
        phase: 'Learn & Validate',
        period: 'Jul 31 - Aug 1',
        description: 'Attend hands-on AI workshops to discover which tools can solve your problem. Validate your approach and confirm it will make a real difference.',
        icon: Lightbulb,
        status: 'upcoming'
    },
    {
        phase: 'Build & Test',
        period: 'Aug 1 - Sep 5',
        description: 'Build your AI solution with expert support! Explore data, develop your prototype, test with real users, and iterate based on feedback.',
        icon: Code,
        status: 'upcoming'
    },
    {
        phase: 'Showcase & Win',
        period: 'Sep 6 - 26',
        description: 'Polish your demo, get feedback from other teams, and showcase your solution to leadership. Top solutions get developed and put into production!',
        icon: Trophy,
        status: 'upcoming'
    }
]

const Timeline = () => {
    return (
        <section id="timeline" className="px-6 py-20 bg-gray-900 bg-opacity-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            AiCCELERATE {"  "}
                        </span> 
                        Timeline
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Our structured initiative to accelerating SCG with AI
                    </p>
                </div>

                <div className="relative">
                    {/* Desktop Timeline Line - centered */}
                    <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-purple-600 hidden md:block"></div>
                    
                    {/* Mobile Timeline Line - left side */}
                    <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 md:hidden"></div>

                    <div className="space-y-12">
                        {timeline.map((phase, index) => {
                            const IconComponent = phase.icon
                            const isEven = index % 2 === 0
                            
                            return (
                                <div key={index} className="relative">
                                    {/* Desktop Layout - Alternating */}
                                    <div className="hidden md:flex items-center">
                                        {isEven ? (
                                            // Left side content for even items
                                            <>
                                                <div className="w-1/2 pr-8">
                                                    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 text-right">
                                                        <h3 className="text-2xl font-bold text-white mb-2">{phase.phase}</h3>
                                                        <p className="text-sm mb-4" style={{ color: '#dd8948' }}>{phase.period}</p>
                                                        <p className="text-gray-300">{phase.description}</p>
                                                    </div>
                                                </div>
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative z-10 mx-auto">
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="w-1/2"></div>
                                            </>
                                        ) : (
                                            // Right side content for odd items
                                            <>
                                                <div className="w-1/2"></div>
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative z-10 mx-auto">
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="w-1/2 pl-8">
                                                    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8">
                                                        <h3 className="text-2xl font-bold text-white mb-2">{phase.phase}</h3>
                                                        <p className="text-sm mb-4" style={{ color: '#dd8948' }}>{phase.period}</p>
                                                        <p className="text-gray-300">{phase.description}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Mobile Layout - Simple stacked with line connection */}
                                    <div className="md:hidden flex items-start space-x-4 relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 relative z-10">
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 bg-gray-800 bg-opacity-50 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-white mb-2">{phase.phase}</h3>
                                            <p className="text-sm mb-3" style={{ color: '#dd8948' }}>{phase.period}</p>
                                            <p className="text-gray-300 text-sm">{phase.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Timeline;    