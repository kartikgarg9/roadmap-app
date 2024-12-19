import React from "react";
import { Progress } from "antd";

type MCQProgressProps = {
    currentQuestionIndex: number; // Current question number (0-based index)
    totalQuestions: number; // Total number of questions
};

const MCQProgress: React.FC<MCQProgressProps> = ({
    currentQuestionIndex,
    totalQuestions,
}) => {
    // Calculate progress percentage
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    return (
        <div className="flex flex-col items-center w-full p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>

            <Progress
                percent={progressPercent}
                showInfo
                strokeColor={{
                    "0%": "#ff4d4f", // Start color
                    "100%": "#52c41a", // End color
                }}
            />
        </div>
    );
};

export default MCQProgress;
