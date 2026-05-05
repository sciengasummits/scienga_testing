
import React from 'react';
import { Wind, Tornado } from 'lucide-react';
import Link from 'next/link';
import './Logo.css';

const Logo = ({ className = '', linkTo = '/', onClick }) => {
    return (
        <Link href={linkTo} className={`app-logo ${className}`} onClick={onClick}>
            <div className="logo-icon-container">
                <Tornado size={32} strokeWidth={2.5} style={{ color: '#ffffff' }} />
            </div>
            <div className="logo-text-container">
                <span className="logo-text-main" style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                    IQCE2027
                </span>
            </div>
        </Link>
    );
};

export default Logo;
