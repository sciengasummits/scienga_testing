import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button/Button';
import { fetchContent } from '../../api/siteApi';
import './VisaInfo.css';

/* ── Default fallback content ── */
const DEFAULTS = {
    pageTitle: 'Visa Information',
    intro: 'The International Conference On RENEWABLE ENERGY & CLIMATE CHANGE welcomes speakers & delegates from all over the world. Below is essential visa-related information to assist with your travel planning to Munich, Germany.',
    sections: [
        {
            id: 'visa_need',
            title: '1. Do You Need a Visa?',
            points: [
                'Check if you require a visa to enter Germany using the German Embassy or Consulate website in your country.',
                'Nationals of many countries (including USA, UK, Canada, Australia, Japan, and most EU countries) may enter Germany for short-term visits without a visa.',
                'All visitors are advised to check entry requirements well in advance of travel.',
            ],
        },
        {
            id: 'visa_types',
            title: '2. Visa Types',
            points: [
                'Short-Stay Schengen Visa (Type C): For stays up to 90 days within a 180-day period, suitable for conference attendance.',
                'National Visa (Type D): Required for stays exceeding 90 days.',
            ],
        },
        {
            id: 'visa_docs',
            title: '3. Required Documents',
            points: [
                'Valid passport (minimum 6 months validity from your planned date of arrival).',
                'Proof of onward travel (confirmed return flight ticket).',
                'Proof of accommodation (hotel booking confirmation).',
                'Proof of sufficient financial means for the duration of stay.',
                'Letter of Invitation (provided by the Summit Committee upon registration).',
            ],
        },
        {
            id: 'visa_invite',
            title: '4. Invitation Letter',
            points: [
                'Registered participants can request an official invitation letter to support their visa application. This letter confirms your registration and participation in the congress.',
            ],
        },
    ],
    contactEmail: 'renewable@sciengasummits.com',
    note: 'Please ensure you apply for your visa well in advance of the conference date. We recommend applying at least 8 weeks before your intended travel date.',
};

const VisaInfo = () => {
    const [data, setData] = useState(DEFAULTS);
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchContent('visa-info')
            .then(d => { if (d && !d.error) setData(prev => ({ ...prev, ...d })); })
            .catch(e => console.warn('[VisaInfo] Could not load content:', e.message));
    }, []);

    const handleInviteRequest = (e) => {
        e.preventDefault();
        alert(`Invitation letter request sent for ${email}. We will get back to you shortly.`);
        setEmail('');
    };

    return (
        <div className="visa-page">
            <header className="page-header">
                <div className="container text-center">
                    <h1 className="page-title">{data.pageTitle}</h1>
                    <div className="page-breadcrumb">Home / Visa Info</div>
                </div>
            </header>

            <section className="section-padding visa-text-section">
                <div className="container">
                    <div className="visa-content-wrapper">
                        <h2 className="visa-main-title">VISA INFORMATION FOR INTERNATIONAL PARTICIPANTS</h2>

                        {data.intro && (
                            <p className="visa-intro-text">{data.intro}</p>
                        )}

                        {(data.sections || []).map((section, idx) => (
                            <div className="visa-info-block" key={section.id || idx}>
                                <h3 className="visa-block-title">{section.title}</h3>
                                <ul className="visa-list">
                                    {(section.points || []).map((point, pIdx) => (
                                        <li key={pIdx}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Invitation Letter Request Form */}
                        <div className="visa-info-block">
                            <div className="simple-invite-form">
                                <p><strong>Request your Invitation Letter:</strong></p>
                                <form onSubmit={handleInviteRequest} className="text-invite-form">
                                    <input
                                        type="email"
                                        placeholder="Enter your registered email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Button type="submit" variant="primary" className="btn-sm">Send Request</Button>
                                </form>
                            </div>
                        </div>

                        {data.note && (
                            <p className="visa-intro-text" style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.04)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--color-primary, #2e7d32)' }}>
                                <strong>Note:</strong> {data.note}
                            </p>
                        )}

                        {data.contactEmail && (
                            <p className="visa-intro-text" style={{ marginTop: '1rem' }}>
                                For visa-related queries, please contact us at:{' '}
                                <a href={`mailto:${data.contactEmail}`} style={{ color: 'var(--color-primary, #2e7d32)', fontWeight: 600 }}>
                                    {data.contactEmail}
                                </a>
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisaInfo;
