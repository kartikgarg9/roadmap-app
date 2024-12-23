import React from "react";
import { Link } from "react-router-dom";

const HomeTopics: React.FC = () => {
    const topics = [
        {
            title: "Study Material",
            description: "Access study resources and reference material to deepen your knowledge.",
            link: "/study-material",
        },
        {
            title: "MCQ Quiz",
            description: "Test your knowledge with multiple-choice questions across various topics.",
            link: "/mquiz",
        },
        {
            title: "Learning Quiz",
            description: "Interactive quizzes to help you learn and master new concepts effectively.",
            link: "/topics",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-2">Welcome to Our Platform</h1>
            <p className="text-center text-gray-600 mb-8">
                Explore study material, test your knowledge, and improve your skills with our interactive quizzes.
            </p>

            {/* Category Links */}
            <div className="overflow-x-auto whitespace-nowrap mb-6">
                <ul className="flex space-x-8 justify-center">
                    {topics.map((topic, index) => (
                        <li key={index}>
                            <Link
                                to={topic.link}
                                className="text-lg font-semibold hover:underline text-gray-800"
                            >
                                {topic.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Topic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <Link to={topic.link} className="block">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                                {topic.title}
                            </h2>
                            <p className="text-gray-600">{topic.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeTopics;
