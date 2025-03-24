export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6 relative">
      {/* Soft glowing background for premium feel */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 blur-[160px] opacity-20 rounded-full z-0" />

      <div className="z-10 w-full max-w-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
          Real People. Real Meetups. No Bullsh*t.
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-6">
          We're not another dating app. We're your shortcut to meaningful, spontaneous, face-to-face conversations with people who actually vibe with you.
        </p>
        <p className="text-base text-gray-400 mb-8 italic">
          93% of users say they made a real connection on their very first meetup.
        </p>

        <a
          href="/questions"
          className="inline-block bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600 text-white text-lg font-semibold py-4 px-10 rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
        >
          Find My Person →
        </a>
      </div>
    </main>
  );
}
