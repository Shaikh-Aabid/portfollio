import React from 'react';
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
    FaGitAlt, FaLaravel, FaPhp, FaVuejs
} from 'react-icons/fa';
import { SiMongodb, SiCodeigniter, SiFlutter, SiDart, SiMysql, SiNuxtdotjs, SiVuetify } from 'react-icons/si';

const Skills = () => {
    const skills = [
        { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26', level: 95 },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6', level: 92 },
        { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E', level: 90 },
        { name: 'Vue.js', icon: <FaVuejs />, color: '#4FC08D', level: 90 },
        { name: 'Nuxt.js', icon: <SiNuxtdotjs />, color: '#00DC82', level: 88 },
        { name: 'Vuetify', icon: <SiVuetify />, color: '#1867C0', level: 85 },
        { name: 'React', icon: <FaReact />, color: '#61DAFB', level: 88 },
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933', level: 85 },
        { name: 'PHP', icon: <FaPhp />, color: '#777BB4', level: 90 },
        { name: 'Laravel', icon: <FaLaravel />, color: '#FF2D20', level: 88 },
        { name: 'CodeIgniter', icon: <SiCodeigniter />, color: '#EF4223', level: 85 },
        { name: 'MySQL & SP', icon: <SiMysql />, color: '#4479A1', level: 88 },
        { name: 'Flutter', icon: <SiFlutter />, color: '#02569B', level: 82 },
        { name: 'Dart', icon: <SiDart />, color: '#0175C2', level: 80 },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', level: 85 },
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032', level: 90 },
    ];

    return (
        <section id="skills" className="section container">
            <h2 className="section-title">Skills & Technologies</h2>
            <p style={{
                textAlign: 'center',
                maxWidth: '600px',
                margin: '-2rem auto 3rem',
                color: 'var(--text-muted)',
                fontSize: '1.05rem'
            }}>
                Technologies I've been working with recently
            </p>

            <div className="skills-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.25rem',
                justifyItems: 'center'
            }}>
                {skills.map((skill) => (
                    <div key={skill.name} className="soft-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        aspectRatio: '1',
                        cursor: 'default',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            fontSize: '2.5rem',
                            color: skill.color,
                            marginBottom: '0.75rem',
                            transition: 'all 0.3s ease'
                        }}>
                            {skill.icon}
                        </div>
                        <h3 style={{
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            marginBottom: '0.5rem',
                            textAlign: 'center'
                        }}>{skill.name}</h3>

                        <div style={{
                            width: '50%',
                            height: '3px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${skill.level}%`,
                                height: '100%',
                                background: `linear-gradient(90deg, ${skill.color}, var(--primary))`,
                                borderRadius: '2px'
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
