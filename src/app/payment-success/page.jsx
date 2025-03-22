"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentSuccessPage() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));

        if (contactInfo && contactInfo.email) {
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submissions/${contactInfo.email}`)
                .then((res) => {
                    setUserDetails(res.data.user);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching user details:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userDetails) {
            const eventDate = new Date(userDetails.eventDate);
            const currentDate = new Date();
            setEventExpired(currentDate > eventDate);
        }
    }, [userDetails]);


    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-600">Loading your meetup details...</p>
            </div>
        );
    }

    if (!userDetails) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
                <p className="text-xl text-red-500">Oops! We couldn't find your details.</p>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gradient-to-b from-purple-600 to-blue-500 flex flex-col justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full text-center p-8">
                <h1 className="text-3xl text-center font-bold text-green-500 mb-4">🎉 Meetup Confirmed!</h1>
                <p className="text-gray-600 mb-6">Thank you, <span className="font-semibold">{userDetails.name || "Friend"}</span>! Your spot is secured.</p>

                <div className="mb-4 bg-gray-50 rounded-lg shadow-sm p-4 text-left">
                    <h3 className="font-semibold mb-2">📅 Your Meetup Details:</h3>
                    <ul className="text-gray-700 space-y-1">
                        <li><b>Intention:</b> {userDetails.intention}</li>
                        <li><b>Vibe With:</b> {userDetails.vibe}</li>
                        <li><b>Emirate:</b> {userDetails.emirate}</li>
                        <li><b>Area:</b> {userDetails.area}</li>
                        <li><b>Ideal Spot:</b> {userDetails.idealMeetup}</li>
                    </ul>
                </div>

                <p className="text-sm text-gray-500 mt-4">You'll receive an email soon with more details about your meetup.</p>

                <button
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition duration-200"
                    onClick={() => window.location.href = '/'}
                >
                    Explore More Meetups
                </button>
            </div>
        </div>
    );
}
