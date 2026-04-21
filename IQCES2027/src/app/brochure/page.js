import Brochure from '../../pages_orig/Brochure/Brochure';

export const metadata = {
    title: 'Brochure | iqce2027',
    description: 'Download the official iqce2027 conference brochure.',
    alternates: {
        canonical: 'https://iqce2027.com/brochure',
    }
};

export default function Page() {
    return <Brochure />;
}
