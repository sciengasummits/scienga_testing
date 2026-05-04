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
    const conf = searchParams.get('conference') || 'ICEMMAE2027';
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

    const {
      name, email, registrationCategory, conference = 'ICEMMAE2027',
      phone, company, address
    } = body;
    const account = CONFERENCE_ACCOUNTS.find(acc => acc.conferenceId === conference);
    const adminEmail = account ? account.email : 'ICEMMAE2027@sciengasummits.com';
    const siteUrl = process.env.FRONTEND_URL || 'https://icemmae2027.sciengasummits.com';

    const emailSender = new RealEmailSender();
    
    // User confirmation
    emailSender.sendEmail(
      email,
      `✅ Registration Received - ${conference.toUpperCase()}`,
      `<div style="font-family: Arial; padding: 20px;"><h2>Registration Received</h2><p>Hello ${escapeHtml(name)}, your registration for <strong>${conference.toUpperCase()}</strong> has been received.</p></div>`,
      'REGISTRATION',
      conference
    ).catch(e => console.error('User email error:', e.message));

    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Admin notification (2nd Image Format)
    const adminHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px;">
<div style="max-width:650px;margin:0 auto;background:#fff;padding:40px;border-radius:4px;box-shadow:0 0 10px rgba(0,0,0,0.05);">
  <div style="text-align:center;margin-bottom:30px;">
    <h1 style="margin:0;color:#000;font-size:22px;font-weight:700;line-height:1.4;">
      Registration Confirmation for <br/> 
      ${escapeHtml(account?.displayName || conference.toUpperCase())}
    </h1>
    <p style="margin:10px 0 0;color:#4b5563;font-size:14px;">
      Registration Received for ${escapeHtml(conference.toUpperCase())} conference. Please find the details below
    </p>
  </div>
  
  <div style="background:#e5e7eb;padding:30px;border-radius:4px;color:#000;line-height:2.2;font-size:15px;">
    <p style="margin:0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0;"><strong>Registration Date:</strong> ${submittedAt}</p>
    <p style="margin:0;"><strong>Email:</strong> ${email}</p>
    <p style="margin:0;"><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
    <p style="margin:0;"><strong>Company/Affiliation:</strong> ${escapeHtml(company || '—')}</p>
    <p style="margin:0;"><strong>Category:</strong> ${escapeHtml(registrationCategory || '—')}</p>
    <p style="margin:0;"><strong>Conference:</strong> ${escapeHtml(conference.toUpperCase())}</p>
    ${body.amount ? `<p style="margin:0;"><strong>Amount Paid:</strong> ${body.amount} ${body.currency || 'USD'}</p>` : ''}
    ${body.description ? `<p style="margin:0;"><strong>Payment Description:</strong> ${escapeHtml(body.description)}</p>` : ''}
    ${body.razorpayPaymentId ? `<p style="margin:0;"><strong>Payment ID:</strong> ${escapeHtml(body.razorpayPaymentId)}</p>` : ''}
  </div>
  
  <div style="margin-top:30px;color:#000;font-size:15px;">
    <p style="margin:0;">Regards,<br/>${escapeHtml(account?.displayName || 'Organizing Committee')}</p>
  </div>
</div></body></html>`;

    emailSender.sendEmail(
      adminEmail,
      `📝 New Registration - ${conference.toUpperCase()}`,
      adminHtml,
      'REGISTRATION',
      conference
    ).catch(e => console.error('Admin email error:', e.message));

    return NextResponse.json(reg, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
