import React from 'react'

function Food({ foodCoordinates }) {
  return (
    <div>
        <div
            style={{
                left: `${foodCoordinates.x}%`,
                right: `${foodCoordinates.y}%`
            }}
            className="food"
        ></div>
    </div>
  )
}

export default Food