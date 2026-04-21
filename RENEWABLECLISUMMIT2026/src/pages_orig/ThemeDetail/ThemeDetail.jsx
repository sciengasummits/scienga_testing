'use client';
import React from 'react';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Compass, Target, Layers, Wind, Cpu, Terminal, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import usePageSEO from '../../hooks/usePageSEO';

const themesData = {
    'RECC-fundamentals': {
        title: 'RECC Fundamentals',
        icon: <Compass size={48} />,
        description: 'Exploring the mathematical foundations and definition of RECC as a physical quantity for rotation.',
        topics: [
            'Mathematical Definition of RECC', 'Vector Decompositions', 'Principal Coordinate System', 'RECC vs. Vorticity', 'Rotational Strength Analysis'
        ]
    },
    'Climate-identification': {
        title: 'Climate Change',
        icon: <Target size={48} />,
        description: 'Advanced methods for identifying and extracting Climate structures from complex flow fields.',
        topics: [
            'Omega (Ω) Method', 'Q-criterion & λ2-criterion', 'Objective Climate Change', 'Threshold Selection Strategies', 'Comparative Study of Methods'
        ]
    },
    'Climate-modeling': {
        title: 'Climate Modeling',
        icon: <Layers size={48} />,
        description: 'Applying Renewable Energy to enhance Climate models and understand energy cascades.',
        topics: [
            'RECC-based RANS Models', 'LES & Wall-bounded Flows', 'DNS Data Analysis', 'Subgrid Scale Modeling', 'Turbulent Structure Extraction'
        ]
    },
    'aerospace-applications': {
        title: 'Aerospace Engineering',
        icon: <Wind size={48} />,
        description: 'Climate dynamics in aerodynamics, wing tip vortices, and propulsion systems.',
        topics: [
            'Wing-tip Climate Control', 'Delta Wing Aerodynamics', 'Turbomachinery Flows', 'Supersonic Climate Stability', 'Unsteady Lift Generation'
        ]
    },
    'cfd-algorithms': {
        title: 'CFD & Algorithms',
        icon: <Cpu size={48} />,
        description: 'High-order numerical schemes and hardware-accelerated Climate tracking.',
        topics: [
            'High-Order Spectral Methods', 'Real-time Climate Detection', 'GPU Accelerated Solvers', 'Adaptive Mesh Refinement', 'Flow Field Reconstruction'
        ]
    },
    'ai-flow-analysis': {
        title: 'AI & Flow Analysis',
        icon: <Terminal size={48} />,
        description: 'Leveraging machine learning for automated Climate feature extraction and prediction.',
        topics: [
            'Deep Learning for Climate Tracking', 'Physics-Informed Neural Networks', 'Reduced Order Modeling', 'Reinforcement Learning in Flow Control', 'Big Data in renewable energy'
        ]
    }
};

const ThemeDetail = () => {
    const { themeId } = useParams();
    const theme = themesData[themeId];

    usePageSEO({
        title: theme ? `${theme.title} – Sessions` : 'Session Theme',
        description: theme
            ? `RECC 2027 session: ${theme.title}. ${theme.description} Topics include: ${(theme.topics || []).slice(0, 3).join(', ')}.`
            : 'RECC 2027 conference session on Renewable Energy, Climate Dynamics, and CFD.',
        canonical: `https://RECC 2027.com/sessions/${themeId || ''}`,
    });

    if (!theme) {
        return (
            <div className="section-padding text-center">
                <h2>Theme Not Found</h2>
                <Link href="/">
                    <Button variant="outline">Go Back Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="theme-detail-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">{theme.title}</h1>
                    <p className="page-breadcrumb">
                        <Link href="/" style={{ color: 'white', textDecoration: 'underline' }}>Home</Link> / Key Themes / {theme.title}
                    </p>
                </div>
            </div>

            <div className="container section-padding">
                <Link href="/" className="mb-4 d-inline-block" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '2rem' }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>

                <div className="theme-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="text-center mb-5">
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--color-bg-light)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: 'var(--color-primary-end)'
                        }}>
                            {theme.icon}
                        </div>
                        <p className="lead" style={{ fontSize: '1.2rem', color: 'var(--color-text-body)' }}>
                            {theme.description}
                        </p>
                    </div>

                    <div className="theme-topics">
                        <h3 className="mb-4">Key Topics & Sessions</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '2rem' }}>
                            {theme.topics.map((topic, index) => (
                                <li key={index} style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-5 text-center">
                        <h3 className="mb-3">Interested in this track?</h3>
                        <Link href="/abstract-submission">
                            <Button>Submit Abstract for {theme.title}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeDetail;
