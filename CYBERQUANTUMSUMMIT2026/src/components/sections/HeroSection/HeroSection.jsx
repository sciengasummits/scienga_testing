import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './HeroSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT = {
    subtitle: 'ANNUAL INTERNATIONAL CONFERENCE ON',
    title: 'CYBERSECURITY AND QUANTUM COMPUTING',
    description: 'Global Summit on Cybersecurity and Quantum Computing, where global experts unite to shape the future of digital security and quantum technologies. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
    conferenceDate: 'December 07-09, 2027',
    venue: 'Marina Bay, Singapore',
    countdownTarget: '2027-12-07T09:00:00+08:00',
    showRegister: true,
    showAbstract: true,
    showBrochure: true,
};

const HeroSection = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(DEFAULT);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Fetch live data from backend + poll every 15s for dashboard changes
    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('hero').then(d => {
                if (!cancelled && d) setData(prev => ({ ...prev, ...d }));
            });
        };

        load(); // initial fetch

        const interval = setInterval(load, 15000);

        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    // Countdown timer
    useEffect(() => {
        const targetDate = new Date(data.countdownTarget).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [data.countdownTarget]);

    // If a custom background was uploaded via the dashboard, override the CSS bg
    const heroBgStyle = data.bgImage
        ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${data.bgImage}')` }
        : {};

    return (
        <section className="hero" style={heroBgStyle}>
            <div className="hero__overlay"></div>
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">{data.subtitle}</span>
                        <br />
                        {data.title}
                    </h1>

                    <div className="hero__countdown-label" style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-white)' }}>
                        Days To Go
                    </div>
                    <div className="hero__countdown">
                        {[['Days', timeLeft.days], ['Hours', timeLeft.hours], ['Minutes', timeLeft.minutes], ['Seconds', timeLeft.seconds]].map(([label, val]) => (
                            <div className="countdown-item" key={label}>
                                <span className="countdown-value">{val}</span>
                                <span className="countdown-label">{label}</span>
                            </div>
                        ))}
                    </div>

                    <p className="hero__desc">{data.description}</p>
                    <div className="hero__actions">
                        {data.showBrochure !== false && (
                            <Button onClick={() => navigate('/brochure')}>Download Brochure</Button>
                        )}
                        {data.showRegister !== false && (
                            <Button onClick={() => navigate('/register')}>Register Now</Button>
                        )}
                        {data.showAbstract !== false && (
                            <Button onClick={() => navigate('/abstract-submission')}>
                                Submit Abstract
                            </Button>
                        )}
                    </div>
                </div>

                <div className="hero__info-cards">
                    <div className="info-card date-card">
                        <h3>{(() => {
                            const parts = (data.conferenceDate || 'December 07-09, 2027').trim().split(' ');
                            return parts[0]; // Month
                        })()}</h3>
                        <p>{(() => {
                            const parts = (data.conferenceDate || 'December 07-09, 2027').trim().split(' ');
                            return parts.slice(1).join(' '); // Date + Year
                        })()}</p>
                    </div>

                    <div className="info-card venue-card">
                        <h3>Venue</h3>
                        <p>Event Venue: {data.venue}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
