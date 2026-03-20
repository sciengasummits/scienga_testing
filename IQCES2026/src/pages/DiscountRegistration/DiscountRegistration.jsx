import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button/Button';
import * as siteApi from '../../api/siteApi';
import { countries } from '../../data/countriesData';
import './DiscountRegistration.css';

const DEFAULTS = {
    earlyBirdEndDate: '2026-02-15',
    standardEndDate:  '2026-04-20',
    onspotEndDate:    '2026-06-24',
    categories: [
        { id: 'speaker', label: 'Speaker Registration', early: 749, standard: 849, onspot: 949 },
        { id: 'delegate', label: 'Delegate Registration', early: 899, standard: 999, onspot: 1099 },
        { id: 'poster', label: 'Poster Registration', early: 449, standard: 549, onspot: 649 },
        { id: 'student', label: 'Student', early: 299, standard: 399, onspot: 499 },
        { id: 'virtual', label: 'Virtual (Online)', early: 199, standard: 249, onspot: 299 },
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

const DiscountRegistration = () => {
    const [regPricing, setRegPricing] = useState(DEFAULTS);

    useEffect(() => {
        siteApi.fetchContent('registration-prices')
            .then(data => { if (data && !data.error) setRegPricing(prev => ({ ...prev, ...data })); })
            .catch(e => console.warn('[DiscountReg] Could not load pricing:', e.message));
    }, []);

    // Compute active phase from backend dates
    const now = new Date();
    const earlyEnd = new Date(regPricing.earlyBirdEndDate || DEFAULTS.earlyBirdEndDate);
    const stdEnd   = new Date(regPricing.standardEndDate  || DEFAULTS.standardEndDate);
    const activePhase = now <= earlyEnd ? 'early' : now <= stdEnd ? 'standard' : 'onspot';
    const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // ── Derived pricing arrays from backend data ──
    const registrationCategories = (regPricing.categories || DEFAULTS.categories);
    const sponsorshipOptions = (regPricing.sponsorships || DEFAULTS.sponsorships);
    const accommodationOptions = (regPricing.accommodation || DEFAULTS.accommodation);
    const accompanyingPersonPrice = Number(regPricing.accompanyingPersonPrice ?? DEFAULTS.accompanyingPersonPrice);

    const [discountCode, setDiscountCode] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        phone: '',
        country: '',
        company: '',
        address: ''
    });

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSponsorship, setSelectedSponsorship] = useState('');
    const [includeAccompanying, setIncludeAccompanying] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Discount state
    const [appliedDiscount, setAppliedDiscount] = useState({ active: false, percentage: 0 });
    const [discountError, setDiscountError] = useState('');

    // Submission states
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) return;
        setDiscountError('');

        try {
            const result = await siteApi.validateDiscountCode(discountCode);
            if (result.valid) {
                setAppliedDiscount({ active: true, percentage: result.percentage || 20 });
                setDiscountError('');
                alert(`Discount code applied! You get ${result.percentage || 20}% off.`);
            } else {
                setAppliedDiscount({ active: false, percentage: 0 });
                setDiscountError(result.message || 'Invalid discount code.');
            }
        } catch (e) {
            setDiscountError('Error validating code.');
        }
    };

    const getDiscountedPrice = (price) => {
        if (!appliedDiscount.active) return price;
        return Math.round(Number(price) * (1 - appliedDiscount.percentage / 100));
    };

    const calculateTotal = () => {
        let total = 0;

        if (selectedCategory) {
            const category = registrationCategories.find(c => c.id === selectedCategory);
            if (category) total += category[activePhase];
        }
        if (selectedSponsorship) {
            const sponsor = sponsorshipOptions.find(s => s.id === selectedSponsorship);
            if (sponsor) total += sponsor.price;
        }
        if (includeAccompanying) total += accompanyingPersonPrice;
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const option = accommodationOptions.find(o => o.nights === parseInt(nights));
            if (option) total += option[type];
        }

        if (appliedDiscount.active) {
            const discountAmount = total * (appliedDiscount.percentage / 100);
            total -= discountAmount;
        }

        return Math.round(total);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            alert('Please fill in your Full Name and Email before submitting.');
            return;
        }

        if (!termsAccepted) {
            alert('Please accept the terms & conditions.');
            return;
        }

        const total = calculateTotal();
        if (total <= 0) {
            alert('Please select a registration category or sponsorship.');
            return;
        }

        // Build description string
        const descParts = [];
        if (selectedCategory) {
            const cat = registrationCategories.find(p => p.id === selectedCategory);
            if (cat) descParts.push(`${cat.label} : $${cat[activePhase]}`);
        }
        if (selectedSponsorship) {
            const sp = sponsorshipOptions.find(p => p.id === selectedSponsorship);
            if (sp) descParts.push(`${sp.label} : $${sp.price}`);
        }
        if (includeAccompanying) descParts.push(`Accompanying Person : $${accompanyingPersonPrice}`);
        if (selectedAccommodation) {
            const [nights, type] = selectedAccommodation.split('-');
            const accOpt = accommodationOptions.find(o => o.nights === parseInt(nights));
            const accPrice = accOpt ? accOpt[type] : '';
            descParts.push(`Accommodation (${nights} nights, ${type}) : $${accPrice}`);
        }
        if (discountCode) descParts.push(`Discount Code: ${discountCode}`);

        const payload = {
            title: formData.title,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            company: formData.company,
            address: formData.address,
            registrationCategory: selectedCategory
                ? registrationCategories.find(p => p.id === selectedCategory)?.label || ''
                : '',
            accommodation: selectedAccommodation || '',
            sponsorship: selectedSponsorship
                ? sponsorshipOptions.find(p => p.id === selectedSponsorship)?.label || ''
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
                description: `Discount Registration: ${formData.name}`
            });

            // 3. Open Razorpay Checkout
            const options = {
                key: key,
                amount: order.amount,
                currency: order.currency,
                name: 'International Conference on Quantum Computing 2026',
                description: `Payment for ${formData.name}`,
                order_id: order.id,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
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
                            alert('Registration and payment successful!');
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

    return (
        <div className="discount-registration-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Discount Registration</h1>
                    <p className="page-breadcrumb">Home / Register / Discount</p>
                </div>
            </div>

            <div className="container section-padding">
                <form className="discount-reg-form-full" onSubmit={handleSubmit}>
                    {/* Discount Code Section */}
                    <div className="discount-code-section">
                        {/* Payment Badges - Top Right Corner */}
                        <div className="payment-badges-box">
                            <div className="stripe-header">
                                <span className="stripe-text">stripe</span>
                                <span className="secure-text">SECURE<br />PAYMENTS</span>
                            </div>
                            <div className="payment-icons-small">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg" alt="JCB" />
                            </div>
                        </div>

                        <div className="discount-code-header">
                            <h3><span className="tag-icon">🏷️</span> Have a Discount Code?</h3>
                            <p>Enter the discount code provided by the organizers to get reduced pricing.</p>
                        </div>
                        <div className="discount-code-input-group">
                            <input
                                type="text"
                                placeholder="ENTER DISCOUNT CODE (E.G. SAVE20)"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="discount-code-input"
                            />
                            <button
                                type="button"
                                className="apply-code-btn"
                                onClick={handleApplyDiscount}
                            >
                                Apply Code
                            </button>
                        </div>
                        {discountError && <p className="discount-error" style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '8px', fontWeight: 'bold' }}>{discountError}</p>}
                        {appliedDiscount.active && <p className="discount-success" style={{ color: '#16a34a', fontSize: '0.85rem', marginTop: '8px', fontWeight: 'bold' }}>✅ {appliedDiscount.percentage}% Discount Applied!</p>}
                    </div>

                    {/* Personal Details */}
                    <div className="form-section">
                        <h3 className="section-title">Personal Details</h3>
                        <div className="form-grid">
                            <select name="title" value={formData.title} onChange={handleChange} className="form-input" required>
                                <option value="">Select Title</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                                <option value="Dr">Dr</option>
                                <option value="Prof">Prof</option>
                            </select>
                            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} className="form-input" required />
                            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} className="form-input" required />
                            <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} className="form-input" required />
                            <select name="country" value={formData.country} onChange={handleChange} className="form-input" required>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            <input type="text" name="company" placeholder="Company / University" value={formData.company} onChange={handleChange} className="form-input" />
                            <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-input full-width" rows="3"></textarea>
                        </div>
                    </div>

                    {/* Registration Category */}
                    <div className="form-section">
                        <h3 className="section-title">Select Registration Category</h3>
                        <div className="category-table">
                            <div className="category-header">
                                <div className="category-col category-label">Category</div>
                                <div className="category-col category-early active">
                                    <span className="phase-title">Early Bird</span>
                                    <span className="phase-date">{fmtDate(regPricing.earlyBirdEndDate || DEFAULTS.earlyBirdEndDate)}</span>
                                    {activePhase === 'early' && <span className="phase-badge">ACTIVE</span>}
                                </div>
                                <div className={`category-col category-standard${activePhase === 'standard' ? ' active' : ''}`}>
                                    <span className="phase-title">Standard</span>
                                    <span className="phase-date">{fmtDate(regPricing.standardEndDate || DEFAULTS.standardEndDate)}</span>
                                    {activePhase === 'standard' && <span className="phase-badge">ACTIVE</span>}
                                </div>
                                <div className={`category-col category-onspot${activePhase === 'onspot' ? ' active' : ''}`}>
                                    <span className="phase-title">On-Spot</span>
                                    <span className="phase-date">{fmtDate(regPricing.onspotEndDate || DEFAULTS.onspotEndDate)}</span>
                                    {activePhase === 'onspot' && <span className="phase-badge">ACTIVE</span>}
                                </div>
                            </div>
                            {registrationCategories.map((cat) => (
                                <div key={cat.id} className={`category-row ${selectedCategory === cat.id ? 'selected' : ''}`}>
                                    <div className="category-col category-label">
                                        <label>
                                            <input type="radio" name="category" value={cat.id} checked={selectedCategory === cat.id} onChange={(e) => setSelectedCategory(e.target.value)} />
                                            {cat.label}
                                        </label>
                                    </div>
                                     <div className="category-col">
                                        {appliedDiscount.active && <span className="original-price" style={{ textDecoration: 'line-through', fontSize: '0.8em', opacity: 0.6, marginRight: '5px' }}>${cat.early}</span>}
                                        ${getDiscountedPrice(cat.early)}
                                    </div>
                                    <div className="category-col">
                                        {appliedDiscount.active && <span className="original-price" style={{ textDecoration: 'line-through', fontSize: '0.8em', opacity: 0.6, marginRight: '5px' }}>${cat.standard}</span>}
                                        ${getDiscountedPrice(cat.standard)}
                                    </div>
                                    <div className="category-col">
                                        {appliedDiscount.active && <span className="original-price" style={{ textDecoration: 'line-through', fontSize: '0.8em', opacity: 0.6, marginRight: '5px' }}>${cat.onspot}</span>}
                                        ${getDiscountedPrice(cat.onspot)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sponsorship */}
                    <div className="form-section">
                        <h3 className="section-title">Sponsorship Opportunities</h3>
                        <div className="sponsorship-grid">
                            {sponsorshipOptions.map((sponsor) => (
                                <div key={sponsor.id} className={`sponsorship-option ${selectedSponsorship === sponsor.id ? 'selected' : ''}`}>
                                    <div className="sponsor-label">{sponsor.label}</div>
                                    <label className="sponsor-radio-label">
                                        <input type="radio" name="sponsorship" value={sponsor.id} checked={selectedSponsorship === sponsor.id} onChange={(e) => setSelectedSponsorship(e.target.value)} />
                                         <div className="sponsor-price">
                                            {appliedDiscount.active && <span className="original-price" style={{ textDecoration: 'line-through', fontSize: '0.8em', opacity: 0.6, marginRight: '5px' }}>${sponsor.price}</span>}
                                            ${getDiscountedPrice(sponsor.price)}
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Accommodation */}
                    <div className="form-section">
                        <h3 className="section-title">Accommodation</h3>
                        <div className="accompanying-checkbox">
                            <label>
                                <input type="checkbox" checked={includeAccompanying} onChange={(e) => setIncludeAccompanying(e.target.checked)} />
                                Include Accompanying Person (${accompanyingPersonPrice} extra)
                            </label>
                        </div>
                        <div className="accommodation-table">
                            <div className="accommodation-header">
                                <div>Nights</div>
                                <div>Single Occupancy</div>
                                <div>Double Occupancy</div>
                                <div>Triple Occupancy</div>
                            </div>
                            {accommodationOptions.map((option) => (
                                <div key={option.nights} className="accommodation-row">
                                    <div>{option.nights} Nights</div>
                                     <div>
                                        <label>
                                            <input type="radio" name="accommodation" value={`${option.nights}-single`} checked={selectedAccommodation === `${option.nights}-single`} onChange={(e) => setSelectedAccommodation(e.target.value)} />
                                            {appliedDiscount.active && <span className="original-price" style={{ textDecoration: 'line-through', fontSize: '0.8em', opacity: 0.6, marginRight: '5px' }}>${option.single}</span>}
                                            ${getDiscountedPrice(option.single)}
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="radio" name="accommodation" value={`${option.nights}-double`} checked={selectedAccommodation === `${option.nights}-double`} onChange={(e) => setSelectedAccommodation(e.target.value)} />
                                            {appliedDiscount.active && <span className="original-price" style={{ textDecoration: 'line-through', fontSize: '0.8em', opacity: 0.6, marginRight: '5px' }}>${option.double}</span>}
                                            ${getDiscountedPrice(option.double)}
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="radio" name="accommodation" value={`${option.nights}-triple`} checked={selectedAccommodation === `${option.nights}-triple`} onChange={(e) => setSelectedAccommodation(e.target.value)} />
                                            {appliedDiscount.active && <span className="original-price" style={{ textDecoration: 'line-through', fontSize: '0.8em', opacity: 0.6, marginRight: '5px' }}>${option.triple}</span>}
                                            ${getDiscountedPrice(option.triple)}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total and Submit */}
                    <div className="form-section total-section">
                        <div className="total-display">
                            <span>TOTAL AMOUNT (USD):</span>
                            <span className="total-amount">${calculateTotal()}</span>
                        </div>
                        <div className="terms-checkbox">
                            <label>
                                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
                                I've read and accept the <a href="#">terms &amp; conditions</a>
                            </label>
                        </div>
                        <p className="processing-note">Note: {regPricing.processingFeePercent ?? 5}% processing charges will be applicable.</p>
                        <div className="form-actions">
                            <Button
                                type="submit"
                                disabled={submitting}
                                style={{ opacity: submitting ? 0.7 : 1 }}
                            >
                                {submitting ? 'SUBMITTING...' : 'REGISTER NOW'}
                            </Button>
                            <button type="button" className="btn-reset" onClick={() => window.location.reload()}>RESET</button>
                        </div>
                        {submitStatus === 'success' && <p style={{ color: 'green', marginTop: '10px' }}>✅ Registration successful!</p>}
                        {submitStatus === 'error' && <p style={{ color: 'red', marginTop: '10px' }}>❌ Registration failed. Try again.</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DiscountRegistration;