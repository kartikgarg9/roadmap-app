import React from "react";
import { motion } from "framer-motion";
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
        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Question Card */}
            <motion.div
                className="question-card bg-white h-[250px] w-[600px] p-6 rounded-lg shadow-lg flex flex-col"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Question Section */}
                <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-4 text-center">{question}</h2>
                    {isAnswerRevealed && (
                        <motion.p
                            className="text-green-600 font-semibold text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {answer}
                        </motion.p>
                    )}
                </div>

                {/* Reveal Answer Button */}
                {!isAnswerRevealed && (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-center mt-auto"
                        onClick={onRevealAnswer}
                    >
                        Reveal Answer
                    </button>
                )}
            </motion.div>

            {/* Action Buttons Section */}
            <div className="mt-4 text-center">
                <ActionButtons
                    onSkip={onSkip}
                    onKnow={onKnow}
                    onDontKnow={onDontKnow}
                />
            </div>
        </motion.div>
    );
};

export default QuestionCard;
