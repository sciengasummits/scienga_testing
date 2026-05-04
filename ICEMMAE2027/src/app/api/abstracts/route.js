import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Abstract from '@/models/Abstract';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const conf = searchParams.get('conference') || 'ICEMMAE2027';
    const abstracts = await Abstract.find({ conference: conf }).sort({ createdAt: -1 });
    return NextResponse.json(abstracts);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const abs = new Abstract(body);
    await abs.save();

    const {
      name, email, title, conference = 'ICEMMAE2027',
      phone, organization, country, interest, topic, address, fileName, fileUrl
    } = body;

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'ICEMMAE2027@sciengasummits.com';
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Build siteUrl from the actual request host — avoids wrong FRONTEND_URL env issues
    const host = req.headers.get('host') || 'ICEMMAE2027.sciengasummits.com';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const siteUrl = `${proto}://${host}`;

    // Ensure fileUrl is always an absolute URL
    const absoluteFileUrl = fileUrl
      ? (fileUrl.startsWith('http') ? fileUrl : `${siteUrl}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`)
      : '';

    const emailSender = new RealEmailSender();

    // Helper: zebra-striped table row
    const row = (label, val, i) =>
      `<tr style="background:${i % 2 === 0 ? '#f8faff' : '#fff'}">
        <td style="padding:8px 12px;font-weight:600;color:#6b7280;font-size:13px;width:36%;">${label}</td>
        <td style="padding:8px 12px;color:#111827;font-size:14px;">${val || '—'}</td>
       </tr>`;

    // ── Full admin notification (2nd Image Format) ──
    const adminHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px;">
<div style="max-width:650px;margin:0 auto;background:#fff;padding:40px;border-radius:4px;box-shadow:0 0 10px rgba(0,0,0,0.05);">
  <div style="text-align:center;margin-bottom:30px;">
    <h1 style="margin:0;color:#000;font-size:22px;font-weight:700;line-height:1.4;">
      Abstract Submission Confirmation for <br/> 
      ${escapeHtml(account?.displayName || conference.toUpperCase())}
    </h1>
    <p style="margin:10px 0 0;color:#4b5563;font-size:14px;">
      Abstract Received for ${escapeHtml(conference.toUpperCase())} conference. Please find the details below
    </p>
  </div>
  
  <div style="background:#e5e7eb;padding:30px;border-radius:4px;color:#000;line-height:2.2;font-size:15px;">
    <p style="margin:0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0;"><strong>Abstract Date:</strong> ${submittedAt}</p>
    <p style="margin:0;"><strong>Email:</strong> ${email}</p>
    <p style="margin:0;"><strong>Mobile Number:</strong> ${escapeHtml(phone)}</p>
    <p style="margin:0;"><strong>Country:</strong> ${escapeHtml(country)}</p>
    <p style="margin:0;"><strong>Session:</strong> ${escapeHtml(topic)}</p>
    <p style="margin:0;"><strong>Category:</strong> ${escapeHtml(interest)}</p>
    <p style="margin:0;"><strong>Download Abstract:</strong> ${fileName && absoluteFileUrl ? `<a href="${absoluteFileUrl}" style="color:#2563eb;text-decoration:underline;">Click Here</a>` : '—'}</p>
  </div>
  
  <div style="margin-top:30px;color:#000;font-size:15px;">
    <p style="margin:0;">Regards,<br/>${escapeHtml(account?.displayName || 'Organizing Committee')}</p>
  </div>
</div></body></html>`;

    emailSender.sendEmail(
      adminEmail,
      `📄 New Abstract: ${name} – ${conference.toUpperCase()}`,
      adminHtml,
      'ABSTRACT',
      conference
    ).catch(e => console.error('Admin email error:', e.message));

    // ── User confirmation ──
    const userHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:linear-gradient(135deg,#0369a1,#2563eb);padding:28px 32px;">
    <h1 style="margin:0;color:#fff;font-size:20px;">✅ Abstract Received</h1>
    <p style="margin:6px 0 0;color:#bae6fd;font-size:13px;">${escapeHtml(conference.toUpperCase())}</p>
  </div>
  <div style="padding:28px 32px;">
    <p style="color:#374151;">Dear <strong>${escapeHtml(name)}</strong>,</p>
    <p style="color:#374151;">Thank you! We have successfully received your abstract submission.</p>
    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px 20px;margin:20px 0;">
      <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">Submitted Title:</p>
      <p style="margin:0;font-size:15px;font-weight:700;color:#0369a1;">${escapeHtml(title)}</p>
    </div>
    <p style="color:#374151;">Our team will review your submission and notify you of the outcome.</p>
    <p style="color:#374151;">Best Regards,<br/><strong>${escapeHtml(conference.toUpperCase())} Organizing Committee</strong></p>
  </div>
</div></body></html>`;

    emailSender.sendEmail(
      email,
      `✅ Abstract Received – ${conference.toUpperCase()}`,
      userHtml,
      'ABSTRACT',
      conference
    ).catch(e => console.error('User email error:', e.message));

    return NextResponse.json(abs, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
