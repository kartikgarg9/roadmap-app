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
    const progressPercent = (currentQuestionIndex / totalQuestions) * 100;

    return (
        <div className="flex flex-col items-center w-full p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>

            <Progress
                percent={progressPercent}
                showInfo={false} // Hide default info to show our custom text
                strokeColor={{
                    "0%": "#ff4d4f",
                    "100%": "#52c41a",
                }}
            />
            <div className="text-center mt-2">
                <span>{Math.round(progressPercent)}% Complete</span>
            </div>
        </div>
    );
};

export default MCQProgress;
