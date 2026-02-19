import React from 'react';
import SpeakersSection from '../../components/sections/SpeakersSection/SpeakersSection';

const Speakers = () => {
    return (
        <div className="speakers-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Speakers</h1>
                    <p className="page-breadcrumb">Home / Speakers</p>
                </div>
            </div>
            <SpeakersSection />
        </div>
    );
};

export default Speakers;
