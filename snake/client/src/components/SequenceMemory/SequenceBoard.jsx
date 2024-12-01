import React from "react";
import SequenceCard from "./SequenceCard"

const SequenceBoard = ({ cards, onCardClick, highlightedCard }) => {
    return (
        <div className="SequenceBoard">
            {cards.map((card, index) => (
                <SequenceCard
                    key={index}
                    id={card}
                    onClick={() => onCardClick(card)}
                    isHighlighted={highlightedCard === card}
                    additionalClasses=""
                />
            ))}
        </div>
    );
};

export default SequenceBoard;