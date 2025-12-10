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
                    padding: '8px 16px',
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    borderRadius: '50px',
                    marginBottom: '1.5rem'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        background: '#10b981',
                        borderRadius: '50%',
                        animation: 'pulse 2s infinite'
                    }}></span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Available for work
                    </span>
                </div>

                <h3>Hello, I'm</h3>
                <h1>Aabid Hussain Shaikh</h1>
                <h2 key={currentRole} style={{
                    animation: 'fadeInUp 0.5s ease-out'
                }}>
                    {roles[currentRole]}
                </h2>
                <p>
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
                    <a href="/Aabid-Hussain-Shaikh-Resume.pdf" download className="soft-btn primary">
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
                    borderTop: '1px solid rgba(255,255,255,0.08)'
                }}>
                    <div>
                        <h4 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>6+</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Years Experience</p>
                    </div>
                    <div>
                        <h4 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>50+</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Projects Done</p>
                    </div>
                    <div>
                        <h4 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>20+</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Happy Clients</p>
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
