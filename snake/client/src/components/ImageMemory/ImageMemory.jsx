import React, {useState, useEffect} from 'react'
import SelectLevel from './SelectLevel'
import GameSetUp from './GameSetUp'
import '../../styles/ImageMemory.css'

function ImageMemory({ loggedInUser }) {
    const [level, setLevel] = useState(0)
    const [imageToRemember, setImageToRemember] = useState('')
    const [imageToSelect, setImageToSelect] = useState(null)
    const [imageArray, setImageArray] = useState([])
    const [toNext, setToNext] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)


    useEffect(() => {
        if (level > 0) {
            console.log("level is set to: ", level)
            const imageIndexSet = new Set()
            while (imageIndexSet.size < parseInt(level) + 3) {
                imageIndexSet.add("/randomImage/animal" + Math.floor(Math.random() * 11) + ".jpg")
            }
            const newImageArray = Array.from(imageIndexSet)
            setImageArray(newImageArray)
            setImageToSelect(null)
        }
    }, [level])

    useEffect(() => {
        if (imageArray.length > 0) {
            let newImageToRemember;
            do {
                newImageToRemember = imageArray[Math.floor(Math.random() * imageArray.length)];
            } while (newImageToRemember === imageToRemember);
            setImageToRemember(newImageToRemember);
            console.log("image To Remember is set to: ", newImageToRemember);
        }
    }, [imageArray])

    useEffect(() => {
        console.log("imageToRemember has been updated to: ", imageToRemember)
    }, [imageToRemember])

    useEffect(() => {
        if (toNext) {
            console.log("toNext is true, generating new image array")
            const newImageToSelect = imageToRemember
            setImageToSelect(newImageToSelect)
            console.log("imageToSelect is set to: ", newImageToSelect)
            
            const imageIndexSet = new Set()
            while (imageIndexSet.size < imageArray.length - 1) {
                const randomImage = "/randomImage/animal" + Math.floor(Math.random() * 11) + ".jpg"
                if (randomImage !== newImageToSelect) {
                    imageIndexSet.add(randomImage)
                }
            }
            const newImageArray = Array.from(imageIndexSet)
            newImageArray.splice(Math.floor(Math.random() * (newImageArray.length + 1)), 0, newImageToSelect) // Insert correct answer at a random position
            setImageArray(newImageArray)
            console.log("new image array is set to: ", newImageArray)

            let newImageToRemember;
            do {
                newImageToRemember = newImageArray[Math.floor(Math.random() * newImageArray.length)];
            } while (newImageToRemember === imageToRemember);
            setImageToRemember(newImageToRemember);
            console.log("imageToRemember is set to: ", newImageToRemember);
            
            setToNext(false)
        }
    }, [toNext])

    return (
        <div>
            {
                level===0 ? (
                    <SelectLevel setLevel={setLevel} />
                ) : (
                    <>
                        <h2>Level {level}</h2>
                        <p>playing as: {loggedInUser.name}</p>  
                        <GameSetUp 
                            imageArray={imageArray}
                            setImageArray={setImageArray}
                            imageToRemember={imageToRemember}
                            setImageToRemember={setImageToRemember}
                            imageToSelect={imageToSelect}
                            setImageToSelect={setImageToSelect}
                            toNext={toNext}
                            setToNext={setToNext}
                            gameStarted={gameStarted}
                            setGameStarted={setGameStarted}
                        />
                    </>
                )
            }
        </div>
    )
}

export default ImageMemory