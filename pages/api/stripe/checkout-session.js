import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { plan } = req.body;

  // ✅ Make sure these Price IDs match your Stripe Dashboard (Test or Live mode)
  const priceId =
    plan === 'monthly'
      ? 'price_1S19FFF630AAi1zS4NmTJlsk' // Monthly price from Stripe
      : 'price_1S19TCF630AAi1zSC9N0Ywjt'; // Annual price from Stripe

  try {
    // ✅ Use NEXT_PUBLIC_BASE_URL in production, fallback to localhost in dev
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      // ✅ Redirect back with session_id so we can verify later
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/subscribe`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe checkout error:', error);
    return res.status(500).json({ error: error.message });
  }
}
