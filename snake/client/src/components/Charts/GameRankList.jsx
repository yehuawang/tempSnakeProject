import React, {useState, useEffect} from 'react'

function GameRankList({ game, loggedInUser, refreshLeadBoard, setRefreshLeadBoard }) {

    const gameId = game.id
    const userEmail = loggedInUser.email
    let highest = true
    
    if (gameId === "R-4") {
        highest = false
    }

    const [topThreeScores, setTopThreeScores] = useState([])
    const [usersAhead, setUsersAhead] = useState(0)


    const fetchLeadBoardData = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/games/getGameTopThreeScoresAndUserPosition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail,
                    gameId,
                    highest
                })
            });
            const data = await response.json();
            setTopThreeScores(data.topThreeScores)
            setUsersAhead(data.usersAhead)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (loggedInUser.email !== "guest" && refreshLeadBoard) {
            fetchLeadBoardData()
            setRefreshLeadBoard(false)
        }
    },[refreshLeadBoard])

    return (
        <>
            {
                loggedInUser.email === "guest" ? (<p>Log in to see leadboard and your position...</p>) : (
                    topThreeScores.length === 0 ? 
                    <p>Fetching data...</p> : 
                    <>
                        {topThreeScores.map((score, index) => {
                            const userName = score.user_email.split('@')[0];
                            return (
                                <div className="top-three-list-item" key={index}>
                                    <div className="top-three-rank-number">{index + 1}</div>
                                    <span className="top-three-rank-username">{userName}</span><span className="top-three-rank-user-score">{score.score}</span>
                                </div>
                            )
                        })}
                        {
                            usersAhead < 3 ? <p>You are in the top 3! Amazing!</p> :  <p>There are {usersAhead} users ahead of you, keep going!</p>
                        }
                       
                    </>
                )
            }
        </>
    )
}

export default GameRankList