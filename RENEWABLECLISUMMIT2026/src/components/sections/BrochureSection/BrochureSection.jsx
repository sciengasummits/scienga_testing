'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '../../common/Button/Button';
import './BrochureSection.css';

import { fetchContent } from '../../../api/contentApi';

const DEFAULT_BROCHURE = {
    title: 'Conference Brochure',
    description: 'Download the official conference brochure to get detailed information about:',
    features: [
        'Comprehensive Tentative Program',
        'Speaker Profiles & Keynotes',
        'Workshop Details',
        'Sponsorship Opportunities',
        'Registration Packages',
    ],
};

const BrochureSection = () => {
    const router = useRouter();
    const navigate = (path) => router.push(path);
    const [brochure, setBrochure] = React.useState(DEFAULT_BROCHURE);

    React.useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('brochure').then(d => {
                if (!cancelled && d) {
                    setBrochure(prev => ({ ...prev, ...d }));
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

    const handleDownload = () => {
        navigate('/brochure');
    };

    return (
        <section className="brochure-section section-padding" id="brochure">
            <div className="container brochure__container">
                <div className="brochure__content">
                    <h2 className="section-title">{brochure.title}</h2>
                    <p className="brochure__description">
                        {brochure.description}
                        <ul>
                            {(brochure.features || []).map((feat, i) => (
                                <li key={i}>{feat}</li>
                            ))}
                        </ul>
                    </p>
                    <div className="brochure__cta">
                        <Button onClick={handleDownload} size="large">
                            Download Brochure (PDF)
                        </Button>
                    </div>
                </div>
                <div className="brochure__preview">
                    {/* Placeholder for brochure preview image */}
                    <div className="preview-card">
                        <div className="preview-page">
                            <h3>RENEWABLE ENERGY & CLIMATE CHANGE</h3>
                            <p>2027 EDITION</p>
                            <div className="preview-lines"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrochureSection;
