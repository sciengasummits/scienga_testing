import Speakers from '../../pages_orig/Speakers/Speakers';

export const metadata = {
    title: 'Speakers | ICMMAE2027',
    description: 'Keynote speakers, plenary speakers, and special session chairs for ICMMAE2027.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/speakers',
    }
};

export default function Page() {
    return <Speakers />;
}
