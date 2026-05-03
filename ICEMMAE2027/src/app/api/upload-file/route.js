import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const uniqueName = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase()}`;
    const filePath = join(uploadsDir, uniqueName);

    await writeFile(filePath, buffer);

    // Build absolute URL from request host so links work from any dashboard/email
    const host = req.headers.get('host') || 'icmmae2027.sciengasummits.com';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const url = `${proto}://${host}/uploads/${uniqueName}`;

    return NextResponse.json({
      url,
      originalName: file.name
    });

  } catch (err) {
    console.error('Upload Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
