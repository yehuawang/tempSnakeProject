import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/EmojiMemo.css'

const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
    '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
    '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮',
    '🤧', '😵', '🤯', '🤠', '😎', '🤓', '🧐', '😕', '😟', '🙁',
    '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰',
    '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫',
    '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩',
    '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹',
    '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '🐵',
    '🐶', '🐺', '🐱', '🐭', '🐹', '🐰', '🦊', '🦝', '🐻', '🐼',
    '🦘', '🦡', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵',
    '🙊', '🙉', '🙈', '🐒', '🦍', '🦧', '🐔', '🐧', '🐦', '🐤',
    '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄',
    '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦗', '🕷️', '🦂', '🦟',
    '🦠', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞',
    '🐠', '🐟', '🐡', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆',
    '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦙', '🦒',
    '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦮', '🐕', '🐩',
    '🐈', '🦄', '🦓', '🦙', '🦚', '🦜', '🦢', '🦩', '🦦', '🦥',
    '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️',
    '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄', '🌾', '💐', '🌷',
    '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌚', '🌕',
    '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌟', '⭐',
    '🌠', '🌌', '☀️', '⛅', '🌤️', '🌥️', '🌦️', '🌧️', '⛈️', '🌩️',
    '🌨️', '❄️', '☃️', '⛄', '🌬️', '💨', '🌪️', '🌫️', '🌊', '💧',
    '💦', '☔', '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇',
    '🍓', '🫐', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
    '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🥔', '🍠', '🧄',
    '🧅', '🍞', '🥐', '🥖', '🫓', '🥨', '🥯', '🥞', '🧇', '🧀',
    '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮',
    '🌯', '🫔', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🫕', '🥣',
    '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛',
    '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟',
    '🥠', '🥡', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰',
    '🧁', '🥧', '🍫', '🍬', '🍭', '🍯', '🍼', '🥛', '☕', '🫖',
    '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃',
    '🫗', '🥤', '🧋', '🧃', '🧉', '🧊', '🥢', '🍽️', '🍴', '🥄',
    '🔪', '🏺', '🌍', '🌎', '🌏', '🌐', '🪐', '🌌', '💫', '⭐',
    '🌟', '✨', '⚡', '☄️', '💥', '🔥', '🌪️', '🌈', '☀️', '🌤️',
    '⛅', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '🌬️', '❄️', '☃️', '⛄',
    '🌊', '💧', '💦', '☔', '🌫️', '⛲', '🏖️', '🏝️', '🏜️', '🏞️',
    '🗻', '🌋', '🗾', '🏔️', '⛰️', '🌋', '🗻', '🏔️', '🏕️', '🏖️',
    '🏜️', '🏝️', '🏞️', '🗽', '🗼', '⛪', '🕌', '🕍', '🕋', '⛲', '⛩️',
    '🎡', '🎢', '🎠', '🪙', '🪜', '🪛', '🪚', '🪝', '🪠', '🛠️',
    '🛡️', '⚔️', '🔍', '🔬', '🔭'
]

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)]
}

