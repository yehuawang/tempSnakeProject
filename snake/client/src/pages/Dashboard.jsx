import React, { useState, useEffect } from 'react'
import ImageUploader from '../components/ImageUploader'
import '../styles/Dashboard.css'
import CoinCount from '../components/CoinCount'


function Dashboard({ loggedInUser, setLoggedInUser }) {

    const [profileImageIsSet, setProfileImageIsSet] = useState(false)
    const [profileImage, setProfileImage] = useState('/default-snake-profile-image.png')
    const [uploadingImg, setUploadingImg] = useState(false)

    useEffect(() => {
        //** async function to fetch profile image from database or handle set... */


    },[profileImageIsSet])



    useEffect(() => {
        const handleProfileImgUpload = async (e) => {

        }
    },[uploadingImg])


    return (
        <div className="dashboardContainer">
            <div className="userInfoContainer">
                <div className="userInfo">

                    <CoinCount userEmail={loggedInUser.email} />
                    <div className="profileImage">

                    <ImageUploader userEmail={loggedInUser.email} />
                    {/* <div className="profileImage">

                        <button className="profileImgUploadButton" >
                            <img src={profileImage} alt="profile-image" />
                            <img src="/profile-img-upload-button.png" className="image-upload" />
                        </button>
                    </div> */}
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
            
            <div className="gameStatContainer">
                <div className="gameStat">gameStat1</div>
                <div className="gameStat">gameStat2</div>
                <div className="gameStat">gameStat3</div>
            </div>
        </div>
    )
}

export default Dashboard