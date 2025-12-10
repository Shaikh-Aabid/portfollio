import React, { useState, useEffect } from 'react';

const IntroAnimation = ({ onComplete }) => {
    const [typedCode, setTypedCode] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isEnterPressed, setIsEnterPressed] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const codeLines = [
        'const developer = {',
        '  name: "Aabid Hussain Shaikh",',
        '  role: "Full Stack Developer",',
        '  skills: ["React", "Node.js", "MongoDB"],',
        '  passion: "Building amazing experiences"',
        '};',
        '',
        'developer.loadPortfolio();'
    ];

    const fullCode = codeLines.join('\n');

    useEffect(() => {
        let index = 0;
        const typingSpeed = 50;

        const typeInterval = setInterval(() => {
            if (index < fullCode.length) {
                setTypedCode(fullCode.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typeInterval);
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    const handleEnter = () => {
        if (typedCode.length >= fullCode.length * 0.8) {
            setIsEnterPressed(true);
            setTimeout(() => {
                setIsExiting(true);
                setTimeout(onComplete, 800);
            }, 500);
        }
    };

    useEffect(() => {
        if (typedCode === fullCode) {
            const autoEnter = setTimeout(handleEnter, 1500);
            return () => clearTimeout(autoEnter);
        }
    }, [typedCode, fullCode]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            opacity: isExiting ? 0 : 1,
            transform: isExiting ? 'scale(30)' : 'scale(1)',
            filter: isExiting ? 'blur(10px)' : 'blur(0)',
            transition: 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.8s cubic-bezier(0.7, 0, 0.3, 1), filter 0.8s ease'
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute',
                width: 'min(500px, 90vw)',
                height: 'min(500px, 90vw)',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(124, 58, 237, 0.1) 40%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
            }} />

            {/* Laptop */}
            <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'float 6s ease-in-out infinite'
            }}>
                {/* Screen */}
                <div style={{
                    width: 'min(380px, 85vw)',
                    height: 'min(240px, 50vw)',
                    background: 'linear-gradient(180deg, #1e1e2e, #2d2d44)',
                    borderRadius: '16px 16px 0 0',
                    border: '4px solid #3d3d5c',
                    padding: 'min(15px, 3vw)',
                    boxShadow: isEnterPressed
                        ? '0 0 100px rgba(0, 212, 255, 0.6), 0 0 150px rgba(124, 58, 237, 0.4)'
                        : '0 20px 60px rgba(0, 0, 0, 0.5)',
                    transition: 'box-shadow 0.5s ease'
                }}>
                    {/* Screen content */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#0d1117',
                        borderRadius: '8px',
                        padding: 'min(15px, 2.5vw)',
                        fontFamily: '"Fira Code", "SF Mono", "Consolas", monospace',
                        fontSize: 'clamp(8px, 2.5vw, 12px)',
                        lineHeight: '1.6',
                        overflow: 'hidden'
                    }}>
                        {/* Window controls */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '15px',
                            paddingBottom: '10px',
                            borderBottom: '1px solid #21262d'
                        }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }} />
                            <span style={{ marginLeft: '15px', color: '#8b949e', fontSize: '11px' }}>portfolio.js — VS Code</span>
                        </div>

                        {/* Code */}
                        <pre style={{
                            margin: 0,
                            color: '#e6e6e6',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all'
                        }}>
                            <code>
                                {typedCode.split('\n').map((line, i) => (
                                    <div key={i} style={{ minHeight: '18px' }}>
                                        {line.includes('const') && <><span style={{ color: '#ff79c6' }}>const </span><span style={{ color: '#50fa7b' }}>{line.replace('const ', '')}</span></>}
                                        {line.includes('name:') && <span><span style={{ color: '#8be9fd' }}>  name</span>: <span style={{ color: '#f1fa8c' }}>"{line.split('"')[1]}"</span>,</span>}
                                        {line.includes('role:') && <span><span style={{ color: '#8be9fd' }}>  role</span>: <span style={{ color: '#f1fa8c' }}>"{line.split('"')[1]}"</span>,</span>}
                                        {line.includes('skills:') && <span><span style={{ color: '#8be9fd' }}>  skills</span>: [<span style={{ color: '#f1fa8c' }}>"React", "Node.js", "MongoDB"</span>],</span>}
                                        {line.includes('passion:') && <span><span style={{ color: '#8be9fd' }}>  passion</span>: <span style={{ color: '#f1fa8c' }}>"{line.split('"')[1]}"</span></span>}
                                        {line === '};' && <span style={{ color: '#50fa7b' }}>{'};'}</span>}
                                        {line === '' && <br />}
                                        {line.includes('loadPortfolio') && <span style={{ color: '#bd93f9' }}>{line}</span>}
                                    </div>
                                ))}
                                {showCursor && <span style={{
                                    background: '#00d4ff',
                                    color: '#0d1117',
                                    padding: '0 2px'
                                }}>|</span>}
                            </code>
                        </pre>
                    </div>
                </div>

                {/* Laptop base */}
                <div style={{
                    width: 'min(420px, 95vw)',
                    height: '18px',
                    background: 'linear-gradient(180deg, #4d4d6d 0%, #3d3d5c 50%, #2d2d44 100%)',
                    borderRadius: '0 0 8px 8px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
                }}>
                    {/* Trackpad notch */}
                    <div style={{
                        width: '80px',
                        height: '4px',
                        background: '#5d5d7d',
                        borderRadius: '2px',
                        margin: '0 auto',
                        marginTop: '7px'
                    }} />
                </div>
            </div>

            {/* Enter button */}
            <button
                onClick={handleEnter}
                disabled={typedCode.length < fullCode.length * 0.5}
                style={{
                    marginTop: '2rem',
                    padding: 'min(18px, 3vw) min(60px, 10vw)',
                    fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
                    fontWeight: '600',
                    fontFamily: 'inherit',
                    background: typedCode.length >= fullCode.length * 0.8
                        ? 'linear-gradient(135deg, #00d4ff, #7c3aed)'
                        : 'rgba(255,255,255,0.08)',
                    color: typedCode.length >= fullCode.length * 0.8 ? '#0a0a0f' : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: typedCode.length >= fullCode.length * 0.8 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    transform: isEnterPressed ? 'scale(0.95)' : 'scale(1)',
                    boxShadow: typedCode.length >= fullCode.length * 0.8
                        ? '0 0 50px rgba(0, 212, 255, 0.5)'
                        : 'none'
                }}
            >
                {isEnterPressed ? '🚀 Launching...' : '⏎ Execute Code'}
            </button>

            {/* Skip button */}
            <button
                onClick={() => {
                    setIsExiting(true);
                    setTimeout(onComplete, 500);
                }}
                style={{
                    marginTop: '1.5rem',
                    padding: '10px 28px',
                    fontSize: '0.9rem',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                }}
                onMouseEnter={e => {
                    e.target.style.color = 'rgba(255,255,255,0.8)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={e => {
                    e.target.style.color = 'rgba(255,255,255,0.4)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
            >
                Skip Intro →
            </button>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotateX(2deg); }
                    50% { transform: translateY(-15px) rotateX(-2deg); }
                }
            `}</style>
        </div>
    );
};

export default IntroAnimation;
