import Sessions from '../../pages_orig/Sessions/Sessions';

export const metadata = {
    title: 'Sessions | ICEMMA2027',
    description: 'Special sessions and themes for the ICEMMA2027 conference in Munich, Germany.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/sessions',
    }
};

export default function Page() {
    return <Sessions />;
}
