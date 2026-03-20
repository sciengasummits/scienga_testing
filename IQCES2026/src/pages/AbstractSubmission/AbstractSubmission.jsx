import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button/Button';
import { CalendarDays, CheckCircle, Clock, Star } from 'lucide-react';
import './AbstractSubmission.css';
import { submitAbstract, uploadAbstractFile, fetchContent } from '../../api/siteApi';
import { countries } from '../../data/countriesData';

// ─── Default Important Dates (shown if backend is unreachable) ────────────────
const DEFAULT_DATES = [
    { month: 'DEC', day: '10', year: '2025', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
    { month: 'FEB', day: '15', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
    { month: 'APR', day: '20', year: '2026', event: 'Abstract Submission Deadline', icon: 'Clock' },
    { month: 'JUN', day: '24', year: '2026', event: 'Conference Date', sub: 'June 24–26, 2026, Bern', icon: 'Star' },
];

const ICON_MAP = { CalendarDays, CheckCircle, Clock, Star };

const AbstractSubmission = () => {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        mobile: '',
        organization: '',
        country: '',
        interest: '',
        topic: '',
        address: ''
    });
    const [abstractFile, setAbstractFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

    // ── Live Important Dates from backend ──────────────────────────────────────
    const [importantDates, setImportantDates] = useState(DEFAULT_DATES);

    useEffect(() => {
        let cancelled = false;

        const load = () => {
            fetchContent('importantDates').then(data => {
                if (!cancelled && data?.dates?.length) {
                    setImportantDates(data.dates);
                }
            }).catch(e => console.warn('[AbstractSubmission] Failed to fetch dates:', e.message));
        };

        load();
        const interval = setInterval(load, 15000);
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setAbstractFile(files[0] || null);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            alert('Please fill in your Name and Email before submitting.');
            return;
        }

        setSubmitting(true);
        setSubmitStatus(null);

        let fileUrl = '';
        let fileName = '';

        // Upload file first if one was selected
        if (abstractFile) {
            try {
                const uploaded = await uploadAbstractFile(abstractFile);
                fileUrl = uploaded.url || '';
                fileName = uploaded.originalName || abstractFile.name;
            } catch {
                fileName = abstractFile.name; // non-fatal
            }
        }

        const payload = {
            title: formData.title,
            name: formData.name,
            email: formData.email,
            phone: formData.mobile,
            organization: formData.organization,
            country: formData.country,
            interest: formData.interest,
            topic: formData.topic,
            address: formData.address,
            fileName,
            fileUrl,
            status: 'Pending',
            conference: 'iqces2026',
        };

        try {
            await submitAbstract(payload);
            setSubmitStatus('success');
            setFormData({
                title: '', name: '', email: '', mobile: '',
                organization: '', country: '', interest: '', topic: '', address: ''
            });
            setAbstractFile(null);
        } catch (err) {
            console.error(err);
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="abstract-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Abstract Submission</h1>
                    <p className="page-breadcrumb">Home / Abstract Submission</p>
                </div>
            </div>

            <div className="container section-padding">
                <div className="abstract-layout">

                    {/* Left Column: Form */}
                    <div className="abstract-col-left">
                        <h2 className="abstract-title">Abstract Submission</h2>

                        <p className="abstract-intro">
                            You are invited to submit abstract. Kindly fill the below form to submit an abstract of your research. <a href="#" className="template-link">Download the Abstract Template</a>
                        </p>

                        <form className="submission-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <select
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="" disabled>- Select Title -</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Dr">Dr</option>
                                        <option value="Prof">Prof</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter Name"
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Email"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter Mobile Number"
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                        placeholder="Enter Organization"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="" disabled>- Please choose a country -</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <select
                                        name="interest"
                                        value={formData.interest}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="" disabled>- Interested In -</option>
                                        <option value="oral">Oral Presentation</option>
                                        <option value="poster">Poster Presentation</option>
                                        <option value="workshop">Workshop</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="" disabled>- Select Topics of Discussion: -</option>
                                        <option value="quantum_algorithms">Quantum Algorithms &amp; Complexity</option>
                                        <option value="quantum_info">Quantum Information Processing</option>
                                        <option value="quantum_error">Quantum Error Correction &amp; Fault Tolerance</option>
                                        <option value="quantum_hardware">Quantum Hardware: Superconducting, Trapped Ion, Photonic</option>
                                        <option value="quantum_crypto">Quantum Cryptography &amp; Post-Quantum Security</option>
                                        <option value="quantum_sensing">Quantum Sensing &amp; Precision Measurements</option>
                                        <option value="quantum_control">Scalability &amp; Control of Quantum Systems</option>
                                        <option value="hybrid_systems">Hybrid Quantum-Classical Systems</option>
                                        <option value="industrial_applications">Industrial Applications of Quantum Technologies</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Full Postal Address..."
                                    rows="4"
                                    className="form-control"
                                ></textarea>
                            </div>

                            <div className="form-group full-width">
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        name="file"
                                        className="form-control-file"
                                        accept=".doc,.docx,.pdf,.zip"
                                        onChange={handleChange}
                                    />
                                    <p className="file-upload-note">Note: (.doc), (.docx), (.pdf) and (.zip) files only.</p>
                                </div>
                            </div>

                            {/* Inline feedback banners */}
                            {submitStatus === 'success' && (
                                <div style={{ padding: '14px 20px', background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '10px', color: '#065f46', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                                    ✅ Abstract submitted successfully! We will review your submission and get back to you.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div style={{ padding: '14px 20px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                                    ❌ Submission failed. Please check your internet connection and try again.
                                </div>
                            )}

                            <div className="form-actions">
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                                >
                                    {submitting ? 'Submitting…' : 'Submit Abstract'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Important Dates — live from backend */}
                    <div className="abstract-col-right">
                        <h3 className="dates-header-title">Important Dates</h3>

                        <div className="dates-list-vertical">
                            {importantDates.map((d, i) => {
                                const Icon = ICON_MAP[d.icon] || CalendarDays;
                                const label = [d.month, d.day, d.year].filter(Boolean).join(' ');
                                return (
                                    <div key={i} className="date-card-item">
                                        <div className="date-icon-circle">
                                            <Icon size={20} />
                                        </div>
                                        <div className="date-content">
                                            <h4>{d.event}</h4>
                                            <p>{d.sub || label}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AbstractSubmission;
