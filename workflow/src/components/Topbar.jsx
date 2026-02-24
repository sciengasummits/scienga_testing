import { Menu, ArrowRight } from 'lucide-react';

export default function Topbar({ onToggleSidebar, eventName }) {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="hamburger" onClick={onToggleSidebar} title="Toggle Sidebar">
                    <Menu size={20} />
                </button>
                <span className="topbar-title">Welcome to Conference Management System</span>
            </div>
            <div className="topbar-right">
                <div className="event-badge">
                    {eventName || 'RENEWABLEMEET2026'}
                    <ArrowRight size={16} />
                </div>
            </div>
        </header>
    );
}
