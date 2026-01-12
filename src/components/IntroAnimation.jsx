import React, { useState, useEffect, useMemo } from 'react';

const IntroAnimation = ({ onComplete }) => {
    const [typedCode, setTypedCode] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isEnterPressed, setIsEnterPressed] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const codeLines = useMemo(() => [
        'const developer = {',
        '  name: "Aabid Hussain Shaikh",',
        '  role: "Full Stack Developer",',
        '  skills: ["Flutter", "Vue.js", "MySQL"],',
        '  passion: "Building amazing experiences"',
        '};',
        '',
        'developer.loadPortfolio();'
    ], []);

    const fullCode = useMemo(() => codeLines.join('\n'), [codeLines]);

    useEffect(() => {
        let index = 0;
        const typingSpeed = 20;

        const typeInterval = setInterval(() => {
            if (index < fullCode.length) {
                setTypedCode(fullCode.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typeInterval);
    }, [fullCode]);

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
            const triggerEnter = () => {
                if (typedCode.length >= fullCode.length * 0.8) {
                    setIsEnterPressed(true);
                    setTimeout(() => {
                        setIsExiting(true);
                        setTimeout(onComplete, 800);
                    }, 500);
                }
            };
            const autoEnter = setTimeout(triggerEnter, 1500);
            return () => clearTimeout(autoEnter);
        }
    }, [typedCode, fullCode, onComplete]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(circle at 50% 50%, #0a0a0f 0%, #000000 100%)',
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
                background: 'radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, rgba(188, 19, 254, 0.05) 40%, transparent 70%)',
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
                    background: '#050505',
                    borderRadius: '4px 4px 0 0',
                    border: '1px solid rgba(0, 243, 255, 0.3)',
                    padding: 'min(15px, 3vw)',
                    boxShadow: isEnterPressed
                        ? '0 0 100px rgba(0, 243, 255, 0.4), 0 0 150px rgba(255, 0, 255, 0.2)'
                        : '0 20px 60px rgba(0, 0, 0, 0.8)',
                    transition: 'box-shadow 0.5s ease'
                }}>
                    {/* Screen content */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#000',
                        borderRadius: '2px',
                        padding: 'min(15px, 2.5vw)',
                        fontFamily: '"Fira Code", "SF Mono", "Consolas", monospace',
                        fontSize: 'clamp(8px, 2.5vw, 12px)',
                        lineHeight: '1.6',
                        overflow: 'hidden',
                        border: '1px solid #1a1a1a'
                    }}>
                        {/* Window controls */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '15px',
                            paddingBottom: '10px',
                            borderBottom: '1px solid #1a1a1a'
                        }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff0055' }} />
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffea00' }} />
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff9d' }} />
                            <span style={{ marginLeft: '15px', color: '#56697a', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>SYSTEM.INIT</span>
                        </div>

                        {/* Code */}
                        <pre style={{
                            margin: 0,
                            color: '#e0faff',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                            textShadow: '0 0 5px rgba(0, 243, 255, 0.3)'
                        }}>
                            <code>
                                {typedCode.split('\n').map((line, i) => (
                                    <div key={i} style={{ minHeight: '18px' }}>
                                        {line.includes('const') && <><span style={{ color: '#ff00ff' }}>const </span><span style={{ color: '#00f3ff' }}>{line.replace('const ', '')}</span></>}
                                        {line.includes('name:') && <span><span style={{ color: '#bc13fe' }}>  name</span>: <span style={{ color: '#ffea00' }}>"{line.split('"')[1]}"</span>,</span>}
                                        {line.includes('role:') && <span><span style={{ color: '#bc13fe' }}>  role</span>: <span style={{ color: '#ffea00' }}>"{line.split('"')[1]}"</span>,</span>}
                                        {line.includes('skills:') && <span><span style={{ color: '#bc13fe' }}>  skills</span>: [<span style={{ color: '#00ff9d' }}>"Flutter", "Vue.js", "MySQL"</span>],</span>}
                                        {line.includes('passion:') && <span><span style={{ color: '#bc13fe' }}>  passion</span>: <span style={{ color: '#ffea00' }}>"{line.split('"')[1]}"</span></span>}
                                        {line === '};' && <span style={{ color: '#00f3ff' }}>{'};'}</span>}
                                        {line === '' && <br />}
                                        {line.includes('loadPortfolio') && <span style={{ color: '#ff00ff' }}>{line}</span>}
                                    </div>
                                ))}
                                {showCursor && <span style={{
                                    background: '#00f3ff',
                                    color: '#000',
                                    padding: '0 2px',
                                    boxShadow: '0 0 10px #00f3ff'
                                }}>|</span>}
                            </code>
                        </pre>
                    </div>
                </div>

                {/* Laptop base */}
                <div style={{
                    width: 'min(420px, 95vw)',
                    height: '12px',
                    background: '#1a1a1a',
                    borderRadius: '0 0 4px 4px',
                    boxShadow: '0 0 20px rgba(0, 243, 255, 0.1)',
                    border: '1px solid #333',
                    borderTop: 'none'
                }}>
                    {/* Trackpad notch */}
                    <div style={{
                        width: '80px',
                        height: '2px',
                        background: '#00f3ff',
                        borderRadius: '2px',
                        margin: '0 auto',
                        marginTop: '0px',
                        boxShadow: '0 0 10px #00f3ff'
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
                    fontFamily: '"Space Grotesk", sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    background: typedCode.length >= fullCode.length * 0.8
                        ? 'rgba(0, 243, 255, 0.1)'
                        : 'rgba(255,255,255,0.02)',
                    color: typedCode.length >= fullCode.length * 0.8 ? '#00f3ff' : 'rgba(255,255,255,0.2)',
                    border: typedCode.length >= fullCode.length * 0.8 ? '1px solid #00f3ff' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    cursor: typedCode.length >= fullCode.length * 0.8 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    transform: isEnterPressed ? 'scale(0.95)' : 'scale(1)',
                    boxShadow: typedCode.length >= fullCode.length * 0.8
                        ? '0 0 20px rgba(0, 243, 255, 0.2)'
                        : 'none'
                }}
            >
                {isEnterPressed ? '⚡ INITIALIZING...' : '> ENTER SYSTEM'}
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
