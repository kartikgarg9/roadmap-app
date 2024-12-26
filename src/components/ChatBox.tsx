import React, { useState } from "react";

interface ChatBoxProps {
    topicContent: string;
}

interface ChatMessage {
    sender: "user" | "bot";
    message: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ topicContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    const handleSendMessage = async () => {
        if (!chatInput.trim()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: chatInput,
                    context: topicContent,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }

            const data = await response.json();


            setChatHistory((prev) => [
                ...prev,
                { sender: "user", message: chatInput },
                { sender: "bot", message: data.answer },
            ]);
            setChatInput("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="fixed bottom-4 right-4">
            {isOpen ? (
                <div className="bg-white border shadow-lg rounded-lg p-4 w-72 h-72">
                    <h2 className="font-bold">Chat with YO YO Honey Singh</h2>
                    <div className="h-40 overflow-y-scroll border-b space-y-4">
                        {chatHistory.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"
                                    }`}
                            >
                                <div
                                    className={`max-w-xs p-3 rounded-lg ${msg.sender === "user" ? "bg-gray-200 text-left" : "bg-blue-500 text-white"
                                        }`}
                                >
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border w-full p-2 rounded-lg"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-red-500 text-sm mt-2 w-full text-center"
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
