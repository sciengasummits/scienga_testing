'use client';
import React, { useState, useEffect } from 'react';

import { Download, CheckCircle, Calendar, MapPin, Users, Award, FileText, ArrowLeft } from 'lucide-react';
import './DigitalBrochure.css';
import usePageSEO from '../../hooks/usePageSEO';
import { fetchContent } from '../../api/contentApi';
import { useRouter } from 'next/navigation';

const DEFAULTS = {
    title: 'International Conference on Renewable Energy Systems',
    description: 'The premier gathering for experts in renewable energy, climate action, and sustainable technologies.',
    date: 'December 14-16, 2026',
    venue: 'Munich, Germany',
    edition: 'OFFICIAL 2026 EDITION',
    brand: 'RECC VORTEX SUMMIT 2026',
    features: [
        'Advance knowledge of Renewable-based rotation definitions.',
        'Solve the "shear contamination" problem in vortex identification.',
        'Promote cross-disciplinary research in CFD and fluid mechanics.',
        'Implement AI-driven vortex detection frameworks.',
    ],
    themes: [
        'Solar Photovoltaics', 'Omega Method', 'Turbulence Structure Analysis',
        'Machine Learning in Fluids', 'Aerospace Application', 'Climate Action'
    ]
};

const DigitalBrochure = () => {
    const router = useRouter();
    const [data, setData] = useState(DEFAULTS);

    usePageSEO({
        title: 'Digital Brochure | ' + data.title,
        description: 'View the digital brochure online – conference overview, core objectives, and key themes.',
        canonical: 'https://recc2027.sciengasummits.com/digital-brochure',
    });

    useEffect(() => {
        fetchContent('brochure').then(res => {
            if (res) {
                setData(prev => ({
                    ...prev,
                    ...res,
                    title: res.title || prev.title,
                    description: res.description || prev.description,
                }));
            }
        }).catch(err => console.error('Failed to fetch brochure content:', err));
    }, []);

    const handleDownload = () => {
        if (data.pdfUrl) {
            window.open(data.pdfUrl, '_blank');
        } else {
            window.print();
        }
    };

    return (
        <div className="digital-brochure">
            <div className="brochure-nav">
                <button className="back-btn" onClick={() => router.back()}>
                    <ArrowLeft size={20} /> Back to Brochure
                </button>
            </div>

            <div className="brochure-page-container">
                {/* PAGE 1: COVER */}
                <div className="brochure-sheet cover-page">
                    <div className="vortex-background"></div>
                    <div className="brochure-content">
                        <header className="brochure-header">
                            <h4 className="brochure-subtitle-top">INTERNATIONAL</h4>
                            <h1 className="brochure-main-title">
                                {data.title.split(' ').slice(0, 3).join(' ')} <br />
                                <span>{data.title.split(' ').slice(3).join(' ')}</span>
                            </h1>
                        </header>

                        <div className="brochure-hero-info">
                            <div className="info-item">
                                <Calendar size={24} />
                                <div>
                                    <p className="info-label">DATE</p>
                                    <p className="info-value">{data.date}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <MapPin size={24} />
                                <div>
                                    <p className="info-label">VENUE</p>
                                    <p className="info-value">{data.venue}</p>
                                </div>
                            </div>
                        </div>

                        <div className="brochure-edition-badge">
                            {data.edition}
                        </div>
                    </div>
                    <footer className="brochure-footer-brand">
                        {data.brand}
                    </footer>
                </div>

                {/* PAGE 2: OBJECTIVES & THEMES */}
                <div className="brochure-sheet">
                    <div className="sheet-inner">
                        <div className="sheet-side-accent"></div>
                        <h2 className="sheet-title">Conference Overview</h2>
                        <p className="sheet-description">
                            {data.description}
                        </p>

                        <div className="sheet-grid">
                            <div className="sheet-section">
                                <h3><Award size={20} className="section-icon" /> Core Objectives</h3>
                                <ul className="sheet-list">
                                    {(data.features || DEFAULTS.features).map((feat, i) => (
                                        <li key={i}><CheckCircle size={14} /> {feat}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="sheet-section">
                                <h3><Users size={20} className="section-icon" /> Target Audience</h3>
                                <ul className="sheet-list">
                                    <li>Aerospace & Mechanical Engineers</li>
                                    <li>Computational Fluid Dynamics (CFD) Researchers</li>
                                    <li>Atmospheric Scientists & Meteorologists</li>
                                    <li>Applied Mathematicians & Physicists</li>
                                </ul>
                            </div>
                        </div>

                        <div className="sheet-section full-width">
                            <h3><FileText size={20} className="section-icon" /> Key Themes</h3>
                            <div className="themes-flex">
                                {(data.themes || DEFAULTS.themes).map((theme, i) => (
                                    <span key={i} className="theme-tag">{theme}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING ACTION BAR */}
            <div className="digital-brochure-tools">
                <button className="tool-btn" onClick={handleDownload}>
                    <Download size={20} />
                    {data.pdfUrl ? 'Download PDF Brochure' : 'Print / Save as PDF'}
                </button>
            </div>
        </div>
    );
};

export default DigitalBrochure;

