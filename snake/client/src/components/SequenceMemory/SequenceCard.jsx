import React from "react";
const SequenceCard = ({ id, onClick, isHighlighted, additionalClasses }) => {
    return (
        <div
            id={id}
            className={`card ${isHighlighted ? "highlight" : ""} ${additionalClasses}`}
            onClick={onClick}
        />
    );
};
export default SequenceCard;