import React, { useState, useEffect } from 'react';
import { CalendarDays, CheckCircle, Clock, Star } from 'lucide-react';
import './AboutSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_ABOUT = {
    subtitle: 'Welcome to Bern, Switzerland',
    title: 'About the Conference',
    paragraph1: 'We are thrilled to welcome you to the International Conference on Quantum Computing & Engineering (IQCES-2026), scheduled to take place from June 24-26, 2026, in the historic city of Bern, Switzerland. This premier scientific gathering brings together global experts from academia and industry to discuss groundbreaking advancements in quantum science.',
    paragraph2: 'Our mission is to foster a collaborative environment where researchers can share innovative findings, explore the next generation of quantum platforms, and discuss the practical applications of quantum information science. Through interdisciplinary dialogue, we aim to accelerate the transition from quantum theory to industrial reality.',
    paragraph3: 'Join us for three immersive days of high-level plenary talks, technical sessions, and meaningful networking in the heart of Europe!',
    objectives: [
        'Accelerate Innovation: To provide a global stage for showcasing breakthrough research in quantum computing, communication, and metrology.',
        'Bridge Research and Industry: To facilitate knowledge transfer between theoretical research and real-world industrial implementation.',
        'Foster Collaborative Networks: To connect leading scientists with emerging researchers to build lasting international partnerships.',
        'Discuss Ethical and Future Implications: To address the societal and security impacts of emerging quantum technologies.',
        'Empower the Next Generation: To support students and early-career researchers through specialized workshops and poster sessions.'
    ],
    keyThemes: [
        'Quantum Algorithms and Complexity',
        'Quantum Information Processing',
        'Quantum Error Correction and Fault Tolerance',
        'Quantum Hardware: Superconducting, Trapped Ion, Photonic',
        'Quantum Cryptography and Post-Quantum Security',
        'Quantum Sensing and Precision Measurements',
        'Scalability and Control of Quantum Systems',
        'Hybrid Quantum-Classical Systems'
    ]
};

const DEFAULT_DATES = {
    dates: [
        { month: 'DEC', day: '10', year: '2025', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
        { month: 'FEB', day: '15', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
        { month: 'APR', day: '20', year: '2026', event: 'Final Submission Deadline', icon: 'Clock' },
        { month: 'JUN', day: '24', year: '2026', event: 'Conference Start Date', icon: 'Star', sub: 'June 24-26, Bern' }
    ]
};

const iconMap = {
    CalendarDays: <CalendarDays size={40} />,
    CheckCircle: <CheckCircle size={40} />,
    Clock: <Clock size={40} />,
    Star: <Star size={40} />
};

const AboutSection = () => {
    const [about, setAbout] = useState(DEFAULT_ABOUT);
    const [dates, setDates] = useState(DEFAULT_DATES);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('about')
                .then(d => { if (!cancelled && d) setAbout(prev => ({ ...prev, ...d })); })
                .catch(e => console.warn('[AboutSection] Could not load about:', e.message));
            fetchContent('importantDates')
                .then(d => { if (!cancelled && d?.dates) setDates(prev => ({ ...prev, dates: d.dates })); })
                .catch(e => console.warn('[AboutSection] Could not load dates:', e.message));
        };

        load(); // initial fetch

        // Poll every 15 seconds so dashboard edits appear without a page reload
        const interval = setInterval(load, 15000);
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    return (
        <section className="about section-padding" id="about">
            <div className="container about__container">
                <div className="about__content">
                    <h4 className="section-subtitle">{about.subtitle}</h4>
                    <h2 className="section-title">{about.title}</h2>
                    <div className="about__scroll-content">
                        <p className="about__text">{about.paragraph1}</p>
                        <p className="about__text">{about.paragraph2}</p>
                        {about.paragraph3 && <p className="about__text">{about.paragraph3}</p>}

                        {about.objectives && (
                            <div className="about__objectives" style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-header)' }}>Conference Objectives</h3>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-body)' }}>
                                    {about.objectives.map((obj, i) => {
                                        const parts = obj.split(':');
                                        return (
                                            <li key={i} style={{ marginBottom: '0.5rem' }}>
                                                {parts.length > 1 ? (
                                                    <><strong>{parts[0]}:</strong>{parts.slice(1).join(':')}</>
                                                ) : obj}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {about.keyThemes && (
                            <div className="about__themes" style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-header)' }}>Key Themes & Topics</h3>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-body)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                                    {about.keyThemes.map((theme, i) => <li key={i}>{theme}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="about__dates-wrapper">
                    <div className="premium-dates-container">
                        <div className="premium-header">
                            <h3 className="premium-title">Important Dates</h3>
                            <div className="header-decoration"></div>
                        </div>

                        <div className="premium-dates-list">
                            {(dates.dates || []).map((d, i) => (
                                <div key={i} className={`premium-date-card ${d.icon === 'Star' ? 'highlight-card' : ''}`}>
                                    <div className="pd-date-box">
                                        <span className="pd-month">{d.month}</span>
                                        <span className="pd-day">{d.day}</span>
                                    </div>
                                    <div className="pd-content">
                                        <span className="pd-year">{d.year}</span>
                                        <h4 className="pd-event">{d.event}</h4>
                                        {d.sub && <span className="pd-sub">{d.sub}</span>}
                                    </div>
                                    <div className="pd-icon-bg">
                                        {iconMap[d.icon] || <CalendarDays size={40} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
