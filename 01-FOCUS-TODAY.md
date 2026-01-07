# 📅 Today's Focus

> **Date**: January 6, 2026
> **Session**: COACHING PAGE + SITE ARCHITECTURE CLEANUP ✅
> **Status**: ✅ Router fixed, coaching page complete, ready for deployment
> **Next:** Redeploy to Vercel with correct homepage

---

## 🎯 CURRENT STATE: Collins-Style Redesign Complete

**React version is running:** http://localhost:5002/
- ✅ The Door (collins-actual.tsx) - Philosophy page with scroll-activated inversion
- ✅ The Secret (secret.tsx) - 11 powerful beats, starts dark → flips light at 70%
- ✅ The Challenge (challenge.tsx) - 15 powerful beats, starts light → flips dark at 70%
- ✅ Quiz, Toolkit, Success pages (funnel pages working)

**THIS IS PRODUCTION-READY** - Collins-style restraint with dramatic scroll effects implemented.

---

## ✅ COMPLETED: Collins-Style Scroll-Activated Color Inversion System

### Design Philosophy ✅
**Collins-style restraint:**
- Say more with less - massive white space, single powerful lines
- Dramatic color shifts enhance narrative arc (not distract)
- Unified system across all pages
- Scroll-activated instead of jarring section alternation

### Color System ✅
- **Base background**: `#F8F8F7` (warm cream/light) - ALL sections
- **Base text**: `#0A0A0A` (almost black)
- **CSS filter**: `invert(1)` creates dark appearance
- **Transition**: 0.6s smooth ease-in-out for dramatic effect

### Technical Implementation ✅
**Scroll-activated inversion at 70% scroll:**
```javascript
const flipPoint = (documentHeight - windowHeight) * 0.7;
setIsInverted(scrollPosition > flipPoint); // or < for reverse
```

### The Door (collins-actual.tsx) ✅
- **Starts**: Light (normal)
- **At 70%**: Inverts to dark
- Clean, dramatic shift that matches the emotional arc
- Philosophy content with powerful single-line statements

### The Secret (secret.tsx) ✅
**11 Powerful Beats:**
1. The industry changed
2. Here's what every acting program gets wrong
3. They add pressure
4. Because you're trying too hard
5. Make it a job, and it becomes work
6. Make it a hobby, and you'll do it for the rest of your life
7. When you were a kid, you didn't ask if you were good enough
8. You just pretended
9. **[THE SHIFT - 70%]** This is where we bring them back
10. I started booking. Not because I got more serious
11. Because I got more playful

- **Starts**: Inverted (appears dark)
- **At 70%**: Flips to light
- Perfect for "the shift" moment in the narrative

### The Challenge (challenge.tsx) ✅
**15 Powerful Beats:**
1. The 30-Tape Challenge / $365
2. That was Tape 1
3. The only difference between you and them?
4. They've done it 30 times. Then 100. Then 500
5. The magic number isn't 1
6. It's 30
7. 30 tapes does
8. By tape 30, a self-tape isn't a test
9. That's when the great work starts
10. This isn't a course
11. It's a bet on yourself
12. **[THE SHIFT - 70%]** Complete all 30? I give you every penny back
13. The only way you lose is if you give up
14. You've been waiting for permission
15. You're allowed

- **Starts**: Light (normal)
- **At 70%**: Inverts to dark
- Matches the emotional arc of commitment

### Navigation ✅
- Fixed navigation inverts with page
- Minimal 2-line hamburger menu
- "I AM ACTOR" branding in EB Garamond
- Full-screen overlay menu

---

## 📂 File Structure

**React Pages (localhost:5002):**
- `/client/src/pages/collins-actual.tsx` - The Door (philosophy) ✅ COLLINS-STYLE
- `/client/src/pages/secret.tsx` - The Secret (method) ✅ COLLINS-STYLE
- `/client/src/pages/challenge.tsx` - The Challenge ($365) ✅ COLLINS-STYLE
- `/client/src/pages/quiz.tsx` - Full quiz flow ✅ COMPLETE
- `/client/src/pages/toolkit.tsx` - Golden Ritual ✅ COMPLETE
- `/client/src/pages/success.tsx` - Thank you page ✅ COMPLETE
- `/client/src/pages/not-found.tsx` - 404 page ✅ COMPLETE

**Legacy Pages (for reference):**
- `/client/src/pages/home.tsx` - Original Red Antler homepage
- `/client/src/pages/method.tsx` - Original Red Antler method page
- `/client/src/pages/home-collins.tsx` - Early Collins iteration
- `/client/src/pages/collins-clean.tsx` - Early Collins iteration

**App Configuration:**
- `/client/src/App.tsx` - Router + Lenis smooth scroll ✅
- Routes: `/actual` (Door), `/secret` (Method), `/challenge` ✅

**API:**
- `/api/create-checkout.js` - Stripe checkout ($37/$365) ✅

**Design System:**
- Inline CSS (no external stylesheets for main pages)
- EB Garamond serif typography
- Color tokens: #F8F8F7 (light), #0A0A0A (almost black)

---

## 🎯 User Journey (Collins-Style)

**Visitor Flow:**
1. **The Door** (`/actual`) → Philosophy + narrative → "Ready to play?" CTA
2. **The Secret** (`/secret`) → 11 beats about the method → "The Challenge" CTA
3. **The Challenge** (`/challenge`) → 15 beats about 30-Tape Challenge → Quiz or Stripe
4. **Quiz** → 9 questions → Email → Result → Toolkit ($37)
5. **Toolkit** → 5 tools + Challenge upsell
6. **Success** → Thank you + next steps

**Navigation:**
- The Door (Philosophy)
- The Secret (Method)
- The Challenge (Offer)

**All CTAs point to:**
- Primary: Quiz (builds list + $37 toolkit)
- Secondary: Challenge ($365)

---

## 📝 Next Steps (When Ready)

### Testing:
- Test scroll behavior on different screen sizes
- Fine-tune 70% flip point if needed
- Mobile optimization review
- Verify color inversion works across browsers

### Content:
- Add video content to replace placeholders (if desired)
- Integrate Stripe checkout functionality for Challenge page
- Update Stripe payment link in challenge.tsx

### Optional Polish:
- Add transitions between pages
- Consider hover effects on CTAs
- Test accessibility (color contrast after inversion)

---

## 🚀 Technical Notes

**CSS Filter Inversion:**
- The inversion filter affects ALL colors including images
- Navigation stays fixed and inverts with the page
- Buttons maintain contrast through the inversion
- Smooth scroll (Lenis) already implemented via App.tsx

**Performance:**
- Scroll listeners are optimized
- Transitions are hardware-accelerated
- No external CSS files = faster load times

---

**Status: Collins-style scroll-activated color inversion system complete. Ready for review and testing. 🎬**
