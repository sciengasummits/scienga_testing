const BASE_URL = '/api';

export async function fetchContent(key) {
    try {
        const res = await fetch(`${BASE_URL}/content/${key}?conference=renewable`);
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error(`Failed to fetch content for ${key}:`, error);
        return null;
    }
}

export async function fetchAllContent() {
    try {
        const res = await fetch(`${BASE_URL}/content?conference=renewable`);
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Failed to fetch all content:", error);
        return null;
    }
}