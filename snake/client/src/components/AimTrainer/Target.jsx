import React, { useEffect, useState } from 'react'

function Target({ x, y, onRemove, onClick, onMiss, size }) {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const fadeOut = setInterval(() => {
            setOpacity(prev => {
                if (prev <= 0) {
                    clearInterval(fadeOut);
                    setTimeout(() => {
                        onRemove();
                        onMiss();
                    }, 0);
                    return 0;
                }
                return prev - 0.01;
            });
        }, 20);

        return () => clearInterval(fadeOut);
    }, [onRemove, onMiss]);

    const handleClick = () => {
        onClick();
        setOpacity(0);
    };

    const style = {
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'var(--accent-color)',
        borderRadius: '50%',
        opacity: opacity,
        pointerEvents: opacity === 0 ? 'none' : 'auto'
    };

    return (
        <div style={style} onClick={handleClick}></div>
    )
}

export default Target