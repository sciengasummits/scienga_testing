import React, { useState, useEffect } from 'react';
import * as siteApi from '../../api/siteApi';
import { countries } from '../../data/countriesData';
import './Register.css';

/* ── Default fallback pricing (used if API is unavailable) ── */
const DEFAULTS = {
    earlyBirdEndDate: '2026-02-15',
    standardEndDate: '2026-04-20',
    onspotEndDate: '2026-06-24',
    categories: [
        { id: 'speaker', label: 'Speaker Registration', early: 749, standard: 849, onspot: 949 },
        { id: 'delegate', label: 'Delegate Registration', early: 899, standard: 999, onspot: 1099 },
        { id: 'poster', label: 'Poster Registration', early: 449, standard: 549, onspot: 649 },
        { id: 'student', label: 'Student', early: 299, standard: 399, onspot: 499 },
        { id: 'Virtual', label: 'Virtual (Online)', early: 199, standard: 249, onspot: 299 },
    ],
    sponsorships: [
        { id: 'platinum', label: 'Platinum Sponsor', price: 4999 },
        { id: 'diamond', label: 'Diamond Sponsor', price: 3999 },
        { id: 'gold', label: 'Gold Sponsor', price: 2999 },
        { id: 'exhibitor', label: 'Exhibitor', price: 1999 },
    ],
    accommodation: [
        { nights: 2, single: 360, double: 400, triple: 440 },
        { nights: 3, single: 540, double: 600, triple: 660 },
        { nights: 4, single: 720, double: 800, triple: 880 },
        { nights: 5, single: 900, double: 1000, triple: 1100 },
    ],
    accompanyingPersonPrice: 249,
    processingFeePercent: 5,
};

