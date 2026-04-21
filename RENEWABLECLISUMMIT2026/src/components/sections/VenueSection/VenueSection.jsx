'use client';
import React, { useState, useEffect } from 'react';
import { fetchContent } from '../../../api/contentApi';
import './VenueSection.css';
import heroImg from '../../../assets/images/Hero.png';

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1525625230556-8e8ad8aaad9d?w=1920&q=80',
    'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
    'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80',
];

const VenueSection = () => {
    const [images, setImages] = useState(DEFAULT_IMAGES);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('venue').then(d => {
                if (!cancelled && d && d.images && d.images.length > 0) {
                    setImages(d.images);
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

    const singleImageUrl = images[0];

    return (
        <section className="venue" id="venue" style={{ backgroundColor: '#083344' }}>
            <div className="venue__slides">
                <div className="venue__slide active" style={{ opacity: 1, zIndex: 1 }}>
                    <img
                        src={singleImageUrl}
                        alt="Venue main view"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = heroImg;
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            position: 'relative',
                            zIndex: 0,
                        }}
                    />
                    <div className="venue__overlay"></div>
                </div>
            </div>
        </section>
    );
};

export default VenueSection;
