import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log('Testing resend...');
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kemiticatours@gmail.com',
      subject: 'Test',
      html: '<p>Test</p>'
    });
    console.log('Data:', data);
    console.log('Error:', error);
  } catch (err) {
    console.error('Catch error:', err);
  }
}
test();
