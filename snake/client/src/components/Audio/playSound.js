import { useEffect } from 'react';

const playSound = (sound) => {
    let audio = new Audio(sound);

    const play = () => {
        audio.play();
    };

    const stop = () => {
        audio.pause();
        audio = null;
    };

    return { play, stop };
};

export default playSound;