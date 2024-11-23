import React, { useState, useEffect } from 'react'
import ImageUploader from '../components/ImageUploader'
import CoinCount from '../components/CoinCount'
import '../styles/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import GameStats from '../components/GameStats/GameStats'
import { Container, Row, Col } from 'react-bootstrap'


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
                console.log(data);
                setQuote(data.aboutMe || 'This user has not left anything here...');
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
        <div className={`dashboard-wrapper theme-bg ${userTheme}-theme`}>
            <button className="logoutButton" onClick={() => setLoggedInUser({ email: 'guest', name: 'guest', profileImage: 'guest' })}>
                <span>Log Out</span><i className="bi bi-box-arrow-in-right"></i>
            </button>
            <div className="dash-top-panel panel">
                <div className="userInfo">
                    <Container className="userImage-CoinCount-div">
                        <ImageUploader userEmail={loggedInUser.email} />

                        <CoinCount 
                            userEmail={loggedInUser.email } 
                            updatingCoinCount={updatingCoinCount}
                            setUpdatingCoinCount={setUpdatingCoinCount}
                        />
                    </Container>

                    <div className="userText">
                        <h1 className="user-name">{loggedInUser.name}</h1>
                        <h3 className="user-email">{loggedInUser.email}</h3>
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
                </div>
            </div>

            <div className="dash-bottom-panel panel">
                <GameStats userEmail={loggedInUser.email} />
            </div>
        </div>
    )
}

export default Dashboard