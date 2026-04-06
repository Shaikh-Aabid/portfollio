import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
    const [typedCode, setTypedCode] = useState('');
    const [isEnterPressed, setIsEnterPressed] = useState(false);

    const logLines = useMemo(() => [
        '> INITIALIZING_AURORA_KERNEL_V4.2...',
        '> IDENTITY: AABID HUSSAIN SHAIKH',
        '> ROLE: FULL STACK ARCHITECT',
        '> TECH_STACK: REACT, VUE, LARAVEL, FLUTTER',
        '> LOADING_DASHBOARD_ASSETS [ OK ]',
        '> EXPERIENCE_STABILIZED.',
        '',
        '> SHAIKH_PORTFOLIO_INITIATE()'
    ], []);

    const fullLog = useMemo(() => logLines.join('\n'), [logLines]);

    useEffect(() => {
        let index = 0;
        const typingSpeed = 25;

        const typeInterval = setInterval(() => {
            if (index < fullLog.length) {
                setTypedCode(fullLog.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typeInterval);
                // Auto-launch after typing
                setTimeout(() => setIsEnterPressed(true), 1200);
            }
        }, typingSpeed);

        return () => clearInterval(typeInterval);
    }, [fullLog]);

    useEffect(() => {
        if (isEnterPressed) {
            const timer = setTimeout(onComplete, 1200);
            return () => clearTimeout(timer);
        }
    }, [isEnterPressed, onComplete]);

    const highlightLogs = (text) => {
        return text.split('\n').map((line, i) => {
            let highlighted = line;
            // Highlight Command Prompt >
            highlighted = highlighted.replace(/^>/g, '<span style="color: var(--primary)">></span>');
            // Highlight Labels:
            highlighted = highlighted.replace(/\b(IDENTITY|ROLE|TECH_STACK|STATUS|ASSETS)\b/g, '<span style="color: var(--secondary)">$1</span>');
            // Highlight OK status [ OK ]
            highlighted = highlighted.replace(/\[ OK \]/g, '<span style="color: var(--accent)">[ OK ]</span>');
            // Highlight Success markers
            highlighted = highlighted.replace(/\b(STABILIZED|INITIATE)\b/g, '<span style="color: var(--warning)">$1</span>');
            
            return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />;
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0,
                scale: 1.2,
                filter: "blur(20px)",
                transition: { duration: 1, ease: "easeInOut" }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#030014',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                overflow: 'hidden'
            }}
        >
            {/* Background Glows */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    top: '-10%',
                    right: '-10%',
                    pointerEvents: 'none'
                }}
            />
            <motion.div 
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 7, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    bottom: '-10%',
                    left: '-10%',
                    pointerEvents: 'none'
                }}
            />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    width: 'min(500px, 90vw)',
                    background: 'rgba(10, 1, 24, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    border: '1px solid var(--glass-border)',
                    boxShadow: isEnterPressed 
                        ? '0 0 50px var(--primary-glow), 0 0 100px var(--secondary-glow)'
                        : '0 20px 50px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <div style={{
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid var(--glass-border)',
                    display: 'flex',
                    gap: '8px'
                }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                </div>
                
                <div style={{
                    padding: '24px',
                    fontFamily: 'var(--font-code)',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    minHeight: '220px',
                    color: 'var(--text-main)'
                }}>
                    {highlightLogs(typedCode)}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '1.2em',
                            background: 'var(--primary)',
                            verticalAlign: 'middle',
                            marginLeft: '4px',
                            boxShadow: '0 0 8px var(--primary)'
                        }}
                    />
                </div>

                <AnimatePresence>
                    {isEnterPressed && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                height: '2px',
                                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                zIndex: 10
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isEnterPressed ? 1 : 0 }}
                style={{
                    marginTop: '2rem',
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '2px',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase'
                }}
            >
                Initializing Experience...
            </motion.div>
        </motion.div>
    );
};

export default IntroAnimation;
