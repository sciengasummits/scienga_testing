import React, { useState, useEffect } from 'react';
import './Brochure.css';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { fetchContent } from '../../api/siteApi';

const DEFAULT_BROCHURE = {
    pdfUrl: null,         // If set by dashboard, use it; else fall back to static asset
    title: 'International Conference on Quantum Computing & Engineering (IQCES-2026)',
    note: '* File size: 2.5 MB • Format: PDF • Updated: December 2025',
};

const Brochure = () => {
    const [brochureData, setBrochureData] = useState(DEFAULT_BROCHURE);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('brochure').then(data => {
                if (!cancelled && data && !data.error) {
                    setBrochureData(prev => ({ ...prev, ...data }));
                }
            }).catch(() => {
                // Keep defaults on failure — static PDF still works
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

    // Use dashboard PDF URL if available, otherwise fall back to static asset
    const pdfSrc = brochureData.pdfUrl || '/brochure.pdf';

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = pdfSrc;
        a.download = 'IQCES2026_Brochure.pdf';
        a.target = '_blank';
        a.click();
    };

    const handleView = () => {
        window.open(pdfSrc, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="brochure-page pt-5">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Conference Brochure</h1>
                    <p className="page-breadcrumb">Home / Brochure</p>
                </div>
            </div>

            <section className="brochure-content section-padding">
                <div className="container">
                    <div className="brochure-grid">
                        <div className="brochure-preview">
                            <div className="preview-card">
                                <div className="preview-icon">
                                    <FileText size={64} strokeWidth={1} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem' }}>{brochureData.title}</h3>
                                <p>Official Digital Platform Brochure</p>
                                <div className="preview-badge">2026 Edition</div>
                            </div>
                        </div>

                        <div className="brochure-details">
                            <h2 className="mb-4">Inside the Brochure</h2>
                            <p className="mb-4 text-muted">
                                Download the official conference brochure to get comprehensive information about the
                                International Conference on Quantum Computing &amp; Engineering.
                                It serves as your complete guide to the event, featuring detailed schedules,
                                speaker profiles, and venue information.
                            </p>

                            <ul className="brochure-features mb-5">
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Complete 3-Day Program Schedule</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Keynote Speaker Biographies &amp; Topics</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Workshop &amp; Breakout Session Details</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Venue Maps &amp; Accommodation Guide</span>
                                </li>
                                <li>
                                    <CheckCircle size={20} className="feature-icon" />
                                    <span>Sponsorship &amp; Exhibition Opportunities</span>
                                </li>
                            </ul>

                            <div className="brochure-actions">
                                <button onClick={handleDownload} className="download-btn">
                                    <Download size={20} />
                                    Download Brochure
                                </button>
                                <button onClick={handleView} className="view-btn">
                                    <FileText size={20} />
                                    View Online
                                </button>
                            </div>
                            <p className="download-note mt-3">
                                {brochureData.note}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Brochure;
