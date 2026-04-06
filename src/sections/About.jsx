import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaMobile, FaServer, FaTerminal, FaRocket, FaCheck } from 'react-icons/fa';

const About = () => {
    const highlights = [
        {
            icon: <FaCode />,
            title: 'Full Stack Architect',
            desc: 'Building end-to-end architectures with Vue, Laravel & Node.js',
            color: 'var(--primary)'
        },
        {
            icon: <FaPalette />,
            title: 'UI/UX Engineering',
            desc: 'Designing pixel-perfect, high-performance web experiences',
            color: 'var(--secondary)'
        },
        {
            icon: <FaMobile />,
            title: 'Mobile Systems',
            desc: 'Developing seamless cross-platform apps with Flutter',
            color: 'var(--accent)'
        },
        {
            icon: <FaServer />,
            title: 'Scalable Backend',
            desc: 'Optimizing databases and distributed API infrastructures',
            color: 'var(--purple)'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="about" style={{
            padding: '60px 40px',
            fontFamily: 'var(--font-code)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#ffffff' }}>
                    About <span className="text-glow" style={{ color: 'var(--primary)' }}>Aabid</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Architecture & Experience Design
                </p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {/* Bio Section */}
                <motion.div variants={cardVariants}>
                    <div style={{
                        background: 'var(--bg-glass)',
                        backdropFilter: 'blur(12px)',
                        padding: '3rem',
                        borderRadius: '24px',
                        border: '1px solid var(--glass-border)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <FaTerminal style={{
                            position: 'absolute',
                            right: '-20px',
                            bottom: '-20px',
                            fontSize: '12rem',
                            color: 'white',
                            opacity: 0.03,
                            pointerEvents: 'none'
                        }} />

                        <h3 style={{
                            fontSize: '1.8rem',
                            marginBottom: '1.5rem',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '700',
                            color: 'var(--primary)',
                            letterSpacing: '1px'
                        }}>
                            The Digital Architect
                        </h3>
                        
                        <p style={{
                            fontSize: '1.05rem',
                            marginBottom: '1.25rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.8'
                        }}>
                            Expertise across <span style={{ color: 'var(--primary)', fontWeight: '600' }}>6+ years</span> of professional engineering. 
                            I bridge the gap between complex logic and stunning aesthetics. 
                        </p>
                        
                        <p style={{
                            fontSize: '1.05rem',
                            marginBottom: '1.25rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.8'
                        }}>
                            Committed to <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>intuitive performance</span>. 
                            From web horizons to mobile systems, I build with high‑level precision.
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginTop: '2rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid var(--glass-border)'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#030014',
                                fontSize: '1.2rem'
                            }}>
                                <FaRocket />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>Always Launching</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Continuous technical innovation</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Highlights Grid */}
                <motion.div 
                    variants={containerVariants}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.5rem'
                    }}
                >
                    {highlights.map((item, i) => (
                        <motion.div 
                            key={i} 
                            variants={cardVariants}
                            whileHover={{ 
                                y: -10,
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderColor: item.color + '40'
                            }}
                            style={{
                                background: 'var(--bg-glass)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '20px',
                                border: '1px solid var(--glass-border)',
                                padding: '2rem 1.5rem',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                fontSize: '2rem',
                                color: item.color,
                                marginBottom: '1rem',
                                display: 'inline-block',
                                padding: '15px',
                                background: `${item.color}10`,
                                borderRadius: '16px'
                            }}>
                                {item.icon}
                            </div>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '700',
                                marginBottom: '0.5rem',
                                color: 'var(--text-main)'
                            }}>{item.title}</h4>
                            <p style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                lineHeight: '1.5'
                            }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
