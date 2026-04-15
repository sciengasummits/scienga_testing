# ICEMMAE2027 - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd ICEMMAE2027
npm install
```

### Step 2: Create Environment File
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your actual credentials
# At minimum, you need:
# - MONGODB_URI (your MongoDB connection string)
# - SMTP credentials (for email functionality)
```

### Step 3: Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## 📋 What's Already Configured

✅ **Conference Information**
- Title: International Conference and Expo on Mechanical, Mechatronics and Aerospace Engineering
- Short Name: ICEMMAE2027
- Dates: February 11-13, 2027
- Venue: Munich, Germany

✅ **All Features Working**
- Abstract submission system
- Registration with payment
- Speaker management
- Session scheduling
- Sponsor showcase
- Newsletter subscription
- Contact forms

✅ **Default Content**
- Hero section with countdown
- About section with objectives
- Important dates timeline
- Conference themes
- Footer with contact info

## 🔧 Essential Configuration

### MongoDB (Required)
```env
MONGODB_URI=mongodb://localhost:27017/icemmae2027
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/icemmae2027
```

### Email (Required for forms)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Payment (Optional - for registration)
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## 📝 Customization Tips

### Update Conference Content
1. **Via Code**: Edit default values in component files
2. **Via Database**: Seed or manually update the `SiteContent` collection
3. **Via Admin**: Access `/admin` (requires authentication)

### Add Your Logo
Replace or add images in `/public` folder and update:
- `src/components/common/Logo/Logo.jsx`

### Change Colors/Styling
- Global styles: `src/app/globals.css`
- Component styles: Individual `.css` files

### Update Contact Information
Edit defaults in:
- `src/components/common/Footer/Footer.jsx`
- `src/components/common/Navbar/Navbar.jsx`

## 📚 Documentation

- **Full Setup Guide**: See `SETUP_GUIDE.md`
- **Migration Details**: See `MIGRATION_SUMMARY.md`
- **Project README**: See `README.md`

## 🆘 Common Issues

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env.local`
- Ensure network access if using MongoDB Atlas

### Email Not Sending
- Verify SMTP credentials
- For Gmail, use App Password (not regular password)
- Check firewall/network settings

## 🎯 Next Steps

1. ✅ Install and run (you're here!)
2. 📧 Configure email settings
3. 🗄️ Set up MongoDB
4. 🎨 Customize content and styling
5. 👥 Add speakers and sponsors
6. 💳 Configure payment gateway
7. 🚀 Deploy to production

## 📞 Support

- Email: icemmae2027@sciengasummits.com
- Check documentation files for detailed information

---

**Ready to build an amazing conference website!** 🎉
