import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'LIUTEX Dashboard Next.js API running' });
}
