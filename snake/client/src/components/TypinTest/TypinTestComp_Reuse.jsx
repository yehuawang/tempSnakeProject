import React from "react";

export const SampleText = ({ sampleText, getCharClass }) => (
    <div className="sample-text">
        {sampleText.split("").map((char, index) => (
            <span key={index} className={getCharClass(char, index)}>
                {char}
            </span>
        ))}
    </div>
);

export const TypingArea = ({ inputRef, inputValue, handleTyping, isRunning, completed }) => (
    <textarea
        ref={inputRef}
        value={inputValue}
        onChange={handleTyping}
        disabled={!isRunning || completed}
        placeholder="Start typing here..."
        className="input-area"
    ></textarea>
);

export const Controls = ({ timeLeft, startTest, isRunning }) => (
    <div className="controls">
        <button onClick={startTest} disabled={isRunning}>
            Start Test
        </button>
        <p>Time Left: {timeLeft}s</p>
    </div>
);

export const Results = ({ wpm, errors, correctChars, completed }) => (
    <div className="results">
        <p>WPM: {wpm}</p>
        <p>Errors: {errors}</p>
        <p>
            Accuracy: {((correctChars / (correctChars + errors)) * 100 || 0).toFixed(2)}%
        </p>
        {completed && <p>Test Completed!</p>}
    </div>
);
