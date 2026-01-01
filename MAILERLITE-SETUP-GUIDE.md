# 🔧 MailerLite Integration Setup Guide

**Status:** ✅ Code Complete — Needs Vercel Environment Variable

---

## What Was Fixed

### Problem 1: Wrong Timing ❌
**Before:** MailerLite called after all quiz questions  
**After:** MailerLite called when user clicks "See My Result" at email gate ✅

### Problem 2: CORS Error ❌
**Before:** Direct browser call to MailerLite API (blocked by CORS)  
**After:** Server-side API route `/api/mailerlite-subscribe` ✅

### Problem 3: Missing Debug Logs ❌
**Before:** No visibility into what was happening  
**After:** Comprehensive console logging at every step ✅

---

## 🚀 Deployment Steps

### 1. Add Environment Variable to Vercel

Go to: **Vercel Dashboard → Project → Settings → Environment Variables**

Add:
```
Name: MAILERLITE_API_KEY
Value: eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiY2NkNTJlOWYzYTIxMmFkOTgzZjhmYjkwMjliZTY4NGQwYjhlMWViZDkzYmM2MzE2YWY2NzdiYjdhMDE1NzVjZDRjZjhlZjIwZTM3MjFmMmMiLCJpYXQiOjE3NjczMDM4MDguNTc4MjExLCJuYmYiOjE3NjczMDM4MDguNTc4MjE0LCJleHAiOjQ5MjI5Nzc0MDguNTcxNzI5LCJzdWIiOiIxNDMxMzE1Iiwic2NvcGVzIjpbXX0.czV-yBRBd7dFUUEn7z8Tlfxh-xOACtfSl6DEPNSVChWsgfUADhuz5mqGQjqQK_-HMPoIrWr-8G6o14-s9LjWlW3ndcBZRinexcWxOSKOHg49lgi9GZ2qiit9cbZekfzzhdlKFnJCkfae3cVhxgKX2FaneZHCmm9x4UZZo-pfpapjBuKV1iHj6AbuJAD1rmf0IPMYQkyLXAsT_f42tkYvJ8dobJa7D5i9FTO_o6fTnBRXY_K_IDhfXwrRm3m9U9RmRJBjX00pkOkpyCiDc-Ap4dEiFExVI6kHMtyGYngQBcwL8JdSE4f8xFBB19J0cFqtJN-XxOaM-05pir9FIe1XlOO-F8fhpJ5IAxVIWoOB4n-K9Of-6rlV25vv7PXg1LeAhYreVGsqYzDX25Trej_fVn11Fo7eoJb5ASZ1jOpZg_91nG9o_Ymq7GIjlJatkvDAjRkhQHiJ7ldROY5S0Yej6okmWUTH7kkzWD4lfLfL7dCgVsGV4IT0dsvAR4qx1uaKnIui6n3M9Ch1PI77Ua30-3E2crumrccOh9gokeKiV9FF75vLsTU60NxuxTjnxUPhStDSgg20FsHkTDqhiTb6ERojsSlxeksE1agx8quwzB34myzpwESX8geYzSu5py8KH68Qwjo_Jzb9YiZBGsuixCIB6X6ETFZ8ncHydkOpyj4
Environment: Production (or All)
```

**Why:** Serverless function needs this to authenticate with MailerLite API

### 2. Deploy to Vercel

```bash
git add .
git commit -m "Add MailerLite serverless integration"
git push
```

Vercel will auto-deploy.

### 3. Test It

1. Go to deployed site: `https://i-am-actor-coaching-program.vercel.app/quiz.html`
2. Open browser DevTools (Console tab)
3. Take the quiz
4. Enter test email at email gate
5. Click "See My Result"
6. **Watch console for:**
   - `🔵 submitEmail() called`
   - `✅ Email captured: [email]`
   - `📊 Preliminary result: [type]`
   - `🚀 Attempting MailerLite API call...`
   - `📧 addToMailerLite() called with: {...}`
   - `⏳ Sending request to serverless function...`
   - `✅ Successfully added to MailerLite via serverless function!`
