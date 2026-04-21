'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, CheckCircle, Clock, Star, Calendar, MapPin } from 'lucide-react';
import Button from '../../common/Button/Button';
import './AboutSection.css';
import { fetchContent } from '../../../api/contentApi';

const ICON_MAP = { CalendarDays, CheckCircle, Clock, Star, Calendar, MapPin };

const DEFAULT_ABOUT = {
    title: 'About The Conference',
    paragraph1: 'The Quantum Computing & Engineering Summit is a premier international platform dedicated to advancing the understanding of quantum mechanics, quantum algorithms, and their transformative applications in engineering and science.',
    paragraph2: 'This conference brings together leading quantum physicists, computer scientists, engineers, researchers, and industry pioneers to explore recent breakthroughs, hardware developments, software architectures, and real-world implementations of quantum technology.',
    objectives: [
        'Promote advancements in quantum hardware and software',
        'Explore innovations in quantum error correction and scalability',
        'Discuss quantum cryptography and secure communication',
        'Bridge academia and industry in quantum research and commercialization',
        'Encourage collaboration across physics, computer science, and engineering domains',
    ],
    keyThemes: [
        'Quantum Algorithms and Complexity',
        'Quantum Hardware (Superconducting, Ion Trap, Photonics)',
        'Quantum Information Theory',
        'Quantum Cryptography and Post-Quantum Security',
        'Quantum Simulation and Many-Body Physics',
        'Machine Learning and AI in the Quantum Era',
    ],
};

const DEFAULT_DATES = {
    dates: [
        { month: 'OCT', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
        { month: 'JAN', day: '30', year: '2027', event: 'Early Bird Deadline', icon: 'CheckCircle' },
        { month: 'FEB', day: '15', year: '2027', event: 'Submission Deadline', icon: 'Clock' },
        { month: 'MAR', day: '15', year: '2027', event: 'Conference Date', icon: 'Star', sub: 'March 15-17, 2027, Munich, Germany' },
    ],
};

const AboutSection = () => {
    const router = useRouter();
    const navigate = (path) => router.push(path);
    const [about, setAbout] = useState(DEFAULT_ABOUT);
    const [datesData, setDatesData] = useState(DEFAULT_DATES);

    useEffect(() => {
        fetchContent('about').then(d => { if (d) setAbout(prev => ({ ...prev, ...d })); });
        fetchContent('importantDates').then(d => { if (d) setDatesData(prev => ({ ...prev, ...d })); });
    }, []);

    const isHighlight = (idx, total) => idx === total - 1;

    return (
        <section className="about section-padding" id="about">
            <div className="container about__container">
                {/* Left Side: Content */}
                <div className="about__content">
                    <h2 className="section-title">{about.title}</h2>
                    <p className="about__text">{about.paragraph1}</p>
                    {about.paragraph2 && <p className="about__text">{about.paragraph2}</p>}

                    {about.objectives?.length > 0 && (
                        <>
                            <h3 className="section-title-sm">Conference Objectives</h3>
                            <ul className="about__list">
                                {about.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                            </ul>
                        </>
                    )}

                    {about.keyThemes?.length > 0 && (
                        <>
                            <h3 className="section-title-sm">Key Themes &amp; Topics</h3>
                            <ul className="about__list">
                                {about.keyThemes.map((t, i) => {
                                    const isSpecial = t.includes('Quantum Algorithms and Complexity');
                                    return (
                                        <li key={i} style={isSpecial ? { fontSize: '0.9rem', wordSpacing: '-1px', letterSpacing: '-0.2px', fontWeight: 600 } : {}}>
                                            {t}
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}

                    <div className="about__actions">
                        <Button onClick={() => navigate('/abstract-submission')}>ABSTRACT SUBMISSION</Button>
                        <Button onClick={() => navigate('/register')}>REGISTER NOW</Button>
                    </div>
                </div>

                {/* Right Side: Important Dates */}
                <div className="about__dates-wrapper">
                    <div className="premium-dates-container">
                        <div className="premium-header">
                            <h3 className="premium-title">Important Dates</h3>
                            <div className="header-decoration"></div>
                        </div>

                        <div className="premium-dates-list">
                            {(datesData.dates || []).map((d, idx) => {
                                const IconComp = ICON_MAP[d.icon] || CalendarDays;
                                const highlight = isHighlight(idx, datesData.dates.length);
                                return (
                                    <div className={`premium-date-card${highlight ? ' highlight-card' : ''}`} key={idx}>
                                        <div className="pd-date-box">
                                            <span className="pd-month">{d.month}</span>
                                            <span className="pd-day">{d.day}</span>
                                            <span className="pd-year-box">{d.year}</span>
                                        </div>
                                        <div className="pd-content">
                                            <h4 className="pd-event">{d.event}</h4>
                                            {d.sub && <span className="pd-sub">{d.sub}</span>}
                                        </div>
                                        <div className="pd-icon-bg">
                                            <IconComp size={40} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
