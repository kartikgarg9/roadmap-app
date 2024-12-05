import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Define the type for the initial edges
const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "Start" } },
];
const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }]; // Explicitly typing as Edge[]


const CreateRoadmap: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const navigate = useNavigate();

    const addNode = useCallback(() => {
        const newNode = {
            id: `${nodes.length + 1}`,
            position: { x: Math.random() * 250, y: Math.random() * 250 },
            data: { label: `Node ${nodes.length + 1}` },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }, [nodes, setNodes]);

    const onConnect = useCallback(
        (params: { source: string; target: string }) => {
            const newEdge = {
                id: `${params.source}-${params.target}`, // Generate id based on source and target
                source: params.source,
                target: params.target,
            };
            setEdges((eds) => addEdge(newEdge, eds)); // Add the new edge with the generated id
        },
        [setEdges]
    );

    const saveRoadmap = async () => {
        if (!title || !description) {
            alert("Please fill in the title and description!");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "roadmaps"), {
                title,
                description,
                nodes,
                edges,
            });
            console.log("Roadmap created with ID: ", docRef.id);
            navigate(`/roadmap/${docRef.id}`); // Navigate to the created roadmap
        } catch (error) {
            console.error("Error creating roadmap: ", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-4">Create a New Roadmap</h1>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter roadmap title"
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter a short description"
                />
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Nodes</h2>
                <div style={{ height: 400 }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        style={{ background: "#f0f0f0" }}
                    >
                        <Controls />
                        <MiniMap />
                        <Background gap={12} size={1} />
                    </ReactFlow>
                </div>
                <button
                    onClick={addNode}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add Node
                </button>
            </div>

            <button
                onClick={saveRoadmap}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
                Save Roadmap
            </button>
        </div>
    );
};

export default CreateRoadmap;
