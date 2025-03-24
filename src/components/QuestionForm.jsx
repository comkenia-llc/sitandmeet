export default function QuestionForm({ question, onNext }) {
    const gradients = [
        'from-[#ff512f] to-[#dd2476]',
        'from-[#24c6dc] to-[#514a9d]',
        'from-[#b45800] to-[#ff7c00]',
        'from-[#4776E6] to-[#8E54E9]',
        'from-[#56ab2f] to-[#a8e063]',
    ];

    return (
        <div className="max-w-lg mx-auto text-center px-4">
            <h2 className="text-2xl mt-16 sm:text-3xl font-semibold mb-4">{question.text}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-2 gap-4">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onNext(option)}
                        className={`h-16 w-full sm:h-24 sm:w-36 cursor-pointer rounded-xl shadow-md bg-gradient-to-r ${gradients[idx % gradients.length]} flex items-center justify-center hover:scale-105 transition-transform duration-300`}
                    >
                        <span className="text-white px-2 font-semibold text-sm sm:text-lg">{option}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
