import React, {useState, useEffect} from 'react';
import SequenceBoard from "./SequenceBoard";
import SequenceInfoPanel from "./SequenceInfoPanel";
import "../../styles/SequenceMemory.css"

const cards = Array.from({ length: 9 }, (_, i) => `Card ${i + 1}`);

function SequenceMemory({ loggedInUser }) {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Press to Play!");
  const [flashSpeed, setFlashSpeed] = useState(700); // Speed in ms
  const [highlightedCard, setHighlightedCard] = useState(null);

  useEffect(() => {
    if (userSequence.length && userSequence.length === sequence.length) {
      if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
        setMessage("Correct! Get ready for the next round.");
        setScore((prev) => prev + level * 5);
        setTimeout(() => nextRound(), 1000);
      } else {
        setMessage("Game Over! Try again.");
        setIsPlaying(false);
      }
    }
  }, [userSequence]);

  const nextRound = () => {
    setUserSequence([]);
    setSequence((prev) => [...prev, cards[Math.floor(Math.random() * 9)]]);
    setLevel((prev) => prev + 1);
    if (flashSpeed > 300) {
      setFlashSpeed((prev) => prev - 50);
    }
  };

  const handleStart = () => {
    setSequence([cards[Math.floor(Math.random() * 9)]]);
    setUserSequence([]);
    setLevel(1);
    setScore(0);
    setFlashSpeed(700);
    setIsPlaying(true);
    setMessage("Watch the sequence...");
  };

  const handleCardClick = (card) => {
    if (!isPlaying) return;
    setUserSequence((prev) => [...prev, card]);
  };

  const playSequence = async () => {
    setMessage("Watch the sequence...");
    for (let card of sequence) {
      await highlightCard(card);
    }
    setMessage("Your turn!");
  };

  const highlightCard = (card) => {
    return new Promise((resolve) => {
      setHighlightedCard(card);
      setTimeout(() => {
        setHighlightedCard(null);
        setTimeout(resolve, 300);
      }, flashSpeed);
    });
  };

  useEffect(() => {
    if (sequence.length && isPlaying) playSequence();
  }, [sequence]);

  return (
    <div>
      <SequenceInfoPanel level={level} score={score} />
      <SequenceBoard
        cards={cards}
        onCardClick={handleCardClick}
        highlightedCard={highlightedCard}
      />
      <button className="sequence-memory-button" onClick={handleStart} disabled={isPlaying}>
        Start Game
      </button>
      <p className="sequence-memory-p">{message}</p>
    </div>
  );
}

export default SequenceMemory;

