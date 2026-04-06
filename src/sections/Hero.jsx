import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import ThreeScene from '../components/ThreeScene';

const Hero = () => {
    const roles = ['Full Stack Developer', 'App Developer', 'UI/UX Enthusiast', 'Problem Solver'];
    const [currentRole, setCurrentRole] = useState(0);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section id="home" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '100%',
            gap: '2rem',
            flexWrap: 'nowrap',
            padding: '40px 60px',
            overflow: 'visible',
            fontFamily: 'var(--font-code)'
        }}>
            {/* Background Decoration */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '-10%',
                width: '40vw',
                height: '40vw',
                background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                filter: 'blur(100px)',
                opacity: 0.3,
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    flex: '1 1 400px',
                    zIndex: 2,
                    y: y1,
                    opacity: opacity,
                    paddingTop: '20px'
                }}
            >
                {/* Status Badge */}
                <motion.div 
                    variants={itemVariants}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 20px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50px',
                        marginBottom: '2rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                >
                    <span style={{
                        width: '10px',
                        height: '10px',
                        background: 'var(--accent)',
                        boxShadow: `0 0 15px var(--accent)`,
                        borderRadius: '50%',
                        position: 'relative'
                    }}>
                        <motion.span 
                            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'var(--accent)',
                                borderRadius: '50%'
                            }}
                        />
                    </span>
                    <span style={{ 
                        fontSize: '0.85rem', 
                        color: 'var(--text-main)',
                        fontWeight: '600',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                    }}>
                        Ready to launch new systems
                    </span>
                </motion.div>

                <motion.h3 variants={itemVariants} style={{ 
                    fontSize: '1.2rem', 
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '4px',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase'
                }}>
                    Hello, I'm
                </motion.h3>

                <motion.h1 variants={itemVariants} style={{ 
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    lineHeight: '1.1',
                    marginBottom: '1rem',
                    fontWeight: '800',
                    color: '#ffffff'
                }}>
                    Aabid Hussain <br />
                    <span className="text-glow" style={{ color: 'var(--secondary)' }}>Shaikh</span>
                </motion.h1>

                <motion.div variants={itemVariants} style={{ height: '3rem' }}>
                    <AnimatePresence mode="wait">
                        <motion.h2 
                            key={currentRole}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            style={{
                                fontSize: '1.8rem',
                                color: 'var(--text-secondary)',
                                fontWeight: '400',
                                fontFamily: 'var(--font-display)'
                            }}
                        >
                            {roles[currentRole]}
                        </motion.h2>
                    </AnimatePresence>
                </motion.div>
                
                <motion.p variants={itemVariants} style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '500px',
                    lineHeight: '1.8',
                    marginTop: '1.5rem',
                    paddingLeft: '1.5rem',
                    borderLeft: '2px solid var(--primary)',
                    background: 'linear-gradient(90deg, var(--bg-glass), transparent)'
                }}>
                    Engineering high‑performance digital architectures. 
                    I bridge the gap between design and technology with precise, scalable source code.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        marginTop: '3rem',
                        flexWrap: 'wrap'
                    }}
                >
                    <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`${import.meta.env.BASE_URL}Aabid-Hussain-Shaikh-Resume.pdf`} 
                        download 
                        className="soft-btn primary"
                        style={{
                            padding: '16px 32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '1rem'
                        }}
                    >
                        Download CV <FaDownload />
                    </motion.a>
                    <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#contact" 
                        className="soft-btn"
                        style={{
                            padding: '16px 32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '1rem',
                            border: '1px solid var(--glass-border)'
                        }}
                    >
                        Contact Me <FaArrowRight />
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* 3D Scene Wrapper */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="hero-image" 
                style={{
                    flex: '1.2 1 400px',
                    minWidth: '450px',
                    height: '550px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'visible'
                }}
            >
                {/* Glow behind 3D */}
                <div style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    background: 'var(--secondary-glow)',
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                    zIndex: 0
                }} />
                <div key="three-wrapper" style={{ width: '100%', height: '100%' }}>
                    <ThreeScene />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
