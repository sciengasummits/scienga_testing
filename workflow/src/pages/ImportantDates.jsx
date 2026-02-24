import { useState } from 'react';
import {
    Globe, Mail, Facebook, Twitter, Linkedin,
    Calendar, User, Save, RotateCcw, CheckCircle,
    Type, Link, MapPin, BookOpen, Heading
} from 'lucide-react';

const DEFAULTS = {
    shortName: 'RENEWABLEMEET2026',
    completeUrl: 'https://renewableenergy2026.sciengasummits.com/',
    title: '2nd International Meet & E',
    subject: 'Renewable and Sustainable Energy',
    venue: 'Rome, Italy',
    dates: 'May 25-26, 2026',
    theme: 'Empowering a Greener Future through Renewable and Sustainable Energy',
    email: 'renewablemeet2026@sciengasummits.com',
    facebook: '',
    twitter: '',
    linkedin: '',
    abstractDeadline: '2026-02-25',
    registrationOpens: '2025-06-11',
    earlyBird: '2025-10-09',
    standardRegistration: '2026-02-25',
    onSpot: '2026-05-25',
    fullName: 'R. Shashika',
};

/* Reusable field row */
function FieldRow({ icon: Icon, label, example, children }) {
    return (
        <div className="id-field-row">
            <div className="id-field-label">
                {Icon && <Icon size={15} className="id-field-icon" />}
                <div>
                    <span className="id-label-text">{label}</span>
                    {example && (
                        <span className="id-example">
                            {' '}(Example: <span className="id-example-val">{example}</span>):
                        </span>
                    )}
                    {!example && <span className="id-colon">:</span>}
                </div>
            </div>
            <div className="id-field-input">{children}</div>
        </div>
    );
}

