import VisaInfo from '../../pages_orig/VisaInfo/VisaInfo';

export const metadata = {
    title: 'Visa Info | ICMMAE2027',
    description: 'Visa information for attendees traveling to Munich, Germany for ICMMAE2027.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/visa-info',
    }
};

export default function Page() {
    return <VisaInfo />;
}
