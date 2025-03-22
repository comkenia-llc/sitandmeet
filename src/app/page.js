export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6 relative">
      {/* Soft glowing background for premium feel */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 blur-[160px] opacity-20 rounded-full z-0" />

      {/* Hero Content */}
      <div className="z-10 max-w-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
          The Perfect Meetup is Waiting for You.
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-6">
          No swipes. No randomness. Just real, meaningful conversations.
          Let our AI find the right people for you
        </p>

        {/* CTA Button */}
        <a
          href="/questions"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-semibold py-4 px-10 rounded-full shadow-lg transition duration-300 animate-pulse"
        >
          Start Matching Now
        </a>
      </div>
    </main>
  );
}
