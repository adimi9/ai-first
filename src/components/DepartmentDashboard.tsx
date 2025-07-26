import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DepartmentDashboard = () => {
  // Overall aggregated data
  const overallData = {
    department: "Overall - SCG",
    totalResponses: 120,
    proficiency: [
      { level: "Basic", count: 64, percentage: 54 },
      { level: "Confident", count: 39, percentage: 33 },
      { level: "Advanced", count: 10, percentage: 9 },
      { level: "Expert", count: 3, percentage: 3 },
      { level: "Beginner", count: 2, percentage: 2 }
    ],
    frequency: [
      { frequency: "Regular", count: 54, percentage: 46 },
      { frequency: "Daily", count: 42, percentage: 36 },
      { frequency: "Occasional", count: 19, percentage: 16 },
      { frequency: "Never", count: 3, percentage: 3 }
        ],
    avgTimeSpent: 57,
    overallAvg: 57,
    topTasks: [
      { text: "Data Analysis & Reports", count: 57, percentage: 48 },
            { text: "Email Correspondence", count: 54, percentage: 45 },
      { text: "Meeting Preparation", count: 54, percentage: 45 }
    ],
    topTools: [
      { text: "Pair Chat", count: 105, percentage: 88 },
      { text: "Other GenAI", count: 69, percentage: 58 },
      { text: "AIBots", count: 36, percentage: 30 }
    ],
    topChallenges: [
      { text: "Accuracy Concerns", count: 59, percentage: 50 },
      { text: "Privacy Concerns", count: 54, percentage: 45 },
      { text: "Poor Prompting", count: 36, percentage: 30 }
    ],
    topSkills: [
      { text: "Presentation Skills", count: 53, percentage: 44 },
      { text: "Data Analysis", count: 46, percentage: 38 },
      { text: "Chart Generation", count: 44, percentage: 37 }
    ]
  };

  // Expanded department data with all 9 departments
  const departmentData = {
    "Overall": overallData,
    "Comms & Marketing": {
      department: "Communications & Marketing",
      totalResponses: 10,
      proficiency: [
        { level: "Basic", count: 5, percentage: 50 },
        { level: "Confident", count: 5, percentage: 50 }
      ],
      frequency: [
        { frequency: "Regular", count: 7, percentage: 70 },
        { frequency: "Daily", count: 2, percentage: 20 },
        { frequency: "Occasional", count: 1, percentage: 10 }
      ],
      avgTimeSpent: 62,
      overallAvg: 54,
      topTasks: [
        { text: "Email Correspondence", count: 7, percentage: 70 },
        { text: "Stakeholder Engagement", count: 5, percentage: 50 },
        { text: "Document Review", count: 4, percentage: 40 }
      ],
      topTools: [
        { text: "Pair Chat", count: 10, percentage: 100 },
        { text: "Other GenAI", count: 7, percentage: 70 },
        { text: "Transcribe", count: 6, percentage: 60 }
      ],
      topChallenges: [
        { text: "Accuracy Concerns", count: 4, percentage: 40 },
        { text: "Privacy Concerns", count: 4, percentage: 40 },
        { text: "Poor Prompting", count: 4, percentage: 40 }
      ],
      topSkills: [
        { text: "Presentation Skills", count: 5, percentage: 50 },
        { text: "Chart Generation", count: 5, percentage: 50 },
        { text: "Template Creation", count: 4, percentage: 40 }
      ]
    },
    "Digital Governance": {
      department: "Digital Governance",
      totalResponses: 23,
      proficiency: [
        { level: "Basic", count: 6, percentage: 26 },
        { level: "Confident", count: 11, percentage: 48 },
        { level: "Advanced", count: 3, percentage: 13 },
        { level: "Expert", count: 3, percentage: 13 }
      ],
      frequency: [
        { frequency: "Daily", count: 14, percentage: 61 },
        { frequency: "Regular", count: 9, percentage: 39 }
      ],
      avgTimeSpent: 60,
      overallAvg: 57,
      topTasks: [
        { text: "Data Analysis & Reports", count: 12, percentage: 52 },
        { text: "Meeting Preparation", count: 11, percentage: 48 },
        { text: "Email Correspondence", count: 9, percentage: 39 }
      ],
      topTools: [
        { text: "Pair Chat", count: 21, percentage: 91 },
        { text: "Other GenAI", count: 15, percentage: 65 },
        { text: "AIBots", count: 11, percentage: 48 }
      ],
      topChallenges: [
        { text: "Privacy Concerns", count: 15, percentage: 65 },
        { text: "Accuracy Concerns", count: 9, percentage: 39 },
        { text: "Needs Editing", count: 6, percentage: 26 }
      ],
      topSkills: [
        { text: "Presentation Skills", count: 13, percentage: 57 },
        { text: "Data Analysis", count: 9, percentage: 39 },
        { text: "Understanding Which AI Tool Works Best", count: 8, percentage: 35 }
      ]
    },
    "Finance": {
      department: "Finance",
      totalResponses: 25,
      proficiency: [
        { level: "Basic", count: 22, percentage: 88 },
        { level: "Confident", count: 2, percentage: 8 },
        { level: "Beginner", count: 1, percentage: 4 }
      ],
      frequency: [
        { frequency: "Regular", count: 12, percentage: 48 },
        { frequency: "Occasional", count: 10, percentage: 40 },
        { frequency: "Daily", count: 3, percentage: 12 }
      ],
      avgTimeSpent: 59,
      overallAvg: 57,
      topTasks: [
        { text: "Data Analysis & Reports", count: 18, percentage: 72 },
        { text: "Budget Planning", count: 13, percentage: 52 },
        { text: "Email Correspondence", count: 10, percentage: 40 }
      ],
      topTools: [
        { text: "Pair Chat", count: 20, percentage: 80 },
        { text: "Other GenAI", count: 11, percentage: 44 },
        { text: "Transcribe", count: 4, percentage: 16 }
      ],
      topChallenges: [
        { text: "Poor Prompting", count: 13, percentage: 52 },
        { text: "Accuracy Concerns", count: 13, percentage: 52 },
        { text: "Technical Difficulties", count: 7, percentage: 28 }
      ],
      topSkills: [
        { text: "Data Analysis", count: 14, percentage: 56 },
        { text: "Template Creation", count: 11, percentage: 44 },
        { text: "Chart Generation", count: 10, percentage: 40 }
      ]
    },
    "Legal": {
      department: "Legal",
      totalResponses: 2,
      proficiency: [
        { level: "Beginner", count: 1, percentage: 50 },
        { level: "Advanced", count: 1, percentage: 50 }
      ],
      frequency: [
        { frequency: "Frequently", count: 1, percentage: 50 },
        { frequency: "Never", count: 1, percentage: 50 }
      ],
      avgTimeSpent: 78,
      overallAvg: 57,
      topTasks: [
        { text: "Document Review", count: 2, percentage: 100 },
        { text: "Email Correspondence", count: 2, percentage: 100 },
        { text: "Meeting Preparation", count: 1, percentage: 50 }
      ],
      topTools: [
        { text: "Pair Chat", count: 1, percentage: 50 },
        { text: "Other GenAI", count: 1, percentage: 50 },
        { text: "Transcribe", count: 1, percentage: 50 }
      ],
      topChallenges: [
        { text: "Accuracy Concerns", count: 2, percentage: 100 },
        { text: "Privacy Concerns", count: 2, percentage: 100 },
        { text: "Needs Editing", count: 1, percentage: 50 }
      ],
      topSkills: [
        { text: "Template Creation", count: 1, percentage: 50 },
        { text: "Quality Checking", count: 1, percentage: 50 },
        { text: "Multi-step Prompting", count: 1, percentage: 50 }
      ]
    },
    "Org Excellence": {
      department: "Organisation Excellence",
      totalResponses: 8,
      proficiency: [
        { level: "Basic", count: 4, percentage: 50 },
        { level: "Confident", count: 4, percentage: 50 }
      ],
      frequency: [
        { frequency: "Regular", count: 6, percentage: 75 },
        { frequency: "Daily", count: 1, percentage: 13 },
        { frequency: "Occasional", count: 1, percentage: 13 }
      ],
      avgTimeSpent: 59,
      overallAvg: 57,
      topTasks: [
        { text: "Meeting Preparation", count: 7, percentage: 88 },
        { text: "Admin Tasks", count: 6, percentage: 75 },
        { text: "Email Correspondence", count: 4, percentage: 50 }
      ],
      topTools: [
        { text: "Pair Chat", count: 8, percentage: 100 },
        { text: "Other GenAI", count: 6, percentage: 75 },
        { text: "AIBots", count: 5, percentage: 63 }      ],
      topChallenges: [
        { text: "Accuracy Concerns", count: 7, percentage: 88 },
        { text: "Poor Prompting", count: 5, percentage: 63 },
        { text: "Needs Editing", count: 4, percentage: 50 }
      ],
      topSkills: [
        { text: "Chart Generation", count: 4, percentage: 50 },
        { text: "Presentation Skills", count: 4, percentage: 50 },
        { text: "Template Creation", count: 3, percentage: 38 }
      ]
    },
    "Partnerships & Engagement": {
      department: "Partnerships & Engagement",
      totalResponses: 7,
      proficiency: [
        { level: "Basic", count: 2, percentage: 29 },
        { level: "Confident", count: 3, percentage: 43 },
        { level: "Advanced", count: 2, percentage: 29 }
      ],
      frequency: [
        { frequency: "Regular", count: 4, percentage: 57 },
        { frequency: "Daily", count: 3, percentage: 43 }
      ],
      avgTimeSpent: 67,
      overallAvg: 57,
      topTasks: [
        { text: "Meeting Preparation", count: 5, percentage: 71 },
        { text: "Stakeholder Engagement", count: 4, percentage: 57 },
        { text: "Data Analysis & Reports", count: 2, percentage: 29 }
      ],
      topTools: [
        { text: "Pair Chat", count: 5, percentage: 71 },
        { text: "Other GenAI", count: 5, percentage: 71 },
        { text: "Transcribe", count: 4, percentage: 57 }
      ],
      topChallenges: [
        { text: "Accuracy Concerns", count: 5, percentage: 71 },
        { text: "Privacy Concerns", count: 4, percentage: 57 },
        { text: "Inconsistent Quality", count: 2, percentage: 29 }
      ],
      topSkills: [
        { text: "Presentation Skills", count: 5, percentage: 71 },
        { text: "Data Analysis", count: 4, percentage: 57 },
        { text: "Chart Generation", count: 4, percentage: 57 }
      ]
    },
    "People & Org": {
      department: "People & Organisation",
      totalResponses: 23,
      proficiency: [
        { level: "Basic", count: 16, percentage: 73 },
        { level: "Confident", count: 6, percentage: 27 }      ],
      frequency: [
        { frequency: "Daily", count: 11, percentage: 50 },
        { frequency: "Regular", count: 7, percentage: 32 },
        { frequency: "Occasional", count: 2, percentage: 9 },
        { frequency: "Never", count: 2, percentage: 9 }
      ],
      avgTimeSpent: 45,
      overallAvg: 57,
      topTasks: [
        { text: "Data Analysis & Reports", count: 18, percentage: 78 },
        { text: "Meeting Preparation", count: 9, percentage: 39 },
        { text: "Email Correspondence", count: 9, percentage: 39 }
      ],
      topTools: [
        { text: "Pair Chat", count: 21, percentage: 91 },
        { text: "Other GenAI", count: 11, percentage: 48 },
        { text: "Pair Search", count: 7, percentage: 30 }
      ],
      topChallenges: [
        { text: "Privacy Concerns", count: 11, percentage: 48 },
        { text: "Accuracy Concerns", count: 10, percentage: 43 },
        { text: "Needs Editing", count: 8, percentage: 35 }
      ],
      topSkills: [
        { text: "Presentation Skills", count: 11, percentage: 48 },
        { text: "Data Analysis", count: 10, percentage: 43 },
        { text: "Chart Generation", count: 10, percentage: 43 }
      ]
    },
    "Strat Plans & Transformation": {
      department: "Strategy Planning & Transformation",
      totalResponses: 13,
      proficiency: [
        { level: "Basic", count: 5, percentage: 38 },
        { level: "Confident", count: 5, percentage: 38 },
        { level: "Advanced", count: 3, percentage: 23 }
      ],
      frequency: [
        { frequency: "Regular", count: 6, percentage: 46 },
        { frequency: "Daily", count: 4, percentage: 31 },
        { frequency: "Occasional", count: 3, percentage: 23 }
      ],
      avgTimeSpent: 48,
      overallAvg: 57,
      topTasks: [
        { text: "Meeting Preparation", count: 9, percentage: 69 },
        { text: "Email Correspondence", count: 6, percentage: 46 },
        { text: "Admin Tasks", count: 6, percentage: 46 }
      ],
      topTools: [
        { text: "Pair Chat", count: 11, percentage: 85 },
        { text: "Other GenAI", count: 11, percentage: 85 },
        { text: "AIBots", count: 6, percentage: 46 }
      ],
      topChallenges: [
        { text: "Inconsistent Quality", count: 5, percentage: 38 },
        { text: "Accuracy Concerns", count: 4, percentage: 31 },
        { text: "Privacy Concerns", count: 4, percentage: 31 }
      ],
      topSkills: [
        { text: "Multi-step Prompting", count: 7, percentage: 54 },
        { text: "Presentation Skills", count: 4, percentage: 31 },
        { text: "Template Creation", count: 4, percentage: 31 }
      ]
    },
    "Procurement": {
      department: "Procurement",
      totalResponses: 8,
      proficiency: [
        { level: "Basic", count: 4, percentage: 50 },
        { level: "Confident", count: 3, percentage: 38 },
        { level: "Advanced", count: 1, percentage: 13 }
      ],
      frequency: [
        { frequency: "Regular", count: 3, percentage: 38 },
        { frequency: "Daily", count: 3, percentage: 38 },
        { frequency: "Occasional", count: 2, percentage: 25 }
      ],
      avgTimeSpent: 66,
      overallAvg: 57,
      topTasks: [
        { text: "Email Correspondence", count: 7, percentage: 88 },
        { text: "Procurement Management", count: 4, percentage: 50 },
        { text: "Document Review", count: 3, percentage: 38 }
      ],
      topTools: [
        { text: "Pair Chat", count: 8, percentage: 100 },
        { text: "AIBots", count: 6, percentage: 75 },
        { text: "Other GenAI", count: 2, percentage: 25 }
      ],
      topChallenges: [
        { text: "Accuracy Concerns", count: 6, percentage: 75 },
        { text: "Privacy Concerns", count: 5, percentage: 63 },
        { text: "Inconsistent Quality", count: 2, percentage: 25 }
      ],
      topSkills: [
        { text: "Presentation Skills", count: 5, percentage: 75 },
        { text: "Quality Checking", count: 4, percentage: 50 },
        { text: "Generating Charts", count: 3, percentage: 38 }
      ]
    }
  };

  const [selectedDepartment, setSelectedDepartment] = useState('Overall');
  const currentData = departmentData[selectedDepartment];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-lg text-xs">
          <p className="font-semibold">{data.level || data.frequency}</p>
          <p className="text-blue-600">Count: {data.count}</p>
          <p className="text-green-600">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // Compact metric card with bars and full names
  const CompactMetricCard = ({ title, data, icon, bgColor }) => (
    <div className={`${bgColor} rounded-lg p-3 h-full`}>
      <div className="flex items-center mb-3">
        <span className="text-sm mr-1">{icon}</span>
        <h4 className="text-sm font-bold text-gray-800">{title}</h4>
      </div>
      <div className="space-y-2 h-full">
        {data.slice(0, 3).map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-700 mr-1 flex-1" title={item.text}>
                {item.text}
              </span>
              <span className="font-bold text-gray-800 text-sm ml-2">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-blue-500' : 'bg-blue-400'
                  }`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Time gauge
  const TimeGauge = ({ deptTime, overallTime }) => {
    const difference = deptTime - overallTime;
    const isAbove = difference > 0;

    return (
      <div className="bg-white rounded-lg shadow p-3 text-center h-full flex flex-col justify-center">
        <h4 className="text-sm font-bold text-gray-800 mb-2">Time vs Average</h4>
        <div className={`text-2xl font-bold mb-2 ${isAbove ? 'text-red-600' : 'text-green-600'}`}>
          {deptTime}%
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full ${isAbove ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(deptTime, 100)}%` }}
          />
        </div>
        <div className={`text-sm font-medium ${isAbove ? 'text-red-600' : 'text-green-600'}`}>
          {difference > 0 ? '+' : ''}{difference}% vs {overallTime}%
        </div>
      </div>
    );
  };

  // Function to calculate time savings
  const calculateTimeSavings = (timeSpentPercentage) => {
    const weeklyHours = 40;
    const repetitiveHours = (timeSpentPercentage / 100) * weeklyHours;
    const hoursSaved = repetitiveHours * 0.5; // 50% reduction
    return hoursSaved.toFixed(1);
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-2 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-2 flex flex-col">

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-2 text-white mb-1 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold">{currentData.department}</h1>
                <p className="text-sm opacity-90">{currentData.totalResponses} responses</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-base font-bold">{currentData.avgTimeSpent}%</div>
                  <div className="text-xs opacity-80">Time Spent</div>
                </div>
                <div>
                  <div className="text-base font-bold">
                    {(currentData.proficiency.find(p => p.level === 'Basic')?.percentage || 0) +
                      (currentData.proficiency.find(p => p.level === 'Beginner')?.percentage || 0)}%
                  </div>
                  <div className="text-xs opacity-80">Beginner/Basic</div>
                </div>
                <div>
                  <div className="text-base font-bold">
                    {currentData.frequency.find(f => f.frequency === 'Daily')?.percentage || 0}%
                  </div>
                  <div className="text-xs opacity-80">Daily Users</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-2 mb-2 flex-shrink-0">
            <div className="grid grid-cols-10 gap-1">
              {Object.keys(departmentData).map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`py-2 rounded text-xs font-medium transition-all flex items-center justify-center px-1 ${selectedDepartment === dept
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <div className="text-center leading-tight">
                    {dept === "Overall" ? (
                      <>
                        <div>🏢</div>
                        <div>Overall</div>
                      </>
                    ) : dept === "Strat Plans & Transformation" ? (
                      <>
                        <div>Strategy &</div>
                        <div>Transformation</div>
                      </>
                    ) : dept === "Comms & Marketing" ? (
                      <>
                        <div>Comms &</div>
                        <div>Marketing</div>
                      </>
                    ) : dept === "Digital Governance" ? (
                      <>
                        <div>Digital</div>
                        <div>Governance</div>
                      </>
                    ) : dept === "People & Org" ? (
                      <>
                        <div>People &</div>
                        <div>Organisation</div>
                      </>
                    ) : dept === "Org Excellence" ? (
                      <>
                        <div>Organisation</div>
                        <div>Excellence</div>
                      </>
                    ) : dept === "Partnerships & Engagement" ? (
                      <>
                        <div>Partnerships</div>
                        <div>& Engagement</div>
                      </>
                    ) : (
                      <div>{dept}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 h-full">

            <div className="col-span-5 flex flex-col h-full">

              <div className="grid grid-cols-7 gap-3 mb-6" style={{ height: '140px' }}>
                <div className="col-span-2">
                  <TimeGauge
                    deptTime={currentData.avgTimeSpent}
                    overallTime={currentData.overallAvg}
                  />
                </div>

                <div className="col-span-5 bg-white rounded-lg shadow p-3">
                  <div className="flex items-center mb-2">
                    <span className="text-sm mr-2">⏱️</span>
                    <h3 className="text-sm font-bold text-gray-800">Top Time Consuming Tasks</h3>
                  </div>
                  <div className="space-y-2 overflow-y-auto" style={{ height: '100px' }}>
                    {currentData.topTasks.map((task, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-700 mr-1 flex-1" title={task.text}>
                            {task.text}
                          </span>
                          <span className="text-xs font-bold text-gray-800 ml-2">{task.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-blue-500' : 'bg-blue-400'
                              }`}
                            style={{ width: `${task.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3" style={{ height: '260px' }}>
                <div className="bg-white rounded-lg shadow p-3 flex flex-col" style={{ height: '270px' }}>
                  <h3 className="text-sm font-bold text-gray-800 mb-2 text-center">AI Proficiency</h3>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={currentData.proficiency}
                          cx="50%"
                          cy="50%"
                          outerRadius="70%"
                          fill="#8884d8"
                          dataKey="count"
                          label={({ percentage }) => `${percentage}%`}                        >
                          {currentData.proficiency.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={CustomTooltip} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 text-xs mt-auto">
                    {currentData.proficiency.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-1"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-xs text-gray-600">{item.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-3 flex flex-col" style={{ height: '270px' }}>
                  <h3 className="text-sm font-bold text-gray-800 mb-2 text-center">AI Usage Frequency</h3>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={currentData.frequency}
                          cx="50%"
                          cy="50%"
                          outerRadius="70%"
                          fill="#8884d8"
                          dataKey="count"
                          label={({ percentage }) => `${percentage}%`}
                        >
                          {currentData.frequency.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={CustomTooltip} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 text-xs mt-auto">
                    {currentData.frequency.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-1"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-xs text-gray-600">{item.frequency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-7 grid grid-cols-3 gap-3" style={{ gridTemplateRows: '210px 210px', gridTemplateColumns: '1fr 1fr 2fr' }}>

              <CompactMetricCard
                title="Tools Used"
                data={currentData.topTools}
                icon="🛠️"
                bgColor="bg-green-50"
              />

              <CompactMetricCard
                title="Challenges"
                data={currentData.topChallenges}
                icon="⚠️"
                bgColor="bg-red-50"
              />

              <div className="bg-blue-50 rounded-lg p-3 row-span-2">
                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-1">💡</span>
                  Key Insights for {currentData.department}
                </h4>
                <div className="grid grid-cols-1 gap-1 text-xs overflow-y-auto" style={{ height: '360px' }}>
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-0">Readiness Level</h5>
                    <p className="text-gray-700 text-xs leading-tight">
                      {(() => {
                        const advancedPercentage = (currentData.proficiency.find(p => p.level === 'Advanced')?.percentage || 0) +
                          (currentData.proficiency.find(p => p.level === 'Expert')?.percentage || 0);
                        const confidentPercentage = currentData.proficiency.find(p => p.level === 'Confident')?.percentage || 0;

                        if (advancedPercentage >= 20) {
                          return "Good mix of skill levels - some experienced users available";
                        } else if (confidentPercentage >= 50 && advancedPercentage < 20) {
                          return "Good mix of skill levels - some confident users available";
                        } else {
                          return "Most staff are basic level - training is needed";
                        }
                      })()}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-1">Time Savings Potential</h5>
                    <p className="text-gray-700 text-xs leading-tight">
                      • Staff currently spend {currentData.avgTimeSpent}% of time on repetitive tasks<br />
                      • Cutting down 50% = <span className="font-bold">{calculateTimeSavings(currentData.avgTimeSpent)} hours saved per week ({(calculateTimeSavings(currentData.avgTimeSpent) / 8).toFixed(1)} days per person)</span>
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-1">Usage Pattern</h5>
                    <p className="text-gray-700 text-xs leading-tight">
                      {selectedDepartment === 'Overall'
                        ? "Mixed usage - 35% daily users, 45% regular users"
                        : currentData.frequency.find(f => f.frequency === 'Daily')?.percentage >= 50
                          ? "Daily users - most staff use AI tools regularly"
                          : currentData.frequency.find(f => f.frequency === 'Never')?.percentage > 0
                            ? "Getting started - some staff haven't tried AI tools yet"
                            : "Mixed usage - some use daily, others occasionally"}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-1">Top Priority</h5>
                    <p className="text-gray-700 text-xs leading-tight">
                      {selectedDepartment === 'Overall'
                        ? <>Focus on <span className="font-bold">Data Analysis</span> (47%) and <span className="font-bold">Meeting Preparation</span> (46%) first</>
                        : <>Focus on <span className="font-bold">{currentData.topTasks[0]?.text}</span> ({currentData.topTasks[0]?.percentage}%) and <span className="font-bold">{currentData.topTasks[1]?.text}</span> ({currentData.topTasks[1]?.percentage}%) first</>}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-1">AI Opportunities</h5>
                    <p className="text-gray-700 text-xs leading-tight">
                      {selectedDepartment === 'Overall'
                        ? <>Suggestions include <span className="font-bold">automated financial reporting</span>, <span className="font-bold">procurement streamlining</span>, <span className="font-bold">meeting scheduling/notes</span>, and <span className="font-bold">HR query chatbots</span> as top automation opportunities</>
                        : (() => {
                          if (selectedDepartment === 'Finance') {
                            return <>Suggestions include <span className="font-bold">automated financial reporting & analysis</span>, <span className="font-bold">AI-driven reconciliations</span>, <span className="font-bold">expense/claims approval automation</span>, and <span className="font-bold">variance analysis</span></>;
                          } else if (selectedDepartment === 'People & Org') {
                            return <>Suggestions include <span className="font-bold">AI-driven recruitment screening</span>, <span className="font-bold">personalized learning paths</span>, <span className="font-bold">benefits/policy chatbots</span>, and <span className="font-bold">internal mobility matching</span></>;
                          } else if (selectedDepartment === 'Digital Governance') {
                            return <>Suggestions include <span className="font-bold">automated compliance monitoring</span>, <span className="font-bold">risk assessment generation</span>, <span className="font-bold">data pipeline automation</span>, and <span className="font-bold">governance query routing</span></>;
                          } else if (selectedDepartment === 'Procurement') {
                            return <>Suggestions include <span className="font-bold">automated ITT/ITQ drafting</span>, <span className="font-bold">procure-to-pay automation</span>, <span className="font-bold">vendor evaluation assistance</span>, and <span className="font-bold">contract management</span></>;
                          } else if (selectedDepartment === 'Legal') {
                            return <>Suggestions include <span className="font-bold">legal technicality simplification</span>, <span className="font-bold">document review automation</span>, <span className="font-bold">contract analysis</span>, and <span className="font-bold">compliance checking</span></>;
                          } else if (selectedDepartment === 'Comms & Marketing') {
                            return <>Suggestions include <span className="font-bold">branded template generation</span>, <span className="font-bold">automated press release drafts</span>, <span className="font-bold">social media content creation</span>, and <span className="font-bold">brand asset management</span></>;
                          } else if (selectedDepartment === 'Strat Plans & Transformation') {
                            return <>Suggestions include <span className="font-bold">strategic planning assistance</span>, <span className="font-bold">trend analysis automation</span>, <span className="font-bold">presentation generation</span>, and <span className="font-bold">workflow optimization</span></>;
                          } else if (selectedDepartment === 'Org Excellence') {
                            return <>Suggestions include <span className="font-bold">automated meeting minutes</span>, <span className="font-bold">secretariat task automation</span>, <span className="font-bold">process optimization</span>, and <span className="font-bold">quality assessment tools</span></>;
                          } else if (selectedDepartment === 'Partnerships & Engagement') {
                            return <>Suggestions include <span className="font-bold">partner information chatbots</span>, <span className="font-bold">engagement tracking automation</span>, <span className="font-bold">stakeholder communication tools</span>, and <span className="font-bold">meeting coordination</span></>;
                          } else {
                            return <>Diverse task portfolio suggests <span className="font-bold">multi-purpose AI assistant</span> optimization</>;
                          }
                        })()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <CompactMetricCard
                  title="Key Areas Identified"
                  data={currentData.topSkills}
                  icon="🎓"
                  bgColor="bg-purple-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;