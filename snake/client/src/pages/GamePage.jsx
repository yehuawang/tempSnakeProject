import React from 'react'
import '../styles/GamePage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import GameBoard from '../components/GameBoard'
import GameHeader from '../components/GameHeader'
import GameLoader from '../components/GameLoader'
import { Container, Row, Col, Button } from 'react-bootstrap'

function GamePage({ game, loggedInUser }) {
    console.log(`GamePage received ${loggedInUser}`)
    const player = {
        name: loggedInUser.name,
        profileImage: loggedInUser.profileImage
    }
    console.log(`GamePage prepared player: ${player}, player name: ${player.name}, player profileImage: ${player.profileImage}`)
    return (
        <div className="page-element-div">
            <div className="game-container center justify-content-center text-center">
                <GameHeader gameName={game.name} loggedInUser={loggedInUser} />
                <GameBoard gamebody={game.gamebody} loggedInUser={loggedInUser}>
                    {console.log("passing\n" + loggedInUser + "\nto GameLoader")}
                    {console.log(`name is ${loggedInUser.name}, email is ${loggedInUser.email}, profileImage is ${loggedInUser.profileImage}`)} 
                    
                    <GameLoader gamebody={game.gamebody} loggedInUser={loggedInUser} player={player} />
                </GameBoard>
            </div>
        </div>
    )
}

export default GamePage