// Vercel Serverless Function for MailerLite Subscription
module.exports = async function handler(req, res) {
  // Security headers and CORS
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
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
    console.log('Environment check:', {
      hasApiKey: !!process.env.MAILERLITE_API_KEY,
      envKeys: Object.keys(process.env).filter(k => k.includes('MAILER'))
    });
    
    if (!process.env.MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY not configured');
      console.error('Available env vars:', Object.keys(process.env));
      return res.status(500).json({ 
        error: 'Email system not configured',
        debug: 'MAILERLITE_API_KEY environment variable is missing'
      });
    }

    const { email, resultType } = req.body;
    
    // Input validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    if (!resultType || typeof resultType !== 'string') {
      return res.status(400).json({ error: 'Invalid result type' });
    }

    // MailerLite API call
    console.log('Submitting to MailerLite:', { email, resultType });
    
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`
      },
      body: JSON.stringify({
        email: email,
        groups: ['175430226583488139'], // Quiz Funnel 2026
        fields: {
          quiz_result: resultType
        }
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('MailerLite API error:', responseData);
      return res.status(response.status).json({ 
        error: 'MailerLite submission failed',
        details: responseData 
      });
    }

    console.log('MailerLite success:', responseData);
    return res.status(200).json({ 
      success: true,
      data: responseData 
    });

  } catch (error) {
    console.error('MailerLite error:', error);
    return res.status(500).json({ 
      error: 'Email subscription failed',
      details: error.message 
    });
  }
}

