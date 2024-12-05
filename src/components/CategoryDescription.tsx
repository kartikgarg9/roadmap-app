import React from "react";

type CategoryDescriptionProps = {
    category: string;
};

const CategoryDescription: React.FC<CategoryDescriptionProps> = ({ category }) => {
    const categoryDescriptions: { [key: string]: string } = {
        javascript: "Test, rate and improve your JavaScript knowledge with these questions.",
        python: "Sharpen your Python skills with these curated questions.",
        java: "Enhance your Java expertise with challenging questions.",
        html: "Strengthen your understanding of HTML with these questions.",
    };

    return (
        <p className="text-gray-600 text-center mb-4">
            {categoryDescriptions[category] || "Test your knowledge with these questions."}
        </p>
    );
};

export default CategoryDescription;
