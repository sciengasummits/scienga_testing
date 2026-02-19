import React from 'react';
import './Program.css';

const Program = () => {
    return (
        <div className="pt-5">
            <div className="page-header" style={{ marginTop: '0' }}>
                <div className="container">
                    <h1 className="page-title">Program</h1>
                    <div className="page-breadcrumb">Home / Program</div>
                </div>
            </div>

            <div className="container">
                <div className="program-page-content text-center">
                    <h2 className="welcome-title">Welcome to Program</h2>
                    <div className="program-status">
                        <div className="status-line"></div>
                        <p className="status-text">Detailed program schedule will be available soon.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Program;
