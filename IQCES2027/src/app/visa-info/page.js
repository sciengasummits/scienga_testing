import VisaInfo from '../../pages_orig/VisaInfo/VisaInfo';

export const metadata = {
    title: 'Visa Info | iqce2027',
    description: 'Visa information for attendees traveling to Singapore for iqce2027.',
    alternates: {
        canonical: 'https://iqce2027.com/visa-info',
    }
};

export default function Page() {
    return <VisaInfo />;
}
