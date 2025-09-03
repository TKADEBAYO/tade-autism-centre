import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { plan } = req.body;

  const priceId = plan === 'monthly'
    ? 'price_1S19FFF630AAi1zS4NmTJlsk'
    : 'price_1S19TCF630AAi1zSC9N0Ywjt';

  try {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://tade-autism-centre.vercel.app'
        : 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/assessments?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/subscribe`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
