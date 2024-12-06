import React from "react";
import { FaCheckCircle, FaTimesCircle, FaForward } from "react-icons/fa";

type ActionButtonsProps = {
    onSkip: () => void;
    onKnow: () => void;
    onDontKnow: () => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSkip, onKnow, onDontKnow }) => {
    return (
        <div className="flex justify-center gap-4 mt-6">

            <button
                onClick={onKnow}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-green-100 hover:border-green-500 transition focus:outline-none"
            >
                <FaCheckCircle className="text-green-500" />
                Already Know That
            </button>


            <button
                onClick={onDontKnow}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-red-100 hover:border-red-500 transition focus:outline-none"
            >
                <FaTimesCircle className="text-red-500" />
                Didn't Know That
            </button>


            <button
                onClick={onSkip}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-500 transition focus:outline-none"
            >
                <FaForward className="text-gray-500" />
                Skip Question
            </button>
        </div>
    );
};

export default ActionButtons;
