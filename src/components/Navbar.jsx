import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <a href="#home" className="logo">
                    <span>{'<Aabid />'}</span>
                </a>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ 
                    display: 'flex', 
                    gap: '2rem',
                    alignItems: 'center'
                }}>
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href}>
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className="soft-btn primary" style={{
                        padding: '10px 20px',
                        fontSize: '0.85rem',
                        marginLeft: '0.5rem'
                    }}>
                        Let's Talk
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" onClick={toggleMenu} style={{
                    display: 'none',
                    cursor: 'pointer',
                    fontSize: '1.3rem',
                    color: 'var(--text-main)',
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)'
                }}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '0',
                    right: '0',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    background: 'rgba(10, 1, 24, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={toggleMenu}
                            style={{
                                padding: '12px 16px',
                                borderRadius: '8px',
                                transition: 'background 0.2s ease'
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a 
                        href="#contact" 
                        className="soft-btn primary" 
                        onClick={toggleMenu} 
                        style={{
                            marginTop: '0.5rem',
                            textAlign: 'center'
                        }}
                    >
                        Let's Talk
                    </a>
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
