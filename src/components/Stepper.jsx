export default function Stepper({ step, totalSteps }) {
    return (
        <div className="w-full max-w-md mb-6">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                />
            </div>
            <p className="text-center mt-2 text-gray-400">{step + 1} of {totalSteps} questions</p>
        </div>
    );
}
