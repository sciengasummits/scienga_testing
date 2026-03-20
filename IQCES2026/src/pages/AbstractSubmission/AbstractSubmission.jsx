import React, { useState } from 'react';
import Button from '../../components/common/Button/Button';
import { CalendarDays } from 'lucide-react';
import './AbstractSubmission.css';
import { submitAbstract } from '../../api/siteApi';
import { countries } from '../../data/countriesData';




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
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFile(files[0]);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (file) data.append('file', file);
        data.append('conference', 'iqces');

        try {
            const res = await submitAbstract(data);
            if (res.success) {
                alert('Abstract submitted successfully! We will contact you soon.');
                setFormData({
                    title: '', name: '', email: '', mobile: '', organization: '',
                    country: '', interest: '', topic: '', address: ''
                });
                setFile(null);
            } else {
                alert('Submission failed. Please try again or contact support.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
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
                                        <option value="quantum_algorithms">Quantum Algorithms & Complexity</option>
                                        <option value="quantum_info">Quantum Information Processing</option>
                                        <option value="quantum_error">Quantum Error Correction & Fault Tolerance</option>
                                        <option value="quantum_hardware">Quantum Hardware: Superconducting, Trapped Ion, Photonic</option>
                                        <option value="quantum_crypto">Quantum Cryptography & Post-Quantum Security</option>
                                        <option value="quantum_sensing">Quantum Sensing & Precision Measurements</option>
                                        <option value="quantum_control">Scalability & Control of Quantum Systems</option>
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

                            <div className="form-actions">
                                <Button type="submit">Submit Abstract</Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Important Dates */}
                    <div className="abstract-col-right">
                        <h3 className="dates-header-title">Important Dates</h3>

                        <div className="dates-list-vertical">
                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Abstract Submission Opens</h4>
                                    <p>December 10, 2025</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Early Bird Deadline</h4>
                                    <p>February 15, 2026</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Abstract Submission Deadline</h4>
                                    <p>April 20, 2026</p>
                                </div>
                            </div>

                            <div className="date-card-item">
                                <div className="date-icon-circle">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="date-content">
                                    <h4>Conference Date</h4>
                                    <p>June 24–26, 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AbstractSubmission;
