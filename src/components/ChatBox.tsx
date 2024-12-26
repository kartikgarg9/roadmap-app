import React, { useState } from "react";

interface ChatBoxProps {
    topicContent: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ topicContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    const handleSendMessage = async () => {
        // Check if the chat input is not empty
        if (!chatInput.trim()) {
            return; // Prevent sending empty messages
        }

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: chatInput,       // Send the user's question here
                    context: topicContent,     // Send the topicContent as context
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }

            const data = await response.json();
            setChatHistory((prev) => [...prev, `User: ${chatInput}`, `Bot: ${data.answer}`]);
            setChatInput("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };


    return (
        <div className="fixed bottom-4 left-4">
            {isOpen ? (
                <div className="bg-white border shadow-lg rounded-lg p-4 w-72">
                    <h2 className="font-bold">Chat with Bot</h2>
                    <div className="h-40 overflow-y-scroll border-b">
                        {chatHistory.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                    <input
                        type="text"
                        className="border w-full mt-2 p-1"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                    >
                        Send
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-red-500 text-sm mt-2"
                    >
                        Close
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                    Chat
                </button>
            )}
        </div>
    );
};

export default ChatBox;
