import React, { useState, useEffect } from "react";

type QuestionMCQCardProps = {
    question: string;
    options: string[];
    correctAnswer: string;
    onOptionSelect: (isCorrect: boolean) => void; // Callback for result
    isAnswering: boolean; // Prevent answering while transitioning
    showAnswerFeedback: boolean; // Show correct answer feedback
};

const QuestionMCQCard: React.FC<QuestionMCQCardProps> = ({
    question,
    options,
    correctAnswer,
    onOptionSelect,
    isAnswering,
    showAnswerFeedback,
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false);

    useEffect(() => {
        if (showAnswerFeedback) {
            // Show feedback once answer feedback state is true
            setIsFeedbackVisible(true);
        }
    }, [showAnswerFeedback]);

    const handleOptionClick = (option: string) => {
        if (isAnswering || selectedOption) return; // Prevent multiple selections or clicks while answering

        setSelectedOption(option);
        const isCorrect = option === correctAnswer;
        onOptionSelect(isCorrect); // Notify parent component

        // Show feedback immediately after option selection
        setIsFeedbackVisible(true);
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
                        className={`border px-4 py-2 rounded ${getOptionClass(option)} hover:shadow-md transition duration-300`}
                        disabled={isAnswering || selectedOption !== null} // Disable all options after selection
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Show the correct answer after selection */}
            {isFeedbackVisible && selectedOption && (
                <div className="answer-feedback mt-2 text-center text-lg">
                    {selectedOption === correctAnswer ? (
                        <span className="text-green-500">Correct Answer!</span>
                    ) : (
                        <span className="text-red-500">Incorrect Answer! Correct: {correctAnswer}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuestionMCQCard;
