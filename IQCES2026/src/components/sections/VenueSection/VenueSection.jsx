import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchContent } from '../../../api/siteApi';
import './VenueSection.css';

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1595181710363-f1109f2d1130?w=1920&q=80',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80',
    'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
];

const VenueSection = () => {
    const [activeVenue, setActiveVenue] = useState(0);
    const [direction, setDirection] = useState('next');
    const [images, setImages] = useState(DEFAULT_IMAGES);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('venue').then(d => {
                if (!cancelled && d && !d.error && d.images && d.images.length > 0) {
                    setImages(d.images);
                }
            }).catch(() => {});
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

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setDirection('next');
            setActiveVenue(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const goToVenue = (index) => {
        if (index !== activeVenue) {
            setDirection(index > activeVenue ? 'next' : 'prev');
            setActiveVenue(index);
        }
    };

    const goToPrev = () => {
        setDirection('prev');
        setActiveVenue(prev => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setDirection('next');
        setActiveVenue(prev => (prev + 1) % images.length);
    };

    return (
        <section className="venue" id="venue">
            <div className="venue__slides">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`venue__slide ${index === activeVenue ? `active ${direction}` : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
            </div>

            <div className="venue__controls-bottom">
                <button className="venue__arrow venue__arrow--left" onClick={goToPrev}>
                    <ChevronLeft size={24} />
                </button>

                <div className="venue__indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`venue__indicator ${index === activeVenue ? 'active' : ''}`}
                            onClick={() => goToVenue(index)}
                        />
                    ))}
                </div>

                <button className="venue__arrow venue__arrow--right" onClick={goToNext}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default VenueSection;
