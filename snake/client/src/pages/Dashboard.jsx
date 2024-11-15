import React, { useState, useEffect } from 'react'
import ImageUploader from '../components/ImageUploader'
import CoinCount from '../components/CoinCount'
import '../styles/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Store from '../components/Store'
import GameStats from '../components/GameStats'
import { Row, Col } from 'react-bootstrap'


function Dashboard({ loggedInUser, setLoggedInUser }) {
    const [userTheme, setUserTheme] = useState('')

    console.log(userTheme)
    // useEffect(() => {
    //     const getUserThemeList = async () => {
    //         try {
    //             const response = await fetch('/api/user/getUserThemeList', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ userEmail: loggedInUser.email })
    //             })
    
    //             const data = await response.json()

    //             const themeList = data.theme_list
    //             console.log(themeList)

    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getUserThemeList()
    // }, [])

    return (
        <div className="dashboardContainer">
            <div className={"userInfoContainer theme-bg " + userTheme}>
                <div className="userInfo">

                    <ImageUploader userEmail={loggedInUser.email} />

                    <CoinCount userEmail={loggedInUser.email} />

                    <div className="userText">
                        <h1>{loggedInUser.name}</h1>
                        <h3>{loggedInUser.email}</h3>
                        <span className="userQuote">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, id? Nemo harum, vero vitae ad laborum saepe asperiores. Unde soluta dicta inventore ex. Nostrum, rerum dolorum ullam tempora maxime magnam!</span>
                    </div>
                    <button className="logoutButton" onClick={() => setLoggedInUser({ email: 'guest', name: 'guest', profileImage: 'guest' })}>Log Out</button>
                </div>
                <div className="achievementsContainer">
                    <span className="badge">Badge 1</span>
                    <span className="badge">Badge 2</span>
                    <span className="badge">Badge 3</span>
                </div>
            </div>

            <div className="dash-bottom-panel">
                <Row>
                    <Col xs={12} md={6} xl={4}>
                        <Store 
                            userEmail={loggedInUser.email}
                            userTheme={userTheme}
                            setUserTheme={setUserTheme}
                        />
                    </Col>
                    <Col xs={12} md={6} xl={8}>
                        <GameStats />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Dashboard