import React, { useState } from 'react';
import "../../styles/GameList.css";
import "../../styles/Survey.css";

const Survey = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        feedback: "",
        game: "",
        rating: 5,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Survey Submitted:", formData);
        alert("Thank you for your feedback!");
        setFormData({ name: "", email: "", feedback: "", game: "", rating: 5 });
    };

    return (
        <div className="survey-container">
            <div className="survey-content">
                <h2>We Value Your Feedback!</h2>
                <p className="survey-description">
                    Let us know what you think about our game. Your feedback helps us improve!
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name  : </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email    : </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="game">Game  : </label>
                        <select
                            id="game"
                            name="game"
                            value={formData.game}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Choose a game
                            </option>
                            <option value="snake">Snake</option>
                            <option value="reaction">Reaction</option>
                            <option value="memory">Memory</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="feedback">My feedback for this game:</label>
                        <input
                            type="text"
                            id="feedback"
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            placeholder="Write your feedback here..."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rate Our Game (slide the blue dot):</label>
                        <div className="range-slider">
                            <input
                                type="range"
                                id="rating"
                                name="rating"
                                min="1"
                                max="10"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                            <span className="slider-value">{formData.rating}/10</span>
                        </div>
                    </div>
                    <button type="submit" className="survey-button">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Survey;
