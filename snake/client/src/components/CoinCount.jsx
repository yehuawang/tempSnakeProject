import React, {useEffect, useState} from 'react'
import coinImage from '/coin.svg'
import plusImage from '/plus.svg'
import '../styles/CoinCount.css'

function CoinCount({ userEmail, updatingCoinCount, setUpdatingCoinCount }) {
    const email =  userEmail || 'guest'
    const [coinCount, setCoinCount] = useState(0)

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
        if (updatingCoinCount) {
            getCoinCount()
            setUpdatingCoinCount(false)
        }
    },[updatingCoinCount])

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
            <span className="coin-icon"> 
                <i className="bi bi-coin"></i>
            </span>
            <span className="coin-number">{coinCount}</span>
        </div>
    )
}

export default CoinCount