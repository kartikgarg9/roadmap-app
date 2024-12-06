import React, { useState } from "react";
import { motion } from "framer-motion";
import ActionButtons from "./ActionsButton";

type QuestionProps = {
    question: string;
    answer: string;
    onSkip: () => void;
    onKnow: () => void;
    onDontKnow: () => void;
};

const QuestionCard: React.FC<QuestionProps> = ({
    question,
    answer,
    onSkip,
    onKnow,
    onDontKnow,
}) => {
    // State to manage visibility of the answer for the current question
    const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

    // Toggle answer visibility when button is clicked
    const toggleAnswerVisibility = () => {
        setIsAnswerRevealed((prev) => !prev);
    };

    return (
        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Question Card */}
            <div className="relative bg-white h-[250px] w-[600px] p-6 rounded-lg shadow-lg overflow-hidden">
                {/* Question Section */}
                <motion.div
                    className="absolute top-4 left-0 right-0 text-center"
                    initial={{ y: 0 }}
                    animate={{ y: isAnswerRevealed ? "-100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-xl font-bold">{question}</h2>
                </motion.div>

                {/* Answer Section (Slides up) */}
                <motion.div
                    className="absolute inset-0 bg-green-100 flex items-center justify-center text-center p-6 rounded-lg"
                    initial={{ y: "100%" }}
                    animate={{ y: isAnswerRevealed ? "0%" : "100%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <p className="text-lg font-semibold text-green-600">{answer}</p>
                </motion.div>

                {/* Toggle Button */}
                <button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    onClick={toggleAnswerVisibility}
                >
                    {isAnswerRevealed ? "Hide Answer" : "Reveal Answer"}
                </button>
            </div>

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
