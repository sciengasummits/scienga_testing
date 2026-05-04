import Venue from '../../pages_orig/Venue/Venue';

export const metadata = {
    title: 'Venue | ICEMMAE2027',
    description: 'Information about the ICEMMAE2027 conference venue in Munich, Germany.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/venue',
    }
};

export default function Page() {
    return <Venue />;
}
