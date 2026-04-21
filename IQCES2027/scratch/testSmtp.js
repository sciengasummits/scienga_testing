const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
    const user = process.env.LIUTEX_SMTP_USER || 'liutex@sciengasummits.com';
    const pass = (process.env.LIUTEX_SMTP_PASS || '').replace(/\s/g, '');

    console.log(`Testing SMTP for: ${user}`);
    console.log(`Password length: ${pass.length}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
    });

    try {
        const info = await transporter.sendMail({
            from: `"Test Sender" <${user}>`,
            to: "quantumenginee@sciengasummits.com",
            subject: "SMTP Diagnostic Test",
            text: "If you see this, SMTP is working correctly."
        });
        console.log("✅ SUCCESS: Email sent!", info.messageId);
    } catch (error) {
        console.error("❌ FAILURE: SMTP Error:", error.message);
    }
}

testEmail();
