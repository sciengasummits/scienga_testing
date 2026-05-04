import { NextResponse } from 'next/server';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function POST(req) {
  try {
    const { name, email, number, conference = 'ICEMMAE2027' } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Name and Email required' }, { status: 400 });
    }

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'ICEMMAE2027@sciengasummits.com';

    const emailSender = new RealEmailSender();

    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Admin notification (2nd Image Format)
    const adminHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px;">
<div style="max-width:650px;margin:0 auto;background:#fff;padding:40px;border-radius:4px;box-shadow:0 0 10px rgba(0,0,0,0.05);">
  <div style="text-align:center;margin-bottom:30px;">
    <h1 style="margin:0;color:#000;font-size:22px;font-weight:700;line-height:1.4;">
      Brochure Download Request for <br/> 
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
    <p style="margin:0;"><strong>Phone:</strong> ${escapeHtml(number || 'N/A')}</p>
    <p style="margin:0;"><strong>Conference:</strong> ${escapeHtml(conference.toUpperCase())}</p>
  </div>
  
  <div style="margin-top:30px;color:#000;font-size:15px;">
    <p style="margin:0;">Regards,<br/>${escapeHtml(account?.displayName || 'Organizing Committee')}</p>
  </div>
</div></body></html>`;

    await emailSender.sendEmail(
      adminEmail,
      `📩 Brochure Download Request - ${conference.toUpperCase()}`,
      adminHtml,
      'BROCHURE',
      conference
    );

    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ Brochure Access Granted - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #20b2aa, #2563eb); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Conference Brochure</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">SCIENGASUMMITS 2026</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0;">Hello ${escapeHtml(name)},</h2>
          <p style="color: #64748b; margin: 0 0 20px 0;">Thank you for your interest in our conference! You now have access to download the official brochure.</p>
          <p style="color: #64748b; margin: 0 0 20px 0;">Visit the brochure page to download or view the digital version online.</p>
          <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">If you have any questions, feel free to reach out to us.</p>
        </div>
        <div style="text-align: center; margin-top: 20px; padding: 20px;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© 2027 ICEMMAE2027. All rights reserved.</p>
        </div>
      </div>`,
      'BROCHURE',
      conference
    );

    return NextResponse.json({ success: true, message: 'Brochure request sent successfully' });
  } catch (err) {
    console.error('Brochure request error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
