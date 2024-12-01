import React, {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'





function CreateArbitraryUserAndGameData() {
    const [createNewArbitraryUser, setCreateNewArbitraryUser] = useState(false)
    const [modifyScore, setModifyScore] = useState(false)

    const generateNormalDistribution = (mean, stdDev) => {
        let u1 = Math.random();
        let u2 = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z * stdDev + mean;
    };

    const createArbitraryUser = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:5001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            const data = await response.json();
            console.log("User created successfully", data);
        } catch (error) {
            console.log(error);
        }
    }

    const addArbitraryUserSnakeScore = async (email, score) => {
        try {
            const response = await fetch('http://localhost:5001/api/games/updateUserScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: 'M-1', // modify this to be the game id you want to change score! If you are just adding arbitrary scores, modify this one only
                    userEmail: email,
                    userScore: score
                })
            });
            const data = await response.json();
            console.log("user aim trainer score updated successfully", data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const getAllUserEmails = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/getUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const userEmails = data.data.map(user => user.email);
            return userEmails;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    useEffect(() => {

        if (createNewArbitraryUser) {
            const randomName = faker.person.firstName();
            const randomEmail = randomName + '@fakeemail.com';
            const randomPassword = nanoid(16);
            const randomSnakeScore = Math.abs(Math.round(generateNormalDistribution(60, 35)));

            createArbitraryUser(randomName, randomEmail, randomPassword);
            addArbitraryUserSnakeScore(randomEmail, randomSnakeScore);
            setCreateNewArbitraryUser(false);
        }
    },[createNewArbitraryUser])


    const modifyUserScore = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/games/modifyUserScore', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 'M-1', // modify this to be the game id you want to update score!
                })
            });
            const data = await response.json();
            console.log("user aim trainer score updated successfully", data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        if (modifyScore) {
            modifyUserScore();
            setModifyScore(false);
        }
    }, [modifyScore])


    const createArbitraryUserAndGameData1000Times = async () => {
        for (let i = 0; i < 1000; i++) {
            const randomName = faker.person.firstName();
            const randomEmail = randomName + '@fakeemail.com';
            const randomPassword = nanoid(16);
            const randomSnakeScore = Math.abs(Math.round(generateNormalDistribution(200, 15)));

            await createArbitraryUser(randomName, randomEmail, randomPassword);
            await addArbitraryUserSnakeScore(randomEmail, randomSnakeScore);
        }
    }

    const addScoreForAllUsersOnGame = async () => { // to use this method, be sure to change the "R-2" to the game id you want to add scores to in addArbitraryUserSnakeScore method, also modify the generateNormalDistribution mean and stdDev to what suits the game.
        const userEmailsArr = await getAllUserEmails();
        userEmailsArr.forEach(async email => {
            const randomSnakeScore = Math.abs(Math.round(generateNormalDistribution(100, 20)));
            await addArbitraryUserSnakeScore(email, randomSnakeScore);
        })
    }

    return (
        <div>
            {/* <button onClick={() => setCreateNewArbitraryUser(true)}>Create Arbitrary User</button> */}
            {/* <button onClick={createArbitraryUserAndGameData1000Times}>Create 1000 Arbitrary Users</button> */}
            <button onClick={addScoreForAllUsersOnGame}>Add Score for All Users</button>
            {/* <button onClick={() => setModifyScore(true)}>Modify User Score</button> */}
        </div>
    )
}

export default CreateArbitraryUserAndGameData