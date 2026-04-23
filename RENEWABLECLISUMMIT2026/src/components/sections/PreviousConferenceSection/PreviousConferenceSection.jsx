import React from 'react';
import './PreviousConferenceSection.css';

import { fetchContent } from '../../../api/contentApi';

const DEFAULT_IMAGES = [
    { id: 1, src: 'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=800&q=80', alt: 'Conference 1' },
    { id: 2, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', alt: 'Conference 2' },
    { id: 3, src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80', alt: 'Conference 3' },
    { id: 4, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', alt: 'Conference 4' },
];

const MarqueeRow = ({ items, direction }) => (
    <div className={`conference-marquee-row ${direction}`}>
        {[...items, ...items, ...items].map((image, index) => (
            <div key={`${image.id}-${index}`} className="conference-marquee-item">
                <img
                    src={image.src.src || image.src}
                    alt={image.alt}
                    className="conference-image"
                />
            </div>
        ))}
    </div>
);

const PreviousConferenceSection = () => {
    const [images, setImages] = React.useState(DEFAULT_IMAGES);

    React.useEffect(() => {
        fetchContent('previousGlimpses').then(data => {
            if (data?.images && data.images.length > 0) {
                setImages(data.images.map((img, i) => ({
                    id: i,
                    src: img.url,
                    alt: img.name || `Conference ${i + 1}`
                })));
            }
        }).catch(err => console.error('Failed to load glimpses:', err));
    }, []);

    const mid = Math.ceil(images.length / 2);
    const row1 = images.slice(0, mid);
    const row2 = images.slice(mid);

    return (
        <section className="previous-conference-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Previous Conference Images</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="conference-marquee-wrapper">
                    <MarqueeRow items={row1} direction="scroll-left" />
                    <MarqueeRow items={row2} direction="scroll-right" />
                </div>
            </div>
        </section>
    );
};

export default PreviousConferenceSection;
