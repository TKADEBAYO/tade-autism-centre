import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { plan } = req.body;

  const priceId = plan === 'monthly'
    ? 'price_1MONTHLY_ID' // Replace with real monthly price ID from Stripe
    : 'price_1YEARLY_ID'; // Replace with real yearly price ID from Stripe

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'http://localhost:3000/assessments',
      cancel_url: 'http://localhost:3000/subscribe',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
