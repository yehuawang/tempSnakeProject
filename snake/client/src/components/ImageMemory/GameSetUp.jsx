import React, {useEffect, useState} from 'react'
import RememberImage from './RememberImage'
import SelectImage from './SelectImage'

function GameSetUp({ imageArray, setImageArray, imageToRemember, setImageToRemember, imageToSelect, setImageToSelect, setToNext, gameStarted, setGameStarted }) {



    return (
        <div>

            <h2> Inside GameSetUp </h2>
            <RememberImage imageToRemember={imageToRemember} />
            {
                gameStarted===false ? (<p>Select a random image to get started</p>) : (<p>Select the previous image shown to you</p>)
            }
            <SelectImage 
                imageArray={imageArray}
                imageToSelect={imageToSelect}
                setToNext={setToNext}
                gameStarted={gameStarted}
                setGameStarted={setGameStarted}
            />

        </div>
    )
}

export default GameSetUp