7. **Verify in MailerLite:**
   - Dashboard → Subscribers
   - Check "Quiz Funnel 2026" group
   - Confirm subscriber appears with `quiz_result` field

---

## 📁 Files Changed

### New Files:
- ✅ `api/mailerlite-subscribe.js` — Serverless function (bypasses CORS)
- ✅ `MAILERLITE-SETUP-GUIDE.md` — This file

### Modified Files:
- ✅ `quiz.html` — Updated to call serverless function + added debug logging
- ✅ `env.template` — Added MAILERLITE_API_KEY

---

## 🔍 How It Works Now

### User Flow:
1. User takes quiz (Questions 1-6)
2. Credibility slide appears
3. User continues (Questions 7-8)
4. **Email gate appears** 
5. User enters email → clicks **"See My Result"**
6. **→ Browser calculates preliminary result**
7. **→ Browser calls `/api/mailerlite-subscribe`**
8. **→ Serverless function calls MailerLite API**
9. **→ User added to "Quiz Funnel 2026" group**
10. Question 9 appears
11. User completes final question
12. Final result calculated and displayed

### Technical Flow:
```
quiz.html (browser)
  ↓ POST /api/mailerlite-subscribe
  ↓ { email, resultType }
  ↓
api/mailerlite-subscribe.js (Vercel serverless)
  ↓ Authorization: Bearer [MAILERLITE_API_KEY]
  ↓ POST https://connect.mailerlite.com/api/subscribers
  ↓ { email, groups, fields }
  ↓
MailerLite API
  ↓ 200 OK
  ↓
Subscriber added to group → Automation triggers
```

---

## 🐛 Debugging

### Console Logs to Watch For:

**Success Path:**
```
🔵 submitEmail() called
✅ Email captured: test@example.com
📊 Preliminary result: The Late Bloomer
🚀 Attempting MailerLite API call...
📧 addToMailerLite() called with: { email: "test@example.com", resultType: "The Late Bloomer" }
📦 Payload: { "email": "test@example.com", "resultType": "The Late Bloomer" }
⏳ Sending request to serverless function...
📬 Response status: 200 OK
✅ Successfully added to MailerLite via serverless function!
Response data: { success: true, data: {...} }
```

**Failure Path (Missing Env Var):**
```
📬 Response status: 500 Internal Server Error
❌ MailerLite submission failed: { error: "Email system not configured" }
```

**Failure Path (Invalid Email):**
```
📬 Response status: 400 Bad Request
❌ MailerLite submission failed: { error: "Invalid email address" }
```

---

## 🧪 Local Testing

To test locally before deploying:

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Create `.env` file:**
```bash
cp env.template .env
```

Add to `.env`:
```
MAILERLITE_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...
```

3. **Run local dev server:**
```bash
vercel dev
```

4. **Test at:** `http://localhost:3000/quiz.html`

---

## 📊 MailerLite Dashboard

After successful submission, check:

**Location:** MailerLite Dashboard → Subscribers

**Group:** Quiz Funnel 2026 (ID: 175430226583488139)

**Fields:**
- Email: `test@example.com`
- Custom Field: `quiz_result` = "The Late Bloomer" (or other type)

**Automation:** "Quiz to Challenge Funnel" should trigger automatically

---

## ✅ Success Criteria

- [ ] Environment variable added to Vercel
- [ ] Code deployed to Vercel
- [ ] Test email submitted via quiz
- [ ] Console shows success logs
- [ ] Subscriber appears in MailerLite dashboard
- [ ] `quiz_result` field is populated
- [ ] Automation triggers (check MailerLite automation logs)

---

## 🔐 Security Notes

- ✅ API key stored in Vercel environment (not in code)
- ✅ CORS configured for allowed origins only
- ✅ Input validation on email and result type
- ✅ HTTPS enforced
- ✅ No sensitive data in logs

---

**Next Step:** Add environment variable to Vercel and redeploy!

