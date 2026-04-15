const BASE_URL = '/api';

export async function submitProgramRequest(payload) {
    const res = await fetch(`${BASE_URL}/program-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, conference: 'icemmae2027' }),
    });
    if (!res.ok) throw new Error('Failed to request program');
    return res.json();
}