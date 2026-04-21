'use client';
import React, { useState, useEffect } from 'react';

import './Brochure.css';
import { useRouter } from 'next/navigation';
import { Download, FileText, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import { fetchContent } from '../../api/contentApi';
import { resolveImageUrl } from '../../api/utilsApi';
import usePageSEO from '../../hooks/usePageSEO';

const DEFAULTS = {
    pdfUrl: '',
    title: 'International Conference on Quantum Computing & Engineering (IQCE-2027)',
    description: 'Download the official conference brochure to get comprehensive information about the Quantum Computing & Engineering Summit. It serves as your complete guide to the event, featuring detailed schedules, speaker profiles, and venue information.',
    note: '* PDF will be available soon. Format: PDF',
    features: [
        'Complete 3-Day Program Schedule',
        'Keynote Speaker Biographies & Topics',
        'Workshop & Breakout Session Details',
        'Venue Maps & Accommodation Guide',
        'Sponsorship & Exhibition Opportunities',
    ],
};

const Brochure = () => {
    usePageSEO({
        title: 'Conference Brochure',
        description: 'Download the official iqce2027 conference brochure – program schedule, keynote speaker profiles, workshop details, venue maps, and sponsorship opportunities.',
        canonical: 'https://iqce2027.com/brochure',
    });
    const router = useRouter();
    const navigate = (path) => router.push(path);

    const [brochureData, setBrochureData] = useState(DEFAULTS);
    const [formFilled, setFormFilled] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', number: '' });
    const [submitting, setSubmitting] = useState(false);

    /* ── Load from backend ── */
    useEffect(() => {
        let pdfFound = '';

        const load = async () => {
            try {
                // 1. Check for the uploaded PDF in 'pdfs' key (Global Uploads)
                const pdfs = await fetchContent('pdfs');
                console.log('Fetched PDFs from DB:', pdfs);
                if (pdfs && pdfs.brochure) {
                    pdfFound = pdfs.brochure;
                }

                // 2. Check for the Hero Section's specific brochure link
                const hero = await fetchContent('hero');
                const heroPdf = hero?.brochureUrl;

                // 3. Check for text/feature updates in 'brochure' key
                const data = await fetchContent('brochure');
                console.log('Fetched Brochure Text from DB:', data);
                
                if (data || heroPdf || pdfFound) {
                    setBrochureData(prev => ({
                        ...prev,
                        ...data,
                        // Priority: brochure key pdfUrl > hero key brochureUrl > pdfs key brochure (global) > default
                        pdfUrl: data?.pdfUrl || heroPdf || pdfFound || prev.pdfUrl,
                        features: (data?.features && data.features.length > 0) ? data.features : prev.features,
                    }));
                }
            } catch (err) {
                console.error('Brochure load error:', err);
            }
        };

        load();
    }, []);

    const handleDownloadClick = (e) => {
        e.preventDefault();
        if (brochureData.pdfUrl) {
            const url = resolveImageUrl(brochureData.pdfUrl);
            // Create a temporary link and trigger it for better mobile/popup support
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noreferrer';
            // Extract filename from URL or use default
            const fileName = brochureData.pdfUrl.split('/').pop() || 'brochure.pdf';
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("The full PDF brochure is currently being updated for the 2027 Edition. Please refresh the page or use the 'View Online' button.");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.number) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/brochure-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    number: formData.number,
                    conference: 'iqce2027',
                }),
            });
            const data = await res.json();
            if (data.success) {
                setFormFilled(true);
            } else {
                alert(data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Brochure form error:', err);
            alert('Failed to submit. Please try again later.');
        } finally {
            setSubmitting(false);
        }
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
                                <div className="preview-header">
                                    <div className="preview-logo-placeholder">IQCE 2027</div>
                                    <div className="preview-badge">2027 Edition</div>
                                </div>
                                <div className="preview-main">
                                    <div className="vortex-accent"></div>
                                    <h3 className="preview-title">{brochureData.title}</h3>
                                    <div className="preview-divider"></div>
                                    <p className="preview-subtitle">Official Conference Brochure</p>
                                </div>
                                <div className="preview-footer">
                                    <p>March 15-17, 2027</p>
                                    <p>Munich, Germany</p>
                                </div>
                            </div>
                        </div>

                        <div className="brochure-details">
                            <h2 className="mb-4">Inside the Brochure</h2>
                            <p className="mb-4 text-muted">
                                {brochureData.description}
                            </p>

                            <ul className="brochure-features mb-5">
                                {(brochureData.features || []).map((feat, i) => (
                                    <li key={i}>
                                        <CheckCircle size={20} className="feature-icon" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="brochure-actions">
                                {!formFilled ? (
                                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                                        <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                        <input type="email" placeholder="Your Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                        <input type="tel" placeholder="Your Number" required value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                                        <Button type="submit" disabled={submitting}>
                                            {submitting ? 'Submitting...' : 'Submit to Access'}
                                        </Button>
                                    </form>
                                ) : (
                                    <>
                                        <Button onClick={handleDownloadClick}>
                                            <Download size={20} style={{ marginRight: '8px' }} />
                                            {brochureData.pdfUrl ? 'Download Brochure' : 'PDF Coming Soon'}
                                        </Button>
                                        <Button variant="secondary" onClick={() => brochureData.pdfUrl ? window.open(resolveImageUrl(brochureData.pdfUrl), '_blank') : alert('PDF coming soon')}>
                                            <FileText size={20} style={{ marginRight: '8px' }} />
                                            View Online
                                        </Button>
                                    </>
                                )}
                            </div>
                            <p className="download-note mt-3">{brochureData.note}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Brochure;
