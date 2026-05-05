import DigitalBrochure from '../../pages_orig/Brochure/DigitalBrochure';

export const metadata = {
    title: 'Digital Brochure | IQCES 2027',
    description: 'View the official IQCES 2027 digital brochure online.',
    alternates: {
        canonical: 'https://iqces2027.sciengasummits.com/digital-brochure',
    }
};

export default function Page() {
    return <DigitalBrochure />;
}
