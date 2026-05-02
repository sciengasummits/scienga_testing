import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'ICMMAE2027 Dashboard Next.js API running' });
}
