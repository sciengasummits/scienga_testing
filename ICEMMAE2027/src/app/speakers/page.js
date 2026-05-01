import Speakers from '../../pages_orig/Speakers/Speakers';

export const metadata = {
    title: 'Speakers | ICEMMA2027',
    description: 'Keynote speakers, plenary speakers, and special session chairs for ICEMMA2027.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/speakers',
    }
};

export default function Page() {
    return <Speakers />;
}
