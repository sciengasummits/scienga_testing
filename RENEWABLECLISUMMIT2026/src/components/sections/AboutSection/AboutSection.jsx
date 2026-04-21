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
    paragraph1: 'The International Conference on Renewable Energy & Climate Change (RECC) is a premier global platform dedicated to advancing the understanding of sustainable energy solutions and their transformative role in mitigating environmental challenges.',
    paragraph2: 'This summit brings together leading researchers, academicians, computational scientists, engineers, and industry professionals to explore recent developments, theoretical foundations, numerical methods, and real-world applications of renewable technology and climate modeling.',
    objectives: [
        'Promote advancements in Renewable Energy technologies',
        'Explore innovations in Climate Change mitigation techniques',
        'Discuss computational and experimental approaches in sustainability',
        'Bridge academia and industry in clean energy research',
        'Encourage collaboration across environmental, mechanical, and civil engineering domains',
    ],
    keyThemes: [
        'Solar & Wind Energy Innovations',
        'Hydrogen Economy & Biofuels',
        'Grid Decarbonization & Smart Systems',
        'Climate Modeling & Fluid Dynamics',
        'Carbon Capture & Storage Technologies',
        'AI & Data-Driven Approaches in Sustainability',
    ],
};

const DEFAULT_DATES = {
    dates: [
        { month: 'SEP', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
        { month: 'OCT', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
        { month: 'DEC', day: '15', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
        { month: 'MAR', day: '23', year: '2027', event: 'Conference Date', icon: 'Star', sub: 'March 23-25, 2027, Munich, Germany' },
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
                                {about.keyThemes.map((t, i) => <li key={i}>{t}</li>)}
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
