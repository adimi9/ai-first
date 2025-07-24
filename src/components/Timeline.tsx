import React, { useEffect, useRef, useState } from 'react';
// Removed Disclosure and Transition as they are no longer needed for non-collapsible content
// Removed ChevronUpIcon as it's for the expand/collapse indicator

const timeline = [
    {
        phase: 'Closer: Problem Statements & Team Formation',
        period: 'Jul 30 (Wed)',
        description: [
            'Problem statements will be officially announced.',
            'Form your teams and select the problem statement you\'re most passionate about!',
            'This is the kick-off for your AI journey.'
        ],
        iconEmoji: '📢',
        status: 'upcoming'
    },
    {
        phase: 'Office Hours (Round 1)',
        period: 'Aug 7 (Thu)',
        description: [
            'Interested participants can drop in to ask questions about the problem statements.',
            'Get clarification on rules, resources, and team dynamics.',
            'Expert mentors will be available to guide you.'
        ],
        iconEmoji: '💬',
        status: 'upcoming'
    },
    {
        phase: 'AMA on AI & Additional Problem Statements Workshop',
        period: 'Aug 11 Week',
        description: [
            'Join an Ask-Me-Anything (AMA) session with AI experts.',
            'Discover potential new problem statements during a dedicated workshop.',
            'Deepen your understanding of AI applications.'
        ],
        iconEmoji: '🤖',
        status: 'upcoming'
    },
    {
        phase: 'Office Hours (Round 2)',
        period: 'Aug 22 (Fri)',
        description: [
            'Another dedicated session for you to drop in and ask any lingering questions.',
            'Refine your project scope and get feedback on early ideas.',
            'Don\'t miss this chance for personalized guidance.'
        ],
        iconEmoji: '💬',
        status: 'upcoming'
    },
    {
        phase: 'Closers: Live Competition',
        period: 'Aug 25 Week',
        description: [
            'The pinnacle of the program: live demonstrations!',
            'Top 3 teams for each problem statement will present their solutions.',
            'Showcase your innovation and compete for recognition.'
        ],
        iconEmoji: '🏆',
        status: 'upcoming'
    }
];

const Timeline = () => {
    const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});
    const timelineRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const targetElement = entry.target as HTMLElement; // Cast entry.target to HTMLElement
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => ({
                            ...prev,
                            [targetElement.dataset.index as string]: true,
                        }));
                    } else {
                        // Optional: Reset visibility when element is out of view for re-animation on scroll-back
                        setVisibleItems((prev) => ({
                            ...prev,
                            [targetElement.dataset.index as string]: false,
                        }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        timelineRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            timelineRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

    return (
        <section id="timeline" className="px-6 py-20 bg-gray-950">
            <style>{`
                /* General animation for timeline items */
                .timeline-item-hidden {
                    opacity: 0;
                    transform: translateY(30px); /* Slide up effect */
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .timeline-item-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            AI-First{" "}
                        </span>
                        Timeline
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Our structured initiative to accelerating SCG with AI. Dive into key dates and exciting events!
                    </p>
                </div>

                <div className="relative pl-0 md:pl-0"> {/* Reset left padding for the container */}
                    {/* Vertical Timeline Line */}
                    {/* Adjusted 'top' value to start slightly higher and be hidden by the first orb */}
                    <div className="absolute left-[calc(2rem-2px)] top-[1.1rem] bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full md:left-[calc(3.5rem-2px)] md:top-[1.9rem]"></div>

                    <div className="space-y-12">
                        {timeline.map((phase, index) => {
                            const isVisible = visibleItems[index];

                            return (
                                <div
                                    key={index}
                                    ref={(el) => (timelineRefs.current[index] = el)}
                                    data-index={index}
                                    className={`relative flex items-start ${isVisible ? 'timeline-item-visible' : 'timeline-item-hidden'}`}
                                >
                                    {/* Orb for the timeline point - positioned to be next to the rod */}
                                    <div className="absolute left-4 top-0 w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center z-10 shadow-md md:w-16 md:h-16 md:left-9">
                                        <span className="text-xl md:text-3xl" role="img" aria-label={phase.phase}>
                                            {phase.iconEmoji}
                                        </span>
                                    </div>

                                    {/* Timeline Card - adjusted ml to account for emoji orb and rod */}
                                    <div className="ml-[4.5rem] md:ml-[7.5rem] bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-700 w-full">
                                        <div className="flex flex-col mb-4"> {/* Container for date and phase */}
                                            <p className="text-purple-400 text-base md:text-lg font-medium mb-1">{phase.period}</p> {/* Date styling */}
                                            <h3 className="text-white font-bold text-xl md:text-2xl">{phase.phase}</h3> {/* Phase title styling */}
                                        </div>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-300 text-base md:text-lg">
                                            {phase.description.map((item, descIndex) => (
                                                <li key={descIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;