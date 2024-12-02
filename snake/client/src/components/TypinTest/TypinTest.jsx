import React, { useState, useEffect, useRef } from "react";
import "../../styles/TypinTest.css";
import keystroke from '../../sounds/keystroke.mp3';
import playSound from '../Audio/playSound.js'

const sampleText =
    "We should always treat others with kindness and respect, no matter the situation. If everyone would take a moment to consider the feelings of others, the world could be a much better place. Remember, words have power, and we should choose them wisely. We should always treat others with kindness and respect, no matter the situation. If everyone would take a moment to consider the feelings of others, the world could be a much better place. Remember, words have power, and we should choose them wisely.";

const TypinTest = ({ loggedInUser, setRefreshAttenpts }) => {
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [errors, setErrors] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [completed, setCompleted] = useState(false);

    const inputRef = useRef(null);



    const playSoundInstance = playSound(keystroke);

    useEffect(() => {
        return () => {
            playSoundInstance.stop();
        };
    }, []);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            setCompleted(true);
        }
    }, [isRunning, timeLeft]);

    const handleTyping = (e) => {
        playSoundInstance.play();
        const input = e.target.value;
        const lastChar = input[input.length - 1];

        if (!isRunning) return;

        if (input.length < inputValue.length) {
            setCurrentCharIndex(currentCharIndex - 1);
            if (sampleText[currentCharIndex - 1] === inputValue[currentCharIndex - 1]) {
                setCorrectChars(correctChars - 1);
            } else {
                setErrors(errors - 1);
            }
        } else {
            if (lastChar === sampleText[currentCharIndex]) {
                setCorrectChars(correctChars + 1);
            } else {
                setErrors(errors + 1);
            }
            setCurrentCharIndex(currentCharIndex + 1);
        }

        setInputValue(input);

        if (currentCharIndex === sampleText.length - 1) {
            setIsRunning(false);
            setCompleted(true);
        }
    };

    const calculateWPM = () => {
        const minutes = (30 - timeLeft) / 60;
        return Math.round((correctChars / 5) / minutes);
    };

    useEffect(() => {
        if (isRunning) {
            setWpm(calculateWPM());
        }
    }, [correctChars, isRunning]);

    const startTest = () => {
        setIsRunning(true);
        setTimeLeft(30);
        setInputValue("");
        setCurrentCharIndex(0);
        setErrors(0);
        setCorrectChars(0);
        setWpm(0);
        setCompleted(false);
        inputRef.current.focus();
    };

    const getCharClass = (char, index) => {
        if (index < currentCharIndex) {
            return char === inputValue[index] ? "correct-char" : "incorrect-char";
        }
        if (index === currentCharIndex) {
            return "current-char";
        }
        return "";
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Tab") {
                e.preventDefault(); 
                startTest(); 
            }

            if (!isRunning) {
                startTest();
            }
            inputRef.current.focus();
        };

        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("keydown", handleKey);
        };
    }, [isRunning]);

    return (
        <div className="typintest">
            <div className="typing-stats">
                <div className={`${isRunning && "show"} timer`}>{timeLeft}</div>
            </div>
            <div className="sample-text">
                {sampleText.split("").map((char, index) => (
                    <span key={index} className={getCharClass(char, index)}>
                        {char}
                    </span>
                ))}
            </div>
            <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleTyping}
                disabled={!isRunning || completed}
                placeholder="Start typing here..."
                className="input-area"
            ></textarea>
            <div className="results">
                <p>WPM: {wpm}</p>
                <p>Errors: {errors}</p>
                <p>
                    Accuracy:{" "}
                    {((correctChars / (correctChars + errors || 1)) * 100).toFixed(2)}%
                </p>
                {completed && <p>Test Completed!</p>}
            </div>
        </div>
    );
};

export default TypinTest;
