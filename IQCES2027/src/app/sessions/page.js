import Sessions from '../../pages_orig/Sessions/Sessions';

export const metadata = {
    title: 'Sessions | iqce2027',
    description: 'Special sessions and themes for the iqce2027 conference in Singapore.',
    alternates: {
        canonical: 'https://iqce2027.com/sessions',
    }
};

export default function Page() {
    return <Sessions />;
}
