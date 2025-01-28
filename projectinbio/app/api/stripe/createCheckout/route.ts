import stripe from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { metadata, isSubscription } = await req.json();

  const price = isSubscription
    ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID
    : process.env.STRIPE_PRICE_ID;

  const session = await stripe.checkout.sessions.create({
    // customer: ,
    line_items: [
      {
        price: price,
        quantity: 1,
      },
    ],
    mode: isSubscription ? 'subscription' : 'payment', // se é recorrência ou pagamento único
    payment_method_types: isSubscription ? ['card'] : ['card', 'pix'],
    success_url: `${req.headers.get('origin')}/${metadata.profileId}`,
    cancel_url: `${req.headers.get('origin')}/${metadata.profileId}/upgrade`,
    metadata,
  });

  return NextResponse.json({ sessionId: session.id });
}
