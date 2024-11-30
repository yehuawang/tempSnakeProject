import React, {useEffect, useState} from 'react'
import Target from './Target'
import '../../styles/AimTrainer.css'

function AimTrainerGamePlay({ userEmail, score, setScore, level, targetCount, heartCount, setHeartCount, setGameEnded, setTotalClicks, setAccuracy }) {
    const [targets, setTargets] = useState([]);
    const padding = 5; 

    useEffect(() => {
        if (heartCount === 0) {
            setGameEnded(true);
        }
    },[heartCount])

    useEffect(() => {
        const spawnTarget = () => {
            if (targets.length < targetCount) {
                const id = Date.now() + Math.random(); 
                const newTarget = {
                    id: id,
                    x: Math.random() * (100 - 2 * padding) + padding,
                    y: Math.random() * (100 - 2 * padding) + padding,
                    onRemove: () => handleRemoveTarget(id)
                };
                setTargets(prevTargets => [...prevTargets, newTarget]);
            }
        };

        const interval = setInterval(spawnTarget, Math.max(1000 / level - score * 10, 100));
        return () => clearInterval(interval);
    }, [level, targetCount, targets, score]);

    const handleRemoveTarget = (id) => {
        setTargets(prevTargets => prevTargets.filter(target => target.id !== id));
    };

    const handleClickTarget = (id) => {
        setScore(prevScore => prevScore + 1);
        setTotalClicks(prevTotalClicks => {
            const newTotalClicks = prevTotalClicks + 1;
            const newAccuracy = ((score + 1) / newTotalClicks) * 200;
            setAccuracy(newAccuracy);
            return newTotalClicks;
        });
        handleRemoveTarget(id);
    };

    const handleMissTarget = () => {
        setHeartCount(prevHeartCount => prevHeartCount - 1);
    };

    const targetSize = Math.max(20 - level * 2, 5);

    return (
        <div className="aim-trainer-container" >
            {targets.map(target => (
                <Target key={target.id} x={target.x} y={target.y} onRemove={target.onRemove} onClick={() => handleClickTarget(target.id)} onMiss={handleMissTarget} size={targetSize} />
            ))}
        </div>
    )
}

export default AimTrainerGamePlay