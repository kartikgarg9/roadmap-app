import React from "react";
import { Button } from "antd";

type ActionButtonsProps = {
    onSkip: () => void;
    onKnow: () => void;
    onDontKnow: () => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSkip, onKnow, onDontKnow }) => {
    return (
        <div className="flex justify-between gap-4 mt-6">
            <Button
                type="primary"
                onClick={onKnow}
                style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50", flex: 1 }}
            >
                Already Know That
            </Button>
            <Button
                type="primary"
                onClick={onDontKnow}
                style={{ backgroundColor: "#f44336", borderColor: "#f44336", flex: 1 }}
            >
                Didn't Know That
            </Button>
            <Button
                type="default"
                onClick={onSkip}
                style={{ backgroundColor: "#9e9e9e", borderColor: "#9e9e9e", flex: 1 }}
            >
                Skip Question
            </Button>
        </div>
    );
};

export default ActionButtons;
