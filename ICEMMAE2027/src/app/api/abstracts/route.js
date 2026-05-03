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
    const conf = searchParams.get('conference') || 'icmmae2027';
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
      name, email, title, conference = 'icmmae2027',
      phone, organization, country, interest, topic, address, fileName, fileUrl
    } = body;

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'icmmae2027@sciengasummits.com';
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Build siteUrl from the actual request host — avoids wrong FRONTEND_URL env issues
    const host = req.headers.get('host') || 'icmmae2027.sciengasummits.com';
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

    // ── Full admin notification ──
    const adminHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px;">
<div style="max-width:640px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:linear-gradient(135deg,#0369a1,#2563eb);padding:28px 32px;">
    <h1 style="margin:0;color:#fff;font-size:20px;">📄 New Abstract Submission</h1>
    <p style="margin:6px 0 0;color:#bae6fd;font-size:13px;">${escapeHtml(conference.toUpperCase())} · ${submittedAt} IST</p>
  </div>
  <div style="padding:24px 32px;">
    <h2 style="color:#0369a1;font-size:15px;margin:0 0 14px;border-bottom:2px solid #e0f2fe;padding-bottom:6px;">👤 Submitter Details</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">
      ${row('Full Name',    escapeHtml(name),         0)}
      ${row('Email',        email,                    1)}
      ${row('Phone',        escapeHtml(phone),         2)}
      ${row('Organization', escapeHtml(organization), 3)}
      ${row('Country',      escapeHtml(country),      4)}
      ${row('Address',      escapeHtml(address),      5)}
    </table>
    <h2 style="color:#0369a1;font-size:15px;margin:0 0 14px;border-bottom:2px solid #e0f2fe;padding-bottom:6px;">📋 Abstract Details</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">
      ${row('Abstract Title',    escapeHtml(title),    0)}
      ${row('Presentation Type', escapeHtml(interest), 1)}
      ${row('Topic / Track',     escapeHtml(topic),    2)}
      ${row('Attached File',
        fileName && absoluteFileUrl
          ? `<a href="${absoluteFileUrl}" style="color:#2563eb;">${escapeHtml(fileName)}</a>`
          : (fileName || '—'),
        3)}
    </table>
  </div>
  <div style="background:#f0f9ff;border-top:1px solid #bae6fd;padding:14px 32px;text-align:center;">
    <p style="margin:0;color:#0369a1;font-size:12px;">Automated notification · ${escapeHtml(conference.toUpperCase())} · <a href="mailto:${escapeHtml(adminEmail)}" style="color:#2563eb;">${escapeHtml(adminEmail)}</a></p>
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
