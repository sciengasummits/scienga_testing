import React from 'react';
import { Wheat, Leaf, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ className = '', linkTo = '/', onClick }) => {
    return (
        <Link to={linkTo} className={`app-logo ${className}`} onClick={onClick}>
            <div className="logo-icon-container">
                <div className="logo-icon-circle">
                    <Wheat size={24} strokeWidth={2.5} className="logo-icon-primary" />
                </div>
                <div className="logo-icon-accent">
                    <Leaf size={14} className="logo-leaf-accent" />
                </div>
            </div>
            <div className="logo-text-container">
                <span className="logo-text-main">CROP SCIENCE</span>
                <span className="logo-text-year">CONFERENCE 2026</span>
            </div>
        </Link>
    );
};

export default Logo;
