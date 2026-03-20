import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VenueSection from '../../components/sections/VenueSection/VenueSection';
import Button from '../../components/common/Button/Button';
import { fetchContent } from '../../api/siteApi';
import './Venue.css';

const DEFAULTS = {
    venueFeatures: [
        {
            title: 'World-Class Facilities',
            description: 'State-of-the-art conference halls equipped with the latest audio-visual technology'
        },
        {
            title: 'Catering Services',
            description: 'International cuisine and refreshments throughout the conference'
        },
        {
            title: 'Easy Access',
            description: 'Convenient location with excellent public transport connections'
        },
        {
            title: 'High-Speed WiFi',
            description: 'Complimentary high-speed internet access throughout the venue'
        },
        {
            title: 'Parking Available',
            description: 'Ample parking space for all attendees'
        },
        {
            title: 'Accessibility',
            description: 'Fully accessible facilities for all participants'
        }
    ],
    nearbyAttractions: [
        {
            name: 'Marienplatz',
            distance: '0.5 km',
            image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80'
        },
        {
            name: 'English Garden',
            distance: '3.2 km',
            image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80'
        },
        {
            name: 'Nymphenburg Palace',
            distance: '6.5 km',
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80'
        }
    ],
    cityAbout: {
        title: 'About the Host City',
        subtitle: 'Discover Munich',
        description1: "Munich is the capital of Bavaria and one of Germany's most popular destinations. Known for its rich history, stunning architecture, and vibrant culture, the city seamlessly blends traditional Bavarian charm with modern innovation.",
        description2: 'As a major European hub for technology and research, Munich provides world-class conference facilities and excellent infrastructure. Visitors can explore centuries-old buildings, numerous museums, and the famous English Garden, making it an ideal location for international summits.',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
        stats: [
            { label: 'Population', value: '1.5M+' },
            { label: 'Avg. Temperature', value: '14°C' },
            { label: 'Time Zone', value: 'GMT+1' }
        ]
    }
};

const Venue = () => {
    const navigate = useNavigate();
    const [venueData, setVenueData] = useState(DEFAULTS);

    useEffect(() => {
        fetchContent('venue-page').then(data => {
            if (data && !data.error) {
                setVenueData(prev => ({ ...prev, ...data }));
            }
        }).catch(err => console.warn('[Venue] Could not load venue content:', err));
    }, []);

    const { venueFeatures, nearbyAttractions, cityAbout } = venueData;

    return (
        <div className="venue-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Event Venue</h1>
                    <p className="page-breadcrumb">Home / Venue</p>
                </div>
            </div>

            <VenueSection />

            {/* Venue Features Section */}
            <section className="venue-features section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h4 className="section-subtitle">Venue Amenities</h4>
                        <h2 className="section-title">Why Choose Our Venue</h2>
                        <p className="section-desc">
                            Experience world-class facilities designed for international conferences
                        </p>
                    </div>

                    <div className="features-grid">
                        {venueFeatures.map((feature, index) => (
                            <div className="feature-card" key={index}>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-desc">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About the City Section */}
            <section className="about-city section-padding" style={{ background: 'var(--color-bg-light)' }}>
                <div className="container">
                    <div className="about-city-content">
                        <div className="about-city-text">
                            <h4 className="section-subtitle">{cityAbout.subtitle}</h4>
                            <h2 className="section-title">{cityAbout.title}</h2>
                            <p className="city-description">{cityAbout.description1}</p>
                            <p className="city-description">{cityAbout.description2}</p>
                            <div className="city-stats">
                                {cityAbout.stats.map((stat, idx) => (
                                    <div className="stat-box" key={idx}>
                                        <h3>{stat.value}</h3>
                                        <p>{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="about-city-image">
                            <img src={cityAbout.image} alt="City" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Nearby Attractions */}
            <section className="nearby-attractions section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h4 className="section-subtitle">Explore {cityAbout.subtitle.replace('Discover ', '')}</h4>
                        <h2 className="section-title">Nearby Attractions</h2>
                        <p className="section-desc">
                            Make the most of your visit with these must-see destinations
                        </p>
                    </div>

                    <div className="attractions-grid">
                        {nearbyAttractions.map((attraction, index) => (
                            <div className="attraction-card" key={index}>
                                <div className="attraction-image">
                                    <img src={attraction.image} alt={attraction.name} />
                                    <div className="attraction-distance">{attraction.distance}</div>
                                </div>
                                <div className="attraction-info">
                                    <h3>{attraction.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="venue-cta section-padding" style={{ background: 'var(--color-primary-gradient)' }}>
                <div className="container text-center">
                    <h2 className="cta-title" style={{ color: 'white', marginBottom: '1rem' }}>
                        Ready to Join Us?
                    </h2>
                    <p className="cta-desc" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Secure your spot at the conference and be part of this transformative event
                    </p>
                    <Button
                        onClick={() => navigate('/register')}
                        variant="outline"
                        style={{ borderColor: 'white', color: 'white', background: 'transparent' }}
                    >
                        Register Now
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Venue;
