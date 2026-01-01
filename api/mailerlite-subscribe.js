// Vercel Serverless Function for MailerLite Subscription
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check environment variable
  const apiKey = process.env.MAILERLITE_API_KEY;
  
  if (!apiKey) {
    console.error('MAILERLITE_API_KEY not found');
    return res.status(500).json({ 
      error: 'Email system not configured',
      hasKey: false
    });
  }

  const { email, resultType } = req.body;
  
  // Validate input
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  if (!resultType) {
    return res.status(400).json({ error: 'Invalid result type' });
  }

  // Call MailerLite API
  try {
    console.log('Calling MailerLite API for:', email);
    
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        email: email,
        groups: ['175430226583488139'],
        fields: {
          quiz_result: resultType
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MailerLite API error:', data);
      return res.status(response.status).json({ 
        error: 'MailerLite API failed',
        details: data 
      });
    }

    console.log('MailerLite success:', email);
    return res.status(200).json({ 
      success: true,
      data: data 
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Submission failed',
      message: error.message 
    });
  }
}

