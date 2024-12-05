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
};

const QuizProgress: React.FC<ProgressData> = ({ knew, learnt, skipped, total, category, onReset }) => {
    const current = knew + learnt + skipped;

    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <div className="flex flex-col items-center">
            {/* Display Category Description Above */}

            <h1 className="text-2xl font-bold text-center mb-2">{categoryTitle} Questions</h1>
            <CategoryDescription category={category} />
            <div className="max-w-xl bg-white p-6 rounded-lg shadow-md">


                <div className="mb-6">
                    <Progress
                        percent={(current / total) * 100}
                        showInfo={false}
                        strokeColor={{
                            "0%": "#3b82f6",
                            "100%": "#16a34a",
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
                    </div>
                </div>
                <div className="text-center text-gray-600">
                    <span className="font-bold">
                        {current} / {total}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default QuizProgress;
