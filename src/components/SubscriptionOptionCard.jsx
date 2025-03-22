export default function SubscriptionOptionCard({ duration, price, discount, active, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`flex-1 flex flex-col items-center rounded-xl overflow-hidden shadow-md transition-transform duration-300 cursor-pointer
                ${active ? 'border-2 border-black' : 'border border-gray-300'}
                hover:scale-105`}
        >
            {/* Banner at top */}
            <div className={`w-full py-2 text-center text-xs font-semibold 
                ${discount ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}>
                {discount ? `Save ${discount}` : 'Discover'}
            </div>

            {/* Main body of the card */}
            <div className={`flex flex-col justify-center items-center w-full py-4 px-2 text-center 
                ${active ? 'bg-white' : 'bg-gray-50'}`}>
                <span className="text-xs font-bold text-black">{duration}</span>
                <span className="text-[10px] font-bold text-gray-700 mt-2">{price}</span>
            </div>
        </div>
    );
}
