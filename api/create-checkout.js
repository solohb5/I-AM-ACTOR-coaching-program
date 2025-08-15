// Vercel Serverless Function for Stripe Checkout
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Package configurations
const packages = {
  single: { price: 10900, name: 'Discovery Session', sessions: 1 },
  growth: { price: 26700, name: 'Growth Package', sessions: 3 },
  transformation: { price: 47400, name: 'Transformation Package', sessions: 6 }
};

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packageType } = req.body;
    
    if (!packageType || !packages[packageType]) {
      return res.status(400).json({ error: 'Invalid package type' });
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