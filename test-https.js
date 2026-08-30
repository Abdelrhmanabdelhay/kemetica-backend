import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

const data = JSON.stringify({
  from: 'onboarding@resend.dev',
  to: 'kemiticatours@gmail.com',
  subject: 'Test HTTPS',
  html: '<p>Test</p>'
});

const options = {
  hostname: 'api.resend.com',
  port: 443,
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  let resData = '';
  res.on('data', d => {
    resData += d;
  });
  res.on('end', () => {
    console.log('Response:', resData);
  });
});

req.on('error', error => {
  console.error('Request error:', error);
});

req.write(data);
req.end();
