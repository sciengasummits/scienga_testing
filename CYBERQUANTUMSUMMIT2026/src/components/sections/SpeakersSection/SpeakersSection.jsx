import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { speakers } from '../../../data/speakersData';
import './SpeakersSection.css';

const SpeakersSection = ({ showViewAll }) => {
    const location = useLocation();
    // User requested filters: Committee --Speakers--Posters--Students--Deligates
    const [activeCategory, setActiveCategory] = useState(location.state?.category || 'Committee');
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);

    const getDisplayCategory = (category) => {
        if (category === 'Student') return 'Student Speaker';
        if (category === 'Committee') return 'Committee Speaker';
        if (category === 'Delegate') return 'Delegate';
        return category;
    };

    const filteredSpeakers = speakers.filter(speaker => {
        if (activeCategory === 'Committee') return speaker.category === 'Committee';
        if (activeCategory === 'Speakers') return true;
        if (activeCategory === 'Posters') return ['Poster Presenter', 'Poster'].includes(speaker.category);
        if (activeCategory === 'Students') return ['Student', 'Student Speaker'].includes(speaker.category);
        if (activeCategory === 'Delegates') return ['Delegate', 'Delegate Speaker'].includes(speaker.category);
        return false;
    }).slice(0, showViewAll ? 8 : speakers.length); // showViewAll=true (Home) -> limit 8. showViewAll=false/undefined (Speakers Page) -> all.
    // WAIT. Usually `showViewAll` prop is passed as `true` on Home section to SHOW the "View All" button.
    // The user said: "Display 8 speakers per category on the Home page and all available speakers (80+) when viewing the dedicated Speakers page."
    // If I am on Home page, I pass `showViewAll={true}` usually?
    // Let's check Home.jsx if possible. But assuming standard pattern:
    // If `showViewAll` is true, we act as "Home Section".
    // If we act as Home Section, we should slice(0, 8).
    // If `showViewAll` is false (Speakers Page), we slice nothing.
    // My code snippet: `.slice(0, showViewAll ? 8 : speakers.length)`
    // If `showViewAll` is true -> 8.
    // This seems correct.

    const openModal = (speaker) => {
        setSelectedSpeaker(speaker);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedSpeaker(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section className="speakers section-padding" id="speakers">
            <div className="container">
                <div className="text-center mb-5">
                    <h4 className="section-subtitle">Meet The Experts</h4>
                    <h2 className="section-title">Global Participants</h2>
                </div>

                <div className="speakers__filters">
                    {['Committee', 'Speakers', 'Posters', 'Students', 'Delegates'].map((category) => (
                        <button
                            key={category}
                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="speakers__grid">
                    {filteredSpeakers.map((speaker) => (
                        <div className="speaker-card" key={speaker.id}>
                            <div className="speaker-img-wrapper">
                                <img src={speaker.image} alt={speaker.name} className="speaker-img" />
                                <div className="speaker-overlay">
                                    {/* Social icons could go here */}
                                </div>
                            </div>
                            <div className="speaker-info">
                                {speaker.category && <span className="speaker-category">{getDisplayCategory(speaker.category)}</span>}
                                <h3 className="speaker-name">{speaker.name}</h3>
                                <p className="speaker-title">{speaker.title}</p>
                                <p className="speaker-affiliation">{speaker.affiliation}</p>
                                <button className="btn-biograph" onClick={() => openModal(speaker)}>
                                    <User size={16} /> Biography
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {showViewAll && (
                    <div className="text-center mt-5">
                        <Link
                            to="/speakers"
                            state={{ category: activeCategory }}
                            className="btn-biograph"
                            style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '2rem' }}
                        >
                            Show More
                        </Link>
                    </div>
                )}
            </div>

            {/* Speaker Modal */}
            {
                selectedSpeaker && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal}>&times;</button>

                            <div className="modal-body">
                                {selectedSpeaker.category && <p className="modal-category">{getDisplayCategory(selectedSpeaker.category)}</p>}
                                <h3 className="modal-title">{selectedSpeaker.name}</h3>
                                <span className="modal-type">{selectedSpeaker.title}</span>
                                <p className="modal-affiliation-highlight">{selectedSpeaker.affiliation}</p>
                                <p className="modal-desc">{selectedSpeaker.bio || "A distinguished expert in the field of general medicine, contributing significantly to research and clinical practice. With years of experience leading healthcare initiatives and publishing groundbreaking studies, they have become a pivotal figure in advancing medical standards globally. Their work focuses on innovative treatment methodologies and improving patient outcomes through evidence-based medicine."}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </section >
    );
};

export default SpeakersSection;
