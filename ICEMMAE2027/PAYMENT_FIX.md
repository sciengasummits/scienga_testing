# Payment Fix - "window.Razorpay is not a constructor" Error

## Issue
The payment system was showing the error: **"window.Razorpay is not a constructor"**

## Root Cause
The Register component was trying to use `new window.Razorpay()` before the Razorpay script was loaded. The `useRazorpay` hook was not being imported or used.

## Fix Applied ✅

### 1. Added useRazorpay Hook Import
```javascript
import useRazorpay from '../../hooks/useRazorpay';
```

### 2. Initialize Hook in Component
```javascript
const Register = ({ isDiscounted = false }) => {
    // Load Razorpay script
    const razorpayReady = useRazorpay();
    // ... rest of component
}
```

### 3. Added Safety Check Before Payment
```javascript
// Check if Razorpay is loaded
if (!razorpayReady || typeof window.Razorpay !== 'function') {
    throw new Error('Payment system is loading. Please wait a moment and try again.');
}
```

### 4. Updated Conference Branding
Changed from "LIUTEX Summit 2026" to "ICEMMAE2027" in payment modal

## Files Modified
- `ICEMMAE2027/src/pages_orig/Register/Register.jsx`

## How It Works Now

1. **Page loads** → `useRazorpay` hook injects Razorpay script
2. **Script loads** → `razorpayReady` becomes `true`
3. **User submits form** → Checks if Razorpay is ready
4. **If ready** → Opens payment modal
5. **If not ready** → Shows error message asking user to wait

## Testing

1. **Clear browser cache** (important!)
2. **Restart development server**:
   ```bash
   npm run dev
   ```
3. **Navigate to registration page**: `/register`
4. **Fill form and submit**
5. **Payment modal should open** ✅

## Test Payment Details

Use these test credentials:
- **Card Number**: `4111 1111 1111 1111`
- **Expiry**: `12/25`
- **CVV**: `123`
- **Name**: Any name

## Troubleshooting

### If payment still doesn't work:

1. **Check browser console** for errors
2. **Verify .env file** has Razorpay credentials:
   ```env
   RAZORPAY_KEY_ID=rzp_test_SMQXCUDHHFb4qk
   RAZORPAY_KEY_SECRET=9abqpen52QfRUdbTHuF0ik0N
   ```
3. **Disable ad blockers** (they may block Razorpay script)
4. **Try different browser** (Chrome/Firefox recommended)
5. **Check network tab** to see if script loads

### Common Issues:

| Issue | Solution |
|-------|----------|
| Script blocked by ad blocker | Disable ad blocker for localhost |
| CORS error | Check if API is running on correct port |
| "Payment system is loading" | Wait 2-3 seconds and try again |
| Modal doesn't open | Check browser console for errors |

## What Changed

### Before:
```javascript
// ❌ No hook, script not loaded
const Register = () => {
    // ...
    const rzp = new window.Razorpay(options); // Error!
}
```

### After:
```javascript
// ✅ Hook loads script, checks if ready
const Register = () => {
    const razorpayReady = useRazorpay();
    
    // Check before using
    if (!razorpayReady || typeof window.Razorpay !== 'function') {
        throw new Error('Payment system is loading...');
    }
    
    const rzp = new window.Razorpay(options); // Works!
}
```

## Additional Notes

- The `useRazorpay` hook dynamically loads the Razorpay script only when needed
- This prevents the script from loading on every page
- Improves performance and avoids unnecessary permission popups
- The hook is reusable across all payment pages

## Status
✅ **Fixed and Ready for Testing**

---

**Last Updated**: January 2027
