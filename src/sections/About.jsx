import React from 'react';
import { FaCode, FaPalette, FaRocket, FaMobile, FaServer } from 'react-icons/fa';

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
                        fontSize: '1.8rem',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
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
                        scalable applications using <strong style={{ color: 'var(--primary)' }}>Vue.js, Nuxt.js, Vuetify</strong> for
                        frontend and <strong style={{ color: 'var(--primary)' }}>Laravel, PHP</strong> for backend development.
                    </p>
                    <p style={{
                        fontSize: '1.05rem',
                        marginBottom: '1.5rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.9'
                    }}>
                        I also develop cross-platform mobile applications using <strong style={{ color: 'var(--primary)' }}>Flutter & Dart</strong>,
                        delivering seamless experiences across iOS and Android.
                    </p>
                    <p style={{
                        fontSize: '1.05rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.9'
                    }}>
                        My expertise extends to database design with <strong style={{ color: 'var(--primary)' }}>MySQL stored procedures</strong>,
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
                            padding: '1.5rem'
                        }}>
                            <div style={{
                                fontSize: '1.8rem',
                                color: 'var(--primary)',
                                padding: '15px',
                                background: 'rgba(0, 212, 255, 0.1)',
                                borderRadius: '16px',
                                marginBottom: '1rem'
                            }}>
                                {item.icon}
                            </div>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                fontFamily: 'var(--font-display)'
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
