import React from "react";
const SequenceCard = ({id, onClick, isHighlighted}) =>{
    return (
        <div
        id={id}
        className={`card ${isHighlighted ? "highlight" : ""}`}
        onClick={onClick}
        />
    );
};
export default SequenceCard;