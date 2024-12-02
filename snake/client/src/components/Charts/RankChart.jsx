import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import DefaultProfileImage from '/default-snake-profile-image.png';


/** following code contains example code from Rechart documentation: https://recharts.org/en-US/examples/LegendEffectOpacity */

function RankChart({ selectedGameId, userEmail }) {
    const [gameScores, setGameScores] = useState([]);
    const [userScore, setUserScore] = useState(0);
    const [userProfileImage, setUserProfileImage] = useState('DefaultProfileImage');

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/get-profile-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail: userEmail }),
                });
    
                const data = await response.json();
                const profileImageString = data.profileImage;
                const imageUrl = `http://localhost:5001/uploads/${profileImageString}`;
                setUserProfileImage(imageUrl);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        }


        const fetchRankData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/games/getGameScores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameId: selectedGameId })
                });
                if (response.ok) {
                    const data = await response.json();
                    let totalUsersAtScoresArray = [];
                    data.forEach(d => {
                        totalUsersAtScoresArray.push({ score: d.score, totalUsers: 0 });
                        if (d.user_email === userEmail) {
                            setUserScore(d.score);
                        }
                    });
                    data.forEach(d => {
                        totalUsersAtScoresArray.forEach(t => {
                            if (d.score === t.score) {
                                t.totalUsers += 1;
                            }
                        });
                    });
                    totalUsersAtScoresArray.sort((a, b) => a.score - b.score);
                    setGameScores(totalUsersAtScoresArray);
                }
            } catch (error) {
                console.log(error);
            }
        };


        fetchRankData();
        fetchProfileImage();
    }, [selectedGameId, userEmail]);

    const UserDot = (props) => {
        const { cx, cy, payload } = props;

        if (payload.score === userScore) {
            return (
                <foreignObject x={cx - 20} y={cy - 20} width={60} height={60}>
                    <div className="user-dot-container"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '2px solid var(--accent-color)',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', 
                            alignSelf: 'center',
                        }}
                    >
                        <img
                            src={userProfileImage}
                            width="40"
                            height="40"
                            style={{ borderRadius: '50%' }}
                            alt="User Profile"
                        />
                    </div>
                </foreignObject>
            );
        }

        return null;
    };

    return (
        <div style={{ width: '100%', height: '90%' }}>
            <h2>All User Performances</h2>
            <p>Your Best score: {userScore}</p>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    data={gameScores}
                    margin={{
                        top: 20,
                        right: 100,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis 
                        dataKey="totalUsers"
                        type="number" 
                        domain={['auto', 'auto']} 
                    >
                        <Label value="Number of Users" angle={-90} position="insideLeft" />
                    </YAxis>
                    <XAxis 
                        dataKey="score" 
                        type="number" 
                        domain={['auto', 'auto']} 
                    >
                        <Label value="Best Score" offset={-5} position="insideBottom" />
                    </XAxis>
                    
                    <Tooltip />
                    <Line 
                        type="monotone" 
                        dataKey="totalUsers" 
                        stroke="var(--secondary-color)" 
                        strokeWidth={3} 
                        dot={<UserDot />} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RankChart;