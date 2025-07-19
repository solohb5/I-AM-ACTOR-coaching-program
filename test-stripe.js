// Test script for Stripe API
require('dotenv').config({ path: '.env.local' });

const handler = require('./api/create-checkout.js');

// Mock request and response objects
const mockReq = {
  method: 'POST',
  body: {
    packageType: 'single'
  },
  headers: {
    origin: 'http://localhost:3000'
  }
};

const mockRes = {
  status: (code) => ({
    json: (data) => {
      console.log(`Response Status: ${code}`);
      console.log('Response Data:', JSON.stringify(data, null, 2));
    },
    end: () => console.log(`Response Status: ${code}`)
  }),
  setHeader: () => {}
};

// Test the function
console.log('Testing Stripe API with package type: single');
console.log('Using Stripe Secret Key:', process.env.STRIPE_SECRET_KEY ? 'Present' : 'Missing');

handler(mockReq, mockRes);
