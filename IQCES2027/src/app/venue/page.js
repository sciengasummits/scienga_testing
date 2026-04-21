import Venue from '../../pages_orig/Venue/Venue';

export const metadata = {
    title: 'Venue | iqce2027',
    description: 'Information about the iqce2027 conference venue at Outram, Singapore.',
    alternates: {
        canonical: 'https://iqce2027.com/venue',
    }
};

export default function Page() {
    return <Venue />;
}
