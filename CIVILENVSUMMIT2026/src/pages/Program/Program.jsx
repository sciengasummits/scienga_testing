import React, { useState } from 'react';
import './Program.css';

const scheduleData = {
    day1: [
        { time: '8.30 – 9.00', program: 'Registration' },
        { time: '9.00 – 9.30', program: 'Conference Inauguration' },
        { time: '9.30 – 11.00', program: 'Plenary Sessions' },
        { time: '11.00 – 11.20', program: 'Tea/Coffee Break' },
        { time: '11:20 – 13.00', program: 'Plenary Sessions' },
        { time: '13.00 – 13.10', program: 'Group Photograph' },
        { time: '13.10 – 14.00', program: 'Lunch' },
        { time: '14.00 – 15.40', program: 'Keynote Sessions' },
        { time: '15.40 – 16.00', program: 'Tea/Coffee Break' },
        { time: '16.00 – 17.30', program: 'Keynote Sessions' },
        { time: '17.30 – 18.30', program: 'Workshop' },
    ],
    day2: [
        { time: '9.00 – 10.30', program: 'Scientific Sessions' },
        { time: '10.30 – 10.50', program: 'Tea/Coffee Break' },
        { time: '10.50 – 13.00', program: 'Poster Presentations' },
        { time: '13.00 – 14.00', program: 'Lunch' },
        { time: '14.00 – 15.30', program: 'Panel Discussions' },
        { time: '15.30 – 16.00', program: 'Award Ceremony & Closing' },
    ],
    day3: [
        { time: '9.00 – 10.30', program: 'Networking Session' },
        { time: '10.30 – 11.00', program: 'Tea/Coffee Break' },
        { time: '11.00 – 12.30', program: 'Future Trends Workshop' },
        { time: '12.30 – 13.30', program: 'Lunch' },
        { time: '13.30 – 15.00', program: 'Final Remarks & Departure' },
    ]
};

const Program = () => {
    const [activeDay, setActiveDay] = useState('day1');

    return (
        <div className="program-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Program</h1>
                    <p className="page-breadcrumb">Home / Program</p>
                </div>
            </div>

            <section className="program-overview section-padding">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <h4 className="section-subtitle">Conference Flow</h4>
                            <h2 className="section-title">Event Overview</h2>
                            <p className="overview-text">
                                The Annual International Conference on Civil Structural and Environmental Science is a comprehensive three-day event designed to foster innovation and collaboration. The program features a blend of plenary sessions, keynote addresses, technical workshops, and scientific discussions.
                            </p>
                            <p className="overview-text">
                                Participants will have the opportunity to engage with world-renowned experts, share their latest research findings, and explore sustainable engineering solutions for the future.
                            </p>
                            <div className="overview-features">
                                <div className="feature-item">
                                    <div className="feature-icon">01</div>
                                    <div className="feature-content">
                                        <h4>Expert Keynotes</h4>
                                        <p>Insights from global leaders in structural and environmental science.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">02</div>
                                    <div className="feature-content">
                                        <h4>Technical Sessions</h4>
                                        <p>In-depth presentations on cutting-edge research and technologies.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">03</div>
                                    <div className="feature-content">
                                        <h4>Networking</h4>
                                        <p>Build lasting professional connections with peers from around the world.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="overview-image">
                                <img src="https://images.unsplash.com/photo-1475721027187-402ad736574c?w=800&q=80" alt="Conference" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="full-schedule section-padding bg-light">
                <div className="container">
                    <div className="section-header text-center mb-5">
                        <h2 className="section-title">Program Schedule</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="schedule__tabs-wrapper">
                        <div className="schedule__tabs">
                            <button
                                className={`schedule__tab ${activeDay === 'day1' ? 'active' : ''}`}
                                onClick={() => setActiveDay('day1')}
                            >
                                <span className="tab-day">Day 01</span>
                                <span className="tab-date">Inauguration</span>
                            </button>
                            <button
                                className={`schedule__tab ${activeDay === 'day2' ? 'active' : ''}`}
                                onClick={() => setActiveDay('day2')}
                            >
                                <span className="tab-day">Day 02</span>
                                <span className="tab-date">Scientific Sessions</span>
                            </button>
                            <button
                                className={`schedule__tab ${activeDay === 'day3' ? 'active' : ''}`}
                                onClick={() => setActiveDay('day3')}
                            >
                                <span className="tab-day">Day 03</span>
                                <span className="tab-date">Workshops</span>
                            </button>
                        </div>
                    </div>

                    <div className="schedule__content fade-in">
                        <div className="schedule__table-container">
                            <table className="schedule__table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Activity Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scheduleData[activeDay].map((item, index) => (
                                        <tr key={index}>
                                            <td className="time-col">
                                                <div className="time-badge">{item.time}</div>
                                            </td>
                                            <td className="program-col">
                                                <div className="program-info">
                                                    <span className="program-title">{item.program}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Program;
