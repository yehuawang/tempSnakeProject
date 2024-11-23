import React, {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'





function CreateArbitraryUserAndGameData() {
    const [createNewArbitraryUser, setCreateNewArbitraryUser] = useState(false)
    const [modifyScore, setModifyScore] = useState(false)
    const randomName = faker.person.firstName()
    const randomEmail = randomName + '@email.com'
    const randomPassword = nanoid(16);


    const generateNormalDistribution = (mean, stdDev) => {
        let u1 = Math.random();
        let u2 = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return z * stdDev + mean;
    };

    const randomSnakeScore = Math.abs(Math.round(generateNormalDistribution(15, 10)));

    useEffect(() => {
        const createArbitraryUser = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: randomName,
                        email: randomEmail,
                        password: randomPassword
                    })
                });
                const data = await response.json();
                console.log("User created successfully", data);
            } catch (error) {
                console.log(error);
            }
        }

        const addArbitraryUserSnakeScore = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/games/updateUserScore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        gameId: 'R-1',
                        userEmail: randomEmail,
                        userScore: randomSnakeScore
                    })
                });
                const data = await response.json();
                console.log("user snake score updated successfully", data);
            } catch (error) {
                console.log(error);
            }
        }

        if (createNewArbitraryUser) {
            createArbitraryUser();
            addArbitraryUserSnakeScore();
            setCreateNewArbitraryUser(false);
        }
    },[createNewArbitraryUser])


    useEffect(() => {
        const modifyUserScore = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/games/modifyUserScore', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: 'R-1',
                    })
                });
                const data = await response.json();
                console.log("user snake score updated successfully", data);
            } catch (error) {
                console.log(error);
            }
        }

        if (modifyScore) {
            modifyUserScore();
            setModifyScore(false);
        }
    }, [modifyScore])

    return (
        <div>
            <button onClick={() => setCreateNewArbitraryUser(true)}>Create Arbitrary User</button>
            {/* <button onClick={() => setModifyScore(true)}>Modify User Score</button> */}
        </div>
    )
}

export default CreateArbitraryUserAndGameData