import { NextResponse } from 'next/server';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function POST(req) {
  try {
    const { name, email, phone, number, conference = 'ICEMMAE2027' } = await req.json();
    const contactPhone = phone || number || 'N/A';
    
    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Name and Email required' }, { status: 400 });
    }

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'icmmae@sciengasummits.com';

    const emailSender = new RealEmailSender();
    
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Admin notification (2nd Image Format)
    const adminHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px;">
<div style="max-width:650px;margin:0 auto;background:#fff;padding:40px;border-radius:4px;box-shadow:0 0 10px rgba(0,0,0,0.05);">
  <div style="text-align:center;margin-bottom:30px;">
    <h1 style="margin:0;color:#000;font-size:22px;font-weight:700;line-height:1.4;">
      Program Schedule Requested for <br/> 
      ${escapeHtml(account?.displayName || conference.toUpperCase())}
    </h1>
    <p style="margin:10px 0 0;color:#4b5563;font-size:14px;">
      Request Received for ${escapeHtml(conference.toUpperCase())} conference. Please find the details below
    </p>
  </div>
  
  <div style="background:#e5e7eb;padding:30px;border-radius:4px;color:#000;line-height:2.2;font-size:15px;">
    <p style="margin:0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0;"><strong>Date:</strong> ${submittedAt}</p>
    <p style="margin:0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p style="margin:0;"><strong>Mobile Number:</strong> ${escapeHtml(contactPhone)}</p>
    <p style="margin:0;"><strong>Conference:</strong> ${escapeHtml(conference.toUpperCase())}</p>
  </div>
  
  <div style="margin-top:30px;color:#000;font-size:15px;">
    <p style="margin:0;">Regards,<br/>${escapeHtml(account?.displayName || 'Organizing Committee')}</p>
  </div>
</div></body></html>`;

    await emailSender.sendEmail(
      adminEmail,
      `📩 Program Schedule Requested - ${conference.toUpperCase()}`,
      adminHtml,
      'PROGRAM',
      conference
    );

    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ Program Schedule Request Received - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>Hello ${escapeHtml(name)},</h2><p>We received your request for the program schedule. Our team will get back to you shortly.</p></div>`,
      'PROGRAM',
      conference
    );

    return NextResponse.json({ success: true, message: 'Program request sent successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
