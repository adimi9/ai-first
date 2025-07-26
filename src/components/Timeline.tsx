import React, { useEffect, useRef, useState } from 'react';

const timeline = [
    {
        phase: 'Launch of SCG AI-First Sprint 1',
        period: 'Jul 30 (Wed)',
        description: [
            'Form your teams and select the problem statement you\'re most passionate about!'
        ],
        iconEmoji: '📢',
        status: 'upcoming'
    },
    {
        phase: 'Office Hours',
        period: 'Aug 7 (Thu)',
        description: [
            'Interested participants can drop in to ask questions about the problem statements.',
            'Expert mentors will be available to guide you.'
        ],
        iconEmoji: '💬',
        status: 'upcoming'
    },
    {
        phase: 'Ask-Me-Anything (AMA) on AI Workshop',
        period: 'Aug 11 Week',
        description: [
            'Learn more about AI and how to use it.'
        ],
        iconEmoji: '🤖',
        status: 'upcoming'
    },
    {
        phase: 'August Closer: Live Competition Showcase',
        period: 'Aug 25 Week',
        description: [
            'Top 3 teams for each problem statement will present their solutions.',
            'Showcase your innovation to SCG.'
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
                    const targetElement = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => ({
                            ...prev,
                            [targetElement.dataset.index as string]: true,
                        }));
                    } else {
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

    // Reverse the timeline array to display in reverse chronological order
    const reversedTimeline = [...timeline].reverse();

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

                /* Specific styles for alternating layout */
                .timeline-item-left .timeline-card {
                    margin-right: calc(50% + 4.5rem); /* Adjust based on orb/line width */
                }

                .timeline-item-right .timeline-card {
                    margin-left: calc(50% + 4.5rem); /* Adjust based on orb/line width */
                }

                @media (min-width: 768px) {
                    .timeline-item-left .timeline-card {
                        margin-right: calc(50% + 7.5rem); /* Adjust for larger screens */
                    }

                    .timeline-item-right .timeline-card {
                        margin-left: calc(50% + 7.5rem); /* Adjust for larger screens */
                    }
                }
            `}</style>
            <div className="max-w-6xl mx-auto">
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

                <div className="relative">
                    {/* Vertical Timeline Line - Centered */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[1.1rem] bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full md:top-[1.9rem]"></div>

                    <div className="space-y-12">
                        {/* Map over the reversedTimeline array */}
                        {reversedTimeline.map((phase, index) => {
                            const isVisible = visibleItems[index];
                            // Adjust `isLeft` logic if needed for reversed order visual balance,
                            // but usually it's fine as it just alternates positions.
                            const isLeft = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    ref={(el) => (timelineRefs.current[index] = el)}
                                    data-index={index}
                                    className={`relative flex items-center ${isLeft ? 'justify-start timeline-item-left' : 'justify-end timeline-item-right'} ${isVisible ? 'timeline-item-visible' : 'timeline-item-hidden'}`}
                                >
                                    {/* Orb for the timeline point - Centered */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center z-10 shadow-md md:w-16 md:h-16">
                                        <span className="text-xl md:text-3xl" role="img" aria-label={phase.phase}>
                                            {phase.iconEmoji}
                                        </span>
                                    </div>

                                    {/* Timeline Card - Conditional positioning */}
                                    <div className={`timeline-card bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-700 w-[calc(60%-2rem)] md:w-[calc(50%-3.5rem)] ${isLeft ? 'pr-8' : 'pl-8'}`}>
                                        <div className="flex flex-col mb-4">
                                            <p className="text-purple-400 text-base md:text-lg font-medium mb-1">{phase.period}</p>
                                            <h3 className="text-white font-bold text-xl md:text-2xl">{phase.phase}</h3>
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