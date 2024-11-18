import React, { useState, useEffect } from 'react'
import ImageUploader from '../components/ImageUploader'
import CoinCount from '../components/CoinCount'
import '../styles/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Store from '../components/Store/Store'
import GameStats from '../components/GameStats'
import { Row, Col } from 'react-bootstrap'


function Dashboard({ loggedInUser, setLoggedInUser }) {
    const [userTheme, setUserTheme] = useState('')
    const [quote, setQuote] = useState('This user has not left anything here...')
    const [editingQuote, setEditingQuote] = useState(false)
    const [newQuote, setNewQuote] = useState('')
    const [updatingCoinCount, setUpdatingCoinCount] = useState(false)

    useEffect(() => {
        const fetchUserTheme = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/getUserBackgroundTheme', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail: loggedInUser.email })
                });
                const data = await response.json();
                setUserTheme(data.theme);
                console.log(`userTheme is now set to: ${data.theme} in Dashboard`);
            } catch (error) {
                console.log(error);
            };
        };

        const fetchQuote = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/getUserAboutMe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail: loggedInUser.email })
                });
                const data = await response.json();
                setQuote(data.about_me || 'This user has not left anything here...');
                console.log(`quote is now set to: ${data.about_me} in Dashboard`);
            } catch (error) {
                console.log(error);
            }
        }

        if (loggedInUser.email !== 'guest') {
            fetchUserTheme();
            fetchQuote();
        }
        
    }, [loggedInUser.email]);

    const handleQuoteClick = () => {
        setEditingQuote(true);
        setNewQuote(quote);
    };

    const handleQuoteChange = (e) => {
        setNewQuote(e.target.value);
    };

    const handleSaveQuote = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/updateUserAboutMe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: loggedInUser.email, aboutMe: newQuote })
            });
            if (response.ok) {
                const data = await response.json();
                setQuote(data.aboutMe);
                setEditingQuote(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`dashboardCountainer theme-bg ${userTheme}-theme`}>
            <div className={"userInfoContainer"}>
                <div className="userInfo">

                    <ImageUploader userEmail={loggedInUser.email} />

                    <CoinCount 
                        userEmail={loggedInUser.email } 
                        updatingCoinCount={updatingCoinCount}
                        setUpdatingCoinCount={setUpdatingCoinCount}
                    />

                    <div className="userText">
                        <h1>{loggedInUser.name}</h1>
                        <h3>{loggedInUser.email}</h3>
                        <span className="userQuote" onClick={handleQuoteClick}>
                            {editingQuote ? (
                                <input 
                                    type="text" 
                                    value={newQuote} 
                                    onChange={handleQuoteChange} 
                                    onBlur={handleSaveQuote}
                                    autoFocus
                                />
                            ) : (
                                quote
                            )}
                        </span>
                        {editingQuote && (
                            <button onClick={handleSaveQuote}>Save</button>
                        )}
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
                            updatingCoinCount={setUpdatingCoinCount}
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