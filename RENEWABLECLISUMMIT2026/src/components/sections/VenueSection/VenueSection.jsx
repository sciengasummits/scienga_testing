'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './VenueSection.css';

// Import local images
import img1 from '../../../assets/images/venue/1.jpg';
import img2 from '../../../assets/images/venue/2.jpg';
import img3 from '../../../assets/images/venue/3.jpg';
import img4 from '../../../assets/images/venue/4.jpg';
import img5 from '../../../assets/images/venue/5.jpg';
import img6 from '../../../assets/images/venue/6.jpg';
import img7 from '../../../assets/images/venue/7.jpg';
import img8 from '../../../assets/images/venue/8.jpg';

const LOCAL_IMAGES = [
    img1, img2, img3, img4, img5, img6, img7, img8
];

const VenueSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === LOCAL_IMAGES.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? LOCAL_IMAGES.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="venue" id="venue">
            <div className="venue__slider">
                {LOCAL_IMAGES.map((img, index) => (
                    <div
                        key={index}
                        className={`venue__slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img
                            src={img.src || img}
                            alt={`Venue view ${index + 1}`}
                        />
                        <div className="venue__overlay"></div>
                    </div>
                ))}

                <button className="venue__nav-btn prev" onClick={prevSlide}>
                    <ChevronLeft size={40} />
                </button>
                <button className="venue__nav-btn next" onClick={nextSlide}>
                    <ChevronRight size={40} />
                </button>

                <div className="venue__dots">
                    {LOCAL_IMAGES.map((_, index) => (
                        <div
                            key={index}
                            className={`venue__dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VenueSection;