export default function ImportantDates() {
    const [form, setForm] = useState(DEFAULTS);
    const [saved, setSaved] = useState(false);

    const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

    const handleUpdate = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleReset = () => {
        setForm(DEFAULTS);
        setSaved(false);
    };

    /* Format date value for display inside date input */
    const dateVal = (v) => v || '';

    return (
        <div className="id-page">
            {/* Page Header */}
            <div className="id-page-header">
                <div>
                    <h1 className="id-title">Important Dates</h1>
                    <p className="id-subtitle">Configure key conference dates and information for your event.</p>
                </div>
                {saved && (
                    <div className="id-save-badge">
                        <CheckCircle size={15} />
                        Changes saved
                    </div>
                )}
            </div>

            {/* Form Card */}
            <div className="id-card">

                {/* Section: Conference Info */}
                <div className="id-section">
                    <div className="id-section-header">
                        <span className="id-section-dot" />
                        <span className="id-section-title">Conference Information</span>
                    </div>

                    <FieldRow icon={Type} label="Conference ShortName">
                        <input
                            className="id-input"
                            type="text"
                            value={form.shortName}
                            onChange={set('shortName')}
                        />
                    </FieldRow>

                    <FieldRow icon={Link} label="Conference Complete URL">
                        <input
                            className="id-input"
                            type="url"
                            value={form.completeUrl}
                            onChange={set('completeUrl')}
                        />
                    </FieldRow>

                    <FieldRow icon={Heading} label="Conference Title">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '600px' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    className="id-input"
                                    type="text"
                                    value={form.title}
                                    onChange={set('title')}
                                />
                                <button type="button" className="id-btn-secondary">
                                    superscript
                                </button>
                            </div>
                            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500 }}>
                                ex: 2<sup>nd</sup> International Conference On
                            </span>
                            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                                Note: select the text and click <strong>superscript</strong> to make changes and then update to see in website.
                            </span>
                        </div>
                    </FieldRow>

                    <FieldRow icon={BookOpen} label="Conference Subject">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '600px' }}>
                            <textarea
                                className="id-textarea"
                                rows={3}
                                value={form.subject}
                                onChange={set('subject')}
                            />
                            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500 }}>
                                ex: Nanotechnology Conference &amp; Expo
                            </span>
                        </div>
                    </FieldRow>

                    <FieldRow icon={MapPin} label="Conference venue">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', maxWidth: '600px' }}>
                            <input
                                className="id-input"
                                type="text"
                                value={form.venue}
                                onChange={set('venue')}
                            />
                            <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500 }}>
                                Ex: India, Delhi
                            </span>
                        </div>
                    </FieldRow>

                    <FieldRow icon={Calendar} label="Conference Dates" example="September 12, 2022">
                        <input
                            className="id-input"
                            type="text"
                            value={form.dates}
                            onChange={set('dates')}
                        />
                    </FieldRow>

                    <FieldRow icon={Globe} label="Conference Theme">
                        <input
                            className="id-input"
                            type="text"
                            value={form.theme}
                            onChange={set('theme')}
                            placeholder="Enter conference theme"
                        />
                    </FieldRow>

                    <FieldRow icon={Mail} label="Conference EmailId1 (PRIMARY)">
                        <input
                            className="id-input"
                            type="email"
                            value={form.email}
                            onChange={set('email')}
                            placeholder="primary@email.com"
                        />
                    </FieldRow>
                </div>

                <div className="id-divider" />

                {/* Section: Social Links */}
                <div className="id-section">
                    <div className="id-section-header">
                        <span className="id-section-dot id-dot-blue" />
                        <span className="id-section-title">Social Media Links</span>
                    </div>

                    <FieldRow icon={Facebook} label="Facebook Link">
                        <input
                            className="id-input"
                            type="url"
                            value={form.facebook}
                            onChange={set('facebook')}
                            placeholder="https://facebook.com/your-page"
                        />
                    </FieldRow>

                    <FieldRow icon={Twitter} label="Twitter Link">
                        <input
                            className="id-input"
                            type="url"
                            value={form.twitter}
                            onChange={set('twitter')}
                            placeholder="https://twitter.com/your-handle"
                        />
                    </FieldRow>

                    <FieldRow icon={Linkedin} label="LinkedIn Link">
                        <input
                            className="id-input"
                            type="url"
                            value={form.linkedin}
                            onChange={set('linkedin')}
                            placeholder="https://linkedin.com/in/your-profile"
                        />
                    </FieldRow>
                </div>

                <div className="id-divider" />

                {/* Section: Key Dates */}
                <div className="id-section">
                    <div className="id-section-header">
                        <span className="id-section-dot id-dot-amber" />
                        <span className="id-section-title">Key Dates &amp; Deadlines</span>
                    </div>

                    <FieldRow icon={Calendar} label="Abstract Submission Deadline" example="September 12, 2022">
                        <input
                            className="id-input id-date-input"
                            type="date"
                            value={dateVal(form.abstractDeadline)}
                            onChange={set('abstractDeadline')}
                        />
                    </FieldRow>

                    <FieldRow icon={Calendar} label="Registration Opens" example="September 12, 2022">
                        <input
                            className="id-input id-date-input"
                            type="date"
                            value={dateVal(form.registrationOpens)}
                            onChange={set('registrationOpens')}
                        />
                    </FieldRow>

                    <FieldRow icon={Calendar} label="EarlyBird" example="September 12, 2022">
                        <input
                            className="id-input id-date-input"
                            type="date"
                            value={dateVal(form.earlyBird)}
                            onChange={set('earlyBird')}
                        />
                    </FieldRow>

                    <FieldRow icon={Calendar} label="Standard Registration" example="September 12, 2022">
                        <input
                            className="id-input id-date-input"
                            type="date"
                            value={dateVal(form.standardRegistration)}
                            onChange={set('standardRegistration')}
                        />
                    </FieldRow>

                    <FieldRow icon={Calendar} label="On Spot" example="September 12, 2022">
                        <input
                            className="id-input id-date-input"
                            type="date"
                            value={dateVal(form.onSpot)}
                            onChange={set('onSpot')}
                        />
                    </FieldRow>
                </div>

                <div className="id-divider" />

                {/* Section: Contact */}
                <div className="id-section">
                    <div className="id-section-header">
                        <span className="id-section-dot id-dot-purple" />
                        <span className="id-section-title">Contact</span>
                    </div>

                    <FieldRow icon={User} label="Enter Your Full Name">
                        <input
                            className="id-input id-name-input"
                            type="text"
                            value={form.fullName}
                            onChange={set('fullName')}
                            placeholder="e.g. Dr. John Smith"
                        />
                    </FieldRow>
                </div>

                {/* Action Buttons */}
                <div className="id-actions">
                    <button className="id-btn-reset" onClick={handleReset}>
                        <RotateCcw size={15} /> Reset
                    </button>
                    <button className="id-btn-save" onClick={handleUpdate}>
                        <Save size={15} /> Update
                    </button>
                </div>
            </div>
        </div>
    );
}
