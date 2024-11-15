import React, {useEffect, useState} from 'react'
import coinImage from '/coin.svg'
import plusImage from '/plus.svg'
import '../styles/CoinCount.css'

function CoinCount({ userEmail }) {
    const email =  userEmail || 'guest'
    const [coinCount, setCoinCount] = useState(0)


    const testAddCoin = async () => {
        const response = await fetch('http://localhost:5001/api/users/updateCoinCount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail: email, deltaCoinCount: 1 }) 
        })
        const data = await response.json()
        const newCoinCount = data.newCoinCount
        setCoinCount(newCoinCount)
        console.log(`new coin count is set to: ${newCoinCount}`)
    }

    useEffect(() => {
        const getCoinCount = async () => {
            const response = await fetch('http://localhost:5001/api/users/getCoinCount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: email }) 
            })
            const data = await response.json()
            const coinCount = data.coinCount
            setCoinCount(coinCount)
        }

        getCoinCount()
    },[])

    return (
        <div className="coinContainer">
            <span className="coinSpan"> 
                <img src={coinImage} alt="CoinImage" />
            </span>
            <span className="coinSpan">{coinCount}</span>
            <span className="coinSpan">
                <img src={plusImage} alt="PlusImage" onClick={testAddCoin} style={{ cursor: 'pointer' }} />
            </span>
        </div>
    )
}

export default CoinCount