const Register = ({ isDiscounted = false }) => {
    // ── Pricing state loaded from backend ──
    const [regPricing, setRegPricing] = useState(DEFAULTS);

    useEffect(() => {
        siteApi.fetchContent('registration-prices')
            .then(data => {
                if (data && !data.error) {
                    setRegPricing(prev => ({ ...prev, ...data }));
                }
            })
            .catch(e => console.warn('[Register] Could not load pricing:', e.message));
    }, []);

    // State for form fields
    const [formData, setFormData] = useState({
        designation: '',
        fullName: '',
        email: '',
        telephone: '',
        country: '',
        company: '',
        address: ''
    });

    const [selectedAcademicCategory, setSelectedAcademicCategory] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [includeAccompanying, setIncludeAccompanying] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [selectedSponsorship, setSelectedSponsorship] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

    // Discount multiplier (20% off if discounted)
    const discountMultiplier = isDiscounted ? 0.8 : 1;
    const applyDiscount = (price) => Math.round(Number(price) * discountMultiplier);

    // ── Date Logic to determine active phase (driven by backend dates) ──
    const currentDate = new Date();
    const earlyBirdEnd = new Date(regPricing.earlyBirdEndDate || DEFAULTS.earlyBirdEndDate);
    const standardEnd = new Date(regPricing.standardEndDate || DEFAULTS.standardEndDate);

    let activePhase = 'early';
    if (currentDate <= earlyBirdEnd) {
        activePhase = 'early';
    } else if (currentDate <= standardEnd) {
        activePhase = 'standard';
    } else {
        activePhase = 'onspot';
    }

    // ── Helper: format a date string for display ──
    const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // ── Derived pricing arrays from backend data ──
    const academicPricing = (regPricing.categories || DEFAULTS.categories).map(cat => ({
        ...cat,
        early: applyDiscount(cat.early),
        standard: applyDiscount(cat.standard),
        onspot: applyDiscount(cat.onspot),
        original: { early: cat.early, standard: cat.standard, onspot: cat.onspot },
    }));

    const accommodationOptions = regPricing.accommodation || DEFAULTS.accommodation;

    const sponsorshipPricing = (regPricing.sponsorships || DEFAULTS.sponsorships).map(sp => ({
        ...sp,
        price: applyDiscount(sp.price),
        originalPrice: sp.price,
    }));

    const accompanyingPersonPrice = Number(regPricing.accompanyingPersonPrice ?? DEFAULTS.accompanyingPersonPrice);

    // Helper to calculate total
    const calculateTotal = () => {
        let total = 0;

        if (selectedAcademicCategory) {
            const item = academicPricing.find(p => p.id === selectedAcademicCategory);
            if (item) total += item[activePhase];
        }
        if (selectedSponsorship) {
            const item = sponsorshipPricing.find(p => p.id === selectedSponsorship);
            if (item) total += item.price;
        }
        if (includeAccompanying) total += accompanyingPersonPrice;
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const option = accommodationOptions.find(o => o.nights === parseInt(nights));
            if (option) total += option[type];
        }

        return total;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email) {
            alert('Please fill in your Full Name and Email before submitting.');
            return;
        }

        if (!termsAccepted) {
            alert('Please accept terms and conditions');
            return;
        }

        const total = calculateTotal();
        if (total <= 0) {
            alert('Please select a registration category or sponsorship.');
            return;
        }

        // Build description string
        const descParts = [];
        if (selectedAcademicCategory) {
            const cat = academicPricing.find(p => p.id === selectedAcademicCategory);
            if (cat) descParts.push(`${cat.label} : $${cat[activePhase]}`);
        }
        if (selectedSponsorship) {
            const sp = sponsorshipPricing.find(p => p.id === selectedSponsorship);
            if (sp) descParts.push(`${sp.label} : $${sp.price}`);
        }
        if (includeAccompanying) descParts.push(`Accompanying Person : $${accompanyingPersonPrice}`);
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const accOpt = accommodationOptions.find(o => o.nights === parseInt(nights));
            const accPrice = accOpt ? accOpt[type] : '';
            descParts.push(`Accommodation (${nights} nights, ${type}) : $${accPrice}`);
        }

        const payload = {
            title: formData.designation,
            name: formData.fullName,
            email: formData.email,
            phone: formData.telephone,
            country: formData.country,
            company: formData.company,
            address: formData.address,
            registrationCategory: selectedAcademicCategory
                ? academicPricing.find(p => p.id === selectedAcademicCategory)?.label || ''
                : '',
            accommodation: selectedAccommodation || '',
            sponsorship: selectedSponsorship
                ? sponsorshipPricing.find(p => p.id === selectedSponsorship)?.label || ''
                : '',
            accompanyingPerson: includeAccompanying,
            totalAmount: total,
            description: descParts.join('\n'),
            status: 'Pending',
            conference: 'iqces'
        };

        setSubmitting(true);
        setSubmitStatus(null);

        try {
            // 1. Create registration record (Pending)
            const registration = await siteApi.submitRegistration(payload);
            if (!registration || registration.error) throw new Error(registration?.error || 'Failed to save registration.');

            // 2. Fetch Razorpay key & Create order
            const { key } = await siteApi.fetchPaymentKey();
            const { order } = await siteApi.createPaymentOrder({
                amount: total,
                registrationId: registration._id,
                description: `International Conference: ${formData.fullName}`
            });

            // 3. Open Razorpay Checkout
            const options = {
                key: key,
                amount: order.amount,
                currency: order.currency,
                name: 'International Conference on Quantum Computing 2026',
                description: `Payment for ${formData.fullName}`,
                order_id: order.id,
                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.telephone,
                },
                theme: { color: '#1e3a8a' },
                handler: async (response) => {
                    // 4. Verify Payment
                    try {
                        const verifyResult = await siteApi.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            registrationId: registration._id,
                        });

                        if (verifyResult.success) {
                            setSubmitStatus('success');
                            handleReset();
                        } else {
                            throw new Error(verifyResult.message || 'Payment verification failed.');
                        }
                    } catch (err) {
                        alert('Payment success but verification failed: ' + err.message);
                        setSubmitStatus('error');
                    }
                },
                modal: {
                    ondismiss: () => {
                        setSubmitting(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error('Registration/Payment error:', err);
            setSubmitStatus('error');
            alert(err.message || 'An error occurred during registration.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            designation: '',
            fullName: '',
            email: '',
            telephone: '',
            country: '',
            company: '',
            address: ''
        });
        setSelectedAcademicCategory(null);
        setTermsAccepted(false);
        setIncludeAccompanying(false);
        setSelectedAccommodation(null);
        setSelectedSponsorship(null);
    };

    return (
        <div className="register-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Registration</h1>
                    <p className="page-breadcrumb">Home / Register</p>
                </div>
            </div>

            <div className="container section-padding">

                {isDiscounted && (
                    <div className="discount-banner">
                        <span className="discount-icon">🎉</span>
                        <div className="discount-text">
                            <h3>Special Discount Activated!</h3>
                            <p>You have unlocked a <strong>20% discount</strong> on all registration categories.</p>
                        </div>
                    </div>
                )}

                {/* Personal Details Section */}
                <div className="personal-details-section">
                    <h2 className="section-heading">Personal Details</h2>
                    <div className="registration-form-container">
                        <div className="form-section full-width-form">
                            <div className="form-row">
                                <select
                                    name="designation"
                                    className="form-control"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Designation</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Dr">Dr</option>
                                    <option value="Prof">Prof</option>
                                    <option value="PhD">PhD</option>
                                </select>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="form-control"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-row">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="tel"
                                    name="telephone"
                                    placeholder="Telephone Number"
                                    className="form-control"
                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-row">
                                <select
                                    name="country"
                                    className="form-control"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company/University"
                                    className="form-control"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-row full-width">
                                <textarea
                                    name="address"
                                    placeholder="Address"
                                    className="form-control"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Select Registration Category Section */}
                <div className="select-category-section">
                    <h2 className="section-heading">Select Registration Category</h2>
                    <div className="pricing-section">
                        <table className="pricing-table">
                            <thead>
                                <tr>
                                    <th className="category-column-header">TYPES OF PARTICIPATION</th>
                                    <th className={activePhase === 'early' ? 'active-header-early' : ''}>
                                        Early Bird<br />
                                        <span className="date">{fmtDate(regPricing.earlyBirdEndDate || DEFAULTS.earlyBirdEndDate)}</span>
                                        {activePhase === 'early' && <span className="badge-active">ACTIVE</span>}
                                    </th>
                                    <th className={activePhase === 'standard' ? 'active-header-standard' : ''}>
                                        Standard<br />
                                        <span className="date">{fmtDate(regPricing.standardEndDate || DEFAULTS.standardEndDate)}</span>
                                        {activePhase === 'standard' && <span className="badge-active">ACTIVE</span>}
                                    </th>
                                    <th className={activePhase === 'onspot' ? 'active-header-onspot' : ''}>
                                        On-Spot<br />
                                        <span className="date">{fmtDate(regPricing.onspotEndDate || DEFAULTS.onspotEndDate)}</span>
                                        {activePhase === 'onspot' && <span className="badge-active">ACTIVE</span>}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {academicPricing.map(item => (
                                    <tr key={item.id} className={selectedAcademicCategory === item.id ? 'selected-row' : ''}>
                                        <td className="item-cell">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="academicCategory"
                                                    checked={selectedAcademicCategory === item.id}
                                                    onChange={() => setSelectedAcademicCategory(item.id)}
                                                    style={{
                                                        accentColor: '#1e3a8a',
                                                        width: '20px',
                                                        height: '20px',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                                {item.label}
                                            </label>
                                        </td>
                                        <td className={`${activePhase === 'early' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}`}>
                                            <div className="price-wrapper">
                                                {isDiscounted && <span className="original-price">${item.original.early}</span>}
                                                <span className={activePhase === 'early' ? 'price-active' : ''}>$ {item.early}</span>
                                            </div>
                                        </td>
                                        <td className={`${activePhase === 'standard' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}`}>
                                            <div className="price-wrapper">
                                                {isDiscounted && <span className="original-price">${item.original.standard}</span>}
                                                <span className={activePhase === 'standard' ? 'price-active' : ''}>$ {item.standard}</span>
                                            </div>
                                        </td>
                                        <td className={`${activePhase === 'onspot' && selectedAcademicCategory === item.id ? 'selected-active-cell' : ''}`}>
                                            <div className="price-wrapper">
                                                {isDiscounted && <span className="original-price">${item.original.onspot}</span>}
                                                <span className={activePhase === 'onspot' ? 'price-active' : ''}>$ {item.onspot}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Sponsorship Opportunities Section */}
                        <div className="sponsorship-section">
                            <h3 className="sponsorship-heading"></h3>
                            <div className="sponsorship-grid">
                                {sponsorshipPricing.map(item => (
                                    <div key={item.id} className={`sponsorship-card ${selectedSponsorship === item.id ? 'selected' : ''}`}>
                                        <div className="sponsor-label">{item.label}</div>
                                        <label className="sponsorship-card-label">
                                            <input
                                                type="radio"
                                                name="sponsorship"
                                                checked={selectedSponsorship === item.id}
                                                onChange={() => setSelectedSponsorship(item.id)}
                                                style={{
                                                    accentColor: '#1e3a8a',
                                                    width: '18px',
                                                    height: '18px',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                            <div className="sponsor-price">${item.price}</div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accommodation Section */}
                <div className="accommodation-section">
                    <h3 className="accommodation-heading"></h3>
                    <div className="accompanying-checkbox">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={includeAccompanying}
                                onChange={(e) => setIncludeAccompanying(e.target.checked)}
                            />
                            <strong>Include Accompanying Person ( ${accompanyingPersonPrice} Extra)</strong>
                        </label>
                    </div>

                    <table className="accommodation-table">
                        <thead>
                            <tr>
                                <th>Accommodation</th>
                                <th>Single Occupancy</th>
                                <th>Double Occupancy</th>
                                <th>Triple Occupancy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accommodationOptions.map((option) => (
                                <tr key={option.nights}>
                                    <td className="nights-cell">For {option.nights} Nights</td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-single`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-single`)}
                                                style={{ accentColor: '#1e3a8a', width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            ${option.single}
                                        </label>
                                    </td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-double`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-double`)}
                                                style={{ accentColor: '#1e3a8a', width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            ${option.double}
                                        </label>
                                    </td>
                                    <td>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="accommodation"
                                                checked={selectedAccommodation === `${option.nights}-triple`}
                                                onChange={() => setSelectedAccommodation(`${option.nights}-triple`)}
                                                style={{ accentColor: '#1e3a8a', width: '18px', height: '18px', cursor: 'pointer' }}
                                            />
                                            ${option.triple}
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="summary-section">
                    <div className="total-display">
                        <span className="total-label">TOTAL PRICE($) :</span>
                        <span className="total-amount">{calculateTotal()}</span>
                    </div>

                    <div className="terms-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            I've read and accept the <span className="terms-link">terms &amp; conditions</span>.
                        </label>
                    </div>

                    <p className="processing-fee">Note: {regPricing.processingFeePercent ?? 5}% of processing charges will be applicable.</p>

                    {submitStatus === 'success' && (
                        <div style={{ padding: '14px 20px', background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '10px', color: '#065f46', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                            ✅ Registration submitted successfully! We will contact you shortly.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div style={{ padding: '14px 20px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                            ❌ Submission failed. Please check your connection and try again.
                        </div>
                    )}

                    <div className="action-buttons">
                        <button
                            className="btn-register"
                            onClick={handleSubmit}
                            disabled={submitting}
                            style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                        >
                            {submitting ? 'SUBMITTING...' : 'REGISTER NOW'}
                        </button>
                        <button className="btn-reset" onClick={handleReset}>RESET</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
