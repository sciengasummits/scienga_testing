# ICEMMAE2027 Workflow Connection Guide

## Overview
Successfully connected ICEMMAE2027 conference to the sciengasummits_workflow backend system.

## Changes Made

### 1. Workflow Environment Configuration (`sciengasummits_workflow/.env`)

Added ICEMMAE2027 authentication and email configuration:

```env
# ICEMMAE2027 - MECHANICAL, MECHATRONICS AND AEROSPACE ENGINEERING
AUTH_USERNAME_ICEMMAE=ICEMMAE2027
AUTH_OTP_ICEMMAE=1234

# ── ICEMMAE2027 (sender + recipient) ───────────────────────
ICEMMAE_EMAIL=icemmae2027@sciengasummits.com
ICEMMAE_SMTP_USER=icemmae2027@sciengasummits.com
ICEMMAE_SMTP_PASS=your_app_password_here
```

### 2. Conference Configuration (`sciengasummits_workflow/src/lib/conferences.js`)

#### Added to CONFERENCE_ACCOUNTS:
```javascript
{
    username: 'ICEMMAE2027',
    email: process.env.ICEMMAE_EMAIL || 'icemmae2027@sciengasummits.com',
    conferenceId: 'icemmae2027',
    displayName: 'ICEMMAE2027 - MECHANICAL, MECHATRONICS AND AEROSPACE ENGINEERING',
}
```

#### Added to CONFERENCE_CONFIG:
```javascript
icemmae2027: {
    conferenceId: 'icemmae2027',
    displayName: 'ICEMMAE2027 - MECHANICAL, MECHATRONICS AND AEROSPACE ENGINEERING',
    shortName: 'ICEMMAE2027',
    logoText: 'ME',
    logoSub: '2027',
    brandTop: 'ICEMMAE',
    brandSub: '2027',
    footerText: '© Copyright 2027 ICEMMAE2027. All Rights Reserved.',
    email: 'icemmae2027@sciengasummits.com',
    accentColor: '#dc2626',
    accentGlow: 'rgba(220,38,38,0.35)',
}
```

### 3. Email Sender Configuration (`sciengasummits_workflow/src/lib/emailSender.js`)

Added ICEMMAE2027 email account:
```javascript
icemmae2027: {
    user: process.env.ICEMMAE_SMTP_USER || this._defaultUser,
    pass: (process.env.ICEMMAE_SMTP_PASS || this._defaultPass).replace(/\s/g, ''),
}
```

### 4. Seed Script (`sciengasummits_workflow/scripts/seed-icemmae2027.js`)

Created comprehensive seed script with:
- Hero section configuration
- About section with objectives and themes
- Important dates timeline
- Stats section
- Contact information
- Sessions and schedule
- Pricing packages
- Registration prices
- FAQ sections
- Venue information
- Brochure configuration

## How to Use

### 1. Update Email Credentials

Edit `sciengasummits_workflow/.env` and add your actual Gmail App Password:
```env
ICEMMAE_SMTP_PASS=your_actual_app_password_here
```

### 2. Run the Seed Script

From the `sciengasummits_workflow` directory:

```bash
# First time (creates all content)
node scripts/seed-icemmae2027.js

# Force update (overwrites existing content)
node scripts/seed-icemmae2027.js --force
```

### 3. Access the Dashboard

The workflow dashboard can now manage ICEMMAE2027 content:

**Login Credentials:**
- Username: `ICEMMAE2027`
- OTP: `1234` (default, change in production)

**Dashboard URL:** `http://localhost:5050` (or your workflow URL)

### 4. Frontend Connection

The ICEMMAE2027 frontend (`ICEMMAE2027` folder) is configured to use:
- Conference ID: `icemmae2027`
- API calls include `conference=icemmae2027` parameter
- All forms and submissions tagged with conference ID

## Conference Details

| Property | Value |
|----------|-------|
| **Conference ID** | icemmae2027 |
| **Display Name** | ICEMMAE2027 - MECHANICAL, MECHATRONICS AND AEROSPACE ENGINEERING |
| **Short Name** | ICEMMAE2027 |
| **Email** | icemmae2027@sciengasummits.com |
| **Dates** | February 11-13, 2027 |
| **Venue** | Munich, Germany |
| **Currency** | EUR (€) |
| **Accent Color** | #dc2626 (Red) |

## Features Enabled

✅ **Authentication System**
- Admin login with username/OTP
- Conference-specific credentials

✅ **Email System**
- Dedicated SMTP configuration
- Conference-branded emails
- OTP delivery
- Registration confirmations
- Abstract submission notifications
- Contact form responses

✅ **Content Management**
- Dynamic hero section
- Editable about section
- Configurable important dates
- Session management
- Pricing configuration
- FAQ management

✅ **Registration System**
- Multiple registration categories
- Early bird/standard/onspot pricing
- Sponsorship packages
- Accommodation options
- Payment processing (Razorpay)

✅ **Abstract Submission**
- Online abstract submission
- Email notifications
- Admin dashboard management

✅ **Database Integration**
- MongoDB connection
- Conference-specific data isolation
- Shared database with other conferences

## API Endpoints

All API endpoints support the `conference=icemmae2027` parameter:

- `/api/abstracts?conference=icemmae2027`
- `/api/registrations?conference=icemmae2027`
- `/api/speakers?conference=icemmae2027`
- `/api/sponsors?conference=icemmae2027`
- `/api/content?conference=icemmae2027`
- `/api/universities?conference=icemmae2027`
- `/api/discounts/validate?conference=icemmae2027`
- `/api/payment/create-order` (includes conference in body)
- `/api/contact` (includes conference in body)
- `/api/newsletter/subscribe` (includes conference in body)

## Testing Checklist

Before going live, test:

- [ ] Admin login with ICEMMAE2027 credentials
- [ ] Email sending (OTP, confirmations)
- [ ] Abstract submission form
- [ ] Registration form
- [ ] Payment processing
- [ ] Content updates via dashboard
- [ ] Speaker management
- [ ] Sponsor management
- [ ] Newsletter subscription
- [ ] Contact form
- [ ] Brochure download

## Production Deployment

### 1. Update Environment Variables

Set production values in `sciengasummits_workflow/.env`:
```env
MONGODB_URI=your_production_mongodb_uri
ICEMMAE_SMTP_PASS=your_production_email_password
RAZORPAY_KEY_ID=your_production_razorpay_key
RAZORPAY_KEY_SECRET=your_production_razorpay_secret
FRONTEND_URL=https://icemmae2027.sciengasummits.com/
```

### 2. Run Seed Script on Production

```bash
node scripts/seed-icemmae2027.js
```

### 3. Verify All Systems

- Test email delivery
- Test payment processing
- Verify database connections
- Check all forms

## Support

For issues or questions:
- Email: icemmae2027@sciengasummits.com
- Check logs in workflow console
- Review MongoDB collections for data

## Notes

- The conference shares the same MongoDB database with other conferences
- Data is isolated by the `conference: 'icemmae2027'` field
- All email templates use conference-specific branding
- Payment gateway supports multiple currencies (configured for EUR)
- The workflow dashboard provides a unified interface for all conferences

---

**Status:** ✅ Fully Connected and Ready for Use
**Last Updated:** January 2027
