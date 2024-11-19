// import React, { useState, useEffect, useRef } from "react";
// import "../../styles/TypinTest.css";

// const sampleText =
//     "We should always treat others with kindness and respect, no matter the situation. If everyone would take a moment to consider the feelings of others, the world could be a much better place. Remember, words have power, and we should choose them wisely. We should always treat others with kindness and respect, no matter the situation. If everyone would take a moment to consider the feelings of others, the world could be a much better place. Remember, words have power, and we should choose them wisely.";

// const TypinTest = () => {
//     // State variables are used to track:
//     // - `currentCharIndex`: Position of the current character in the sample text
//     // - `inputValue`: The text entered by the user
//     // - `isRunning`: Whether the typing test is currently active
//     // - `timeLeft`: Countdown timer for the duration of the test
//     // - `errors`: Count of incorrect characters typed
//     // - `correctChars`: Count of correctly typed characters
//     // - `wpm`: Words per minute, calculated dynamically during the test
//     // - `completed`: Whether the typing test has been completed
//     const [currentCharIndex, setCurrentCharIndex] = useState(0);
//     const [inputValue, setInputValue] = useState("");
//     const [isRunning, setIsRunning] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(30);
//     const [errors, setErrors] = useState(0);
//     const [correctChars, setCorrectChars] = useState(0);
//     const [wpm, setWpm] = useState(0);
//     const [completed, setCompleted] = useState(false);

//     // `useRef` is used to manage the focus of the input field when starting or resetting the test
//     const inputRef = useRef(null);
//     const buttonRef = useRef(null);

//     // This effect manages the countdown timer:
//     // - When the test is running, decrease `timeLeft` by 1 every second.
//     // - If `timeLeft` reaches 0, stop the test and mark it as completed.
//     useEffect(() => {
//         if (isRunning && timeLeft > 0) {
//             const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//             return () => clearTimeout(timer); // Clean up the timer to avoid memory leaks
//         } else if (timeLeft === 0) {
//             setIsRunning(false);
//             setCompleted(true);
//         }
//     }, [isRunning, timeLeft]);

//     // This function handles user input in the text area:
//     // - It determines whether the user is typing, deleting, or completing the text.
//     // - Compares the user's input against the sample text:
//     //   - Increases the correct character count if the user types the correct character.
//     //   - Increases the error count if the user types an incorrect character.
//     // - Updates the `currentCharIndex` to track progress through the sample text.
//     // - Stops the test and marks it as completed if the user reaches the end of the sample text.
//     const handleTyping = (e) => {
//         const input = e.target.value;
//         const lastChar = input[input.length - 1];

//         if (!isRunning) return;

//         if (input.length < inputValue.length) {
//             // Backspace handling: Decrease character index and adjust counts accordingly
//             setCurrentCharIndex(currentCharIndex - 1);
//             if (sampleText[currentCharIndex - 1] === inputValue[currentCharIndex - 1]) {
//                 setCorrectChars(correctChars - 1);
//             } else {
//                 setErrors(errors - 1);
//             }
//         } else {
//             // Typing new character: Increase counts based on character correctness
//             if (lastChar === sampleText[currentCharIndex]) {
//                 setCorrectChars(correctChars + 1);
//             } else {
//                 setErrors(errors + 1);
//             }
//             setCurrentCharIndex(currentCharIndex + 1);
//         }

//         setInputValue(input);

//         // If the user reaches the end of the sample text, stop the test
//         if (currentCharIndex === sampleText.length - 1) {
//             setIsRunning(false);
//             setCompleted(true);
//         }
//     };

//     // This function calculates words per minute (WPM):
//     // - WPM is calculated as the number of correct characters divided by 5 (average word length),
//     //   divided by the elapsed time in minutes.
//     // - It returns the calculated WPM as a rounded integer.
//     const calculateWPM = () => {
//         const minutes = (30 - timeLeft) / 60; // Convert elapsed time to minutes
//         return Math.round((correctChars / 5) / minutes);
//     };

