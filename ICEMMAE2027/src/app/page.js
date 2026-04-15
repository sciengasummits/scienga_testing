import React from 'react';
import HeroSection from '../components/sections/HeroSection/HeroSection';
import AboutSection from '../components/sections/AboutSection/AboutSection';
import StatsSection from '../components/sections/StatsSection/StatsSection';
import KeyThemesSection from '../components/sections/KeyThemesSection/KeyThemesSection';
import SpeakersSection from '../components/sections/SpeakersSection/SpeakersSection';
import PricingSection from '../components/sections/PricingSection/PricingSection';
import SponsorsSection from '../components/sections/SponsorsSection/SponsorsSection';
import UniversitiesMarquee from '../components/sections/UniversitiesMarquee/UniversitiesMarquee';
import '../pages_orig/Home/Home.css';

export const metadata = {
    title: 'Home | ICEMMAE2027',
    description: 'ICEMMAE2027 – International Conference and Expo on Mechanical, Mechatronics and Aerospace Engineering. February 11–13, 2027, Munich, Germany. Submit abstracts and register now.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/',
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
            <SponsorsSection />
        </div>
    );
}
