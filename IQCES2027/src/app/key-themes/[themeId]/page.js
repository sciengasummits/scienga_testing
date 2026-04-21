import ThemeDetail from '../../../pages_orig/ThemeDetail/ThemeDetail';

export async function generateMetadata({ params }) {
    const { themeId } = await params;
    return {
        title: `${themeId} | Key Themes | iqce2027`,
    };
}

export default function Page() {
    return <ThemeDetail />;
}
