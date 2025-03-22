"use client";
import { useState } from "react";
import SubscriptionOptionCard from "./SubscriptionOptionCard";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const subscriptionPlans = [
    { duration: "1 Month", price: 29, displayPrice: "AED 29/m", discount: null },
    { duration: "3 Months", price: 69, displayPrice: "AED 79/m", discount: "20%" },
    { duration: "6 Months", price: 149, displayPrice: "AED 149/m", discount: "47%" },
];

export default function SubscriptionSelector() {
    const [activeOption, setActiveOption] = useState(subscriptionPlans[1]); // Default plan (3 Months)
    const [loading, setLoading] = useState(false);

    const handleSelect = (option) => {
        setActiveOption(option);
    };

    const handleCheckout = async () => {
        setLoading(true);
        const stripe = await stripePromise;

        // Get saved data from local storage
        const storedAnswers = JSON.parse(localStorage.getItem('questionAnswers'));
        const storedContactInfo = JSON.parse(localStorage.getItem('contactInfo'));

        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-checkout-session`, {
                items: [{
                    name: `${activeOption.duration} Subscription`,
                    price: activeOption.price,
                    quantity: 1
                }],
                currency: 'aed',
                success_url: `${window.location.origin}/payment-success`,
                cancel_url: `${window.location.origin}/questions`,
                answers: storedAnswers,
                contactInfo: storedContactInfo,
            });

            await stripe.redirectToCheckout({ sessionId: data.id });
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong, please try again!");
            setLoading(false);
        }
    };


    return (
        <div className="max-w-lg mx-auto text-center bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex gap-3 justify-center">
                {subscriptionPlans.map((plan, idx) => (
                    <SubscriptionOptionCard
                        key={idx}
                        duration={plan.duration}
                        price={plan.displayPrice}
                        discount={plan.discount}
                        active={activeOption.duration === plan.duration}
                        onClick={() => handleSelect(plan)}
                    />
                ))}
            </div>

            <button
                onClick={handleCheckout}
                disabled={loading}
                className={`mt-6 w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition ${loading && "opacity-50 cursor-not-allowed"}`}
            >
                {loading ? "Processing..." : `Get ${activeOption.duration} for ${activeOption.displayPrice}`}
            </button>

            <p className="mt-4 text-xs text-gray-600">
                By selecting Subscribe, you will be charged, your subscription will auto-renew for the same price and package length until you cancel via settings, and you agree to our Terms. You also acknowledge the right to withdraw within 14 days for a pro-rated refund, with no refund available after 14 days.
            </p>
        </div>
    );
}
