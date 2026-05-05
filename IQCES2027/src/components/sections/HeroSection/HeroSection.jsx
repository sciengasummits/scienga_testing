'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin } from 'lucide-react';
import Button from '../../common/Button/Button';
import './HeroSection.css';
import { fetchContent } from '../../../api/contentApi';

const DEFAULTS = {
    subtitle: 'INTERNATIONAL CONFERENCE ON',
    title: 'Quantum Computing &\nEngineering Summit',
    description: 'Quantum Computing & Engineering Summit where global experts unite to shape the future of quantum technologies. Discover ground-breaking developments, connect with top researchers, and explore solutions transforming our world.',
    conferenceDate: 'March 15-17, 2027',
    venue: 'Munich, Germany',
    countdownTarget: '2027-03-15T09:00:00+01:00',
    showRegister: true,
    showAbstract: true,
    showBrochure: true,
    showAnnouncement: false,
};

const HeroSection = () => {
    const router = useRouter();
    const navigate = (path) => router.push(path);
    const [hero, setHero] = useState(DEFAULTS);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        let cancelled = false;
        const load = () => {
            fetchContent('hero').then(data => {
                if (!cancelled && data) setHero(prev => ({ ...prev, ...data }));
            });
        };
        load();
        const interval = setInterval(load, 300000); // Poll every 5 minutes
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    useEffect(() => {
        const targetDate = new Date(hero.countdownTarget || DEFAULTS.countdownTarget).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [hero.countdownTarget]);

    const monthStr = hero.conferenceDate?.split(' ')[0] || 'March';
    const daysStr = hero.conferenceDate?.split(' ').slice(1).join(' ') || '15-17, 2027';

    const renderTitle = () => {
        if (!hero.title) return DEFAULTS.title;
        const lines = hero.title.trim().split('\n');
        return lines.map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i !== lines.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <section className="hero">
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">{hero.subtitle}</span>
                        {renderTitle()}
                    </h1>

                    <div className="hero__countdown-wrapper">
                        <span className="days-to-go-label">Days To Go</span>
                        <div className="hero__countdown">
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft.days}</span>
                                <span className="countdown-label">Days</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft.hours}</span>
                                <span className="countdown-label">Hours</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft.minutes}</span>
                                <span className="countdown-label">Minutes</span>
                            </div>
                            <div className="countdown-item">
                                <span className="countdown-value">{timeLeft.seconds}</span>
                                <span className="countdown-label">Seconds</span>
                            </div>
                        </div>
                    </div>

                    <p className="hero__desc">{hero.description}</p>

                    <div className="hero-actions-container">
                        <div className="hero__actions">
                            {hero.showBrochure !== false && (
                                <Button className="hero-btn-small" onClick={() => navigate('/brochure')}>DOWNLOAD BROCHURE</Button>
                            )}
                            {hero.showAbstract !== false && (
                                <Button className="hero-btn-small" onClick={() => navigate('/abstract-submission')}>SUBMIT ABSTRACT</Button>
                            )}
                            {hero.showRegister !== false && (
                                <Button className="btn-elevate hero-btn-small" onClick={() => navigate('/register')}>REGISTER NOW</Button>
                            )}
                            {hero.showAnnouncement && (
                                <Button className="btn-elevate hero-btn-small" onClick={() => navigate('/about')}>CONFERENCE ANNOUNCEMENT</Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hero__right">
                    <div className="hero__info-cards">
                        <div className="info-card date-card">
                            <h3>{monthStr}</h3>
                            <p><Calendar size={18} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-block', marginBottom: '2px' }} /> {daysStr}</p>
                        </div>
                        <div className="info-card venue-card">
                            <h3>Venue</h3>
                            <p><MapPin size={18} style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-block', marginBottom: '2px' }} /> {hero.venue}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
