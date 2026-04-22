const BASE_URL = '/api';

export async function fetchSponsors(type) {
    try {
        const url = `${BASE_URL}/sponsors?conference=renewable${type ? '&type=' + encodeURIComponent(type) : ''}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Failed to fetch sponsors:", error);
        return null;
    }
}