import React, { useState } from 'react';
import { FileText, Search, ChevronsUpDown, Filter, Download } from 'lucide-react';

const MOCK_ABSTRACTS = [
    {
        id: 1, title: 'Mr.', name: 'Gregory Spaulding', country: 'United States',
        email: 'greg.spau@protonmail.com', phone: '7865616367',
        category: 'Poster Presentation', org: 'Magnetic Voltage Source',
        track: 'Others', file: '20382-Abstract.docx', date: '2025-07-13', ip: '76.137.28.210'
    },
    {
        id: 2, title: 'Mr.', name: 'Gregory Spaulding', country: 'United States',
        email: 'greg.spau@protonmail.com', phone: '7865616367',
        category: 'Poster Presentation', org: 'Magnetic Voltage Source',
        track: 'Others', file: '20383-Abstract.docx', date: '2025-07-13', ip: '76.137.28.210'
    },
    {
        id: 3, title: 'Dr.', name: 'Jaroslav Jerz', country: 'Slovak Republic',
        email: 'ummsjerz@savba.sk', phone: '+421905746553',
        category: 'Oral Presentation', org: 'Institute of Materials & Machine Mechanics, Slovak Academy of Sciences',
        track: 'Energy Efficiency: Reduces Energy Consumption and Waste', file: '20411-Abstract.docx', date: '2025-07-30', ip: '147.213.144.3'
    },
    {
        id: 4, title: 'Dr.', name: 'Jaroslav Jerz', country: 'Slovak Republic',
        email: 'ummsjerz@savba.sk', phone: '+421905746553',
        category: 'Oral Presentation', org: 'Institute of Materials & Machine Mechanics, Slovak Academy of Sciences',
        track: 'Solar Energy: Uses sunlight to generate electricity', file: '20412-Abstract.docx', date: '2025-07-30', ip: '147.213.144.3'
    },
    {
        id: 5, title: 'Ms.', name: 'Priya Menon', country: 'India',
        email: 'priya.menon@iitb.ac.in', phone: '+919876543210',
        category: 'Oral Presentation', org: 'Indian Institute of Technology Bombay',
        track: 'Renewable Energy: Sustainable power generation', file: '20430-Abstract.docx', date: '2025-08-02', ip: '49.36.12.100'
    },
    {
        id: 6, title: 'Prof.', name: 'Hans Mueller', country: 'Germany',
        email: 'h.mueller@kit.edu', phone: '+4972160844',
        category: 'Oral Presentation', org: 'Karlsruhe Institute of Technology',
        track: 'Hydrogen Energy: Future fuel systems', file: '20445-Abstract.docx', date: '2025-08-10', ip: '134.130.5.20'
    },
    {
        id: 7, title: 'Mr.', name: 'Liu Wei', country: 'China',
        email: 'liuwei@tsinghua.edu.cn', phone: '+861062785678',
        category: 'Poster Presentation', org: 'Tsinghua University',
        track: 'Solar Energy: Uses sunlight to generate electricity', file: '20450-Abstract.docx', date: '2025-08-15', ip: '101.6.6.6'
    },
    {
        id: 8, title: 'Dr.', name: 'Sankar Kr Acharya', country: 'India',
        email: 'acharya09sankar@gmail.com', phone: '+91-9674419142',
        category: 'Oral Presentation', org: 'Bidhan Chandra Krishi Viswavidyalaya',
        track: 'Climate Change Mitigation: Develops Strategies to Reduce Emissions', file: '20458-Abstract.docx', date: '2025-09-15', ip: '150.242.150.249'
    },
    {
        id: 9, title: 'Mr.', name: 'Edward Eastlack', country: 'USA',
        email: 'edward.eastlack@intermodalrenewables.com', phone: '+1 (504) 432-2785',
        category: 'Oral Presentation', org: 'Intermodal Renewables LLC',
        track: 'Sustainable Transportation: Promotes Environmentally Friendly Transport', file: '20540-Abstract.docx', date: '2026-01-15', ip: '70.171.68.166'
    },
    {
        id: 10, title: 'Mr.', name: 'Peter Babkin', country: 'Greece',
        email: 'babkin@rusteplocentral.ru', phone: '+306937346577',
        category: 'Oral Presentation', org: 'RTC EU',
        track: '', file: '20555-Abstract.docx', date: '2026-02-07', ip: '2a02:214c:8789:c900:c507:d856:c852:8896'
    },
];

