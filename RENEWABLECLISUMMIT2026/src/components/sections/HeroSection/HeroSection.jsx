'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, MapPin, Calendar } from 'lucide-react';
import Button from '../../common/Button/Button';
import './HeroSection.css';
import { fetchContent } from '../../../api/contentApi';
import { resolveImageUrl } from '../../../api/utilsApi';

const DEFAULTS = {
    subtitle: 'INTERNATIONAL CONFERENCE ON',
    title: 'Renewable Energy AND\nClimate Change',
    description: 'International Conference on Renewable Energy & Climate Change where global experts unite to shape the future of renewable energy. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
    conferenceDate: 'March 23-25, 2027',
    venue: 'Munich, Germany',
    countdownTarget: '2027-03-23T09:00:00+01:00',
    bgImage: '/images/hero-bg.png',
    showRegister: true,
    showAbstract: true,
    showBrochure: true,
    showAnnouncement: false,
    announcementUrl: '/pdfs/announcement.pdf',
};

const HeroSection = () => {
    const router = useRouter();
    const navigate = (path) => router.push(path);
    const [hero, setHero] = useState(DEFAULTS);
    const [chairs, setChairs] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [collaborations, setCollaborations] = useState([]);

    // Helper to convert month name to number (01-12)
    const getMonthNumber = (monthName) => {
        const months = {
            'January': '01', 'February': '02', 'March': '03', 'April': '04',
            'May': '05', 'June': '06', 'July': '07', 'August': '08',
            'September': '09', 'October': '10', 'November': '11', 'December': '12'
        };
        return months[monthName] || '01';
    };

    // resolveImageUrl from siteApi.js handles both local (localhost:5050) and
    // production (VITE_API_URL) — never hardcodes localhost for image paths.
    const resolveUrl = resolveImageUrl;

    // Fetch dynamic content from backend
    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('hero').then(data => {
                if (!cancelled && data) {
                    console.log('📊 Raw hero data from database:', data);
                    
                    // Ensure countdownTarget is always set, deriving from conferenceDate if needed
                    const updated = { ...data };
                    
                    // Helper function to validate if a date string represents a future date
                    const isFutureDate = (dateString) => {
                        const targetTime = new Date(dateString).getTime();
                        const now = new Date().getTime();
                        return targetTime > now;
                    };
                    
                    // Always derive from conferenceDate to ensure it's in the future
                    if (data.conferenceDate) {
                        console.log('🔄 Deriving countdownTarget from conferenceDate:', data.conferenceDate);
                        // Extract year from conferenceDate (e.g., "March 23-25, 2027")
                        const dateMatch = data.conferenceDate.match(/(\d{4})/);
                        const year = dateMatch ? dateMatch[1] : new Date().getFullYear();
                        const dateMatch2 = data.conferenceDate.match(/(\w+)\s+(\d+)/);
                        if (dateMatch2) {
                            const month = dateMatch2[1];
                            const day = dateMatch2[2];
                            updated.countdownTarget = `${year}-${getMonthNumber(month)}-${String(day).padStart(2, '0')}T09:00:00+01:00`;
                            console.log('📅 Generated countdownTarget from conferenceDate:', updated.countdownTarget);
                        }
                    } else if (updated.countdownTarget && isFutureDate(updated.countdownTarget)) {
                        console.log('✅ Using countdownTarget from database (valid future date):', updated.countdownTarget);
                    } else {
                        console.log('⚠️ No valid future date found, using defaults');
                        updated.countdownTarget = DEFAULTS.countdownTarget;
                    }
                    
                    console.log('✨ Updated hero data:', updated);
                    setHero(prev => ({ ...prev, ...updated }));
                }
            });

            fetchContent('heroChairs').then(data => {
                if (!cancelled) {
                    if (data && Array.isArray(data)) {
                        // Top-level array (ideal case)
                        const validChairs = data.filter(c => c && c.name);
                        setChairs(validChairs);
                    } else if (data && data._items && Array.isArray(data._items)) {
                        // ✅ Deployed backend stores array as data._items — most recent save wins
                        const validChairs = data._items.filter(c => c && c.name);
                        setChairs(validChairs);
                    } else if (data && (data.chair?.name || data.viceChair?.name || data.coChair?.name)) {
                        // Legacy schema migration
                        const migrated = [];
                        ['chair', 'viceChair', 'coChair'].forEach(k => {
                            if (data[k] && data[k].name) {
                                migrated.push({ id: k, ...data[k] });
                            }
                        });
                        setChairs(migrated);
                    } else if (data && typeof data === 'object') {
                        // Recover from corrupted save: { "0":{...}, "1":{...} }
                        const numKeys = Object.keys(data)
                            .filter(k => !isNaN(k))
                            .sort((a, b) => Number(a) - Number(b));
                        if (numKeys.length > 0) {
                            const recovered = numKeys.map(k => data[k]).filter(c => c && c.name);
                            setChairs(recovered);
                        } else {
                            setChairs([]);
                        }
                    } else if (data === null || data === undefined) {
                        // Fallback dummy data if nothing is saved yet
                        setChairs([
                            { id: 1, name: 'Prof. Hans Müller', affiliation: 'Technical University of Munich', country: 'Germany', title: 'Conference Chairman' },
                            { id: 2, name: 'Dr. Sarah Johnson', affiliation: 'Renewable Energy Institute', country: 'UK', title: 'Conference Co-chairman' },
                            { id: 3, name: 'Prof. Tanaka Sato', affiliation: 'Sustainable Tech University', country: 'Japan', title: 'Conference Co-chairman' }
                        ]);
                    } else {
                        setChairs([]);
                    }
                }
            }).catch(err => {
                console.error('Failed to fetch heroChairs:', err);
            });

            // Fetch Collaborations
            import('../../../api/index').then(api => {
                api.fetchSponsors('collaboration').then(data => {
                    if (!cancelled && data) setCollaborations(data);
                });
            });
        };

        load();

        // Polling every 15s to reflect dashboard changes live
        const interval = setInterval(load, 15000);

        // Also refresh when tab becomes visible
        const onVisible = () => {
            if (document.visibilityState === 'visible') load();
        };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    useEffect(() => {
        const targetDateString = hero.countdownTarget || DEFAULTS.countdownTarget;
        console.log('⏰ Countdown target string:', targetDateString);
        
        const targetDate = new Date(targetDateString).getTime();
        console.log('⏰ Countdown target (ms):', targetDate);
        console.log('⏰ Is valid date?', !isNaN(targetDate));

        // Calculate immediately instead of waiting for first tick
        const calculateTime = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            console.log('🕐 Current time (ms):', now);
            console.log('🕐 Time difference (ms):', difference);

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                console.log(`⏳ Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                console.log('⏳ Target date is in the past');
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Calculate once immediately
        calculateTime();

        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, [hero.countdownTarget]);

    // Parse date for info-card (expects "Month Day-Day, Year" or similar)
    const monthStr = hero.conferenceDate?.split(' ')[0] || 'December';
    const daysStr = hero.conferenceDate?.split(' ').slice(1).join(' ') || '14-16, 2026';

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

    const bgUrl = resolveUrl(hero.bgImage);
    const heroBgStyle = bgUrl
        ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${bgUrl}')` }
        : {};

    return (
        <section className="hero" style={heroBgStyle}>
            <div className="hero__overlay"></div>
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
                                <Button className="btn-elevate hero-btn-small" onClick={() => window.open(resolveUrl(hero.announcementUrl || '/pdfs/announcement.pdf'), '_blank')}>CONFERENCE ANNOUNCEMENT</Button>
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

                    {chairs && chairs.length > 0 && (
                        <div className="hero__chairs-row">
                            {chairs.map((chair, idx) => (
                                <div className="chair-card-v" key={chair.id || idx}>
                                    <div className="chair-badge-v">{chair.title || 'Conference Chairman'}</div>
                                    {chair.image ? (
                                        <img src={resolveUrl(chair.image)} alt={chair.name} className="chair-card-bg" />
                                    ) : (
                                        <div className="chair-placeholder-v"><User size={40} color="#fff" /></div>
                                    )}
                                    <div className="chair-card-overlay">
                                        <h4 className="chair-name-v">{chair.name}</h4>
                                        <p className="chair-aff-v">{chair.affiliation}</p>
                                        {chair.country && (
                                            <p className="chair-country-v"><MapPin size={12} /> {chair.country}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {collaborations.length > 0 && (
                <div className="hero__collaborations">
                    <div className="collab-container">
                        <div className="collab-group">
                            <span className="collab-label">Collaboration / Sponsor</span>
                            <div className="collab-logos">
                                {collaborations.map(c => (
                                    <div key={c._id} className="collab-logo-item">
                                        <a href={c.link || '/'} target="_blank" rel="noopener noreferrer" className="collab-logo-link">
                                            <img src={resolveUrl(c.logo)} alt={c.name} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroSection;
