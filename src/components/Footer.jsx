import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaHeart, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/Shaikh-Aabid', label: 'GitHub', color: '#ffffff' },
        { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/aabid-hussain-shaikh/', label: 'LinkedIn', color: '#0077b5' }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{
            padding: '4rem 0 2.5rem',
            background: 'var(--bg-void)',
            position: 'relative',
            borderTop: '1px solid var(--glass-border)'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                {/* Scroll To Top */}
                <motion.button 
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    style={{
                        width: '45px',
                        height: '45px',
                        background: 'var(--bg-glass)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50%',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 3rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                    aria-label="Scroll to top"
                >
                    <FaChevronUp />
                </motion.button>

                {/* Logo */}
                <motion.a 
                    href="#home" 
                    whileHover={{ scale: 1.1 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: 'var(--text-main)',
                        display: 'inline-block',
                        marginBottom: '2rem',
                        textDecoration: 'none',
                        letterSpacing: '2px'
                    }}
                >
                    &lt;<span style={{ color: 'var(--primary)' }}>Aabid</span> /&gt;
                </motion.a>

                {/* Social Links */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    marginBottom: '2.5rem'
                }}>
                    {socialLinks.map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            whileHover={{ 
                                y: -5,
                                color: social.color,
                                boxShadow: `0 0 20px ${social.color}40`
                            }}
                            style={{
                                width: '50px',
                                height: '50px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-secondary)',
                                fontSize: '1.25rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </div>

                {/* Copyright */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        letterSpacing: '0.5px'
                    }}>
                        © {currentYear} Aabid Hussain Shaikh. All Rights Reserved.
                    </p>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                    }}>
                        Built with passion & precision <FaHeart style={{ color: 'var(--secondary)', fontSize: '0.7rem' }} />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
