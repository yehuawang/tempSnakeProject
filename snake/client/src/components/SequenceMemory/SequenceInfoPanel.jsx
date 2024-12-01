import React from "react";

const SequenceInfoPanel = ({ level, score, loggedInUser, coinsToEarn }) => {
    return (
        <div className="info-panel">
            <p>Playing as: <span>{ loggedInUser.name }</span></p>
            <p>Level: {level}</p>
            <p>Score: {score}</p>
            {
                loggedInUser.email !== "guest" && (<p>You can earn<i className="bi bi-coin"></i><span>{coinsToEarn}</span></p>) 
            }
        </div>
    );
};

export default SequenceInfoPanel;