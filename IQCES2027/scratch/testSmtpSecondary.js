const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
    const user = process.env.SMTP_USER;
    const pass = (process.env.SMTP_PASS || '').replace(/\s/g, '');

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
            subject: "SMTP Diagnostic Test (Secondary)",
            text: "This is testing the alternate SMTP_PASS."
        });
        console.log("✅ SUCCESS: Email sent!", info.messageId);
    } catch (error) {
        console.error("❌ FAILURE: SMTP Error:", error.message);
    }
}

testEmail();
