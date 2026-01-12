import React, { useEffect, useState } from 'react';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import ThreeScene from '../components/ThreeScene';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const roles = ['Full Stack Developer', 'App Developer', 'UI/UX Enthusiast', 'Problem Solver'];
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    return (
        <section id="home" className="section container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '100vh',
            gap: '3rem',
            flexWrap: 'wrap',
            paddingTop: '120px'
        }}>
            <div
                className="hero-content"
                style={{
                    flex: '1 1 500px',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '10px 20px',
                    background: 'rgba(110, 231, 183, 0.1)',
                    border: '1px solid rgba(110, 231, 183, 0.25)',
                    borderRadius: '30px',
                    marginBottom: '1.5rem',
                    boxShadow: '0 4px 20px rgba(110, 231, 183, 0.1)'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        background: '#6ee7b7',
                        boxShadow: '0 0 12px #6ee7b7',
                        borderRadius: '50%',
                        animation: 'pulse 2s infinite'
                    }}></span>
                    <span style={{ 
                        fontSize: '0.85rem', 
                        color: '#6ee7b7',
                        fontFamily: 'var(--font-main)',
                        letterSpacing: '0.5px',
                        fontWeight: '500'
                    }}>
                        Available for Work
                    </span>
                </div>

                <h3 style={{ 
                    fontSize: '1rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: '500',
                    color: 'var(--secondary)',
                    marginBottom: '0.5rem',
                    opacity: 0.9
                }}>Hello, I'm</h3>
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    marginBottom: '0.75rem',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #6ee7b7 50%, #c084fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>Aabid Hussain Shaikh</h1>
                <h2 key={currentRole} style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                    fontWeight: '600',
                    background: 'linear-gradient(90deg, #6ee7b7 0%, #38bdf8 50%, #c084fc 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'fadeInUp 0.5s ease-out, gradientFlow 3s linear infinite',
                    marginBottom: '1.5rem'
                }}>
                    {roles[currentRole]}
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8',
                    maxWidth: '500px',
                    borderLeft: '2px solid var(--primary)',
                    paddingLeft: '1rem',
                    background: 'linear-gradient(90deg, rgba(0, 243, 255, 0.05), transparent)'
                }}>
                    I craft accessible, pixel-perfect, and high-performance web experiences.
                    Passionate about building beautiful interfaces with cutting-edge technologies
                    that make a real impact.
                </p>

                <div className="hero-btns" style={{
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '2.5rem',
                    flexWrap: 'wrap'
                }}>
                    <a href={`${import.meta.env.BASE_URL}Aabid-Hussain-Shaikh-Resume.pdf`} download className="soft-btn primary">
                        Download CV <FaDownload style={{ fontSize: '0.9rem' }} />
                    </a>
                    <a href="#contact" className="soft-btn">
                        Contact Me <FaArrowRight style={{ fontSize: '0.85rem' }} />
                    </a>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '3rem',
                    marginTop: '4rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(148, 163, 184, 0.15)'
                }}>
                    <div>
                        <h4 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: 'var(--primary)',
                            textShadow: '0 0 20px var(--primary-glow)'
                        }}>6+</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Experience</p>
                    </div>
                    <div>
                        <h4 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: 'var(--secondary)',
                            textShadow: '0 0 20px var(--secondary-glow)'
                        }}>50+</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Projects Done</p>
                    </div>
                    <div>
                        <h4 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: 'var(--accent)',
                            textShadow: '0 0 20px var(--accent-glow)'
                        }}>20+</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Happy Clients</p>
                    </div>
                </div>
            </div>

            <div className="hero-image" style={{
                flex: '1 1 450px',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
            }}>
                <ThreeScene />
            </div>
        </section>
    );
};

export default Hero;
