import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../../common/Button/Button';
import './RegistrationPricingSection.css';
import { fetchContent } from '../../../api/siteApi';

const DEFAULT_PACKAGES = [
    {
        title: 'SPEAKER',
        price: '799',
        currency: '$',
        features: [
            'Oral Presentation',
            'Networking with Fellow Speakers',
            'E-Abstract Book',
            'Certificate of Attendance',
            'Conference Schedule Handout',
            'Access to All Sessions and Workshops',
            'Lunch and Coffee Breaks'
        ]
    },
    {
        title: 'DELEGATE',
        price: '899',
        currency: '$',
        highlighted: true,
        features: [
            'Delegate Opportunities',
            'Connect with Fellow Delegates',
            'E-Abstract Book',
            'Certificate of Attendance',
            'Conference Schedule Handout',
            'Access to All Sessions and Workshops',
            'Lunch and Coffee Breaks'
        ]
    },
    {
        title: 'STUDENT',
        price: '499',
        currency: '$',
        features: [
            'Student Presentation',
            'Meet Our Experts',
            'E-Abstract Book',
            'Certificate of Attendance',
            'Conference Schedule Handout',
            'Access to All Sessions and Workshops',
            'Lunch and Coffee Breaks'
        ]
    }
];

const RegistrationPricingSection = () => {
    const navigate = useNavigate();
    const [pricing, setPricing] = useState({ title: 'REGISTRATION PRICING', packages: DEFAULT_PACKAGES });

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('pricing').then(data => {
                if (!cancelled && data) setPricing(prev => ({ ...prev, ...data }));
            }).catch(e => console.warn('[RegistrationPricing] Could not load content:', e.message));
        };

        load(); // initial fetch

        // Poll every 30 seconds so dashboard edits appear without a page reload
        const interval = setInterval(load, 30000);

        // Re-fetch when tab becomes visible again
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    const packages = pricing.packages?.length > 0 ? pricing.packages : DEFAULT_PACKAGES;

    return (
        <section className="registration-pricing section-padding">
            <div className="container">
                <h2 className="section-title text-center">{pricing.title || 'REGISTRATION PRICING'}</h2>

                <div className="pricing-cards">
                    {packages.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
                        >
                            <div className="pricing-header">
                                <h3 className="pricing-title">{plan.title?.toUpperCase()}</h3>
                                <div className="pricing-amount">
                                    <span className="currency">{plan.currency || '$'}</span>
                                    <span className="price">{plan.price}</span>
                                </div>
                            </div>

                            <ul className="pricing-features">
                                {(plan.features || []).map((feature, idx) => (
                                    <li key={idx}>
                                        <Check size={18} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button onClick={() => navigate('/register')}>
                                REGISTER NOW
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RegistrationPricingSection;
