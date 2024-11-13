import React, { useState, useRef, useEffect } from 'react';
import DefaultProfileImage from '/default-snake-profile-image.png';
import UploadIcon from '/profile-img-upload-button.png';
import '../styles/ImageUploader.css';

const MAX_PROFILE_IMAGE_SIZE = 3 * 1024 * 1024;

function ImageUploader({ userEmail }) {
    const [profileImageURL, setProfileImageURL] = useState(DefaultProfileImage);
    const [tooLarge, setTooLarge] = useState(false);

    const profileImageRef = useRef(null);

    useEffect(() => {
        fetchProfileImage();
    }, []);

    const handleUpload = (e) => {
        e.preventDefault();
        profileImageRef.current.click();
    };


    const fetchProfileImage = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/get-profile-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: userEmail }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch profile image');
            }
    
            const data = await response.json();
            console.log('Data received from server:', data); // Debugging
    
            const { mimetype, data: base64Data } = data.profileImage;
            console.log('MIME type:', mimetype); // Debugging
            console.log('Base64 data:', base64Data); // Debugging
    
            // Create a data URL from the Base64 string
            const imgURL = `data:${mimetype};base64,${base64Data}`;
            setProfileImageURL(imgURL);
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
    };

    const displayNewProfileImage = () => {
        const newProfileImage = profileImageRef.current.files[0];
        if (newProfileImage.size > MAX_PROFILE_IMAGE_SIZE) {
            setTooLarge(true);
            return;
        }
        const bufferedURL = URL.createObjectURL(newProfileImage);
        setProfileImageURL(bufferedURL);
        setTooLarge(false);

        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = reader.result.split(',')[1]; // Extract Base64 data
            try {
                const response = await fetch('http://localhost:5001/api/users/upload-profile-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userEmail: userEmail,
                        mimeType: newProfileImage.type,
                        buffer: base64,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to upload profile image');
                }
                console.log('Profile image uploaded successfully to database');
                fetchProfileImage(); // Fetch the updated profile image
            } catch (error) {
                console.error('Error uploading profile image:', error);
            }
        };
        reader.readAsDataURL(newProfileImage); // Read the file as a data URL
    };

    return (
        <div className="image-uploader">
            <button type="button" className="profile-img-upload-button" onClick={handleUpload}>
                <img className="profile-img" src={profileImageURL} alt="profile-image" />
                <img src={UploadIcon} alt="upload-icon" className="image-upload" />
            </button>
            <input
                type="file"
                name="profile-image"
                id="profile-image"
                accept="image/*"
                ref={profileImageRef}
                hidden
                onChange={displayNewProfileImage}
            />
            {tooLarge && <span className="error-message">File size too large, please upload an image less than 3MB.</span>}
        </div>
    );
}

export default ImageUploader;