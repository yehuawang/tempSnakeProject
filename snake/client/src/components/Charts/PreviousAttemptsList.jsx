import React, {useState, useEffect} from 'react'

function PreviousAttemptsList({ game, loggedInUser, refreshAttempts, setRefreshAttempts }) {

    const gameId = game.id
    const userEmail = loggedInUser.email

    const [previousAttempts, setPreviousAttempts] = useState([]);


    const fetchPreviousAttempts = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/attempts/getUserAttempts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail,
                    gameId
                })
            });
            const data = await response.json();
            setPreviousAttempts(data.attempts)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (refreshAttempts && loggedInUser.email !== "guest") {
            fetchPreviousAttempts();
            setRefreshAttempts(false);
        }
    },[refreshAttempts, loggedInUser, setRefreshAttempts])


    return (
        <>
            {
                loggedInUser.email === "guest" ? (<p>Log in to see leadboard and your position...</p>) : (
                    previousAttempts.length === 0 ? 
                    <p>Fetching data...</p> : 
                    <>
                        {
                            previousAttempts.map((attempt, index) => {
                                return (
                                    <div className="prev-attempt-list" key={index}>
                                        <div className="prev-attempt-time">{attempt.time}</div>
                                        <span className="prev-attempt-score">{attempt.score}</span>
                                    </div>
                                )
                            })
                        }
                    </>
                )
            }
        </>
    )
}

export default PreviousAttemptsList