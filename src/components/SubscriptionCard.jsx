'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import axios from 'axios';

// Stripe promise initialization
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SubscriptionCard({ name, description, price, features, currency = 'USD' }) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        const stripe = await stripePromise;

        try {
            const { data } = await axios.post('/api/create-checkout-session', {
                items: [{ name, price, quantity: 1 }],
                currency,
                success_url: `${window.location.origin}/payment-success`,
                cancel_url: `${window.location.origin}/payment-cancelled`,
            });

            await stripe.redirectToCheckout({ sessionId: data.id });
        } catch (error) {
            console.error('Error during checkout:', error);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
                <div className="text-4xl font-bold text-green-500 mb-6">
                    {currency} {price.toFixed(2)}
                </div>
                <ul className="mb-6 text-gray-700 space-y-2">
                    {features.map((feature, index) => (
                        <li key={index}>✔️ {feature}</li>
                    ))}
                </ul>
            </div>

            <button
                onClick={handleCheckout}
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-bold transition ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                    }`}
            >
                {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
        </div>
    );
}
