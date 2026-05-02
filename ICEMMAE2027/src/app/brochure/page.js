import Brochure from '../../pages_orig/Brochure/Brochure';

export const metadata = {
    title: 'Brochure | ICMMAE2027',
    description: 'Download the official ICMMAE2027 conference brochure.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/brochure',
    }
};

export default function Page() {
    return <Brochure />;
}
