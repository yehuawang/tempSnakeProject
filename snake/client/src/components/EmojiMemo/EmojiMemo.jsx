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

function EmojiMemo({ loggedInUser }) {
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

    useEffect(() => {
        if (gameStarted) {
            initialize()
        }
    }, [gameStarted])


    useEffect(() => {

        const updateUserCoins = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/updateCoinCount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: loggedInUser.email,
                        deltaCoinCount: points
                    })
                });
                const data = await response.json();
                console.log(data);
                const newCoinCount = data.newCoinCount;
                console.log(newCoinCount);
            } catch (error) {
                console.log(error);
            }
        }
        if (gameStarted && hearts === 0) {
            updateUserCoins();
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
            console.log(`next Grid before set: ${nextGrid}`)
            setCurrentGrid(nextGrid)
            setCurrentEmoji(previousEmoji)
            setUpdatingNextGrid(true)
            console.log(`next Grid after set in uppder call: ${nextGrid}`)
            setCurrentEmoji(previousEmoji)
        }
    },[enterPhaseOne])

    useEffect(() => {
        if (userHasMadeAChoice && enterPhaseOne) {
            checkSelectionCorrectness()
            
            setCorrectEmoji(currentEmoji)
            console.log(`next Grid before set: ${nextGrid}`)
            setCurrentGrid(nextGrid)
            setCurrentEmoji(previousEmoji)
            setUpdatingNextGrid(true)
            console.log(`next Grid after set in uppder call: ${nextGrid}`)
            setCurrentEmoji(previousEmoji)

            setUserHasMadeAChoice(false)
        }
    }, [userHasMadeAChoice])

    useEffect(() => {
        if (updatingNextGrid) {
            const newGrid = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji(), getRandomEmoji()]
            console.log(`new Grid: ${newGrid}`)
            setNextGrid(newGrid)
            console.log(`next Grid after set: ${nextGrid}`)

            console.log(`emoji before set: ${previousEmoji}`)
            const nxEmoji = newGrid[Math.floor(Math.random() * 4)]
            setPreviousEmoji(nxEmoji)
            console.log(`emoji after set: ${previousEmoji}`)

            setCorrectEmoji(previousEmoji)

            setUpdatingNextGrid(false)
        }
    }, [updatingNextGrid])

    const initialize = () => {
        console.log(`current Grid before initialization: ${currentGrid} -- should be empty` )  

        const newGrid = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji(), getRandomEmoji()]
        setNextGrid(newGrid)
        console.log(`next Grid after initialization: ${nextGrid}`)

        setPreviousEmoji(newGrid[Math.floor(Math.random() * 4)])
        
        console.log(`previous emoji after initialize: ${previousEmoji}`)
    }

    const checkSelectionCorrectness = () => {
        if (userSelection === correctEmoji && enterPhaseOne) {
            setPoints(points + 1)
            setFeedback('Correct!')
        } else if (userSelection !== correctEmoji && enterPhaseOne) {
            setHearts(hearts - 1)
            setFeedback('Wrong!')
        }
        setCorrectEmoji(previousEmoji)
    }

    // const handleEmojiClick = (emoji) => {
    //     if (emoji === currentEmoji) {
    //     setPoints(points => points + 1)
    //     setFeedback('Correct!')
    //     } else {
    //     setHearts(hearts => hearts - 1)
    //     setFeedback('Wrong!')
    //     }
    //     setUserHasMadeAChoice(true)
    //     if (hearts - 1 === 0) {
    //     setGameStarted(false)
    //     } else {
    //     const newEmoji = getRandomEmoji()
    //     const newGrid = [newEmoji, getRandomEmoji(), getRandomEmoji(), getRandomEmoji()]
    //     newGrid[Math.floor(Math.random() * 4)] = newEmoji
    //     setNextGrid(newGrid)
    //     setPreviousEmoji(newEmoji)
    //     }
    // }

  

    const startNewGame = () => {
        window.location.reload();
    }

    return (
        <div>
        <Container className="fluid">
            <div className="show-current-emoji-to-remember">
            </div>
            <div className="emoji-memo-container">
                {!gameStarted ? (
                    <>
                        <h1 className="game-heading emoji-memo-game-heading">Ready to roast your brain?</h1>
                        <Button onClick={() => setGameStarted(true)}>Let's Go!</Button>
                    </>
                ) : (
                    hearts === 0 ? 
                    (

                        <>
                            <h1 className="game-headings">Game Over!</h1>
                            <p className="emoji-memo-info">You have lost all your ❤️</p>
                            <p className="coin-info">You have earned: <span><i className="bi bi-coin"></i>{points}</span></p>
                            <button onClick={startNewGame}>Start New Game</button>
                        </>
                    ) : (
                            <>
                                <h3>Remember this emoji:</h3>
                                <button className="emoji-to-remember disabled">{previousEmoji}</button>

                                {
                                    currentGrid.length === 0 ? (
                                        <button onClick={() => setEnterPhaseOne(true)}>I have remembered this!</button>
                                    ) : (
                                        <>

                                            <h3>Choose the previous emoji you saw:</h3>
                                            <div className="emoji-grid">
                                            {currentGrid.map((emoji, index) => (
                                                <Button className="emoji-button" key={index} onClick={() => {setUserSelection(emoji)}}>{emoji}</Button>
                                            ))}
                                            </div>

                                        </>
                                    )
                                }
                                <p className="coin-info">Coins you will earn: <span><i className="bi bi-coin"></i>{points}</span></p>
                                <div className="heart-count">
                                    {
                                        Array(hearts).fill().map((_, i) => (
                                            <span key={i} className="heart">❤️</span>
                                        ))
                                    }
                                </div>
                                <p className="feedback">{feedback}</p>
                            </>
                        )
                )}
            </div>
        </Container>
        </div>
    )
}

export default EmojiMemo