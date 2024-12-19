import React, { useState } from "react";

type QuestionMCQCardProps = {
    question: string;
    options: string[];
    correctAnswer: string;
    onOptionSelect: (isCorrect: boolean) => void; // Callback for result
};

const QuestionMCQCard: React.FC<QuestionMCQCardProps> = ({
    question,
    options,
    correctAnswer,
    onOptionSelect,
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        const isCorrect = option === correctAnswer;
        onOptionSelect(isCorrect); // Notify parent component
        setTimeout(() => setSelectedOption(null), 500); // Optional: Reset for animation
    };

    const getOptionClass = (option: string) => {
        if (!selectedOption) return "bg-white border-gray-300"; // Default style
        if (selectedOption === option) {
            return option === correctAnswer
                ? "bg-green-500 text-white border-green-500"
                : "bg-red-500 text-white border-red-500";
        }
        return option === correctAnswer
            ? "bg-green-100 border-green-500"
            : "bg-white border-gray-300";
    };

    return (
        <div className="question-card border rounded-md p-4">
            <h3 className="font-bold text-lg mb-4">{question}</h3>
            <div className="options flex flex-col space-y-2">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`border px-4 py-2 rounded ${getOptionClass(option)} hover:shadow-md`}
                        disabled={!!selectedOption} // Disable buttons after selection
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionMCQCard;
