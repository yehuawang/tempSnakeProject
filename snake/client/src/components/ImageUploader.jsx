import React, { useState, useRef, useEffect } from 'react';
import DefaultProfileImage from '/default-snake-profile-image.png';
import UploadIcon from '/profile-img-upload-button.png';
import '../styles/ImageUploader.css';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const MAX_PROFILE_IMAGE_SIZE = 3 * 1024 * 1024;

function ImageUploader({ userEmail }) {
    const [profileImageURL, setProfileImageURL] = useState(DefaultProfileImage);
    const [tooLarge, setTooLarge] = useState(false);
    const [image, setImage] = useState(null);
    const profileImageRef = useRef(null);


    const fetchProfileImage = async () => { 
        console.log("fetching profile image string from db...");
        try {
            const response = await fetch('http://localhost:5001/api/users/get-profile-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: userEmail }),
            });

            if (response.status === 404) {
                console.log("User has no profile image set yet");
                return;
            }

            const data = await response.json();
            const profileImageString = data.profileImage;
            console.log(`profile image string fetched: ${profileImageString}`);
            const imageUrl = `http://localhost:5001/uploads/${profileImageString}`;
            setProfileImageURL(imageUrl);
            console.log(`profileImageURL set to: ${imageUrl}`);
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
    };
    
    useEffect(() => {
        
        fetchProfileImage();
    }, [userEmail]);

    const handleUpload = async (selectedImage) => {
        if (!selectedImage) {
            console.error("No image selected");
            return;
        }

        const imageData = new FormData();
        imageData.append('image', selectedImage);
        imageData.append('userEmail', userEmail);

        try {
            const response = await axios.post(
                'http://localhost:5001/api/users/upload-profile-image', 
                imageData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("Image uploaded successfully:", response.data);
            fetchProfileImage();
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const displayNewProfileImage = (e) => {
        const newProfileImage = e.target.files[0];
        if (newProfileImage.size > MAX_PROFILE_IMAGE_SIZE) {
            setTooLarge(true);
            return;
        }
        setImage(newProfileImage);
        setTooLarge(false);
        handleUpload(newProfileImage);
    };

    return (
        // <Container className="image-uploader">
        //     <button type="button" className="profile-img-upload-button" onClick={() => profileImageRef.current.click()}>
        //         <img className="profile-img" src={profileImageURL} alt="profile-image" />
        //     </button>
        //     <input
        //         type="file"
        //         name="profile-image"
        //         id="profile-image"
        //         accept="image/*"
        //         ref={profileImageRef}
        //         hidden
        //         onChange={displayNewProfileImage}
        //     />
        //     {tooLarge && <span className="error-message">File size too large, please upload an image less than 3MB.</span>}
        // </Container>

        <>
            <input
                type="file"
                name="profile-image"
                id="profile-image"
                accept="image/*"
                ref={profileImageRef}
                hidden
                onChange={displayNewProfileImage}
            />
            <Container className="img-container" onClick={() => profileImageRef.current.click()}>
                <img className="profile-img" src={profileImageURL} alt="profile-image" />
                <img className="overlay" src={UploadIcon}/>
            </Container>
        </>
    );
}

export default ImageUploader;