// Vercel Serverless Function for Stripe Checkout
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Updated package configurations for 2026
const packages = {
  toolkit: {
    price: 3700, // $37
    name: "Actor's Toolkit",
    description: "5 essential tools for actors"
  },
  challenge: {
    price: 36500, // $365
    name: '30-Tape Challenge',
    description: 'Six weeks. Thirty tapes. Become who you've always been.'
  },
  community: {
    price: 9700, // $97/month
    name: 'I Am Actor Community',
    description: 'Monthly membership with full access',
    isSubscription: true
  }
};

module.exports = async function handler(req, res) {
  // Security headers and CORS
  const allowedOrigins = [
    'https://i-am-actor-coaching-program.vercel.app',
    'https://i-am-actor-coaching-program-git-main-hans-projects-9a2b05f1.vercel.app',
    'http://localhost:5000' // For local development
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate environment
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not configured');
      return res.status(500).json({ error: 'Payment system not configured' });
    }

    const { packageType } = req.body;

    // Input validation
    if (!packageType || typeof packageType !== 'string') {
      return res.status(400).json({ error: 'Invalid package type' });
    }

    if (!packages[packageType]) {
      return res.status(400).json({ error: 'Package not found' });
    }

    const pkg = packages[packageType];

    // Determine mode based on package type
    const sessionMode = pkg.isSubscription ? 'subscription' : 'payment';

    const lineItems = pkg.isSubscription
      ? [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: pkg.name,
              description: pkg.description,
            },
            unit_amount: pkg.price,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        }]
      : [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: pkg.name,
              description: pkg.description,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        }];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: sessionMode,
      success_url: `${req.headers.origin || 'https://i-am-actor-coaching-program.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://i-am-actor-coaching-program.vercel.app'}?canceled=true`,
      metadata: {
        package: packageType,
        price: pkg.price.toString()
      }
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({
      error: 'Payment session creation failed',
      details: error.message
    });
  }
}
