import React from 'react';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import AboutSection from '../components/sections/AboutSection/AboutSection';
import StatsSection from '../components/sections/StatsSection/StatsSection';
import KeyThemesSection from '../components/sections/KeyThemesSection/KeyThemesSection';
import SpeakersSection from '../components/sections/SpeakersSection/SpeakersSection';
import PricingSection from '../components/sections/PricingSection/PricingSection';
import SponsorsSection from '../components/sections/SponsorsSection/SponsorsSection';
import PreviousConferenceSection from '../components/sections/PreviousConferenceSection/PreviousConferenceSection';
import UniversitiesMarquee from '../components/sections/UniversitiesMarquee/UniversitiesMarquee';
import '../pages_orig/Home/Home.css';

export const metadata = {
    title: 'Home | RENEWABLECLISUMMIT2026',
    description: 'RENEWABLECLISUMMIT2026 – INTERNATIONAL CONFERENCE ON RENEWABLE ENERGY & CLIMATE CHANGE. December 14–16, 2026, Munich, Germany. Submit abstracts and register now.',
    alternates: {
        canonical: 'https://renewableclisummit2026.sciengasummits.com/',
    }
};

export default function Home() {
    return (
        <div className="home-page">
            <HeroSection />
            <UniversitiesMarquee />
            <AboutSection />
            <StatsSection />
            <SpeakersSection showViewAll={true} />
            <PricingSection />
            <KeyThemesSection showLearnMore={true} />
            <PreviousConferenceSection />
            <SponsorsSection />
        </div>
    );
}
