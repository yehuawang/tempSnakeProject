import React from 'react'

function RememberImage({ imageToRemember }) {

    return (
        <div>
            <h2 className="user-prompt">Remember This Image</h2>
            <div className="rememberImageDiv">
                <img src={imageToRemember} alt="" className="imageToRemember" />
            </div>
        </div>
    )
}

export default RememberImage