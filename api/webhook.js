const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Payment successful for session:', session.id);
        
        // Extract customer and package information
        const customerEmail = session.customer_email;
        const packageType = session.metadata.package_type;
        const sessionsPurchased = parseInt(session.metadata.sessions_purchased);
        const customerName = session.metadata.customer_name;
        const amountPaid = session.amount_total;

        // Here you would typically:
        // 1. Save customer data to your database
        // 2. Send confirmation email with Calendly link
        // 3. Create customer record in your system
        
        console.log('Customer purchase details:', {
          email: customerEmail,
          name: customerName,
          package: packageType,
          sessions: sessionsPurchased,
          amount: amountPaid / 100 // Convert cents to dollars
        });

        // TODO: Implement database storage and email sending
        await handleSuccessfulPayment({
          email: customerEmail,
          name: customerName,
          packageType,
          sessionsPurchased,
          amountPaid,
          stripeSessionId: session.id
        });

        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        
        // Handle failed payment (optional)
        // You might want to send an email or log this
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// Helper function to handle successful payments
async function handleSuccessfulPayment(paymentData) {
  try {
    // TODO: Implement these functions based on your needs:
    
    // 1. Save to database (if you add one later)
    // await saveCustomerToDatabase(paymentData);
    
    // 2. Send confirmation email with Calendly link
    // await sendConfirmationEmail(paymentData);
    
    // 3. Generate Calendly booking link based on package
    const calendlyLink = generateCalendlyLink(paymentData.packageType);
    
    console.log(`Generated Calendly link for ${paymentData.email}: ${calendlyLink}`);
    
  } catch (error) {
    console.error('Error in handleSuccessfulPayment:', error);
  }
}

// Generate appropriate Calendly link based on package
function generateCalendlyLink(packageType) {
  // You'll need to replace these with your actual Calendly URLs
  const calendlyUrls = {
    single: 'https://calendly.com/your-username/single-session',
    journey: 'https://calendly.com/your-username/artistic-journey', 
    mastery: 'https://calendly.com/your-username/creative-mastery'
  };
  
  return calendlyUrls[packageType] || calendlyUrls.single;
}

// Configure this endpoint to handle raw body for Stripe webhooks
module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}