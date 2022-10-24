import Stripe from 'stripe';
import { getSession } from '@auth0/nextjs-auth0';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req,res){
    const getUser = getSession(req,res);
    const user = getUser?.user;
    if(req.method === "POST"){
        try{
            // Create Checkout Session
            let session;
            if(user){
                const stripeId = user['http://localhost:3000/stripe_customer_id'];
                 session = await stripe.checkout.sessions.create({
                    submit_type: 'pay',
                    mode: 'payment',
                    customer: stripeId,
                    payment_method_types: ['card'],
                    shipping_address_collection: {
                        allowed_countries: ['US', 'CA', 'FR'],
                    },
                    line_items: req.body.map((item) => {
                        return {
                            price_data: {
                                currency: 'eur',
                                product_data: {
                                    name: item.title,
                                    images: [item.image.data.attributes.formats.thumbnail.url],
                                },
                                unit_amount: item.price * 100,
                            },
                            adjustable_quantity: {
                                enabled: true,
                                minimum: 1
                            },
                            quantity: item.quantity,
                        };
                    }),
                    allow_promotion_codes: true,
                    shipping_options: [
                        { shipping_rate: 'shr_1LvOLlDyaFttfhcbY3Qkw0C1' },
                        { shipping_rate: 'shr_1LvOZADyaFttfhcbQApRLaCJ' }
                    ],
                    // Bring people to the success or failed page
                    success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/canceled`,
                });
            }else {
                session = await stripe.checkout.sessions.create({
                    submit_type: 'pay',
                    mode: 'payment',
                    payment_method_types: ['card'],
                    shipping_address_collection: {
                        allowed_countries: ['US', 'CA', 'FR'],
                    },
                    line_items: req.body.map((item) => {
                        return {
                            price_data: {
                                currency: 'eur',
                                product_data: {
                                    name: item.title,
                                    images: [item.image.data.attributes.formats.thumbnail.url],
                                },
                                unit_amount: item.price * 100,
                            },
                            adjustable_quantity: {
                                enabled: true,
                                minimum: 1
                            },
                            quantity: item.quantity,
                        };
                    }),
                    allow_promotion_codes: true,
                    shipping_options: [
                        { shipping_rate: 'shr_1LvOLlDyaFttfhcbY3Qkw0C1' },
                        { shipping_rate: 'shr_1LvOZADyaFttfhcbQApRLaCJ' }
                    ],
                    // Bring people to the success or failed page
                    success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/canceled`,
                });
            }
            res.status(200).json(session);
        }catch(error){
            res.status(error.statusCode || 500).json(error.message);
        }
    }
}