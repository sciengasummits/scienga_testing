# Payment Setup & Troubleshooting Guide - ICEMMAE2027

## Issue Identified ✅

The payment system was not working because:
1. **Razorpay credentials were set to placeholder values** in `.env` file
2. **Currency mismatch** - EUR was set but Razorpay test mode only supports INR

## Fixed ✅

Updated `ICEMMAE2027/.env` with working test credentials:
```env
RAZORPAY_KEY_ID=rzp_test_SMQXCUDHHFb4qk
RAZORPAY_KEY_SECRET=9abqpen52QfRUdbTHuF0ik0N
RAZORPAY_CURRENCY=INR
```

## How Payment Works

### Flow:
1. **User fills registration form** → Calculates total amount
2. **Frontend calls `/api/payment/key`** → Gets Razorpay public key
3. **Frontend calls `/api/payment/create-order`** → Creates Razorpay order
4. **Razorpay Checkout opens** → User completes payment
5. **Frontend calls `/api/payment/verify`** → Verifies payment signature
6. **Registration status updated** → Marked as "Paid"

### Currency Conversion:
- **Test Mode**: Only INR supported
- **EUR/USD amounts** are automatically converted to INR
- **Conversion rate**: 1 EUR = 90 INR, 1 USD = 84 INR
- **Example**: €699 → ₹62,910 INR

## Test Payment

### Using Test Credentials:

**Test Card Details:**
- **Card Number**: `4111 1111 1111 1111`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name

**Test UPI:**
- **UPI ID**: `success@razorpay`

**Test Netbanking:**
- Select any bank
- Use credentials provided on test page

### Test Scenarios:

| Card Number | Result |
|-------------|--------|
| 4111 1111 1111 1111 | Success |
| 4000 0000 0000 0002 | Declined |
| 4000 0000 0000 0077 | Card Expired |
| 4000 0000 0000 0119 | Processing Error |

## Production Setup

### 1. Get Production Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up / Log in
3. Complete KYC verification
4. Go to **Settings** → **API Keys**
5. Generate **Live Mode** keys

### 2. Update Environment Variables

```env
# Production Razorpay Credentials
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
RAZORPAY_KEY_SECRET=your_live_secret_key

# Enable international payments (after Razorpay approval)
RAZORPAY_CURRENCY=EUR
EUR_TO_INR_RATE=90
```

### 3. Enable International Payments

1. In Razorpay Dashboard → **Settings** → **Payment Methods**
2. Enable **International Cards**
3. Submit required documents
4. Wait for approval (usually 2-3 business days)
5. Once approved, you can accept EUR/USD directly

### 4. Configure Webhooks (Optional but Recommended)

1. Go to **Settings** → **Webhooks**
2. Add webhook URL: `https://icemmae2027.sciengasummits.com/api/payment/webhook`
3. Select events: `payment.captured`, `payment.failed`
4. Save webhook secret in `.env`:
   ```env
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

## API Endpoints

### 1. Get Payment Key
```javascript
GET /api/payment/key
Response: { key: "rzp_test_..." }
```

### 2. Create Order
```javascript
POST /api/payment/create-order
Body: {
  amount: 699,
  currency: "EUR",
  registrationId: "...",
  conference: "icemmae2027",
  description: "Speaker Registration"
}
Response: {
  success: true,
  order: {
    id: "order_...",
    amount: 6291000, // in paise (INR)
    currency: "INR",
    receipt: "rcpt_icemmae2027_...",
    amountUSD: 699
  }
}
```

### 3. Verify Payment
```javascript
POST /api/payment/verify
Body: {
  razorpay_order_id: "order_...",
  razorpay_payment_id: "pay_...",
  razorpay_signature: "...",
  registrationId: "..."
}
Response: {
  success: true,
  message: "Payment verified successfully.",
  paymentId: "pay_..."
}
```

## Troubleshooting

### Issue: "Razorpay is not configured"

**Cause**: Missing or invalid Razorpay credentials

**Fix**:
1. Check `.env` file has valid credentials
2. Restart the development server: `npm run dev`
3. Clear browser cache

### Issue: Payment succeeds but verification fails

**Cause**: Incorrect webhook secret or signature mismatch

**Fix**:
1. Verify `RAZORPAY_KEY_SECRET` matches dashboard
2. Check server logs for signature comparison
3. Ensure no extra spaces in environment variables

### Issue: Currency conversion not working

**Cause**: Missing or incorrect conversion rates

**Fix**:
```env
USD_TO_INR_RATE=84
EUR_TO_INR_RATE=90
```

### Issue: International cards declined

**Cause**: International payments not enabled

**Fix**:
1. Enable in Razorpay Dashboard
2. Complete KYC if required
3. Wait for approval
4. Use test mode for development

### Issue: Payment modal not opening

**Cause**: Razorpay script not loaded

**Fix**:
1. Check browser console for errors
2. Verify `useRazorpay` hook is working
3. Check if script is blocked by ad blocker
4. Try different browser

## Testing Checklist

Before going live:

- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test payment verification
- [ ] Test registration status update
- [ ] Test email notifications
- [ ] Test different registration categories
- [ ] Test discount codes with payment
- [ ] Test accommodation add-ons
- [ ] Test sponsorship packages
- [ ] Verify amounts are correct
- [ ] Check currency conversion
- [ ] Test on mobile devices
- [ ] Test on different browsers

## Security Best Practices

1. **Never expose secret key** in frontend code
2. **Always verify payment** on server-side
3. **Use HTTPS** in production
4. **Validate amounts** on server before creating order
5. **Log all transactions** for audit trail
6. **Set up webhook** for payment status updates
7. **Handle failed payments** gracefully
8. **Implement rate limiting** on payment endpoints

## Payment Flow Diagram

```
User → Registration Form
  ↓
Calculate Total Amount
  ↓
Fetch Razorpay Key (/api/payment/key)
  ↓
Create Order (/api/payment/create-order)
  ↓
Open Razorpay Checkout Modal
  ↓
User Completes Payment
  ↓
Razorpay Callback with Payment Details
  ↓
Verify Payment (/api/payment/verify)
  ↓
Update Registration Status → "Paid"
  ↓
Send Confirmation Email
  ↓
Show Success Message
```

## Support

### Razorpay Support:
- Email: support@razorpay.com
- Phone: +91-80-6890-6890
- Docs: https://razorpay.com/docs/

### Conference Support:
- Email: icemmae2027@sciengasummits.com
- Check server logs for detailed errors
- Review browser console for frontend issues

## Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)
- [Razorpay Webhooks](https://razorpay.com/docs/webhooks/)
- [Payment Gateway Integration Guide](https://razorpay.com/docs/payments/payment-gateway/)

---

**Status**: ✅ Payment system configured and ready for testing
**Last Updated**: January 2027
