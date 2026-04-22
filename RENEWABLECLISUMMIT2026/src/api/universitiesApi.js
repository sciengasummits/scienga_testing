const BASE_URL = '/api';

export async function fetchUniversities() {
    const res = await fetch(`${BASE_URL}/universities?conference=renewable`);
    if (!res.ok) return null;
    return res.json();
}