import React  from 'react';
import "../styles/AboutUs.css"
import LogGame from '../components/ForDeveloperUserOnly/LogGame';
import CreateArbitraryUserAndGameData from '../components/ForDeveloperUserOnly/CreateArbitraryUserAndGameData';
import MovingSnake from '../components/Snake/MovingSnake';

function AboutUs() {


    return (
        <div className="page-element-div aboutus-container">
            <h1>About Us</h1>
            <p>
                Welcome to <strong>Snake</strong>, a platform dedicated to enhancing your brainpower and cognitive skills
                through interactive and engaging games. Our mission is to make learning and mental exercise fun, while
                challenging you to think faster, smarter, and more creatively.
            </p>
            <p>
                Why "Snake"? Snakes are remarkable creatures known for their intelligence, quick reflexes, and adaptability.
                Many species demonstrate problem-solving abilities and are capable of learning from their experiences.
            </p>
            <p>
                Just like snakes that navigate complex environments with precision, our games are designed to challenge your
                mind to be agile and efficient. Whether it's enhancing memory, improving focus, or boosting logical reasoning,
                <strong> Snake</strong> is your partner in unlocking mental potential.
            </p>

            <MovingSnake />
            {/* Developer use to add new games into database in a simple way... DO NOT CLICK THE BUTTON UNLESS YOU KNOW WHAT YOU ARE DOING*/}
            {/* <LogGame /> */}
            <CreateArbitraryUserAndGameData />
        </div>
    );
}

export default AboutUs;