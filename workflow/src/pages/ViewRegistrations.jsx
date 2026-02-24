import React, { useState } from 'react';
import { ClipboardList, Search, ChevronUp, ChevronDown, ChevronsUpDown, Filter } from 'lucide-react';

const MOCK_DATA = [
    { id: 1, title: 'Dr.', name: 'Alice Smith', email: 'alice.smith@university.edu', phone: '+1234567890', country: 'United States', price: 1599, date: '2026-02-18 15:09:08', status: 'Pending', txnId: 'TXN-9028', desc: 'Speaker Registration :\nAccommodation : 3 Nights' },
    { id: 2, title: 'Prof.', name: 'John Doe', email: 'johndoe@institute.org', phone: '+44987654321', country: 'United Kingdom', price: 999, date: '2026-02-15 14:37:25', status: 'Pending', txnId: 'TXN-1049', desc: 'Poster Registration :' },
    { id: 3, title: 'Ms.', name: 'Rooba', email: 'roobafinner@gmail.com', phone: '12345678', country: 'Japan', price: 2099, date: '2026-02-13 10:20:50', status: 'Pending', txnId: 'TXN-5521', desc: 'Speaker Registration :\nAccommodation :\nAccompanying Person :' },
    { id: 4, title: 'Ms.', name: 'Rooba', email: 'roobafinner@gmail.com', phone: '12345678', country: 'Japan', price: 3149, date: '2026-02-13 10:18:52', status: 'Pending', txnId: 'TXN-8832', desc: 'Speaker Registration :\nAccommodation :\nAccompanying Person :' },
    { id: 5, title: 'Ms.', name: 'Rooba', email: 'roobafinner@gmail.com', phone: '12345678', country: 'Japan', price: 4199, date: '2026-02-13 10:16:54', status: 'Pending', txnId: 'TXN-9114', desc: 'Speaker Registration :\nAccommodation :\nAccompanying Person :' },
    { id: 6, title: 'Mr.', name: 'Gift Oke Okiss Erhikevwe', email: 'okissedu@gmail.com', phone: '+2349067241063', country: 'Nigeria', price: 1427, date: '2026-02-11 19:07:16', status: 'Pending', txnId: '', desc: 'Speaker Registration : 999\nAccommodation : 360\nAccompanying Person :' },
    { id: 7, title: 'Mr.', name: 'Ganta Mohan', email: 'mohan.ganta@flyhii.in', phone: '9618850656', country: 'India', price: 890, date: '2026-02-06 22:33:53', status: 'Pending', txnId: '', desc: 'e-Poster Registration : 199' },
    { id: 8, title: '', name: '', email: '', phone: '', country: '', price: 0, date: '2026-02-05 12:07:46', status: 'Pending', txnId: '', desc: '' },
    { id: 9, title: '', name: '', email: '', phone: '', country: '', price: 0, date: '2026-02-05 02:48:31', status: 'Pending', txnId: '', desc: '' },
    { id: 10, title: '', name: '', email: '', phone: '', country: '', price: 0, date: '2026-01-31 03:26:56', status: 'Pending', txnId: '', desc: '' },
];

export default function ViewRegistrations() {
    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState(10);

    return (
        <div className="ac2-page">
            {/* ── Page Header ── */}
            <div className="ac2-page-header">
                <div className="ac2-title-row">
                    <div className="ac2-title-icon" style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)' }}>
                        <ClipboardList size={20} />
                    </div>
                    <div>
                        <h1 className="ac2-title">Registrations</h1>
                        <p className="ac2-subtitle">View and manage all conference delegate registrations</p>
                    </div>
                </div>
            </div>

            <div className="vr-card">

                {/* Toolbar */}
                <div className="vr-toolbar">
                    <div className="vr-toolbar-left">
                        <span className="vr-entries-label">Show</span>
                        <select className="vr-entries-select" value={entries} onChange={(e) => setEntries(Number(e.target.value))}>
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
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Filter records..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="vr-count-banner">
                    <Filter size={14} className="vr-count-icon" />
                    <span>Number of Registrations = <strong>62</strong></span>
                </div>

                {/* Datatable */}
                <div className="vr-table-wrapper">
                    <table className="vr-table">
                        <thead>
                            <tr className="vr-thead-row">
                                <th className="vr-th vr-sortable" style={{ width: 60 }}><div className="vr-th-content">Sno <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 70 }}><div className="vr-th-content">Title <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 150 }}><div className="vr-th-content">Name <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 180 }}><div className="vr-th-content">Author's Email <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 140 }}><div className="vr-th-content">Phone <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 100 }}><div className="vr-th-content">Country <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 80 }}><div className="vr-th-content">price <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 110 }}><div className="vr-th-content">date <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 90 }}><div className="vr-th-content">Status <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 120 }}><div className="vr-th-content">Transaction Id <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                                <th className="vr-th vr-sortable" style={{ width: 220 }}><div className="vr-th-content">Description <ChevronsUpDown size={12} className="vr-sort-icon" /></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_DATA.map((row, idx) => (
                                <tr key={row.id} className="vr-tr">
                                    <td className="vr-td vr-text-center">{row.id}</td>
                                    <td className="vr-td">{row.title}</td>
                                    <td className="vr-td vr-font-medium">{row.name}</td>
                                    <td className="vr-td"><a href={`mailto:${row.email}`} className="vr-email-link">{row.email}</a></td>
                                    <td className="vr-td">{row.phone}</td>
                                    <td className="vr-td">{row.country}</td>
                                    <td className="vr-td vr-text-center">{row.price}</td>
                                    <td className="vr-td vr-text-sm">
                                        {/* We mimic the datatable wrapping by splitting on space or hyphen */}
                                        {row.date.split(' ').map((part, i) => <div key={i}>{part}</div>)}
                                    </td>
                                    <td className="vr-td">
                                        {row.status ? <span className="vr-badge-pending">{row.status}</span> : null}
                                    </td>
                                    <td className="vr-td">{row.txnId}</td>
                                    <td className="vr-td vr-td-desc">
                                        {row.desc.split('\n').map((line, i) => (
                                            <div key={i} className="vr-desc-line">{line}</div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className="vr-pagination-container">
                    <div className="vr-pagination-info">
                        Showing 1 to 10 of 62 entries
                    </div>
                    <div className="vr-pagination">
                        <button className="vr-page-btn vr-page-prev" disabled>Previous</button>
                        <button className="vr-page-btn vr-page-num vr-page-active">1</button>
                        <button className="vr-page-btn vr-page-num">2</button>
                        <button className="vr-page-btn vr-page-num">3</button>
                        <button className="vr-page-btn vr-page-num">4</button>
                        <button className="vr-page-btn vr-page-num">5</button>
                        <button className="vr-page-btn vr-page-num">6</button>
                        <button className="vr-page-btn vr-page-num">7</button>
                        <button className="vr-page-btn vr-page-next">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
