import React from "react";
import { Link } from "react-router-dom";

const McqQuizTopics: React.FC = () => {
    const topics = [
        { title: "React MCQ", questions: 50, topics: 10, link: "/mcqquiz/react" },
        { title: "Node.js MCQ", questions: 40, topics: 8, link: "/mcqquiz/nodejs" },
        { title: "JavaScript MCQ", questions: 75, topics: 12, link: "/mcqquiz/javascript" },
        { title: "Frontend MCQ", questions: 30, topics: 5, link: "/mcqquiz/frontend" },
        { title: "Backend MCQ", questions: 45, topics: 7, link: "/mcqquiz/backend" },
        { title: "DevOps MCQ", questions: 35, topics: 6, link: "/mcqquiz/devops" },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-4">MCQ Quiz Topics</h1>
            <p className="text-center text-gray-600 mb-8">
                Test your knowledge with multiple-choice questions in various categories.
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

            {/* Quiz Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <Link to={topic.link} className="block">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                {topic.title}
                            </h2>
                            <p className="text-gray-600">
                                {topic.questions} Questions · {topic.topics} Topics
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default McqQuizTopics;
