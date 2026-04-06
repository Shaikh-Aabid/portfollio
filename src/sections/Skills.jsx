import React from 'react';
import { motion } from 'framer-motion';
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
    FaGitAlt, FaLaravel, FaPhp, FaVuejs
} from 'react-icons/fa';
import { SiMongodb, SiCodeigniter, SiFlutter, SiDart, SiMysql, SiNuxtdotjs, SiVuetify } from 'react-icons/si';

const Skills = () => {
    const skills = [
        { name: 'Vue.js', icon: <FaVuejs />, color: '#4FC08D' },
        { name: 'Nuxt.js', icon: <SiNuxtdotjs />, color: '#00DC82' },
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
        { name: 'Flutter', icon: <SiFlutter />, color: '#02569B' },
        { name: 'Dart', icon: <SiDart />, color: '#0175C2' },
        { name: 'Laravel', icon: <FaLaravel />, color: '#FF2D20' },
        { name: 'PHP', icon: <FaPhp />, color: '#777BB4' },
        { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'Vuetify', icon: <SiVuetify />, color: '#1867C0' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
        { name: 'CodeIgniter', icon: <SiCodeigniter />, color: '#EF4223' },
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <section id="skills" style={{
            padding: '60px 40px',
            fontFamily: 'var(--font-code)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#ffffff' }}>
                    Skills & <span className="text-glow" style={{ color: 'var(--primary)' }}>Technologies</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Full‑Stack Engineering Stack
                </p>
            </motion.div>

            <motion.div 
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {skills.map((skill) => (
                    <motion.div 
                        key={skill.name} 
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.05,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderColor: skill.color + '40',
                            boxShadow: `0 0 20px ${skill.color}20`
                        }}
                        style={{
                            background: 'var(--bg-glass)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '16px',
                            padding: '24px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                        }}
                    >
                        <div 
                            style={{ 
                                fontSize: '2.5rem',
                                color: skill.color,
                                filter: `drop-shadow(0 0 8px ${skill.color}40)`,
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            {skill.icon}
                        </div>
                        <span style={{
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: 'var(--text-secondary)',
                            letterSpacing: '0.5px'
                        }}>
                            {skill.name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            <style>{`
                .skills-grid { perspective: 1000px; }
            `}</style>
        </section>
    );
};

export default Skills;
