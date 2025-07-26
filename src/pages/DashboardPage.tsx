import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('discovery');

    // Updated overall data with new values
    const SURVEY_BASES = {
        TOTAL_RESPONSES: 136,
        VALID_RESPONSES: 134
    };

    {/* ------------------------ Report Data ---------------------------------------------------------------- */ }
    const proficiencyData = [
        { level: 'Beginner', count: 2, percentage: Math.round((2 / SURVEY_BASES.VALID_RESPONSES) * 100) },
        { level: 'Basic', count: 71, percentage: Math.round((71 / SURVEY_BASES.VALID_RESPONSES) * 100) },
        { level: 'Confident', count: 48, percentage: Math.round((48 / SURVEY_BASES.VALID_RESPONSES) * 100) },
        { level: 'Advanced', count: 10, percentage: Math.round((10 / SURVEY_BASES.VALID_RESPONSES) * 100) },
        { level: 'Expert', count: 3, percentage: Math.round((3 / SURVEY_BASES.VALID_RESPONSES) * 100) }
    ];

    const frequencyData = [
        { frequency: 'Daily', count: 53, percentage: Math.round((53 / SURVEY_BASES.VALID_RESPONSES) * 100) },
        { frequency: 'Regular', count: 59, percentage: Math.round((59 / SURVEY_BASES.VALID_RESPONSES) * 100) },
        { frequency: 'Occasional', count: 19, percentage: Math.round((19 / SURVEY_BASES.VALID_RESPONSES) * 100) },
        { frequency: 'Never', count: 3, percentage: Math.round((3 / SURVEY_BASES.VALID_RESPONSES) * 100) }
    ];

    const aiUsageData = [
        { usage: 'Yes', count: 85, percentage: Math.round((85 / SURVEY_BASES.VALID_RESPONSES) * 100) },
        { usage: 'No', count: 42, percentage: Math.round((42 / SURVEY_BASES.VALID_RESPONSES) * 100) }
    ];

    const tasksData = [
        { text: 'Analyse Data & Generate Reports', count: 61, percentage: Math.round((61 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#059669' },
        { text: 'Email Correspondence (Respond To Emails)', count: 57, percentage: Math.round((57 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#dc2626' },
        { text: 'Meeting Preparation, Attendance & Follow-Up', count: 56, percentage: Math.round((56 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#1e40af' },
        { text: 'Stakeholder Engagement & Comms', count: 38, percentage: Math.round((38 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#ea580c' },
        { text: 'Admin (Scheduling, Coordination, Staffing)', count: 39, percentage: Math.round((39 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#f97316' },
        { text: 'Document Review & Policy', count: 28, percentage: Math.round((28 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#7c2d12' },
        { text: 'Procurement & Vendor Management', count: 16, percentage: Math.round((16 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#7c3aed' },
        { text: 'Budget Planning & Financial Analysis', count: 16, percentage: Math.round((16 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#be123c' },
        { text: 'Compliance Monitoring & Auditing', count: 14, percentage: Math.round((14 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#6b21a8' },
        { text: 'Risk Evaluation & Impact Assessment', count: 13, percentage: Math.round((13 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#065f46' },
        { text: 'Performance Monitoring & Evaluation', count: 12, percentage: Math.round((12 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#4338ca' },
        { text: 'Processing Applications', count: 9, percentage: Math.round((9 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#f59e0b' },
        { text: 'Screen, Shortlist, Interview & Selection', count: 7, percentage: Math.round((7 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#0891b2' }
    ];

    const toolsData = [
        { text: 'Pair Chat', count: 121, percentage: Math.round((121 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#1e40af' },
        { text: 'Other GenAI (ChatGPT/Claude)', count: 78, percentage: Math.round((78 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#059669' },
        { text: 'AIBots', count: 42, percentage: Math.round((42 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#dc2626' },
        { text: 'Transcribe', count: 42, percentage: Math.round((42 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#7c3aed' },
        { text: 'Pair Search', count: 24, percentage: Math.round((24 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#7c2d12' },
        { text: 'Copilot', count: 15, percentage: Math.round((15 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#ea580c' },
        { text: 'Grammarly', count: 2, percentage: Math.round((2 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#be123c' },
        { text: 'Zapier', count: 1, percentage: Math.round((1 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#065f46' }
    ];

    const challengesData = [
        { text: 'Concerns about Accuracy & Reliability', count: 69, percentage: Math.round((69 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#dc2626' },
        { text: 'Privacy & Data Security Concerns', count: 60, percentage: Math.round((60 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#ea580c' },
        { text: 'Don\'t Know How to Write Effective Prompts', count: 41, percentage: Math.round((41 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#d97706' },
        { text: 'Outputs Need Extensive Editing', count: 37, percentage: Math.round((37 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#ca8a04' },
        { text: 'Inconsistent Quality Across Requests', count: 28, percentage: Math.round((28 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#65a30d' },
        { text: 'Takes Many Attempts to Get Usable Results', count: 26, percentage: Math.round((26 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#7c3aed' },
        { text: 'No Time to Learn New Tools', count: 26, percentage: Math.round((26 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#0891b2' },
        { text: 'Results Lack Proper Structure/Formatting', count: 19, percentage: Math.round((19 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#059669' },
        { text: 'Technical Difficulties or Barriers', count: 17, percentage: Math.round((17 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#0284c7' },
        { text: 'Outputs Don\'t Match Professional Tone', count: 15, percentage: Math.round((15 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#c026d3' },
        { text: 'Don\'t See Value for Specific Role', count: 4, percentage: Math.round((4 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#be123c' }
    ];

    const skillsData = [
        { text: 'Prompting AI to Draft Presentation Slides', count: 54, percentage: Math.round((54 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#1e40af' },
        { text: 'Using AI to Analyze & Interpret Data (CSVs, reports)', count: 48, percentage: Math.round((48 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#dc2626' },
        { text: 'Generating Charts or Visuals from Structured Information', count: 48, percentage: Math.round((48 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#059669' },
        { text: 'Creating Reusable Prompt Templates', count: 42, percentage: Math.round((42 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#7c2d12' },
        { text: 'Quality Checking & Fact-verification Methods', count: 35, percentage: Math.round((35 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#7c3aed' },
        { text: 'Understanding Which AI Tool Works Best', count: 34, percentage: Math.round((34 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#ea580c' },
        { text: 'Multi-step Prompting for Complex Tasks', count: 28, percentage: Math.round((28 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#be123c' },
        { text: 'Writing Clear, Specific Prompts', count: 20, percentage: Math.round((20 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#4338ca' },
        { text: 'Structuring Prompts for Proper Formatting', count: 18, percentage: Math.round((18 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#6b21a8' },
        { text: 'Getting AI to Match Professional Tone', count: 18, percentage: Math.round((18 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#0891b2' },
        { text: 'Techniques to Refine Failed Prompts', count: 9, percentage: Math.round((9 / SURVEY_BASES.TOTAL_RESPONSES) * 100), color: '#065f46' }
    ];

    const timeSpentData = [30, 80, 100, 40, 70, 99, 80, 79, 70, 70, 60, 80, 10, 50, 30, 90, 80, 90, 20, 80, 30, 80, 90, 65, 80, 90, 60, 50, 66, 80, 100, 40, 40, 40, 50, 60, 50, 20, 60, 30, 70, 80, 90, 70, 70, 70, 70, 40, 20, 50, 25, 70, 50, 30, 70, 100, 40, 80, 50, 85, 50, 70, 80, 85, 70, 50, 0, 20, 70, 40, 75, 80, 40, 60, 10, 60, 50, 40, 70, 50, 30, 40, 75, 60, 80, 70, 30, 20, 20, 40, 20, 50, 20, 20, 60, 70, 60, 15, 30, 40, 80, 50, 20, 80, 30, 70, 80, 80, 70, 40, 60, 50, 59, 80, 100, 30, 60, 40, 70, 50, 70, 70, 20, 50, 40, 80, 100, 50, 70, 70, 30, 20, 40, 75, 40, 60];
    const avgTimeSpent = Math.round(timeSpentData.reduce((a, b) => a + b, 0) / timeSpentData.length);

    {/* ------------------------ Dashboard Data ---------------------------------------------------------------- */ }
    const overallData = {
        department: "Overall - SCG, P&E, IA",
        totalResponses: SURVEY_BASES.TOTAL_RESPONSES,
        validResponses: SURVEY_BASES.VALID_RESPONSES,
        proficiency: [
            { level: "Basic", count: 71, percentage: Math.round((71 / SURVEY_BASES.VALID_RESPONSES) * 100) }, // 53%
            { level: "Confident", count: 48, percentage: Math.round((48 / SURVEY_BASES.VALID_RESPONSES) * 100) }, // 36%
            { level: "Advanced", count: 10, percentage: Math.round((10 / SURVEY_BASES.VALID_RESPONSES) * 100) }, // 7%
            { level: "Expert", count: 3, percentage: Math.round((3 / SURVEY_BASES.VALID_RESPONSES) * 100) }, // 2%
            { level: "Beginner", count: 2, percentage: Math.round((2 / SURVEY_BASES.VALID_RESPONSES) * 100) } // 1%
        ],
        frequency: [
            { frequency: "Regular", count: 59, percentage: Math.round((59 / SURVEY_BASES.VALID_RESPONSES) * 100) }, // 44%
            { frequency: "Daily", count: 53, percentage: Math.round((53 / SURVEY_BASES.VALID_RESPONSES) * 100) }, // 40%
            { frequency: "Occasional", count: 19, percentage: Math.round((19 / SURVEY_BASES.VALID_RESPONSES) * 100) }, // 14%
            { frequency: "Never", count: 3, percentage: Math.round((3 / SURVEY_BASES.VALID_RESPONSES) * 100) } // 2%
        ],
        avgTimeSpent: avgTimeSpent,
        overallAvg: avgTimeSpent,
        topTasks: [
            { text: "Data Analysis & Reports", count: 61, percentage: Math.round((61 / SURVEY_BASES.TOTAL_RESPONSES) * 100) }, // 45%
            { text: "Email Correspondence", count: 57, percentage: Math.round((57 / SURVEY_BASES.TOTAL_RESPONSES) * 100) }, // 42%
            { text: "Meeting Preparation", count: 56, percentage: Math.round((56 / SURVEY_BASES.TOTAL_RESPONSES) * 100) } // 41%
        ],
        topTools: [
            { text: "Pair Chat", count: 121, percentage: Math.round((121 / SURVEY_BASES.TOTAL_RESPONSES) * 100) }, // 89%
            { text: "Other GenAI", count: 78, percentage: Math.round((78 / SURVEY_BASES.TOTAL_RESPONSES) * 100) }, // 57%
            { text: "AIBots", count: 42, percentage: Math.round((42 / SURVEY_BASES.TOTAL_RESPONSES) * 100) } // 31%
        ],
        topChallenges: [
            { text: "Accuracy Concerns", count: 69, percentage: Math.round((69 / SURVEY_BASES.TOTAL_RESPONSES) * 100) }, // 51%
            { text: "Privacy Concerns", count: 60, percentage: Math.round((60 / SURVEY_BASES.TOTAL_RESPONSES) * 100) }, // 44%
            { text: "Poor Prompting", count: 41, percentage: Math.round((41 / SURVEY_BASES.TOTAL_RESPONSES) * 100) } // 30%
        ],
        topSkills: [
            { text: "Presentation Skills", count: 54, percentage: Math.round((54 / SURVEY_BASES.TOTAL_RESPONSES) * 100) }, // 40%
            { text: "Data Analysis", count: 48, percentage: Math.round((48 / SURVEY_BASES.TOTAL_RESPONSES) * 100) }, // 35%
            { text: "Chart Generation", count: 48, percentage: Math.round((48 / SURVEY_BASES.TOTAL_RESPONSES) * 100) } // 35%
        ]
    };

    const departmentData = {
        "Overall": overallData,
        "CIO Office": {
            department: "Chief Information Officer's Office",
            totalResponses: 1,
            proficiency: [
                { level: "Basic", count: 1, percentage: 100 }
            ],
            frequency: [
                { frequency: "Daily", count: 1, percentage: 100 }
            ],
            avgTimeSpent: 60,
            overallAvg: avgTimeSpent,
            topTasks: [
                { text: "Admin (scheduling, coordination, staffing)", count: 1, percentage: 100 },
                { text: "Email Correspondence", count: 1, percentage: 100 },
                { text: "Risk Evaluation & Impact Assessment", count: 1, percentage: 100 }
            ],
            topTools: [
                { text: "Pair Chat", count: 1, percentage: 100 }
            ],
            topChallenges: [
                { text: "Writing Effective Prompts", count: 1, percentage: 100 },
                { text: "No Time to Learn", count: 1, percentage: 100 },
                { text: "Needs Editing", count: 1, percentage: 100 }
            ],
            topSkills: [
                { text: "Multi-step Prompting for Complex Tasks", count: 1, percentage: 100 },
                { text: "Using AI to Analyze & Interpret Data", count: 1, percentage: 100 }
            ]
        },
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
            overallAvg: avgTimeSpent,
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
                { text: "Privacy Concerns", count: 4, percentage: 40 },
                { text: "Poor Prompting", count: 4, percentage: 40 },
                { text: "Takes Many Attempts", count: 4, percentage: 40 }
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
                { level: "Confident", count: 11, percentage: 48 },
                { level: "Basic", count: 6, percentage: 26 },
                { level: "Advanced", count: 3, percentage: 13 },
                { level: "Expert", count: 3, percentage: 13 }
            ],
            frequency: [
                { frequency: "Daily", count: 14, percentage: 61 },
                { frequency: "Regular", count: 9, percentage: 39 }
            ],
            avgTimeSpent: 60,
            overallAvg: avgTimeSpent,
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
            overallAvg: avgTimeSpent,
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



        "Internal Audit": {
            department: "Internal Audit",
            totalResponses: 15,
            proficiency: [
                { level: "Basic", count: 6, percentage: 40 },
                { level: "Confident", count: 9, percentage: 60 },
            ],
            frequency: [
                { frequency: "Daily", count: 10, percentage: 67 },
                { frequency: "Regular", count: 5, percentage: 33 },
            ],
            avgTimeSpent: 57,
            overallAvg: avgTimeSpent,
            topTasks: [
                { text: "Compliance Monitoring & Auditing", count: 9, percentage: 60 },
                { text: "Admin Tasks", count: 6, percentage: 40 },
                { text: "Document Review", count: 5, percentage: 33 }
            ],
            topTools: [
                { text: "Pair Chat", count: 15, percentage: 100 },
                { text: "Other GenAI", count: 9, percentage: 60 },
                { text: "Transcribe", count: 7, percentage: 47 }
            ],
            topChallenges: [
                { text: "Accuracy Concerns", count: 10, percentage: 67 },
                { text: "Privacy Concerns", count: 6, percentage: 40 },
                { text: "Needs Editing", count: 5, percentage: 33 }
            ],
            topSkills: [
                { text: "Quality Checking", count: 9, percentage: 60 },
                { text: "Template Creation", count: 6, percentage: 40 },
                { text: "Proper Formatting", count: 5, percentage: 33 }
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
                { frequency: "Daily", count: 1, percentage: 50 },
                { frequency: "Never", count: 1, percentage: 50 }
            ],
            avgTimeSpent: 78,
            overallAvg: avgTimeSpent,
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
        }, "Org Excellence": {
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
            overallAvg: avgTimeSpent,
            topTasks: [
                { text: "Meeting Preparation", count: 7, percentage: 88 },
                { text: "Admin Tasks", count: 6, percentage: 75 },
                { text: "Email Correspondence", count: 4, percentage: 50 }
            ],
            topTools: [
                { text: "Pair Chat", count: 8, percentage: 100 },
                { text: "Other GenAI", count: 6, percentage: 75 },
                { text: "AIBots", count: 5, percentage: 63 }
            ],
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
                { level: "Confident", count: 3, percentage: 43 },
                { level: "Basic", count: 2, percentage: 29 },
                { level: "Advanced", count: 2, percentage: 29 }
            ],
            frequency: [
                { frequency: "Regular", count: 4, percentage: 57 },
                { frequency: "Daily", count: 3, percentage: 43 }
            ],
            avgTimeSpent: 67,
            overallAvg: avgTimeSpent,
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
                { level: "Basic", count: 16, percentage: 70 },
                { level: "Confident", count: 6, percentage: 26 }
            ],
            frequency: [
                { frequency: "Daily", count: 11, percentage: 48 },
                { frequency: "Regular", count: 7, percentage: 30 },
                { frequency: "Occasional", count: 2, percentage: 9 },
                { frequency: "Never", count: 2, percentage: 9 }
            ],
            avgTimeSpent: 45,
            overallAvg: avgTimeSpent,
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
            overallAvg: avgTimeSpent,
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
                { text: "Presentation Skills", count: 5, percentage: 63 },
                { text: "Quality Checking", count: 4, percentage: 50 },
                { text: "Chart Generation", count: 3, percentage: 38 }
            ]
        },
        "Strat Plans & Transformation": {
            department: "Strategy Planning & Transformation",
            totalResponses: 14,
            proficiency: [
                { level: "Basic", count: 5, percentage: 36 },
                { level: "Confident", count: 5, percentage: 36 },
                { level: "Advanced", count: 3, percentage: 21 }
            ],
            frequency: [
                { frequency: "Regular", count: 6, percentage: 43 },
                { frequency: "Daily", count: 4, percentage: 29 },
                { frequency: "Occasional", count: 3, percentage: 21 }
            ],
            avgTimeSpent: 48,
            overallAvg: avgTimeSpent,
            topTasks: [
                { text: "Meeting Preparation", count: 9, percentage: 64 },
                { text: "Email Correspondence", count: 6, percentage: 43 },
                { text: "Admin Tasks", count: 6, percentage: 43 }
            ],
            topTools: [
                { text: "Pair Chat", count: 11, percentage: 79 },
                { text: "Other GenAI", count: 11, percentage: 79 },
                { text: "AIBots", count: 6, percentage: 43 }
            ],
            topChallenges: [
                { text: "Inconsistent Quality", count: 5, percentage: 36 },
                { text: "Accuracy Concerns", count: 4, percentage: 29 },
                { text: "Privacy Concerns", count: 4, percentage: 29 }
            ],
            topSkills: [
                { text: "Multi-step Prompting", count: 7, percentage: 50 },
                { text: "Presentation Skills", count: 4, percentage: 29 },
                { text: "Template Creation", count: 4, percentage: 29 }
            ]
        }


    };
    {/* -------------------- Functions --------------------------------------------------------------------- */ }

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
const calculateTimeSavings = (timeSpentPercentage: number | undefined): number => {
    const weeklyHours = 40;
    const safePercentage = timeSpentPercentage || 0;
    const repetitiveHours = (safePercentage / 100) * weeklyHours;
    const hoursSaved = repetitiveHours * 0.5;
    return Number(hoursSaved.toFixed(1));
};

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
    const sortedData = [...data].sort((a, b) => b.count - a.count); // Sort by count descending
    const maxCount = Math.max(...sortedData.map(d => d.count));

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
                {sortedData.map((item, index) => (
                    <div key={index} className="relative group flex items-center">
                        <div
                            className="h-14 rounded-lg flex items-center justify-between px-4 text-white font-semibold transition-all hover:opacity-90 hover:shadow-md"
                            style={{
                                backgroundColor: item.color,
                                width: `${Math.max((item.count / maxCount) * 80, 15)}%`,
                                minWidth: 'auto'
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

    {/* ------------ RETURN ----------------------------------------------------------------------------- */ }

    return (
        <div className="w-full h-screen bg-gray-100 p-2">
            <div className="w-full max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-2xl overflow-hidden">
                {/* Tab Navigation */}
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 p-2 pb-0">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('discovery')}
                            className={`px-6 py-3 font-semibold transition-all ${activeTab === 'discovery'
                                ? 'bg-white text-blue-700 rounded-t-lg'
                                : 'text-white hover:bg-white hover:bg-opacity-20 rounded-t-lg'
                                }`}
                        >
                            AI Discovery Insights
                        </button>
                        <button
                            onClick={() => setActiveTab('departments')}
                            className={`px-6 py-3 font-semibold transition-all ${activeTab === 'departments'
                                ? 'bg-white text-blue-700 rounded-t-lg'
                                : 'text-white hover:bg-white hover:bg-opacity-20 rounded-t-lg'
                                }`}
                        >
                            Divisional Insights
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="h-full overflow-auto">
                    {/* REPORT LOGIC */}
                    {activeTab === 'discovery' && (
                        <div className="p-6 bg-gray-50 min-h-screen">
                            <div className="max-w-6xl mx-auto">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
                                    Unlocking AI Potential: Where We Stand Today
                                </h1>
                                <p className="text-gray-600 mb-8 text-center">Comprehensive Discovery Analysis - {SURVEY_BASES.TOTAL_RESPONSES} Responses Across 8 Questions</p>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="text-lg font-semibold text-gray-700">Total Responses</h3>
                                        <p className="text-3xl font-bold text-blue-600">{SURVEY_BASES.TOTAL_RESPONSES}</p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="text-lg font-semibold text-gray-700">Avg Time on Repetitive Tasks</h3>
                                        <p className="text-3xl font-bold text-green-600">{avgTimeSpent}%</p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="text-lg font-semibold text-gray-700">Top 3 Tasks</h3>
                                        <p className="text-xl font-bold text-blue-600">{tasksData[0].text} ({tasksData[0].percentage}%)</p>
                                        <p className="text-lg font-bold text-blue-500">{tasksData[1].text} ({tasksData[1].percentage}%)</p>
                                        <p className="text-base font-bold text-blue-400">{tasksData[2].text} ({tasksData[2].percentage}%)</p>
                                    </div>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h3 className="text-lg font-semibold text-gray-700">Top 3 Challenges</h3>
                                        <p className="text-xl font-bold text-orange-600">{challengesData[0].text} ({challengesData[0].percentage}%)</p>
                                        <p className="text-lg font-bold text-orange-500">{challengesData[1].text} ({challengesData[1].percentage}%)</p>
                                        <p className="text-base font-bold text-orange-400">{challengesData[2].text} ({challengesData[2].percentage}%)</p>
                                    </div>
                                </div>
{/* Time Spent Distribution Chart */}
<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-12">The Hidden Cost of {((avgTimeSpent/100) * 5).toFixed(2)}-Day: How Much Time We're Losing Out</h2>

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

        {/* Average line overlay */}
        <div
            className="absolute border-l-4 border-dashed border-blue-600 opacity-80"
            style={{
                left: `${(avgTimeSpent / 97) * 100}%`,
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
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                <h4 className="text-blue-600 font-semibold mb-1 text-sm">Average Impact</h4>
                <div className="text-3xl font-bold text-blue-700 mb-1">{((avgTimeSpent/100) * 40).toFixed(1)}</div>
                <div className="text-blue-600 text-sm font-medium">hours per week</div>
                <div className="text-xs text-blue-500 mt-1">= {((avgTimeSpent/100) * 5).toFixed(2)} days per week</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                <h4 className="text-orange-600 font-semibold mb-1 text-sm">Highest Individual</h4>
                <div className="text-3xl font-bold text-orange-700 mb-1">{((Math.max(...timeSpentData)/100) * 40).toFixed(0)}</div>
                <div className="text-orange-600 text-sm font-medium">hours per week</div>
                <div className="text-xs text-orange-500 mt-1">= {Math.max(...timeSpentData)/100 * 5} days per week</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                <h4 className="text-green-600 font-semibold mb-1 text-sm">50% Efficiency Gain</h4>
                <div className="text-3xl font-bold text-green-700 mb-1">{(((avgTimeSpent/100) * 5) / 2).toFixed(2)} days</div>
                <div className="text-green-600 text-sm font-medium">saved per week</div>
                <div className="text-xs text-green-500 mt-1">= {(((avgTimeSpent/100) * 40) / 2).toFixed(1)} hours</div>
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mt-8 mb-6 text-center">
            An officer on average spends {avgTimeSpent}% ≈ {((avgTimeSpent/100) * 5).toFixed(2)} days per week on repetitive tasks.
        </h3>
        <div className="bg-yellow-50 rounded-lg p-4 mt-4 border-l-4 border-yellow-400">
            <div className="text-yellow-800 font-bold text-xl">
                Opportunity: Just by cutting repetitive work in half, we can save {(((avgTimeSpent/100) * 5) / 2).toFixed(2)} days per week per person.
            </div>
        </div>
    </div>
</div>
                                

                                {/* Charts and Analysis */}
                                <WordBarChart
                                    data={tasksData}
                                    title="Where Our Time Goes: Repetitive Work That AI Could Potentially Handle"
                                    subtitle="Tasks that consume the most time (multiple selections allowed)"
                                    icon="⏱️"
                                />

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
                <li>• <strong>{tasksData[0].text} ({tasksData[0].percentage}%)</strong> - Top time-consuming task</li>
                <li>• <strong>{toolsData[0].text} ({toolsData[0].percentage}%)</strong> - Near-universal adoption platform</li>
                <li>• <strong>{skillsData[0].text} ({skillsData[0].percentage}%)</strong> - Top requested capability</li>
                <li>• <strong>AI Usage ({Math.round(((SURVEY_BASES.VALID_RESPONSES - frequencyData.find(f => f.frequency === 'Never')?.count || 0) / SURVEY_BASES.VALID_RESPONSES) * 100)}%)</strong> - Growing daily work integration</li>
            </ul>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-bold text-red-800 mb-2">🚨 Critical Issues</h3>
            <ul className="text-sm text-red-700 space-y-1">
                <li>• <strong>{challengesData[0].text} ({challengesData[0].percentage}%)</strong> - Top challenge for majority</li>
                <li>• <strong>{challengesData[1].text} ({challengesData[1].percentage}%)</strong> - Significant barrier</li>
                <li>• <strong>{challengesData[2].text} ({challengesData[2].percentage}%)</strong> - Skills gap remains</li>
                <li>• <strong>{challengesData[3].text} ({challengesData[3].percentage}%)</strong> - Quality workflow issues</li>
            </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-800 mb-2">📚 Training Priorities</h3>
            <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>{skillsData[0].text} ({skillsData[0].percentage}%)</strong> - Clear top priority</li>
                <li>• <strong>{skillsData[1].text} ({skillsData[1].percentage}%)</strong> - Core analytical capability</li>
                <li>• <strong>{skillsData[2].text} ({skillsData[2].percentage}%)</strong> - Visual content creation</li>
                <li>• <strong>{skillsData[3].text} ({skillsData[3].percentage}%)</strong> - Reusable workflows</li>
            </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-bold text-purple-800 mb-2">💰 Enhanced ROI Potential</h3>
            <ul className="text-sm text-purple-700 space-y-1">
                <li>• <strong>{avgTimeSpent}% avg time</strong> on repetitive tasks</li>
                <li>• <strong>{timeSpentData.filter(t => t >= 70).length} people at 70%+</strong> - critical priority targets</li>
                <li>• Target 50% efficiency = <strong>{Math.round(avgTimeSpent/2)}%+ time savings</strong></li>
                <li>• Content creation skills = highest demand</li>
            </ul>
        </div>
    </div>
</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'departments' && (
                        <div className="w-full h-screen bg-gray-100 p-2 overflow-hidden">
                            <div className="w-full max-w-7xl mx-auto bg-gray-50 rounded-b-xl rounded-tr-xl">
                                <div className="overflow-x-auto lg:overflow-x-visible">
                                    <div className="p-2 flex flex-col min-w-[1000px] lg:min-w-0">
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
                                            <div className="flex gap-1">
                                                {Object.keys(departmentData).map((dept) => (
                                                    <button
                                                        key={dept}
                                                        onClick={() => setSelectedDepartment(dept)}
                                                        className={`py-2 px-1 rounded text-xs font-medium transition-all flex items-center justify-center flex-1 ${selectedDepartment === dept
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        <div className="text-center leading-tight">
                                                            {dept === "Overall" || dept === "Overall - SCG" ? (
                                                                <>
                                                                    <div>🏢</div>
                                                                    <div>Overall</div>
                                                                </>
                                                            ) : dept === "CIO Office" ? (
                                                                <div>CIO Office</div>
                                                            ) : dept === "Comms & Marketing" ? (
                                                                <div>Comms & Marketing</div>
                                                            ) : dept === "Digital Governance" ? (
                                                                <div>Digital Governance</div>
                                                            ) : dept === "Finance" ? (
                                                                <div>Finance</div>
                                                            ) : dept === "Internal Audit" ? (
                                                                <div>Internal Audit</div>
                                                            ) : dept === "Legal" ? (
                                                                <div>Legal</div>
                                                            ) : dept === "Org Excellence" ? (
                                                                <div>Org Excellence</div>
                                                            ) : dept === "Partnerships & Engagement" ? (
                                                                <div>Partnerships & Engagement</div>
                                                            ) : dept === "People & Org" ? (
                                                                <div>People & Organisation</div>
                                                            ) : dept === "Planning" ? (
                                                                <div>Planning</div>
                                                            ) : dept === "Procurement" ? (
                                                                <div>Procurement</div>
                                                            ) : dept === "Strat Plans & Transformation" ? (
                                                                <div>Strategy & Transformation</div>
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
                                                                        label={({ percentage }) => `${percentage}%`}
                                                                    >
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
                                                                    ? "Mixed usage - 38% daily users, 45% regular users"
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
                                                                <>Focus on <span className="font-bold">{currentData.topTasks[0]?.text}</span> ({currentData.topTasks[0]?.percentage}%) and <span className="font-bold">{currentData.topTasks[1]?.text}</span> ({currentData.topTasks[1]?.percentage}%) first</>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold text-blue-800 mb-1">AI Opportunities</h5>
<p className="text-gray-700 text-xs leading-tight">
    {selectedDepartment === 'Overall'
        ? <>Top suggestions include <span className="font-bold">procurement automation (ITT/ITQ drafting, procure-to-pay)</span>, <span className="font-bold">meeting scheduling & minutes</span>, <span className="font-bold">financial reporting & analysis</span>, and <span className="font-bold">recruitment screening & HR chatbots</span> as primary automation opportunities</>
        : (() => {
            if (selectedDepartment === 'Finance') {
                return <>Suggestions include <span className="font-bold">automated financial reporting & reconciliations</span>, <span className="font-bold">procure-to-pay automation</span>, <span className="font-bold">expense/claims processing</span>, and <span className="font-bold">variance analysis & forecasting</span></>;
            } else if (selectedDepartment === 'People & Org') {
                return <>Suggestions include <span className="font-bold">AI-driven recruitment screening</span>, <span className="font-bold">personalized learning paths</span>, <span className="font-bold">HR benefits/policy chatbots</span>, and <span className="font-bold">internal mobility matching</span></>;
            } else if (selectedDepartment === 'Digital Governance') {
                return <>Suggestions include <span className="font-bold">automated risk assessments</span>, <span className="font-bold">compliance monitoring</span>, <span className="font-bold">data cataloguing & BI platforms</span>, and <span className="font-bold">intranet AI chat for queries</span></>;
            } else if (selectedDepartment === 'Procurement') {
                return <>Suggestions include <span className="font-bold">automated ITT/ITQ drafting</span>, <span className="font-bold">procurement rule assistance bots</span>, <span className="font-bold">vendor evaluation & routing</span>, and <span className="font-bold">contract management automation</span></>;
            } else if (selectedDepartment === 'Legal') {
                return <>Suggestions include <span className="font-bold">legal technicality simplification</span>, <span className="font-bold">contract drafting & management</span>, <span className="font-bold">document review automation</span>, and <span className="font-bold">procurement-related legal work</span></>;
            } else if (selectedDepartment === 'Comms & Marketing') {
                return <>Suggestions include <span className="font-bold">GovTech branded asset bank (Canva-like)</span>, <span className="font-bold">press release & content drafts</span>, <span className="font-bold">key message development</span>, and <span className="font-bold">brand-compliant presentation generation</span></>;
            } else if (selectedDepartment === 'Strat Plans & Transformation') {
                return <>Suggestions include <span className="font-bold">automated meeting minutes & transcription</span>, <span className="font-bold">market research & data analysis</span>, <span className="font-bold">agentic AI with function personas</span>, and <span className="font-bold">standardized assessment automation</span></>;
            } else if (selectedDepartment === 'Org Excellence') {
                return <>Suggestions include <span className="font-bold">automated meeting scheduling & room booking</span>, <span className="font-bold">qualitative data analysis & visualization</span>, <span className="font-bold">secretariat task automation</span>, and <span className="font-bold">leadership calendar coordination</span></>;
            } else if (selectedDepartment === 'Partnerships & Engagement') {
                return <>Suggestions include <span className="font-bold">partner information chatbots (past engagements, procurement history)</span>, <span className="font-bold">documentation & email drafting</span>, <span className="font-bold">admin task automation</span>, and <span className="font-bold">contextual insights generation</span></>;
            } else if (selectedDepartment === 'Internal Audit') {
                return <>Suggestions include <span className="font-bold">automated audit testing with consistent attributes</span>, <span className="font-bold">compliance document analysis</span>, <span className="font-bold">data analytics for pattern identification</span>, and <span className="font-bold">knowledge management systems</span></>;
            } else if (selectedDepartment === 'CIO Office') {
                return <>Suggestions include <span className="font-bold">strategic policy development</span>, <span className="font-bold">corporate strategy automation</span>, and <span className="font-bold">cross-functional AI coordination</span></>;
            } else {
                return <>Diverse task portfolio suggests <span className="font-bold">all-in-one personal AI assistant</span> with function-specific personas</>;
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
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;