import React from "react";

const SequenceInfoPanel = ({ level, score }) => {
    return (
        <div className="info-panel">
            <p>Level: {level}</p>
            <p>Score: {score}</p>
        </div>
    );
};

export default SequenceInfoPanel;