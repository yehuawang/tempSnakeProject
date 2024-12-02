import { useEffect, useState } from 'react';

const usePlaySound = (soundSource) => {
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        if (soundSource && soundSource.length > 0) {
            const randomIndex = Math.floor(Math.random() * soundSource.length);
            const selectedSound = soundSource[randomIndex];
            setAudio(new Audio(selectedSound));
        }
    }, [soundSource]);

    const playSound = () => {
        if (audio) {
            audio.play();
        }
    };

    return playSound;
};

export default usePlaySound;