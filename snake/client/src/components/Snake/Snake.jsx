import React from 'react'

function Snake({ snakeParts }) {
  return (
    <div>
        {snakeParts.map((part, index) => (
            <div
                key={index}
                style={{
                    left: `${part.x}%`,
                    right: `${part.y}%`
                }}
                className="snake-part"
            ></div>
        ))}
    </div>
  )
}

export default Snake