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
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <a href="#home" className="logo">
                    &lt;Aabid /&gt;
                </a>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2.5rem' }}>
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href}>
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <a href="#contact" className="soft-btn primary desktop-menu" style={{
                    padding: '10px 24px',
                    fontSize: '0.9rem'
                }}>
                    Let's Talk
                </a>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" onClick={toggleMenu} style={{
                    display: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: 'var(--text-main)',
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)'
                }}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-menu" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                padding: '1.5rem',
                display: isOpen ? 'flex' : 'none',
                flexDirection: 'column',
                gap: '0.5rem',
                alignItems: 'center'
            }}>
                {navLinks.map((link) => (
                    <a key={link.name} href={link.href} onClick={toggleMenu}>
                        {link.name}
                    </a>
                ))}
                <a href="#contact" className="soft-btn primary" onClick={toggleMenu} style={{
                    marginTop: '1rem',
                    width: '100%',
                    maxWidth: '200px'
                }}>
                    Let's Talk
                </a>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
