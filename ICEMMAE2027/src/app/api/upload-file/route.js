import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Media from '@/models/Media';

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get('file');
    const conference = formData.get('conference') || 'icemmae2027';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`;

    const media = new Media({
      filename: file.name,
      mimetype: file.type,
      data: dataUrl,
      conference
    });

    await media.save();

    // Build absolute URL using host so links work everywhere
    const host = req.headers.get('host') || 'icemmae2027.sciengasummits.com';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const url = `${proto}://${host}/api/media/${media._id}`;

    return NextResponse.json({
      url,
      id: media._id,
      originalName: file.name,
      message: 'File saved to database successfully'
    });

  } catch (err) {
    console.error('Upload Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
