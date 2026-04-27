'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchContent } from '../../../api/contentApi';
import './ScheduleSection.css';

const DEFAULT_SCHEDULE = [];

const ScheduleSection = () => {
    const [activeDay, setActiveDay] = useState('day1');
    const router = useRouter();
    const navigate = (path) => router.push(path);
    const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);

    const availableDays = schedule.length > 0 ? schedule : [{ key: 'day1', label: 'Day 01', subLabel: 'Conference', rows: [] }];
    const activeDayObj = availableDays.find(day => day.key === activeDay) || availableDays[0];

    useEffect(() => {
        if (availableDays.length > 0 && !availableDays.some(day => day.key === activeDay)) {
            setActiveDay(availableDays[0].key);
        }
    }, [availableDays, activeDay]);

    useEffect(() => {
        let cancelled = false;
        const load = () => {
            fetchContent('sessions').then(d => {
                if (!cancelled && d) {
                    if (d.days && Array.isArray(d.days) && d.days.length > 0) {
                        const days = d.days.map((day, i) => {
                            const rows = day.rows ?? day.items ?? day.schedule ?? [];
                            return {
                                key: day.key || `day${i + 1}`,
                                label: day.title || day.name || `Day ${String(i + 1).padStart(2, '0')}`,
                                subLabel: day.subtitle || day.subtitleText || 'Conference',
                                rows: Array.isArray(rows) ? rows : [],
                            };
                        });
                        setSchedule(days);
                    } else if (d.schedule && typeof d.schedule === 'object') {
                        const days = Object.entries(d.schedule).map(([key, rows], i) => ({
                            key,
                            label: `Day ${String(i + 1).padStart(2, '0')}`,
                            subLabel: 'Conference',
                            rows: Array.isArray(rows) ? rows : [],
                        }));
                        setSchedule(days);
                    } else if (d.day1 || d.day2 || d.day3 || d.day4) {
                        const days = ['day1', 'day2', 'day3', 'day4']
                            .filter(dayKey => Array.isArray(d[dayKey]) && d[dayKey].length > 0)
                            .map((dayKey, i) => ({
                                key: dayKey,
                                label: `Day ${String(i + 1).padStart(2, '0')}`,
                                subLabel: 'Conference',
                                rows: d[dayKey],
                            }));
                        setSchedule(days);
                    }
                }
            });
        };
        load();
        const interval = setInterval(load, 30000);
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    return (
        <section className="schedule section-padding" id="schedule">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">Program Schedule</h2>
                    <div className="section-line"></div>
                </div>

                <div className="schedule__tabs-wrapper">
                    <div className="schedule__tabs">
                        {availableDays.map((day, index) => (
                            <button
                                key={day.key}
                                className={`schedule__tab ${activeDay === day.key ? 'active' : ''}`}
                                onClick={() => setActiveDay(day.key)}
                            >
                                <span className="tab-day">{day.label}</span>
                                <span className="tab-date">{day.subLabel}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="schedule__content fade-in">
                    {activeDay === 'day4' ? (
                        <div className="schedule__table-container demo-container fade-in" style={{ padding: '2rem', backgroundColor: 'transparent', border: 'none', boxShadow: 'none', textAlign: 'left' }}>
                            <style>{`
                                .hide-scrollbar::-webkit-scrollbar { display: none; }
                            `}</style>
                            <h2 style={{ textAlign: 'center', color: 'var(--color-primary, #333)', marginBottom: '3rem' }}>Discussion</h2>
                            <div className="hide-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {activeDayObj.rows?.length > 0 ? activeDayObj.rows.map((item, index) => (
                                    <div key={index} style={{ marginBottom: '0.5rem' }}>
                                        <h4 style={{ margin: '0 0 1rem 0', color: '#000', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                            {index + 1}. {item.time}
                                        </h4>
                                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', margin: 0, color: '#444' }}>
                                            {item.program.split(/(?:\n|•)/).filter(Boolean).map((bullet, i) => (
                                                <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
                                                    {bullet.trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Discussion Q&A will be posted here.</div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="schedule__table-container demo-container">
                            <table className="schedule__table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Session Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeDayObj.rows?.slice(0, 6).map((item, index) => (
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
                            {/* Fade Effect Overlay */}
                            <div className="schedule-fade-overlay"></div>
                        </div>
                    )}

                    <div className="text-center mt-4">
                        <button className="btn-view-schedule" onClick={() => navigate('/sessions')}>
                            View Full Schedule
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleSection;
