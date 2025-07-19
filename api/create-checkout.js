import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Coaching packages configuration
const PACKAGES = {
  single: {
    name: 'Creative Single',
    description: '1 Coaching Session - Perfect for immediate breakthrough',
    price: 9700, // $97.00 in cents
    sessions: 1,
    originalPrice: 19400 // $194.00 in cents
  },
  journey: {
    name: 'Artistic Journey', 
    description: '3 Coaching Sessions - Most artists choose this',
    price: 23700, // $237.00 in cents
    sessions: 3,
    originalPrice: 47400 // $474.00 in cents
  },
  mastery: {
    name: 'Creative Mastery',
    description: '5 Coaching Sessions - Maximum value & flexibility', 
    price: 32500, // $325.00 in cents
    sessions: 5,
    originalPrice: 65000 // $650.00 in cents
  }
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packageType, customerEmail, customerName } = req.body;

    // Validate package type
    if (!PACKAGES[packageType]) {
      return res.status(400).json({ error: 'Invalid package type' });
    }

    const package = PACKAGES[packageType];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: package.name,
              description: package.description,
              images: ['https://your-domain.com/assets/images/logo.png'], // Update with your logo
            },
            unit_amount: package.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customerEmail,
      metadata: {
        package_type: packageType,
        sessions_purchased: package.sessions.toString(),
        customer_name: customerName || '',
        original_price: package.originalPrice.toString()
      },
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
      // Enable automatic tax calculation if needed
      automatic_tax: { enabled: false },
    });

    // Return the session ID for frontend redirect
    res.status(200).json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}