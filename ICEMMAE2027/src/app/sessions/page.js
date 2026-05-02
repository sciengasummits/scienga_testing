import Sessions from '../../pages_orig/Sessions/Sessions';

export const metadata = {
    title: 'Sessions | ICMMAE2027',
    description: 'Special sessions and themes for the ICMMAE2027 conference in Munich, Germany.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/sessions',
    }
};

export default function Page() {
    return <Sessions />;
}
