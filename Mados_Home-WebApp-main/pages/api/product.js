import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    if (!id.startsWith('price_')) {
      throw Error('Incorrect price ID.');
    }
    const price = await stripe.prices.retrieve(id);
    console.log((price));
    
    res.status(200).json(price);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}