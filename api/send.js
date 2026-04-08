import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { name, email, equipment, message } = await request.json();

    const data = await resend.emails.send({
      from: 'HomeEase Web <onboarding@resend.dev>', // You can update this once domain is verified in Resend
      to: ['support@homeeasedme.com'], 
      subject: `New Equipment Request: ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Equipment Type:</strong> ${equipment}</p>
             <p><strong>Message:</strong> ${message}</p>`
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
