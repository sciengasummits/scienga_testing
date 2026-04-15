import Sessions from '../../pages_orig/Sessions/Sessions';

export const metadata = {
    title: 'Sessions | ICEMMAE2027',
    description: 'Special sessions and themes for the ICEMMAE2027 conference in Munich, Germany.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/sessions',
    }
};

export default function Page() {
    return <Sessions />;
}
