import React from 'react';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import AboutSection from '../components/sections/AboutSection/AboutSection';
import StatsSection from '../components/sections/StatsSection/StatsSection';
import KeyThemesSection from '../components/sections/KeyThemesSection/KeyThemesSection';
import SpeakersSection from '../components/sections/SpeakersSection/SpeakersSection';
import PricingSection from '../components/sections/PricingSection/PricingSection';
import VenueSection from '../components/sections/VenueSection/VenueSection';
import SponsorsSection from '../components/sections/SponsorsSection/SponsorsSection';
import UniversitiesMarquee from '../components/sections/UniversitiesMarquee/UniversitiesMarquee';
import '../pages_orig/Home/Home.css';

export const metadata = {
    title: 'Home | RECC 2027',
    description: 'RECC 2027 – International Conference on Renewable Energy & Climate Change. March 23-25, 2027, Munich, Germany. Submit abstracts and register now.',
    alternates: {
        canonical: 'https://recc2027.sciengasummits.com/',
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
            <VenueSection />
            <SponsorsSection />
        </div>
    );
}
