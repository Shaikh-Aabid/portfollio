import React from 'react';
import { FaCode, FaPalette, FaMobile, FaServer } from 'react-icons/fa';

const About = () => {
    const highlights = [
        {
            icon: <FaCode />,
            title: 'Full Stack Development',
            desc: 'Building complete web solutions with Vue.js, Nuxt.js, Laravel & Node.js'
        },
        {
            icon: <FaPalette />,
            title: 'Modern UI Frameworks',
            desc: 'Creating stunning interfaces with Vuetify, React & modern CSS'
        },
        {
            icon: <FaMobile />,
            title: 'Mobile Development',
            desc: 'Cross-platform mobile apps with Flutter & Dart'
        },
        {
            icon: <FaServer />,
            title: 'Backend & Database',
            desc: 'PHP, Laravel, CodeIgniter with MySQL stored procedures'
        }
    ];

    return (
        <section id="about" className="section container">
            <h2 className="section-title">About Me</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                alignItems: 'start'
            }}>
                <div className="soft-card" style={{ padding: '2.5rem' }}>
                    <h3 style={{
                        fontSize: '1.6rem',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '700',
                        background: 'linear-gradient(90deg, #00f3ff 0%, #ff00ff 50%, #00f3ff 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradientFlow 3s linear infinite',
                        filter: 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.3))'
                    }}>
                        Crafting Digital Experiences
                    </h3>
                    <p style={{
                        fontSize: '1.05rem',
                        marginBottom: '1.5rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.9'
                    }}>
                        With over 6 years of experience in full-stack development, I specialize in building
                        scalable applications using <strong style={{ color: 'var(--primary)', textShadow: '0 0 5px var(--primary-glow)' }}>Vue.js, Nuxt.js, Vuetify</strong> for
                        frontend and <strong style={{ color: 'var(--secondary)', textShadow: '0 0 5px var(--secondary-glow)' }}>Laravel, PHP</strong> for backend development.
                    </p>
                    <p style={{
                        fontSize: '1.05rem',
                        marginBottom: '1.5rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.9'
                    }}>
                        I also develop cross-platform mobile applications using <strong style={{ color: '#00ff9d', textShadow: '0 0 5px rgba(0, 255, 157, 0.4)' }}>Flutter & Dart</strong>,
                        delivering seamless experiences across iOS and Android.
                    </p>
                    <p style={{
                        fontSize: '1.05rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.9'
                    }}>
                        My expertise extends to database design with <strong style={{ color: 'var(--accent)', textShadow: '0 0 5px var(--accent-glow)' }}>MySQL stored procedures</strong>,
                        ensuring efficient and optimized data operations for enterprise applications.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem'
                }}>
                    {highlights.map((item, i) => (
                        <div key={i} className="soft-card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '1.5rem',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(5, 5, 10, 0.6)'
                        }}>
                            <div style={{
                                fontSize: '1.8rem',
                                color: 'var(--primary)',
                                padding: '15px',
                                background: 'rgba(0, 243, 255, 0.05)',
                                borderRadius: '4px',
                                marginBottom: '1rem',
                                border: '1px solid rgba(0, 243, 255, 0.2)',
                                boxShadow: '0 0 15px rgba(0, 243, 255, 0.1)'
                            }}>
                                {item.icon}
                            </div>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                fontFamily: 'var(--font-display)',
                                color: 'var(--text-main)'
                            }}>{item.title}</h4>
                            <p style={{
                                fontSize: '0.85rem',
                                color: 'var(--text-muted)',
                                lineHeight: '1.6'
                            }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
