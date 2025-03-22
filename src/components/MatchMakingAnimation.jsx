import { useEffect, useState } from 'react';

export default function FakeMatchingAnimation({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1000);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 20) + 10;
            });
        }, 800);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-xl font-bold animate-pulse">✨ Matching you with your soulmate...</p>
            <div className="w-full bg-gray-300 rounded-full h-2.5 max-w-xs">
                <div
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>
        </div>
    );
}
