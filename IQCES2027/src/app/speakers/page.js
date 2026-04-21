import Speakers from '../../pages_orig/Speakers/Speakers';

export const metadata = {
    title: 'Speakers | iqce2027',
    description: 'Keynote speakers, plenary speakers, and special session chairs for iqce2027.',
    alternates: {
        canonical: 'https://iqce2027.com/speakers',
    }
};

export default function Page() {
    return <Speakers />;
}
