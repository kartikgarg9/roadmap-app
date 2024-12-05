import React from "react";
import ActionButtons from "./ActionsButton";

type QuestionProps = {
    question: string;
    answer: string;
    isAnswerRevealed: boolean;
    onRevealAnswer: () => void;
    onSkip: () => void;
    onKnow: () => void;
    onDontKnow: () => void;
};

const QuestionCard: React.FC<QuestionProps> = ({
    question,
    answer,
    isAnswerRevealed,
    onRevealAnswer,
    onSkip,
    onKnow,
    onDontKnow,
}) => {
    return (
        <div className="flex flex-col items-center">
            {/* Question Card */}
            <div className="question-card bg-white h-80 w-100 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                {/* Question Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-center">{question}</h2>
                    {isAnswerRevealed ? (
                        <p className="text-green-600 font-semibold text-center">{answer}</p>
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block mx-auto"
                            onClick={onRevealAnswer}
                        >
                            Reveal Answer
                        </button>
                    )}
                </div>
            </div>

            {/* Action Buttons Section */}
            <div className="mt-4 text-center">
                <ActionButtons
                    onSkip={onSkip}
                    onKnow={onKnow}
                    onDontKnow={onDontKnow}
                />
            </div>
        </div>
    );
};

export default QuestionCard;
