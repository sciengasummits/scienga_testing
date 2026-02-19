import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { speakers } from '../../../data/speakersData';
import './SpeakersSection.css';

const SpeakersSection = ({ limit = null, showFilters = true }) => {
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Speakers');
    const navigate = useNavigate();

    const filteredSpeakers = speakers.filter(speaker => {
        if (activeCategory === 'Speakers') {
            return speaker.category.toLowerCase().includes('speaker');
        }
        if (activeCategory === 'Posters') {
            return speaker.category === 'Poster Presenter';
        }
        if (activeCategory === 'Delegates') {
            return speaker.category === 'Delegate';
        }
        return speaker.category === activeCategory;
    });

    // Apply limit if provided
    const displaySpeakers = limit ? filteredSpeakers.slice(0, limit) : filteredSpeakers;

    const openModal = (speaker) => {
        setSelectedSpeaker(speaker);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setSelectedSpeaker(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    return (
        <section className="speakers section-padding" id="speakers">
            <div className="container">
                <div className="text-center mb-5">
                    <h4 className="section-subtitle">Meet The Experts</h4>
                    <h2 className="section-title">Global Participants</h2>
                </div>

                {showFilters && (
                    <div className="speakers__filters">
                        {['Speakers', 'Student', 'Committee', 'Posters', 'Delegates'].map((category) => (
                            <button
                                key={category}
                                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                <div className="speakers__grid">
                    {displaySpeakers.map((speaker) => (
                        <div className="speaker-card" key={speaker.id}>
                            <div className="speaker-img-wrapper">
                                <img src={speaker.image} alt={speaker.name} className="speaker-img" />
                                <div className="speaker-overlay">
                                    {/* Social icons could go here */}
                                </div>
                            </div>
                            <div className="speaker-info">
                                {speaker.category && <span className="speaker-category">{speaker.category}</span>}
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

                {limit && filteredSpeakers.length > limit && (
                    <div className="text-center speaker-view-more-wrapper">
                        <button className="btn-view-more" onClick={() => navigate('/speakers')}>
                            View More Speakers
                        </button>
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
                                {selectedSpeaker.category && <p className="modal-category">{selectedSpeaker.category}</p>}
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
