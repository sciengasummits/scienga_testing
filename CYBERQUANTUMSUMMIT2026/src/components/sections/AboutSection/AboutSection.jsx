import React from 'react';
import { CalendarDays, CheckCircle, Clock, Star } from 'lucide-react';
import Button from '../../common/Button/Button';
import './AboutSection.css';

const AboutSection = () => {
    return (
        <section className="about section-padding" id="about">
            <div className="container about__container">
                {/* Left Side: Content */}
                <div className="about__content">
                    <h4 className="section-subtitle">Advancing Fluid Dynamics</h4>
                    <h2 className="section-title">About The Conference</h2>
                    <p className="about__text">
                        The <strong>Global Summit on Liutex Theory and Applications in Vortex Identification and Vortex Dynamics (LIUTEXVORTEXSUMMIT2026)</strong> is a premier international platform dedicated to advancing the understanding of Liutex theory and its transformative applications in vortex identification and vortex dynamics.
                    </p>
                    <p className="about__text">
                        This summit brings together leading researchers, academicians, computational scientists, engineers, and industry professionals to explore recent developments, theoretical foundations, numerical methods, and real-world applications of Liutex-based vortex analysis.
                    </p>

                    <h3 className="section-title-sm">Conference Objectives</h3>
                    <ul className="about__list">
                        <li>Promote advancements in <strong>Liutex theory</strong></li>
                        <li>Explore innovations in <strong>vortex identification techniques</strong></li>
                        <li>Discuss computational and experimental approaches in <strong>vortex dynamics</strong></li>
                        <li>Bridge academia and industry in fluid mechanics research</li>
                        <li>Encourage collaboration across aerospace, mechanical, civil, and environmental engineering domains</li>
                    </ul>

                    <h3 className="section-title-sm">Key Themes & Topics</h3>
                    <ul className="about__list">
                        <li>Fundamentals of Liutex Theory</li>
                        <li>Vortex Identification Methods (Q-criterion, λ2, Ω method, Liutex)</li>
                        <li>Turbulence Modeling and Analysis</li>
                        <li>Computational Fluid Dynamics (CFD) Applications</li>
                        <li>Vortex Dynamics in Aerospace Engineering</li>
                        <li>Data-Driven and AI Approaches in Flow Field Identification</li>
                    </ul>
                </div>

                {/* Right Side: Important Dates */}
                {/* Right Side: Important Dates */}
                <div className="about__dates-wrapper">
                    <div className="premium-dates-container">
                        <div className="premium-header">
                            <h3 className="premium-title">Important Dates</h3>
                            <div className="header-decoration"></div>
                        </div>

                        <div className="premium-dates-list">
                            {/* Card 1 */}
                            <div className="premium-date-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">SEP</span>
                                    <span className="pd-day">15</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2026</span>
                                    <h4 className="pd-event">Abstract Submission Opens</h4>
                                </div>
                                <div className="pd-icon-bg">
                                    <CalendarDays size={40} />
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="premium-date-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">NOV</span>
                                    <span className="pd-day">25</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2026</span>
                                    <h4 className="pd-event">Early Bird Deadline</h4>
                                </div>
                                <div className="pd-icon-bg">
                                    <CheckCircle size={40} />
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="premium-date-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">JAN</span>
                                    <span className="pd-day">25</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2027</span>
                                    <h4 className="pd-event">Submission Deadline</h4>
                                </div>
                                <div className="pd-icon-bg">
                                    <Clock size={40} />
                                </div>
                            </div>

                            {/* Card 4 - Highlight */}
                            <div className="premium-date-card highlight-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">MAR</span>
                                    <span className="pd-day">23</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2027</span>
                                    <h4 className="pd-event">Conference Date</h4>
                                    <span className="pd-sub">March 23-25, Munich</span>
                                </div>
                                <div className="pd-icon-bg">
                                    <Star size={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
