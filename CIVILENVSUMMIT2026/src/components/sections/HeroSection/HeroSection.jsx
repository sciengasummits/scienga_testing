import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './HeroSection.css';
import cpdImage from '../../../assets/images/cpd.jpg';

const HeroSection = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    React.useEffect(() => {
        const targetDate = new Date('December 7, 2026 09:00:00 GMT+0800').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const handleDownloadBrochure = () => {
        navigate('/brochure');
    };

    return (
        <section className="hero">
            <div className="hero__overlay"></div>
            <div className="container hero__container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-sub">Annual International Conference on</span> <br />
                        CIVIL STRUCTURAL AND ENVIRONMENTAL SCIENCE
                    </h1>


                    <div className="hero__countdown-wrapper">
                        <h3 className="countdown-title">Days To Go</h3>
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

                    <p className="hero__desc">
                        Global Summit on Civil, Structural, and Environmental Science, where global experts unite to shape
                        the future of sustainable infrastructure. Discover ground-breaking technologies, connect with
                        top engineering professionals, and explore solutions transforming our world's structural and environmental resilience.
                    </p>
                    <div className="hero__actions">
                        <Button onClick={handleDownloadBrochure}>Download Brochure</Button>
                        <Button onClick={() => navigate('/register')}>Register Now</Button>
                        <Button onClick={() => navigate('/abstract-submission')}>
                            Submit Abstract
                        </Button>
                    </div>
                </div>

                <div className="hero__info-cards">
                    <div className="info-card date-card">
                        <h3>December</h3>
                        <p>7-9, 2026 </p>
                    </div>

                    <div className="info-card venue-card">
                        <h3>Venue</h3>
                        <p>Event Venue: Marina Bay, Singapore</p>
                    </div>
                </div>
            </div>

            <img src={cpdImage} alt="CPD Certified" className="hero__cpd-image" />
        </section>
    );
};

export default HeroSection;
