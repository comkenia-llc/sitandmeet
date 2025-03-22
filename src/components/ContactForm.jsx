"use client";
import { useState } from "react";
import { getUserByEmail, saveAnswers, saveContactInfo } from "@/services/submissionService";
import { isValidEmail, isValidPhone } from "@/utils/validation";
import { useRouter } from "next/navigation";

export default function ContactForm({ onProceed }) {
    const [contact, setContact] = useState({ email: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(contact.email) || !isValidPhone(contact.phone)) {
            alert("Enter a valid email and phone number");
            return;
        }

        setLoading(true);
        saveContactInfo(contact);

        try {
            const res = await getUserByEmail(contact.email);

            if (res.data.user) {
                saveAnswers({
                    "1": res.data.user.intention,
                    "2": res.data.user.vibe,
                    "3": res.data.user.emirate,
                    "4": res.data.user.area,
                    "5": res.data.user.idealMeetup,
                });

                if (res.data.user.paid) {
                    router.push("/payment-success");
                    return;
                } else {
                    onProceed(); // go to subscription selector
                }
            } else {
                onProceed(); // new user, proceed
            }
        } catch {
            onProceed(); // assume new user if error
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm w-full">
            <h2 className="text-2xl text-center font-semibold mb-4">That’s how we’ll contact you</h2>
            <input
                type="email"
                required
                placeholder="Email"
                className="p-3 rounded-lg border text-black"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
            <input
                type="tel"
                required
                placeholder="Phone"
                className="p-3 rounded-lg border text-black"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            />
            <button type="submit" disabled={loading} className="bg-blue-600 py-2 rounded-lg text-white font-semibold">
                {loading ? "Checking..." : "Let’s Meet Your Match"}
            </button>
        </form>
    );
}
