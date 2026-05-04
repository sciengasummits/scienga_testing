import { NextResponse } from 'next/server';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function POST(req) {
  try {
    const { name, email, subject, message, conference = 'ICEMMAE2027' } = await req.json();
    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'ICEMMAE2027@sciengasummits.com';

    const emailSender = new RealEmailSender();
    
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Admin notification (2nd Image Format)
    const adminHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px;">
<div style="max-width:650px;margin:0 auto;background:#fff;padding:40px;border-radius:4px;box-shadow:0 0 10px rgba(0,0,0,0.05);">
  <div style="text-align:center;margin-bottom:30px;">
    <h1 style="margin:0;color:#000;font-size:22px;font-weight:700;line-height:1.4;">
      Contact Inquiry for <br/> 
      ${escapeHtml(account?.displayName || conference.toUpperCase())}
    </h1>
    <p style="margin:10px 0 0;color:#4b5563;font-size:14px;">
      Message Received for ${escapeHtml(conference.toUpperCase())} conference. Please find the details below
    </p>
  </div>
  
  <div style="background:#e5e7eb;padding:30px;border-radius:4px;color:#000;line-height:2.2;font-size:15px;">
    <p style="margin:0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0;"><strong>Date:</strong> ${submittedAt}</p>
    <p style="margin:0;"><strong>Email:</strong> ${email}</p>
    <p style="margin:0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p style="margin:0;"><strong>Message:</strong></p>
    <div style="background:#fff; padding:15px; border-radius:4px; margin-top:10px; border-left:4px solid #d1d5db;">
      ${escapeHtml(message).replace(/\n/g, '<br/>')}
    </div>
  </div>
  
  <div style="margin-top:30px;color:#000;font-size:15px;">
    <p style="margin:0;">Regards,<br/>${escapeHtml(account?.displayName || 'Organizing Committee')}</p>
  </div>
</div></body></html>`;

    await emailSender.sendEmail(
      adminEmail,
      `📩 Contact Inquiry: ${subject} - ${conference.toUpperCase()}`,
      adminHtml,
      'CONTACT',
      conference
    );

    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ We received your message - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>Message Received</h2><p>Hello ${escapeHtml(name)}, thank you for reaching out.</p></div>`,
      'CONTACT',
      conference
    );

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
