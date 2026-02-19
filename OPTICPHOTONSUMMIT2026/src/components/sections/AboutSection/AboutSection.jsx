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
                    <h4 className="section-subtitle">Welcome To Our Conference</h4>
                    <h2 className="section-title">About The Conference</h2>
                    <div className="about__scroll-content">
                        <p className="about__text">
                            We are truly delighted to welcome you to the <strong>Annual International Conference on Optics, Photonics and Laser Technology</strong>, scheduled to take place from <strong>November 16-18, 2026</strong>, in the vibrant city of <strong>Amsterdam, Netherlands</strong>. This premier international conference brings together top minds from academia, industry, and research institutions to explore transformative innovations in optical systems, photonics, and laser applications.
                        </p>
                        <p className="about__text">
                            The conference is designed to bridge the gap between cutting-edge research and practical applications, serving as a dynamic platform for collaboration, knowledge exchange, and future-focused thinking. The conference aims to accelerate progress across disciplines and foster impactful connections that will drive the future of photonics and laser technology.
                        </p>
                        <p className="about__text">
                            Join us in <strong>Amsterdam</strong> for three impactful days of insight, innovation, and connection at the forefront of optics and photonics!
                        </p>
                        <p className="about__text">
                            Industry Excellence: Munich is home to world-leading energy exhibitions like Intersolar Europe, making it a focal point for the global solar and clean-tech industry.
                            State-of-the-Art Infrastructure: The summit will leverage Munich’s advanced conference facilities, such as the Messe München or ICM, known for hosting premier international trade shows.
                            Sustainability Leadership: Germany’s "Energiewende" (Energy Transition) policy makes Munich an inspiring location to witness real-world implementations of renewable energy at scale.
                        </p>

                        <div className="about__objectives" style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-header)' }}>Conference Objectives</h3>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-body)' }}>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Advance Global Knowledge Exchange:</strong> To facilitate a premier platform for researchers, industry leaders, and scientists to exchange groundbreaking ideas and research in optics, photonics, and laser technology.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Foster Interdisciplinary Collaboration:</strong> To encourage cross-sector partnerships between academia, research institutions, and private industries for accelerating optical and photonic innovations.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Showcase Innovative Technologies:</strong> To present state-of-the-art technologies and methodologies in laser systems, optical devices, and photonic applications.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Promote Research Development:</strong> To discuss and formulate actionable research frameworks that support advancement in optical sciences and photonics engineering.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Empower Future Leaders:</strong> To mentor and inspire young scientists and engineers through workshops, networking, and exposure to cutting-edge photonics research.</li>
                            </ul>
                        </div>

                        <div className="about__themes" style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-header)' }}>Key Themes & Topics</h3>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text-body)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                                <li>Laser Technology & Applications</li>
                                <li>Fiber Optics & Optical Communications</li>
                                <li>Photonic Integrated Circuits</li>
                                <li>Quantum Optics & Photonics</li>
                                <li>Optical Sensing & Imaging Systems</li>
                                <li>Biophotonics & Medical Optics</li>
                                <li>Nonlinear Optics & Ultrafast Photonics</li>
                                <li>Optical Materials & Metamaterials</li>
                            </ul>
                        </div>
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
                            {/* Card 1 */}
                            <div className="premium-date-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">JUL</span>
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
                                    <span className="pd-month">SEP</span>
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
                                    <span className="pd-month">OCT</span>
                                    <span className="pd-day">25</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2026</span>
                                    <h4 className="pd-event">Submission Deadline</h4>
                                </div>
                                <div className="pd-icon-bg">
                                    <Clock size={40} />
                                </div>
                            </div>

                            {/* Card 4 - Highlight */}
                            <div className="premium-date-card highlight-card">
                                <div className="pd-date-box">
                                    <span className="pd-month">NOV</span>
                                    <span className="pd-day">16</span>
                                </div>
                                <div className="pd-content">
                                    <span className="pd-year">2026</span>
                                    <h4 className="pd-event">Conference Date</h4>
                                    <span className="pd-sub">November 16-18, Amsterdam</span>
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
