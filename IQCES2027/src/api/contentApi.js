const BASE_URL = '/api';

export async function fetchContent(key) {
    const res = await fetch(`${BASE_URL}/content/${key}?conference=iqce2027&t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

export async function fetchAllContent() {
    const res = await fetch(`${BASE_URL}/content?conference=iqce2027`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

