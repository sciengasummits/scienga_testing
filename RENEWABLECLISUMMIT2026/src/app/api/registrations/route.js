import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { RealEmailSender } from '@/lib/emailSender';
import { CONFERENCE_ACCOUNTS } from '@/lib/auth';
import { escapeHtml } from '@/lib/utils';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const conf = searchParams.get('conference') || 'renewable';
    const registrations = await Registration.find({ conference: conf }).sort({ createdAt: -1 });
    return NextResponse.json(registrations);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const reg = new Registration(body);
    await reg.save();

    const { name, email, category, conference = 'renewable' } = body;
    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'renewable@sciengasummits.com';
    const siteUrl = process.env.FRONTEND_URL || 'https://recc2027.sciengasummits.com';

    const emailSender = new RealEmailSender();
    
    // User confirmation
    await emailSender.sendEmail(
      email,
      `✅ Registration Received - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1bb385, #169e76); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Registration Received</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">RECC 2027</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0;">Hello ${escapeHtml(name)},</h2>
          <p style="color: #64748b; margin: 0 0 20px 0;">Your registration for the <strong>RECC 2027</strong> conference has been successfully received.</p>
          <p style="color: #64748b; margin: 0 0 20px 0;">Our team will review your details and contact you shortly regarding the next steps.</p>
        </div>
        <div style="text-align: center; margin-top: 20px; padding: 20px;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© 2027 RECC SUMMIT. All rights reserved.</p>
        </div>
      </div>`,
      'REGISTRATION',
      conference
    ).catch(e => console.error('User email error:', e.message));

    // Admin notification
    await emailSender.sendEmail(
      adminEmail,
      `📝 New Registration - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1bb385, #169e76); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Registration</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">RECC 2027</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #1e293b;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Category:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(body.registrationCategory || category)}</td></tr>
          </table>
        </div>
      </div>`,
      'REGISTRATION',
      conference
    ).catch(e => console.error('Admin email error:', e.message));

    return NextResponse.json(reg, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
