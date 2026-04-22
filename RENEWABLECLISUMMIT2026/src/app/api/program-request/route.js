import { NextResponse } from 'next/server';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function POST(req) {
  try {
    const { name, email, phone, conference = 'renewable' } = await req.json();
    
    if (!email || !name) {
      return NextResponse.json({ success: false, error: 'Name and Email required' }, { status: 400 });
    }

    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'renewable@sciengasummits.com';

    const emailSender = new RealEmailSender();
    
    // Admin notification
    await emailSender.sendEmail(
      adminEmail,
      `📩 Program Schedule Requested - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1bb385, #169e76); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Program Schedule Request</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">RECC 2027</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(phone || 'N/A')}</td></tr>
          </table>
        </div>
      </div>`,
      'PROGRAM',
      conference
    );

    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ Program Schedule Request Received - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1bb385, #169e76); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Request Received</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">RECC 2027</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0;">Hello ${escapeHtml(name)},</h2>
          <p style="color: #64748b; margin: 0 0 20px 0;">We have received your request for the <strong>RECC 2027</strong> program schedule.</p>
          <p style="color: #64748b; margin: 0 0 20px 0;">Our scientific committee is finalizing the timetable, and we will notify you immediately once the detailed schedule is released.</p>
        </div>
        <div style="text-align: center; margin-top: 20px; padding: 20px;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© 2027 RECC SUMMIT. All rights reserved.</p>
        </div>
      </div>`,
      'PROGRAM',
      conference
    );

    return NextResponse.json({ success: true, message: 'Program request sent successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
