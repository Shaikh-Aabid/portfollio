import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleHover = () => setIsHovered(true);
        const handleUnhover = () => setIsHovered(false);

        window.addEventListener('mousemove', moveMouse);
        
        const clickableElements = document.querySelectorAll('a, button, [role="button"]');
        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleUnhover);
        });

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            clickableElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHover);
                el.removeEventListener('mouseleave', handleUnhover);
            });
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* The follow circle */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: 32,
                    height: 32,
                    border: '1.5px solid var(--primary)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    x: cursorX,
                    y: cursorY,
                    scale: isHovered ? 1.5 : 1,
                    opacity: 0.5,
                }}
            />
            {/* The main dot */}
            <div
                style={{
                    position: 'fixed',
                    left: mousePosition.x - 4,
                    top: mousePosition.y - 4,
                    width: 8,
                    height: 8,
                    backgroundColor: 'var(--primary)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10001,
                    transition: 'transform 0.1s ease-out',
                    transform: isHovered ? 'scale(0.5)' : 'scale(1)',
                    boxShadow: '0 0 10px var(--primary-glow)',
                }}
            />
        </>
    );
};

export default Cursor;
