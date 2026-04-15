# ICEMMAE2027 Setup Guide

## Conference Information
- **Full Name**: International Conference and Expo on Mechanical, Mechatronics and Aerospace Engineering
- **Short Name**: ICEMMAE2027
- **Dates**: February 11-13, 2027
- **Venue**: Munich, Germany
- **Website**: https://icemmae2027.sciengasummits.com

## Installation Steps

### 1. Install Dependencies
```bash
cd ICEMMAE2027
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Frontend URL
FRONTEND_URL=https://icemmae2027.sciengasummits.com
NEXT_PUBLIC_API_URL=https://icemmae2027.sciengasummits.com

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=icemmae2027@sciengasummits.com
SMTP_PASS=your_email_password

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Admin Credentials
ADMIN_USERNAME=ICEMMAE2027
ADMIN_PASSWORD=your_secure_password
```

### 3. Database Setup
The application uses MongoDB. Make sure you have:
- A MongoDB instance running (local or cloud like MongoDB Atlas)
- Updated the `MONGODB_URI` in your `.env.local` file

### 4. Seed Initial Data (Optional)
To populate the database with default conference content:
```bash
# Access the seed endpoint (requires admin authentication)
curl -X POST http://localhost:3000/api/admin/seed
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 6. Build for Production
```bash
npm run build
npm start
```

## Key Features Configured

### ✅ Conference Information Updated
- Hero section with conference title, dates, and venue
- About section with conference objectives and themes
- Important dates timeline
- Footer with contact information

### ✅ API Endpoints
All API routes are configured with `icemmae2027` as the default conference ID:
- `/api/abstracts` - Abstract submission management
- `/api/registrations` - Registration handling
- `/api/speakers` - Speaker profiles
- `/api/sponsors` - Sponsor information
- `/api/content` - Dynamic content management
- `/api/payment` - Payment processing
- `/api/contact` - Contact form submissions
- `/api/newsletter` - Newsletter subscriptions

### ✅ Email Configuration
Email templates updated for:
- Abstract submission confirmations
- Registration confirmations
- Brochure requests
- Contact form responses
- Newsletter subscriptions

### ✅ SEO & Metadata
All pages configured with proper metadata:
- Page titles include "ICEMMAE2027"
- Descriptions reference the conference
- Canonical URLs point to icemmae2027.sciengasummits.com

## Conference Themes & Topics

The website is configured with the following key themes:
1. Advanced Manufacturing and Materials
2. Robotics and Automation Systems
3. Aerospace Propulsion and Aerodynamics
4. Mechatronics and Control Systems
5. Sustainable Energy Systems
6. Computational Engineering and Simulation

## Important Dates (Default)

- **August 1, 2026**: Abstract Submission Opens
- **November 15, 2026**: Early Bird Deadline
- **December 31, 2026**: Submission Deadline
- **February 11-13, 2027**: Conference Dates

## Contact Information (Default)

- **Email**: contact@icemmae2027.com
- **Phone**: +49 89 12345678
- **WhatsApp**: +49 89 12345678

*Note: These can be updated through the admin dashboard or by modifying the database content.*

## Admin Dashboard

The website includes an admin dashboard for managing:
- Conference content (hero, about, dates, etc.)
- Speakers and their profiles
- Sponsors and collaborations
- Abstracts submissions
- Registrations
- Universities showcase

Access the dashboard at: `/admin` (requires authentication)

## Customization

### Updating Conference Content
1. **Via Admin Dashboard**: Login and edit content directly
2. **Via Database**: Update the `SiteContent` collection
3. **Via Code**: Modify default values in component files

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Individual `.css` files in component folders
- Theme colors can be updated in CSS variables

## Deployment Checklist

Before deploying to production:

- [ ] Update all environment variables in production
- [ ] Configure MongoDB connection
- [ ] Set up email SMTP credentials
- [ ] Configure payment gateway (Razorpay)
- [ ] Update domain in CORS settings
- [ ] Test all forms (contact, abstract, registration)
- [ ] Verify email sending functionality
- [ ] Test payment processing
- [ ] Update robots.txt and sitemap.xml
- [ ] Configure SSL certificate
- [ ] Set up monitoring and error tracking

## Support

For technical support or questions:
- Email: icemmae2027@sciengasummits.com
- Documentation: See README.md

## License

© 2027 ICEMMAE2027. All Rights Reserved by SCIENGA SUMMITS
