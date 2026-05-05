'use client';
import React, { useState, useEffect } from 'react';
import { fetchUniversities } from '../../api/universitiesApi';
import { resolveImageUrl } from '../../api/utilsApi';
import './UniversitiesPage.css';

const UniversitiesPage = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUniversities().then(data => {
            if (data && Array.isArray(data)) {
                setUniversities(data.filter(u => u.visible !== false));
            }
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <div className="universities-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Universities & Institutions</h1>
                    <p className="page-breadcrumb">Home / Universities</p>
                </div>
            </div>

            <div className="container section-padding">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="universities-grid">
                        {universities.map((uni, idx) => {
                            const resolvedUrl = uni.image ? resolveImageUrl(uni.image) : null;
                            return (
                                <div key={idx} className="uni-card">
                                    <div className="uni-image-container">
                                        {resolvedUrl ? (
                                            <img src={resolvedUrl} alt={uni.name} className="uni-logo" />
                                        ) : (
                                            <div className="uni-placeholder">{uni.name}</div>
                                        )}
                                    </div>
                                    <h3 className="uni-name">{uni.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UniversitiesPage;