function EmojiMemo({ loggedInUser, setRefreshAttempts }) {
    const [level, setLevel] = useState(0)
    const [previousEmoji, setPreviousEmoji] = useState('🥄')
    const [currentEmoji, setCurrentEmoji] = useState('😀') // corresponds to the correct one in nextGrid
    const [correctEmoji, setCorrectEmoji] = useState('🥄')
    const [enterPhaseOne, setEnterPhaseOne] = useState(false)
    const [userSelection, setUserSelection] = useState('')
    const [gameStarted, setGameStarted] = useState(false)
    const [userHasMadeAChoice, setUserHasMadeAChoice] = useState(false)
    const [currentGrid, setCurrentGrid] = useState([])
    const [nextGrid, setNextGrid] = useState(['😀', '😃', '😄', '😁'])
    const [updatingNextGrid, setUpdatingNextGrid] = useState(false)
    const [points, setPoints] = useState(0)
    const [hearts, setHearts] = useState(5)
    const [feedback, setFeedback] = useState('')
    const [coinsToEarn, setCoinsToEarn] = useState(0)

    useEffect(() => {
        if (gameStarted) {
            initialize()
        }
    }, [gameStarted])


    useEffect(() => {

        const updateUserCoins = async () => {
            try {
                await fetch('http://localhost:5001/api/users/updateCoinCount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: loggedInUser.email,
                        deltaCoinCount: coinsToEarn
                    })
                });
            } catch (error) {
                console.log(error);
            }
        }

        const handleUpdateUserFinalScore = async () => {
            try {
                await fetch('http://localhost:5001/api/games/updateUserScore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        gameId: 'M-1',
                        userEmail: loggedInUser.email,
                        userScore: points
                    })
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }

        const updatePrevAttempts = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/attempts/addNewAttempt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail: loggedInUser.email, gameId: 'M-1', score: points})
                });
                if (response.ok) {
                    console.log('prev attempts updated');
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (loggedInUser.email !== "guest" && gameStarted && hearts === 0) {
            updateUserCoins();
            handleUpdateUserFinalScore();
            setRefreshAttempts(true);
            updatePrevAttempts();
        }
    },[hearts])

    useEffect(() => {
        if (userSelection !== '') {
            setUserHasMadeAChoice(true)
        }
    },[userSelection])

    useEffect(() => {
        if (enterPhaseOne) {
            setCorrectEmoji(currentEmoji)
            setCurrentGrid(nextGrid)
            setCurrentEmoji(previousEmoji)
            setUpdatingNextGrid(true)
            setCurrentEmoji(previousEmoji)
        }
    },[enterPhaseOne])

    useEffect(() => {
        if (userHasMadeAChoice && enterPhaseOne) {
            checkSelectionCorrectness()
            
            setCorrectEmoji(currentEmoji)
            setCurrentGrid(nextGrid)
            setCurrentEmoji(previousEmoji)
            setUpdatingNextGrid(true)
            setCurrentEmoji(previousEmoji)

            setUserHasMadeAChoice(false)
        }
    }, [userHasMadeAChoice])

    useEffect(() => {
        if (updatingNextGrid) {
            const newGrid = []
            for (let i = 0; i < 4 * level; i++) {
                newGrid.push(getRandomEmoji())
            }
            setNextGrid(newGrid)
            const nxEmoji = newGrid[Math.floor(Math.random() * (4 * level))]
            setPreviousEmoji(nxEmoji)
            setCorrectEmoji(previousEmoji)
            setUpdatingNextGrid(false)
        }
    }, [updatingNextGrid])

    const initialize = () => { 
        const newGrid = []
        for (let i = 0; i < 4 * level; i++) {
            newGrid.push(getRandomEmoji())
        }
        setNextGrid(newGrid)

        setPreviousEmoji(newGrid[Math.floor(Math.random() * (4 * level))])
        
    }

    const checkSelectionCorrectness = () => {
        if (userSelection === correctEmoji && enterPhaseOne) {
            setPoints(points + level)
            setCoinsToEarn(Math.floor(points * level / 10))
            setFeedback('Correct!')
        } else if (userSelection !== correctEmoji && enterPhaseOne) {
            setHearts(hearts - 1)
            setFeedback('Wrong!')
        }
        setCorrectEmoji(previousEmoji)
    }


    const startNewGame = () => {
        setLevel(0);
        setGameStarted(false);
        setPreviousEmoji('🥄');
        setCurrentEmoji('😀');
        setCorrectEmoji('🥄');
        setEnterPhaseOne(false);
        setUserSelection('');
        setUserHasMadeAChoice(false);
        setCurrentGrid([]);
        setNextGrid(['😀', '😃', '😄', '😁']);
        setUpdatingNextGrid(false);
        setPoints(0);
        setHearts(5);
        setFeedback('');
        setCoinsToEarn(0);
    }

    return (
        <div className="emoji-memo-game-canvas-container">
            {
                level === 0 ? (
                    <div className="level-selector-emoji-memo">
                        <h1>Choose your level</h1>
                        <div className="level-selector">
                            <div className="level-item" onClick={() => setLevel(1)}>Easy</div>
                            <div className="level-item" onClick={() => setLevel(2)}>Medium</div>
                            <div className="level-item" onClick={() => setLevel(3)}>Hard</div>
                        </div>
                    </div>
                ) : (
                    <div className="fluid">
                        <div className="show-current-emoji-to-remember">
                        </div>
                        <div className="emoji-memo-container">
                            {!gameStarted ? (
                                <>
                                    <h1 className="game-heading emoji-memo-game-heading">Ready to roast your brain?</h1>
                                    <button className="level-item" onClick={() => setGameStarted(true)}>Let's Go!</button>
                                </>
                            ) : (
                                hearts === 0 ? 
                                (

                                    <>
                                        <h1 className="game-headings">Game Over!</h1>
                                        <span className="emoji-memo-info">You have lost all your 
                                            <span className="heart"><i className="bi bi-heart-fill"></i></span>
                                        </span>
                                        <p className="coin-info">You have earned: <span><i className="bi bi-coin"></i>{coinsToEarn}</span></p>
                                        <p className="coin-info">You Score is: <span>{points}</span></p>
                                        <button className="level-item" onClick={startNewGame}>Start New Game</button>
                                    </>
                                ) : (
                                        <>
                                            <h3>Remember this emoji:</h3>
                                            <button className="emoji-to-remember disabled">{previousEmoji}</button>

                                            {
                                                currentGrid.length === 0 ? (
                                                    <button className="level-item" onClick={() => setEnterPhaseOne(true)}>I have remembered this!</button>
                                                ) : (
                                                    <>

                                                        <h3>Choose the previous emoji you saw:</h3>
                                                        <div className="emoji-grid">
                                                        {currentGrid.map((emoji, index) => (
                                                            <button className="emoji-button" key={index} onClick={() => {setUserSelection(emoji)}}>{emoji}</button>
                                                        ))}
                                                        </div>

                                                    </>
                                                )
                                            }
                                            <p className="coin-info">Score: <span>{points}</span></p>
                                            <p className="coin-info">Coins you will earn: <span><i className="bi bi-coin"></i>{coinsToEarn}</span></p>
                                            <div className="heart-count">
                                                {
                                                    Array(hearts).fill().map((_, i) => (
                                                        <span key={i} className="heart"><i className="bi bi-heart-fill"></i></span>
                                                    ))
                                                }
                                            </div>
                                            <p className="feedback">{feedback}</p>
                                        </>
                                    )
                            )}
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default EmojiMemo