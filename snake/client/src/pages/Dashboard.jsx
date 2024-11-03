import React from 'react'


function Dashboard({ loggedInUser, setLoggedInUser }) {
  return (
    <div className="dashboardContainer">
        <div className="userInfoContainer">
            <img src={loggedInUser.profileImage} alt="profile-image" />
            <h1>{loggedInUser.name}</h1>
            <h2>{loggedInUser.email}</h2>
            <button onClick={() => setLoggedInUser({ email: 'guest', name: 'guest', profileImage: 'guest' })}>Log Out</button>
            <div className="achievementsContainer">
                <span className="badge">Badge 1</span>
                <span className="badge">Badge 2</span>
                <span className="badge">Badge 3</span>
            </div>
        </div>
        <div className="gameStatContainer">
            <div className="gameStat">gameStat1</div>
            <div className="gameStat">gameStat2</div>
            <div className="gameStat">gameStat3</div>
        </div>
    </div>
  )
}

export default Dashboard