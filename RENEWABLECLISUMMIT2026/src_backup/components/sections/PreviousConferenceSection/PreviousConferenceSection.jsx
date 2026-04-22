import React from 'react';
import './PreviousConferenceSection.css';

const conferenceImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80', alt: 'Solar Energy Innovation' },
    { id: 2, src: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80', alt: 'Wind Turbine Farm' },
    { id: 3, src: 'https://images.unsplash.com/photo-1517088455889-bfa75135412c?auto=format&fit=crop&w=800&q=80', alt: 'Sustainable Hydro Power' },
    { id: 4, src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80', alt: 'Sustainable Urban Development' },
    { id: 5, src: 'https://images.unsplash.com/photo-1473186578172-c141e6798ee4?auto=format&fit=crop&w=800&q=80', alt: 'Ecological Rivers' },
    { id: 6, src: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80', alt: 'Clean Transportation' },
    { id: 8, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', alt: 'Forest Conservation' }
];

const MarqueeRow = ({ items, direction }) => (
    <div className={`conference-marquee-row ${direction}`}>
        {[...items, ...items, ...items].map((image, index) => (
            <div key={`${image.id}-${index}`} className="conference-marquee-item">
                <img
                    src={image.src}
                    alt={image.alt}
                    className="conference-image"
                />
            </div>
        ))}
    </div>
);

const PreviousConferenceSection = () => {
    const row1 = conferenceImages.slice(0, 5);
    const row2 = conferenceImages.slice(5);

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
