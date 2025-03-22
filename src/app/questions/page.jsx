"use client";
import { useState, useEffect } from "react";
import QuestionForm from "@/components/QuestionForm";
import axios from "axios";
import SubscriptionSelector from "@/components/SubscriptionSelector";
import FakeMatchingAnimation from "@/components/MatchMakingAnimation";

const questions = [
    { id: 1, text: "What kind of connection are you looking for?", options: ["Deep Conversation", "Casual Meetup", "Business Networking"] },
    { id: 2, text: "Who do you naturally vibe with?", options: ["Men", "Women", "Both"] },
    { id: 3, text: "Which Emirate are you in?", options: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras al Khaimah", "Fujairah"] },
    { id: 4, text: "Select your area", options: [] },
    { id: 5, text: "What’s your ideal meetup spot?", options: ["Café", "Park", "Co-Working Space"] },
];

const areaOptions = {
    "Dubai": [
        "Dubai Marina",
        "Downtown Dubai",
        "Jumeirah Beach Residence (JBR)",
        "Business Bay",
        "City Walk",
        "Al Barsha",
        "Jumeirah",
        "Dubai South",
        "Deira",
        "Dubai Festival City",
        "La Mer"
    ],
    "Abu Dhabi": [
        "Corniche",
        "Yas Island",
        "Saadiyat Island",
        "Al Maryah Island",
        "Al Reem Island",
        "Al Khalidiya",
        "Al Bateen",
        "Mushrif",
        "Al Raha Beach",
        "Zayed Sports City"
    ],
    "Sharjah": [
        "Al Majaz",
        "Al Nahda",
        "Muwaileh",
        "Al Khan",
        "Al Qasba",
        "Al Taawun",
        "Al Qasimia",
        "Al Nud",
        "University City",
        "Sharjah Corniche"
    ],
    "Ajman": [
        "Corniche Ajman",
        "Al Nuaimiya",
        "Al Rashidiya",
        "Al Mowaihat",
        "Al Jurf",
        "Al Rawda",
        "Al Hamidiya",
        "Al Zahra",
        "Ajman Industrial Area",
        "Mushairef"
    ],

    "Ras al Khaimah": [
        "Al Hamra Village",
        "Al Marjan Island",
        "Al Nakheel",
        "Mina Al Arab",
        "Al Dhait",
        "Al Qurm",
        "Khuzam",
        "Sidroh",
        "Julphar",
        "RAK City Center"
    ],

    "Fujairah": [
        "Fujairah City",
        "Al Faseel",
        "Corniche Road",
        "Dibba",
        "Kalba",
        "Mirbah",
        "Sakamkam",
        "Al Gurfah",
        "Al Hayl",
        "Al Hail Industrial Area"
    ]

};

export default function QuestionsPage() {
    const [step, setStep] = useState(0);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [answers, setAnswers] = useState({});
    const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
    const [showAnimation, setShowAnimation] = useState(false);
    const [dynamicQuestions, setDynamicQuestions] = useState(questions);


    useEffect(() => {
        const storedAnswers = localStorage.getItem("questionAnswers");
        if (storedAnswers) setAnswers(JSON.parse(storedAnswers));
    }, []);

    useEffect(() => {
        const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));

        if (contactInfo?.email) {
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submissions/${contactInfo.email}`)
                .then((res) => {
                    if (res.data.user) {
                        setAnswers({
                            "1": res.data.user.intention,
                            "2": res.data.user.vibe,
                            "3": res.data.user.emirate,
                            "4": res.data.user.area,
                            "5": res.data.user.idealMeetup,
                        });
                        localStorage.setItem("questionAnswers", JSON.stringify({
                            "1": res.data.user.intention,
                            "2": res.data.user.vibe,
                            "3": res.data.user.emirate,
                            "4": res.data.user.area,
                            "5": res.data.user.idealMeetup,
                        }));
                    }
                })
                .catch((err) => {
                    const stored = localStorage.getItem("questionAnswers");
                    if (stored) setAnswers(JSON.parse(stored));
                });
        } else {
            const stored = localStorage.getItem("questionAnswers");
            if (stored) setAnswers(JSON.parse(stored));
        }
    }, []);

    const handleNext = (answer) => {
        const updatedAnswers = { ...answers, [questions[step].id]: answer };
        setAnswers(updatedAnswers);
        localStorage.setItem("questionAnswers", JSON.stringify(updatedAnswers));

        if (questions[step].id === 3) {
            const emirateSelected = answer;
            const updated = [...dynamicQuestions];
            updated[3] = {
                ...updated[3],
                options: areaOptions[emirateSelected] || []
            };
            setDynamicQuestions(updated);
        }

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setShowAnimation(true);
        }
    };

    const handleBack = () => {
        const updatedAnswers = { ...answers };
        delete updatedAnswers[questions[step - 1].id];

        if (questions[step - 1].id === 3) {
            delete updatedAnswers[4];
        }

        setAnswers(updatedAnswers);
        localStorage.setItem("questionAnswers", JSON.stringify(updatedAnswers));
        setStep(step - 1);
    };

    const handleContactInfoSubmit = async (e) => {
        e.preventDefault();

        if (!contactInfo.email.includes('@') || contactInfo.phone.trim().length < 8) {
            alert('Please enter a valid email and contact number.');
            return;
        }

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submissions/${contactInfo.email}`);

            if (res.data.user) {
                localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
                localStorage.setItem('questionAnswers', JSON.stringify({
                    "1": res.data.user.intention,
                    "2": res.data.user.vibe,
                    "3": res.data.user.emirate,
                    "4": res.data.user.area,
                    "5": res.data.user.idealMeetup,
                }));

                if (res.data.user.paid) {
                    window.location.href = '/payment-success';
                } else {
                    setStep(questions.length + 1);
                }
            } else {
                localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
                setStep(step + 1);
            }
        } catch (err) {
            localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
            setStep(step + 1);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
            {step > 0 && step <= questions.length && (
                <button
                    className="absolute left-4 top-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition"
                    onClick={handleBack}
                >
                    ← Go Back
                </button>
            )}

            {step < questions.length && (
                <QuestionForm question={dynamicQuestions[step]} onNext={handleNext} />
            )}

            {step === questions.length && (
                <form className="flex flex-col gap-4 max-w-sm w-full" onSubmit={handleContactInfoSubmit}>
                    <h2 className="text-2xl text-center font-semibold mb-4">That's How We Will Contact You</h2>
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded-lg border text-white"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    />
                    <input
                        required
                        type="tel"
                        placeholder="Contact Number"
                        className="p-3 rounded-lg border text-white"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    />
                    <button type="submit" className="bg-blue-600 cursor-pointer transition py-2 rounded-lg text-white font-semibold">
                        Let's Meet Your Match
                    </button>
                </form>
            )}

            {showAnimation && (
                <FakeMatchingAnimation
                    onComplete={() => {
                        setShowAnimation(false);
                        setStep(step + 1);
                    }}
                />
            )}

            {step === questions.length + 1 && (
                <SubscriptionSelector onSelect={(sub) => setSelectedSubscription(sub)} />
            )}
        </div>
    );
}