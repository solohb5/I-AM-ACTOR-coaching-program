// Vercel Serverless Function for Stripe Checkout
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Package configurations
const packages = {
  single: { price: 9700, name: 'Creative Single', sessions: 1 },
  journey: { price: 23700, name: 'Artistic Journey', sessions: 3 },
  mastery: { price: 32500, name: 'Creative Mastery', sessions: 5 }
};

module.exports = async function handler(req, res) {
  // Security headers and CORS
  const allowedOrigins = [
    'https://i-am-actor-coaching-program.vercel.app',
    'https://i-am-actor-coaching-program-git-main-hans-projects-9a2b05f1.vercel.app'
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
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: pkg.name,
            description: `${pkg.sessions} coaching session${pkg.sessions > 1 ? 's' : ''}`,
          },
          unit_amount: pkg.price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin || 'https://i-am-actor-coaching-program.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://i-am-actor-coaching-program.vercel.app'}?canceled=true`,
      metadata: {
        package: packageType,
        sessions: pkg.sessions.toString()
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