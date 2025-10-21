# I AM ACTOR - The Actor's Journey

Landing page for Hans's 12-week Actor's Journey coaching program.

## 🚀 Quick Start

1. **Production URL**: Deploy to Vercel
2. **Local Development**: Open `index.html` in browser (no build needed!)

## 📁 Project Structure

```
/
├── index.html                  # Main landing page (Actor's Journey)
├── success.html               # Stripe payment success page
├── assets/
│   ├── css/
│   │   ├── storybook.css      # Legacy (not used by Actor's Journey)
│   │   └── production-overrides.css  # Consolidated overrides
│   ├── js/
│   │   ├── journey.js         # Main JavaScript for Actor's Journey
│   │   ├── minimal-safe.js    # Legacy (for other pages)
│   │   └── stripe-integration.js  # Stripe checkout handlers
│   └── images/                # All image assets
├── api/
│   └── create-checkout.js     # Vercel serverless function (Stripe)
├── archive/                    # Old versions (safe to ignore)
│   ├── old-versions/          # Archived HTML experiments
│   ├── unused-js/             # Archived JavaScript
│   └── unused-css/            # Archived CSS
└── vercel.json                # Vercel deployment config
```

## ⚙️ Configuration

### Update Spots Available
Edit line 1838 in `index.html`:
```javascript
const SPOTS_AVAILABLE = 10; // Change this number
```

### Add Google Analytics
1. Get your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
2. Edit `index.html` lines 1217-1226
3. Uncomment and replace `G-XXXXXXXXXX` with your ID

### Update Stripe Payments
Direct Stripe Checkout links are at:
- Line 1709: One-time payment ($1,297)
- Line 1724: Payment plan (3 × $449)
- Line 1782: Footer one-time link
- Line 1786: Footer payment plan link

### Update Calendly Link
Current: `https://calendly.com/hans-magic/actors-road-map-coaching`
- Line 1743: Investment section
- Line 1818: Footer

## 🎨 Design System

### Colors
- **Ivory**: `#FFFEF0` - Light sections background
- **Adventure Green**: `#5A8C3A` - Primary accent (light sections)
- **Old Gold**: `#D4C137` - Primary accent (dark sections)
- **Deep Charcoal**: `#1A1A1A` - Dark sections background

### Typography
- **Headlines**: Bentham (hero), Cinzel (dark sections), Crimson Text (light sections)
- **Body**: Lora (serif)
- **Accents**: Alegreya (CTAs, labels)

## 📊 Analytics Events

The `journey.js` file tracks:
- `page_loaded` - Initial page view
- `stripe_checkout_clicked` - Payment button clicks
- `calendly_clicked` - Booking link clicks
- `nav_cta_clicked` - Navigation CTA
- `hero_cta_clicked` - Hero section CTA
- `scroll_depth` - 25%, 50%, 75%, 100%
- `time_on_page` - Every 30 seconds
- `page_visibility_change` - Tab switching
- `javascript_error` - Any JS errors

## 🖼️ Image Optimization TODO

See `IMAGE-OPTIMIZATION-TODO.md` for compression instructions.

**Priority images to compress:**
1. `tools1.png` (889KB → ~150KB)
2. `hans-bio.jpg` (620KB → ~80KB)
3. `knightartfire (500 x 500 px).png` (301KB → ~50KB)

## 🔐 Environment Variables (Vercel)

Set in Vercel dashboard → Settings → Environment Variables:

- `STRIPE_SECRET_KEY` - Your Stripe secret key

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

Or push to GitHub and connect to Vercel dashboard.

### Custom Domain
Update CORS in `api/create-checkout.js` line 15-18 to include your domain.

## 📝 Content Updates

### Program Details
- **Price**: $1,297 one-time or 3 × $449/month
- **Duration**: 12 weeks
- **Start Date**: November 4, 2025
- **Spots**: Update `SPOTS_AVAILABLE` constant

### Testimonials
Current testimonials are from:
- Monique (Hero)
- Deb LeClair (Self-Tape section)
- Gen (Path section)
- Brandon (Final section)

Add/edit directly in `index.html`.

## 🔧 Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework!)
- **Payments**: Stripe Checkout (direct links)
- **Scheduling**: Calendly embeds
- **Hosting**: Vercel
- **Backend**: Vercel Serverless Functions (Node.js)

## 📞 Support

Questions? Contact Hans via Calendly link on site.

## 📄 License

© 2025 I AM ACTOR. All rights reserved.
