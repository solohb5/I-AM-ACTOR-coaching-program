// Simple test to check if environment variable is accessible
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const hasKey = !!process.env.MAILERLITE_API_KEY;
  const keyPreview = process.env.MAILERLITE_API_KEY 
    ? process.env.MAILERLITE_API_KEY.substring(0, 20) + '...'
    : 'NOT FOUND';
  
  const allEnvKeys = Object.keys(process.env).sort();
  const mailerKeys = allEnvKeys.filter(k => k.includes('MAILER'));
  
  return res.status(200).json({
    hasMailerLiteKey: hasKey,
    keyPreview: keyPreview,
    allMailerKeys: mailerKeys,
    totalEnvVars: allEnvKeys.length,
    nodeVersion: process.version,
    sampleEnvKeys: allEnvKeys.slice(0, 10)
  });
}

