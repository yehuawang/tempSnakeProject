import React from 'react'

function AimTrainerLevelSelector({ setLevel, setTargetCount, setHeartCount }) {

    const handleSelectLevel = (level) => {
        switch (level) {
            case 1:
                setLevel(1);
                setTargetCount(4);
                setHeartCount(5);
                break;
            case 2:
                setLevel(2);
                setTargetCount(4);
                setHeartCount(4);
                break;
            case 3:
                setLevel(3);
                setTargetCount(4);
                setHeartCount(3);
                break;
            default:
                break
        }
    }

    return (
        <div className="aim-trainer-level-selector-container">
            <h1>Choose your level</h1>
            <div className="level-selector">
                <div className="level-item" onClick={() => handleSelectLevel(1)}>Easy</div>
                <div className="level-item" onClick={() => handleSelectLevel(2)}>Medium</div>
                <div className="level-item" onClick={() => handleSelectLevel(3)}>Hard</div>
            </div>
        </div>
    )
}

export default AimTrainerLevelSelector