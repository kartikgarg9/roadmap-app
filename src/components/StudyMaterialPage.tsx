import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import CodeMirror from '@uiw/react-codemirror';  // default import
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';  // or any other theme
import Markdown from 'react-markdown'
import "./StudyMaterialPage.css";

interface StudyMaterial {
    title: string;
    content: string;
    codeExample: string;
}

const StudyMaterialPage: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();

    const [studyMaterial, setStudyMaterial] = useState<StudyMaterial | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudyMaterial = async () => {
            if (topicId) {
                try {
                    const response = await fetch("/studyMaterial.json");
                    if (!response.ok) {
                        throw new Error("Failed to fetch data");
                    }
                    const data = await response.json();
                    const material = data[topicId] || null;
                    if (!material) {
                        setError("Study material not found!");
                    }
                    setStudyMaterial(material);
                } catch (error) {
                    setError("Failed to fetch study material");
                    console.error("Error:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStudyMaterial();
    }, [topicId]);

    // Show loading message while fetching data
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    // Show error message if there's an error fetching data
    if (error) {
        return <div className="text-center error-message">{error}</div>;
    }

    if (!studyMaterial) {
        return <div className="text-center error-message">Topic not found!</div>;
    }

    // Split content and insert code block where appropriate
    const beforeCodeContent = studyMaterial.content.split("```")[0];
    const codeContent = studyMaterial.content.split("```")[1];
    const after = studyMaterial.content.split("```")[2]

    return (
        <div className="study-material-container">
            <button onClick={() => navigate("/study-material")} className="back-button">
                Back to Study Materials
            </button>
            <h1 className="study-title">{studyMaterial.title}</h1>
            <div className="study-content">
                <Markdown>
                    {beforeCodeContent}
                </Markdown>
                <div key={1} className="code-container">
                    <CodeMirror
                        value={codeContent}
                        height="200px"
                        extensions={[javascript()]}
                        theme={oneDark}
                        editable={false}
                    />
                </div>
                <Markdown>
                    {after}
                </Markdown>
            </div>

            <ChatBox topicContent={studyMaterial.content} />
        </div>
    );
};

export default StudyMaterialPage;
