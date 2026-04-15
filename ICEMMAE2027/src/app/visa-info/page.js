import VisaInfo from '../../pages_orig/VisaInfo/VisaInfo';

export const metadata = {
    title: 'Visa Info | ICEMMAE2027',
    description: 'Visa information for attendees traveling to Munich, Germany for ICEMMAE2027.',
    alternates: {
        canonical: 'https://icemmae2027.sciengasummits.com/visa-info',
    }
};

export default function Page() {
    return <VisaInfo />;
}
