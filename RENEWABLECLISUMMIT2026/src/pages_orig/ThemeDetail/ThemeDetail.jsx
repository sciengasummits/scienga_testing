'use client';
import React from 'react';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Compass, Target, Layers, Wind, Cpu, Terminal, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import usePageSEO from '../../hooks/usePageSEO';

const themesData = {
    'solar-photovoltaics': {
        title: 'Solar Photovoltaics',
        icon: <Compass size={48} />,
        description: 'Advancements in solar cell technology, photovoltaic systems, and thermal energy conversion.',
        topics: [
            'Next-generation Solar Cells', 'Thin-film Technologies', 'Solar Thermal Systems', 'Concentrated Solar Power', 'PV Grid Integration'
        ]
    },
    'wind-energy': {
        title: 'Wind Energy',
        icon: <Target size={48} />,
        description: 'Innovative wind turbine designs, offshore wind farm development, and aerodynamic optimizations.',
        topics: [
            'Offshore Wind Technology', 'Turbine Aerodynamics', 'Floating Wind Platforms', 'Wind Resource Assessment', 'Structural Reliability'
        ]
    },
    'climate-change': {
        title: 'Climate Change',
        icon: <Layers size={48} />,
        description: 'Analyzing climate patterns, carbon footprints, and mitigation strategies for a sustainable future.',
        topics: [
            'Carbon Capture & Storage', 'Global Warming Modeling', 'Climate Policy Frameworks', 'Eco-system Restoration', 'Resilient Infrastructure'
        ]
    },
    'bioenergy-biofuels': {
        title: 'Bioenergy & Biofuels',
        icon: <Wind size={48} />,
        description: 'Developing sustainable biomass energy, second-generation biofuels, and bio-refinery processes.',
        topics: [
            'Sustainable Biomass Sources', 'Algal Biofuels', 'Bio-hydrogen Production', 'Waste-to-Energy Solutions', 'Biochemical Conversion'
        ]
    },
    'smart-grids': {
        title: 'Smart Grids',
        icon: <Cpu size={48} />,
        description: 'Modernizing electrical grids with digital communication, energy storage, and demand-response systems.',
        topics: [
            'Microgrid Management', 'Energy Storage Systems', 'V2G (Vehicle-to-Grid)', 'Demand Side Management', 'Cybersecurity in Smart Grids'
        ]
    },
    'hydrogen-energy': {
        title: 'Hydrogen Energy',
        icon: <Terminal size={48} />,
        description: 'Innovations in green hydrogen production, infrastructure development, and fuel cell technologies.',
        topics: [
            'Electrolysis Advancements', 'Hydrogen Storage Solutions', 'Fuel Cell Vehicle Tech', 'Hydrogen Infrastructure', 'Safety & Standards'
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
            : 'RECC 2027 conference session on Renewable Energy Systems, Climate Action, and CFD.',
        canonical: `https://recc2027.sciengasummits.com/sessions/${themeId || ''}`,
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
