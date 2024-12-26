import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";

interface StudyMaterial {
    title: string;
    content: string;
}

const StudyMaterialPage: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();

    const [studyMaterial, setStudyMaterial] = useState<StudyMaterial | null>(null);

    useEffect(() => {
        const fetchStudyMaterial = async () => {
            if (topicId) {
                try {
                    const response = await fetch("/studyMaterial.json");
                    const data = await response.json();
                    const material = data[topicId] || null;
                    setStudyMaterial(material);
                } catch (error) {
                    console.error("Failed to fetch study material:", error);
                }
            }
        };

        fetchStudyMaterial();
    }, [topicId]);

    if (!studyMaterial) {
        return <div className="text-center text-red-600 text-2xl font-bold mt-12">Topic not found!</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <button
                onClick={() => navigate("/study-material")}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md mb-6"
            >
                Back to Study Materials
            </button>
            <h1 className="text-4xl font-bold text-green-600 text-center mb-6">
                {studyMaterial.title}
            </h1>
            <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                <p>{studyMaterial.content}</p>
            </div>

            <ChatBox topicContent={studyMaterial.content} />

        </div>
    );
};

export default StudyMaterialPage;
