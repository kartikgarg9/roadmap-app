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
            <div className="question-card bg-white p-12 rounded-lg shadow-lg w-3/4 md:w-2/3 lg:w-1/2 mx-auto mb-4">
                {/* Question Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">{question}</h2>
                    {isAnswerRevealed ? (
                        <p className="text-green-600 font-semibold text-center">{answer}</p>
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 block mx-auto"
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
