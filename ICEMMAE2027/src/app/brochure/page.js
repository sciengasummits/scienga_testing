import Brochure from '../../pages_orig/Brochure/Brochure';

export const metadata = {
    title: 'Brochure | ICEMMA2027',
    description: 'Download the official ICEMMA2027 conference brochure.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/brochure',
    }
};

export default function Page() {
    return <Brochure />;
}