//     // This effect recalculates WPM dynamically:
//     // - WPM is updated every time the number of correct characters changes, provided the test is running.
//     useEffect(() => {
//         if (isRunning) {
//             setWpm(calculateWPM());
//         }
//     }, [correctChars, isRunning]);

//     // This function starts or resets the test:
//     // - Resets all state variables to their initial values.
//     // - Focuses the input field to prepare for typing.
//     const startTest = () => {
//         setIsRunning(true);
//         setTimeLeft(30); // Reset timer to 30 seconds
//         setInputValue("");
//         setCurrentCharIndex(0);
//         setErrors(0);
//         setCorrectChars(0);
//         setWpm(0);
//         setCompleted(false);
//         inputRef.current.focus(); // Focus on the input area
//     };

//     // This function determines the styling class for each character in the sample text:
//     // - Characters already typed are styled as correct or incorrect based on user input.
//     // - The current character being typed is highlighted for better user feedback.
//     const getCharClass = (char, index) => {
//         if (index < currentCharIndex) {
//             return char === inputValue[index] ? "correct-char" : "incorrect-char";
//         }
//         if (index === currentCharIndex) {
//             return "current-char";
//         }
//         return ""; // Default class for untyped characters
//     };


//     useEffect(() => {

//         const handleKey = (e) => {
//             {
//                 inputRef.current.focus();
//                 buttonRef.current.click();
//             }
//         }


//         if (!isRunning){

//             document.addEventListener('keydown', handleKey);
    
//             return () => {
//                 document.removeEventListener('keydown', handleKey);
//             };
//         }

//     }, [])


//     // Main component rendering:
//     // - Displays the sample text with dynamic styling for user feedback.
//     // - Provides an input area for typing and a button to start/reset the test.
//     // - Shows test results such as WPM, errors, and accuracy after the test is completed.
//     return (
//         <div className="typintest">
//             <h1>Typin Test</h1>
//             {/* <div className="controls">
//                 <button onClick={startTest} disabled={isRunning}>
//                     Start Test
//                 </button>
//                 <p>Time Left: {timeLeft}s</p>
//             </div> */}
//             <div className="timer">
//                 {timeLeft}
//             </div>
//             <div className="sample-text">
//                 {sampleText.split("").map((char, index) => (
//                     <span key={index} className={getCharClass(char, index)}>
//                         {char}
//                     </span>
//                 ))}
//             </div>
//             <button hidden ref={buttonRef} onClick={startTest}>
//                 <textarea
//                     ref={inputRef}
//                     value={inputValue}
//                     onChange={handleTyping}
//                     disabled={!isRunning || completed}
//                     placeholder="Click here to start typing here..."
//                     className="input-area"
//                 ></textarea>
//             </button>
//             <div className="results">
//                 <p>WPM: {wpm}</p>
//                 <p>Errors: {errors}</p>
//                 <p>
//                     Accuracy:{" "}
//                     {((correctChars / (correctChars + errors || 1)) * 100).toFixed(2)}%
//                 </p>
//                 {completed && <p>Test Completed!</p>}
//             </div>
//         </div>
//     );
// };

// export default TypinTest;


import React, { useState, useEffect, useRef } from "react";
import "../../styles/TypinTest.css";

const sampleText =
    "We should always treat others with kindness and respect, no matter the situation. If everyone would take a moment to consider the feelings of others, the world could be a much better place. Remember, words have power, and we should choose them wisely. We should always treat others with kindness and respect, no matter the situation. If everyone would take a moment to consider the feelings of others, the world could be a much better place. Remember, words have power, and we should choose them wisely.";

const TypinTest = () => {
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [errors, setErrors] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [completed, setCompleted] = useState(false);

    const inputRef = useRef(null);

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
                e.preventDefault(); // Prevent the default tab behavior
                startTest(); // Restart the typing test
            }

            if (!isRunning) {
                startTest(); // Start the test when any key is pressed
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
