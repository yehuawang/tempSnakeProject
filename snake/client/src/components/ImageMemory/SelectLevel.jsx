import React, {userState} from 'react'

function SelectLevel({ setLevel }) {

    const handleSelectLevel = (e) => {
        const level = e.target.innerText.split(' ')[1]
        setLevel(level)
    }
    return (
        <div>
            <h2 className="user-prompt">Select Level</h2>
            <div className="levelContainer">
                {
                    [1, 2, 3, 4, 5].map(level => 
                        <div className="level" key={level}>
                            <button className="levelButton" onClick={handleSelectLevel}>Level {level}</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SelectLevel