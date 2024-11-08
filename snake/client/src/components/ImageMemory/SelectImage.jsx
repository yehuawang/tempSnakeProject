import React, {useState, useEffect} from 'react'

function SelectImage({ imageArray, imageToSelect, setToNext, gameStarted, setGameStarted }) {

    const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false)

    const handleUserSelection = (e) => {
        if (gameStarted === false) {
            setGameStarted(true)
        } else {
            const userSelected = e.target.src
            console.log("User selectd: ", userSelected)
            console.log("User should select: http://localhost:5173" + imageToSelect)
            if ("http://localhost:5173" + imageToSelect === userSelected) {
                console.log("User selected correct image " + e.target.src)
                setCorrectAnswerSelected(true)
            } else {
                console.log("User selected wrong image " + e.target.src)
                setCorrectAnswerSelected(false)
            }
            console.log("User clicked on an image ",  e.target.src)
        }
        setToNext(true)
    }



    return (
        <div>
            <div className="selectImageContainer">
                {
                    imageArray.map((image, index) => 
                        <div key={index} onClick={handleUserSelection}>
                            <p>{image}</p>
                            <img src={image} alt="" className="imageToSelect" />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SelectImage