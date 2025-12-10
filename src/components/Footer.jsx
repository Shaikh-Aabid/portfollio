import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/Shaikh-Aabid', label: 'GitHub' },
        { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/aabid-hussain-shaikh/', label: 'LinkedIn' }
    ];

    return (
        <footer>
            <div className="container" style={{ textAlign: 'center' }}>
                {/* Logo */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <a href="#home" style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        &lt;Aabid /&gt;
                    </a>
                </div>

                {/* Social Links */}
                <div className="socials" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    {socialLinks.map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="soft-btn"
                            style={{
                                borderRadius: '50%',
                                padding: '14px',
                                width: '48px',
                                height: '48px'
                            }}
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    © {currentYear} Aabid Hussain Shaikh. Made with
                    <FaHeart style={{ color: 'var(--accent)', fontSize: '0.8rem' }} />
                    using React & Three.js
                </p>
            </div>
        </footer>
    );
};

export default Footer;
