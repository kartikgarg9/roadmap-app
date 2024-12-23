import React, { useState, useEffect } from "react";

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
    const [isAnswering, setIsAnswering] = useState<boolean>(false);

    const handleOptionClick = (option: string) => {
        if (isAnswering) return;

        setIsAnswering(true);
        setSelectedOption(option);
        const isCorrect = option === correctAnswer;
        onOptionSelect(isCorrect);

        // Feedback delay
        setTimeout(() => {
            setIsAnswering(false); // Allow next answer
        }, 1000);
    };

    const getOptionClass = (option: string) => {
        if (!selectedOption) return "bg-white border-gray-300";
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
                        className={`border px-4 py-2 rounded ${getOptionClass(option)} hover:shadow-md transition duration-300`}
                        disabled={!!selectedOption}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};


export default QuestionMCQCard;
