import React from "react";
import { Progress } from "antd";
import CategoryDescription from "./CategoryDescription";

type ProgressData = {
    knew: number;
    learnt: number;
    skipped: number;
    total: number;
    category: string;
    onReset: () => void;
    isQuizOver: boolean; // Pass isQuizOver to stop progression
};

const QuizProgress: React.FC<ProgressData> = ({ knew, learnt, skipped, total, category, onReset, isQuizOver }) => {
    const current = knew + learnt + skipped;

    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    // Stop progress bar progression if the quiz is over
    const progressPercent = isQuizOver ? 100 : (current / total) * 100;

    return (
        <div className="flex flex-col items-center w-full p-4">
            {/* Display Category Title and Description Above */}
            <h1 className="text-2xl font-bold text-center mb-2">{categoryTitle} Questions</h1>
            <CategoryDescription category={category} />

            <div className="max-w-xl bg-white p-6 rounded-lg shadow-md w-full">
                <div className="mb-6">
                    <Progress

                        percent={progressPercent}
                        showInfo={false}
                        strokeColor={{
                            "0%": "#3b82f6", // Blue color for the start
                            "100%": "#16a34a", // Green color for the end
                        }}
                    />
                    <div className="flex justify-between text-sm mt-2 text-gray-700">
                        <span>
                            ✅ Knew <span className="font-semibold">{knew} Items</span>
                        </span>
                        <span>
                            🌟 Learnt <span className="font-semibold">{learnt} Items</span>
                        </span>
                        <span>
                            ⏭ Skipped <span className="font-semibold">{skipped} Items</span>
                        </span>
                        <button
                            className="text-red-500 font-semibold hover:underline"
                            onClick={onReset}
                        >
                            🔄 Reset
                        </button>
                        <span className="font-bold">
                            {current} / {total}
                        </span>
                    </div>
                </div>



            </div>
        </div>

    );
};

export default QuizProgress;
