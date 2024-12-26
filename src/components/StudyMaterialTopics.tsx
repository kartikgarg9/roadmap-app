import React from "react";
import { Link } from "react-router-dom";

const StudyMaterialTopics: React.FC = () => {
    const topics = [
        { title: "JavaScript", resources: 25, sections: 6, link: "/study-material/javascript" },
        { title: "Node.js", resources: 18, sections: 4, link: "/study-material/node" },
        { title: "React", resources: 22, sections: 8, link: "/study-material/react" },
        { title: "Backend", resources: 20, sections: 5, link: "/study-material/backend" },
        { title: "Frontend", resources: 15, sections: 3, link: "/study-material/frontend" },
        { title: "DevOps", resources: 12, sections: 2, link: "/study-material/devops" },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-2">Study Material</h1>
            <p className="text-center text-gray-600 mb-8">
                Explore a variety of study materials to enhance your knowledge and skills
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

            {/* Cards */}
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
                            <p className="text-gray-600">
                                {topic.resources} Resources · {topic.sections} Sections
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyMaterialTopics;