export default function ViewAbstracts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState(10);

    const filtered = MOCK_ABSTRACTS.filter(row =>
        Object.values(row).some(v => String(v).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="ac2-page">
            {/* ── Page Header ── */}
            <div className="ac2-page-header">
                <div className="ac2-title-row">
                    <div className="ac2-title-icon" style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                        <FileText size={20} />
                    </div>
                    <div>
                        <h1 className="ac2-title">Abstracts</h1>
                        <p className="ac2-subtitle">View and manage all submitted conference abstracts</p>
                    </div>
                </div>
            </div>

            <div className="vr-card">

                {/* Toolbar */}
                <div className="vr-toolbar">
                    <div className="vr-toolbar-left">
                        <span className="vr-entries-label">Show</span>
                        <select className="vr-entries-select" value={entries} onChange={e => setEntries(Number(e.target.value))}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="vr-entries-label">entries</span>
                    </div>

                    <div className="vr-toolbar-right">
                        <div className="vr-search-box">
                            <span className="vr-search-label">Search:</span>
                            <div className="vr-search-input-wrap">
                                <Search size={14} className="vr-search-icon" />
                                <input
                                    type="text"
                                    className="vr-search-input"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Filter records..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="vr-count-banner" style={{ borderLeftColor: '#7c3aed', background: '#f5f3ff', color: '#4c1d95', borderColor: '#ddd6fe' }}>
                    <Filter size={14} className="vr-count-icon" style={{ color: '#7c3aed' }} />
                    <span>Number of Abstracts = <strong>12</strong></span>
                </div>

                {/* Table */}
                <div className="vr-table-wrapper">
                    <table className="vr-table" style={{ minWidth: 1500 }}>
                        <thead>
                            <tr className="vr-thead-row">
                                <th className="vr-th vr-sortable" style={{ width: 55 }}><div className="vr-th-content">Sno <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 60 }}><div className="vr-th-content">Title <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 140 }}><div className="vr-th-content">Name <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 120 }}><div className="vr-th-content">Country <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 200 }}><div className="vr-th-content">Author's Email <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 140 }}><div className="vr-th-content">Phone Number <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 140 }}><div className="vr-th-content">Abstract Category <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 200 }}><div className="vr-th-content">Organization <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 200 }}><div className="vr-th-content">Track Name <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 160 }}><div className="vr-th-content">File Name <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 95 }}><div className="vr-th-content">Date <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 180 }}><div className="vr-th-content">Ip Address <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.slice(0, entries).map(row => (
                                <tr key={row.id} className="vr-tr">
                                    <td className="vr-td vr-text-center">{row.id}</td>
                                    <td className="vr-td">{row.title}</td>
                                    <td className="vr-td vr-font-medium" style={{ color: '#0284c7' }}>{row.name}</td>
                                    <td className="vr-td" style={{ color: '#0284c7' }}>{row.country}</td>
                                    <td className="vr-td"><a href={`mailto:${row.email}`} className="vr-email-link">{row.email}</a></td>
                                    <td className="vr-td">{row.phone}</td>
                                    <td className="vr-td">
                                        <span className={`va-cat-badge ${row.category === 'Poster Presentation' ? 'va-cat-poster' : 'va-cat-oral'}`}>
                                            {row.category}
                                        </span>
                                    </td>
                                    <td className="vr-td" style={{ color: '#7c3aed', fontWeight: 500 }}>{row.org}</td>
                                    <td className="vr-td" style={{ color: '#0f766e', fontSize: '13px' }}>{row.track}</td>
                                    <td className="vr-td">
                                        {row.file && (
                                            <a href="#" className="va-file-link">
                                                <Download size={13} style={{ marginRight: 4 }} />
                                                {row.file}
                                            </a>
                                        )}
                                    </td>
                                    <td className="vr-td vr-text-sm">{row.date}</td>
                                    <td className="vr-td" style={{ fontSize: 12, color: '#64748b', wordBreak: 'break-all' }}>{row.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="vr-pagination-container">
                    <div className="vr-pagination-info">
                        Showing 1 to 10 of 12 entries
                    </div>
                    <div className="vr-pagination">
                        <button className="vr-page-btn vr-page-prev" disabled>Previous</button>
                        <button className="vr-page-btn vr-page-num vr-page-active">1</button>
                        <button className="vr-page-btn vr-page-num">2</button>
                        <button className="vr-page-btn vr-page-next">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
