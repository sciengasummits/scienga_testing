const BASE_URL = '/api';

export async function fetchSpeakers(category) {
    try {
        const url = `${BASE_URL}/speakers?conference=renewable${category ? '&category=' + encodeURIComponent(category) : ''}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Failed to fetch speakers:", error);
        return null;
    }
}