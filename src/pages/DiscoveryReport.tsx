    import React from 'react';
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';

    const DiscoveryReport = () => {
        // Based on updated data - 114 responses

        // 1. Proficiency Distribution Data (112 total responses)
        const proficiencyData = [
            { level: 'Beginner', count: 2, percentage: 2 },
            { level: 'Basic', count: 60, percentage: 54 },
            { level: 'Confident', count: 37, percentage: 33 },
            { level: 'Advanced', count: 10, percentage: 9 },
            { level: 'Expert', count: 3, percentage: 3 }
        ];

        // 2. Usage Frequency Data (112 total responses)
        const frequencyData = [
            { frequency: 'Daily', count: 40, percentage: 36 },
            { frequency: 'Regular', count: 51, percentage: 45 },
            { frequency: 'Occasional', count: 19, percentage: 17 },
            { frequency: 'Never', count: 2, percentage: 2 }
        ];

        // 2.5. AI Usage in Daily Work (112 total responses)
        const aiUsageData = [
            { usage: 'Yes', count: 75, percentage: 67 },
            { usage: 'No', count: 37, percentage: 33 }
        ];

        // 3. AI Tools Usage (multiple selections allowed)
        const toolsData = [
            { text: 'Pair Chat', count: 100, percentage: 88, color: '#1e40af' },
            { text: 'Other GenAI (ChatGPT/Claude)', count: 66, percentage: 58, color: '#059669' },
            { text: 'AIBots', count: 35, percentage: 31, color: '#dc2626' },
            { text: 'Transcribe', count: 35, percentage: 31, color: '#7c3aed' },
            { text: 'Pair Search', count: 22, percentage: 19, color: '#7c2d12' },
            { text: 'Copilot', count: 3, percentage: 3, color: '#ea580c' },
            { text: 'Grammarly', count: 2, percentage: 2, color: '#be123c' },
            { text: 'Zapier', count: 1, percentage: 1, color: '#065f46' }
        ];

        // 4. Challenges Data (multiple selections allowed)
        const challengesData = [
            { text: 'Concerns about Accuracy & Reliability', count: 57, percentage: 50, color: '#dc2626' },
            { text: 'Privacy & Data Security Concerns', count: 50, percentage: 44, color: '#ea580c' },
            { text: 'Don\'t Know How to Write Effective Prompts', count: 33, percentage: 29, color: '#d97706' },
            { text: 'Outputs Need Extensive Editing', count: 31, percentage: 27, color: '#ca8a04' },
            { text: 'Inconsistent Quality Across Requests', count: 25, percentage: 22, color: '#65a30d' },
            { text: 'No Time to Learn New Tools', count: 24, percentage: 21, color: '#0891b2' },
            { text: 'Takes Many Attempts to Get Usable Results', count: 22, percentage: 19, color: '#7c3aed' },
            { text: 'Results Lack Proper Structure/Formatting', count: 18, percentage: 16, color: '#059669' },
            { text: 'Technical Difficulties or Barriers', count: 17, percentage: 15, color: '#0284c7' },
            { text: 'Outputs Don\'t Match Professional Tone', count: 15, percentage: 13, color: '#c026d3' },
            { text: 'Don\'t See Value for Specific Role', count: 4, percentage: 4, color: '#be123c' }
        ];

        // 5. Time-Consuming Tasks (multiple selections allowed)
        const tasksData = [
            { text: 'Analyse Data & Generate Reports (Weekly, Monthly, Quarterly)', count: 54, percentage: 47, color: '#059669' },
            { text: 'Meeting Preparation, Attendance & Follow-Up Action', count: 52, percentage: 46, color: '#1e40af' },
            { text: 'Email Correspondence (Respond To Emails)', count: 50, percentage: 44, color: '#dc2626' },
            { text: 'Stakeholder Engagement & Comms', count: 34, percentage: 30, color: '#ea580c' },
            { text: 'Admin (Scheduling, Coordination, Staffing)', count: 29, percentage: 25, color: '#f97316' },
            { text: 'Document Review & Policy', count: 23, percentage: 20, color: '#7c2d12' },
            { text: 'Budget Planning & Financial Analysis', count: 15, percentage: 13, color: '#be123c' },
            { text: 'Procurement & Vendor Management', count: 14, percentage: 12, color: '#7c3aed' },
            { text: 'Performance Monitoring & Evaluation', count: 11, percentage: 10, color: '#4338ca' },
            { text: 'Processing Applications', count: 8, percentage: 7, color: '#f59e0b' },
            { text: 'Risk Evaluation & Impact Assessment', count: 7, percentage: 6, color: '#065f46' },
            { text: 'Screen, Shortlist, Interview & Selection', count: 5, percentage: 4, color: '#0891b2' },
            { text: 'Compliance Monitoring & Auditing', count: 4, percentage: 4, color: '#6b21a8' }
        ];

        // 6. Skills They Want to Learn (multiple selections allowed)
        const skillsData = [
            { text: 'Prompting AI to Draft Presentation Slides', count: 49, percentage: 43, color: '#1e40af' },
            { text: 'Using AI to Analyze & Interpret Data (CSVs, reports)', count: 45, percentage: 39, color: '#dc2626' },
            { text: 'Generating Charts or Visuals from Structured Information', count: 43, percentage: 38, color: '#059669' },
            { text: 'Creating Reusable Prompt Templates', count: 34, percentage: 30, color: '#7c2d12' },
            { text: 'Understanding Which AI Tool Works Best', count: 28, percentage: 25, color: '#ea580c' },
            { text: 'Quality Checking & Fact-verification Methods', count: 25, percentage: 22, color: '#7c3aed' },
            { text: 'Multi-step Prompting for Complex Tasks', count: 24, percentage: 21, color: '#be123c' },
            { text: 'Writing Clear, Specific Prompts', count: 16, percentage: 14, color: '#4338ca' },
            { text: 'Getting AI to Match Professional Tone', count: 14, percentage: 12, color: '#0891b2' },
            { text: 'Structuring Prompts for Proper Formatting', count: 13, percentage: 11, color: '#6b21a8' },
            { text: 'Techniques to Refine Failed Prompts', count: 7, percentage: 6, color: '#065f46' }
        ];

        // 7. Time Spent Distribution (114 responses)
        const timeSpentData = [30, 100, 80, 30, 80, 90, 65, 80, 90, 60, 50, 66, 80, 40, 80, 0, 50, 20, 20, 30, 70, 80, 80, 70, 40, 60, 20, 80, 59, 40, 50, 85, 50, 70, 80, 85, 70, 50, 70, 40, 90, 100, 90, 40, 70, 99, 80, 79, 70, 70, 60, 80, 10, 50, 30, 50, 80, 70, 30, 60, 50, 40, 70, 50, 30, 40, 75, 60, 40, 80, 20, 60, 20, 40, 20, 50, 20, 20, 60, 70, 60, 15, 30, 40, 10, 40, 100, 70, 30, 60, 40, 80, 70, 70, 40, 75, 40, 20, 30, 50, 80, 70, 100, 80, 40, 50, 20, 70, 50, 50, 70, 80, 75, 80];
        const avgTimeSpent = Math.round(timeSpentData.reduce((a, b) => a + b, 0) / timeSpentData.length);

        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

        // Pie Chart Component
        const CustomPieChart = ({ data, title, dataKey = 'count' }) => (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ level, frequency, usage, percentage }) => `${level || frequency || usage}: ${percentage}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey={dataKey}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, 'Count']} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );

        // Word Bar Chart Component
        const WordBarChart = ({ data, title, subtitle, icon }) => {
            const maxCount = Math.max(...data.map(d => d.count));

            return (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{icon}</span>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                            <p className="text-gray-600">{subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {data.map((item, index) => (
                            <div key={index} className="relative group flex items-center">
                                <div
                                    className="h-14 rounded-lg flex items-center justify-between px-4 text-white font-semibold transition-all hover:opacity-90 hover:shadow-md"
                                    style={{
                                        backgroundColor: item.color,
                                        width: `${Math.max((item.count / maxCount) * 70, 20)}%`,
                                        minWidth: '200px'
                                    }}
                                >
                                    <span className="text-sm leading-tight">{item.text}</span>
                                    <div className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                        {item.count}
                                    </div>
                                </div>
                                <div className="ml-4 text-gray-700 text-lg font-bold">
                                    {item.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
                        Unlocking AI Potential: Where We Stand Today
                    </h1>
                    <p className="text-gray-600 mb-8 text-center">Comprehensive Discovery Analysis - 114 Responses Across 8 Questions</p>

                    {/* Summary Cards - Modified to 2 columns, 2 rows */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Total Responses</h3>
                            <p className="text-3xl font-bold text-blue-600">114</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Avg Time on Repetitive Tasks</h3>
                            <p className="text-3xl font-bold text-green-600">{avgTimeSpent}%</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Top 3 Tasks</h3>
                            <p className="text-xl font-bold text-blue-600">Analyse Data & Generate Reports (47%)</p>
                            <p className="text-lg font-bold text-blue-500">Meeting Preparation (46%)</p>
                            <p className="text-base font-bold text-blue-400">Email Correspondence (44%)</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Top 3 Challenges</h3>
                            <p className="text-xl font-bold text-orange-600">Accuracy (50%)</p>
                            <p className="text-lg font-bold text-orange-500">Privacy (44%)</p>
                            <p className="text-base font-bold text-orange-400">Poor Prompting (29%)</p>
                        </div>
                    </div>

                    {/* Time Spent Distribution Chart with 10% intervals */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12">The Hidden Cost of 2.85-Day: How Much Time We're Losing Out</h2>

                        <div className="relative">
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart
                                    data={[
                                        { range: '0-10%', count: timeSpentData.filter(t => t >= 0 && t <= 10).length, color: '#22c55e' },
                                        { range: '11-20%', count: timeSpentData.filter(t => t >= 11 && t <= 20).length, color: '#65a30d' },
                                        { range: '21-30%', count: timeSpentData.filter(t => t >= 21 && t <= 30).length, color: '#84cc16' },
                                        { range: '31-40%', count: timeSpentData.filter(t => t >= 31 && t <= 40).length, color: '#eab308' },
                                        { range: '41-50%', count: timeSpentData.filter(t => t >= 41 && t <= 50).length, color: '#f59e0b' },
                                        { range: '51-60%', count: timeSpentData.filter(t => t >= 51 && t <= 60).length, color: '#f97316' },
                                        { range: '61-70%', count: timeSpentData.filter(t => t >= 61 && t <= 70).length, color: '#ea580c' },
                                        { range: '71-80%', count: timeSpentData.filter(t => t >= 71 && t <= 80).length, color: '#dc2626' },
                                        { range: '81-90%', count: timeSpentData.filter(t => t >= 81 && t <= 90).length, color: '#991b1b' },
                                        { range: '91-100%', count: timeSpentData.filter(t => t >= 91 && t <= 100).length, color: '#7f1d1d' }
                                    ]}
                                    barCategoryGap="2%"
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="range" />
                                    <YAxis label={{ value: 'Number of People', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip formatter={(value) => [value, 'People']} />
                                    <Bar dataKey="count" fill="#3b82f6" barSize={120}>
                                        <LabelList
                                            dataKey="count"
                                            position="center"
                                            fill="white"
                                            fontSize={16}
                                            fontWeight="bold"
                                            formatter={(value) => value > 0 ? value : ''}
                                        />
                                        {[
                                            { range: '0-10%', count: timeSpentData.filter(t => t >= 0 && t <= 10).length, color: '#22c55e' },
                                            { range: '11-20%', count: timeSpentData.filter(t => t >= 11 && t <= 20).length, color: '#65a30d' },
                                            { range: '21-30%', count: timeSpentData.filter(t => t >= 21 && t <= 30).length, color: '#84cc16' },
                                            { range: '31-40%', count: timeSpentData.filter(t => t >= 31 && t <= 40).length, color: '#eab308' },
                                            { range: '41-50%', count: timeSpentData.filter(t => t >= 41 && t <= 50).length, color: '#f59e0b' },
                                            { range: '51-60%', count: timeSpentData.filter(t => t >= 51 && t <= 60).length, color: '#f97316' },
                                            { range: '61-70%', count: timeSpentData.filter(t => t >= 61 && t <= 70).length, color: '#ea580c' },
                                            { range: '71-80%', count: timeSpentData.filter(t => t >= 71 && t <= 80).length, color: '#dc2626' },
                                            { range: '81-90%', count: timeSpentData.filter(t => t >= 81 && t <= 90).length, color: '#991b1b' },
                                            { range: '91-100%', count: timeSpentData.filter(t => t >= 91 && t <= 100).length, color: '#7f1d1d' }
                                        ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Static dotted average line overlay */}
                            <div
                                className="absolute border-l-4 border-dashed border-blue-600 opacity-80"
                                style={{
                                    left: `${(avgTimeSpent / 98) * 100}%`,
                                    top: '10px',
                                    bottom: '50px',
                                    pointerEvents: 'none'
                                }}
                            >
                                <div className="absolute -top-8 -left-12 bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
                                    Avg: {avgTimeSpent}%
                                </div>
                            </div>
                        </div>

                        {/* Time Impact Summary */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                {/* Average Impact */}
                                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                                    <h4 className="text-blue-600 font-semibold mb-1 text-sm">Average Impact</h4>
                                    <div className="text-3xl font-bold text-blue-700 mb-1">22.8</div>
                                    <div className="text-blue-600 text-sm font-medium">hours per week</div>
                                    <div className="text-xs text-blue-500 mt-1">= 2.85 days per week</div>
                                </div>

                                {/* Highest Individual */}
                                <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                                    <h4 className="text-orange-600 font-semibold mb-1 text-sm">Highest Individual</h4>
                                    <div className="text-3xl font-bold text-orange-700 mb-1">40</div>
                                    <div className="text-orange-600 text-sm font-medium">hours per week</div>
                                    <div className="text-xs text-orange-500 mt-1">= 5 days per week</div>
                                </div>

                                {/* Efficiency Target */}
                                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                                    <h4 className="text-green-600 font-semibold mb-1 text-sm">50% Efficiency Gain</h4>
                                    <div className="text-3xl font-bold text-green-700 mb-1">1.4 days</div>
                                    <div className="text-green-600 text-sm font-medium">saved per week</div>
                                    <div className="text-xs text-green-500 mt-1">= 11.4 hours</div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-6 text-center">
                                An average officer spends 57% ≈ 2.85 days per week on repetitive tasks.
                            </h3>
                            {/* Opportunity Box */}
                            <div className="bg-yellow-50 rounded-lg p-4 mt-4 border-l-4 border-yellow-400">
                                <div className="text-yellow-800 font-bold text-xl">
                                    Opportunity: Just by cutting repetitive work in half, we can save 1.4 days per week per person.
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Row 1: Most Time-Consuming Tasks */}
                    <WordBarChart
                        data={tasksData}
                        title="Where Our Time Goes: Repetitive Work That AI Could Potentially Handle"
                        subtitle="Tasks that consume the most time (multiple selections allowed)"
                        icon="⏱️"
                    />
                    {/* Row 2: Pie Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <CustomPieChart
                            data={proficiencyData}
                            title="AI Reality: Where We Stands Today"
                        />
                        <CustomPieChart
                            data={frequencyData}
                            title="AI in Action: How Often We're Already Using"
                        />
                    </div>

                    {/* Row 3: Word Bar Charts */}
                    <WordBarChart
                        data={toolsData}
                        title="Our AI Resources: What's Working Now"
                        subtitle="Most popular tools (multiple selections allowed)"
                        icon="🛠️"
                    />

                    <WordBarChart
                        data={challengesData}
                        title="Breaking Barriers: Critical Issues to Solve"
                        subtitle="Common pain points experienced by users (multiple selections)"
                        icon="⚠️"
                    />

                    <WordBarChart
                        data={skillsData}
                        title="Future-Ready Skills: Training Priorities Revealed"
                        subtitle="AI skills that would help most in daily work (multiple selections)"
                        icon="🎓"
                    />

                    {/* Future Possibilities Analysis */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="mr-3">🚀</span>
                            Beyond Today: AI's Corporate Transformation Potential
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                            {/* Top Priority Areas */}
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                                        <span className="mr-2">🏆</span>
                                        Top Priority Areas (Most Mentioned)
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="bg-white p-3 rounded border border-blue-200">
                                            <h4 className="font-semibold text-blue-700 mb-1">1. Procurement & Finance</h4>
                                            <p className="text-sm text-blue-600">• End-to-end automation (Procure to Pay)<br />• Document generation (ITT, ITQ, funding papers)<br />• Vendor analysis with past reviews<br />• Budget planning, tracking & forecasting</p>
                                        </div>

                                        <div className="bg-white p-3 rounded border border-green-200">
                                            <h4 className="font-semibold text-green-700 mb-1">2. HR & Talent Management</h4>
                                            <p className="text-sm text-green-600">• Resume screening & candidate assessment<br />• Predictive hiring analytics<br />• Personalized learning paths<br />• Employee engagement chatbots</p>
                                        </div>

                                        <div className="bg-white p-3 rounded border border-purple-200">
                                            <h4 className="font-semibold text-purple-700 mb-1">3. Meeting & Scheduling</h4>
                                            <p className="text-sm text-purple-600">• Smart scheduling with room booking<br />• Automatic meeting minutes<br />• Calendar integration for common availability</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Creative & Content Generation */}
                            <div className="space-y-4">
                                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                    <h3 className="font-bold text-orange-800 mb-3 flex items-center">
                                        <span className="mr-2">🎨</span>
                                        Creative & Content Generation
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="bg-white p-3 rounded border border-orange-200">
                                            <h4 className="font-semibold text-orange-700 mb-1">4. Communications & Branding</h4>
                                            <p className="text-sm text-orange-600">• "GovTech asset bank" for branded content<br />• Press releases & product catalogues<br />• Brand compliance automation<br />• Excel to presentation conversion</p>
                                        </div>

                                        <div className="bg-white p-3 rounded border border-teal-200">
                                            <h4 className="font-semibold text-teal-700 mb-1">5. Document & Analysis Work</h4>
                                            <p className="text-sm text-teal-600">• Automated report generation<br />• Unstructured data analysis<br />• Knowledge management systems<br />• Compliance automation</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Strategic Insights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <h3 className="font-bold text-red-800 mb-2 flex items-center">
                                    <span className="mr-2">⚠️</span>
                                    Readiness Challenges
                                </h3>
                                <ul className="text-sm text-red-700 space-y-1">
                                    <li>• "A lot of inertia to relearn AI"</li>
                                    <li>• Need for "coherent strategy"</li>
                                    <li>• Security constraints for Confidential data</li>
                                    <li>• Integration challenges with enterprise systems</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h3 className="font-bold text-green-800 mb-2 flex items-center">
                                    <span className="mr-2">🎯</span>
                                    Integration Desires
                                </h3>
                                <ul className="text-sm text-green-700 space-y-1">
                                    <li>• "All-in-one personal AI assistant"</li>
                                    <li>• Agentic AI with function personas</li>
                                    <li>• Cross-platform automation</li>
                                    <li>• Excel → FormSG → Outlook integration</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <h3 className="font-bold text-purple-800 mb-2 flex items-center">
                                    <span className="mr-2">💎</span>
                                    High-Value Use Cases
                                </h3>
                                <ul className="text-sm text-purple-700 space-y-1">
                                    <li>• Bulk query handling for tenders</li>
                                    <li>• Process automation & approvals</li>
                                    <li>• Data-driven decision analytics</li>
                                    <li>• Template & content generation</li>
                                </ul>
                            </div>
                        </div>

                        {/* Key Takeaway */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                                <span className="mr-2">💡</span>
                                Key Strategic Takeaway
                            </h3>
                            <p className="text-gray-700 mb-3">
                                <strong>Procurement and Finance</strong> emerge as the highest-impact areas due to their repetitive, rule-based nature and significant time consumption. However, success depends on overcoming <strong>security constraints</strong> and <strong>integration challenges</strong> while providing <strong>comprehensive training</strong> to overcome user inertia.
                            </p>
                            <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                                <p className="text-gray-700 font-medium">
                                    🎯 <strong>Most Promising Vision:</strong> An integrated AI ecosystem with personas for different functions (HR, Finance, Procurement, Governance, Policy) appears most promising for driving organization-wide effectiveness.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Strategic Insights */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <span className="mr-3">💡</span>
                            AI Strategy Blueprint: Critical Insights & Next Steps
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                <h3 className="font-bold text-green-800 mb-2">🎯 Highest Impact Opportunities</h3>
                                <ul className="text-sm text-green-700 space-y-1">
                                    <li>• <strong>Analyse Data & Generate Reports (47%)</strong> - Top time-consuming task</li>
                                    <li>• <strong>Pair Chat (88%)</strong> - Near-universal adoption platform</li>
                                    <li>• <strong>Presentation Skills (43%)</strong> - Top requested capability</li>
                                    <li>• <strong>AI Usage (67%)</strong> - Growing daily work integration</li>
                                </ul>
                            </div>

                            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                <h3 className="font-bold text-red-800 mb-2">🚨 Critical Issues</h3>
                                <ul className="text-sm text-red-700 space-y-1">
                                    <li>• <strong>Accuracy Concerns (52%)</strong> - Top challenge for majority</li>
                                    <li>• <strong>Privacy/Security (41%)</strong> - Significant barrier</li>
                                    <li>• <strong>Poor Prompting (34%)</strong> - Skills gap remains</li>
                                    <li>• <strong>Extensive Editing (29%)</strong> - Quality workflow issues</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                <h3 className="font-bold text-blue-800 mb-2">📚 Training Priorities</h3>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• <strong>Presentation Slides (42%)</strong> - Clear top priority</li>
                                    <li>• <strong>Data Analysis (40%)</strong> - Core analytical capability</li>
                                    <li>• <strong>Chart Generation (35%)</strong> - Visual content creation</li>
                                    <li>• <strong>Template Creation (29%)</strong> - Reusable workflows</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                                <h3 className="font-bold text-purple-800 mb-2">💰 Enhanced ROI Potential</h3>
                                <ul className="text-sm text-purple-700 space-y-1">
                                    <li>• <strong>{avgTimeSpent}% avg time</strong> on repetitive tasks</li>
                                    <li>• <strong>13 people at 70%+</strong> - critical priority targets</li>
                                    <li>• Target 30% efficiency = <strong>15%+ time savings</strong></li>
                                    <li>• Content creation skills = highest demand</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default DiscoveryReport;