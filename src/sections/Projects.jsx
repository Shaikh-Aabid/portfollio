import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaShoppingCart, FaTasks, FaCloud } from 'react-icons/fa';

const Projects = () => {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-featured online store with cart functionality, payment gateway integration, and user authentication.',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            demoLink: '#',
            repoLink: '#',
            icon: <FaShoppingCart />,
            gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(0, 212, 255, 0.3))'
        },
        {
            title: 'Task Management App',
            description: 'A productivity tool for teams to organize tasks, set deadlines, and track progress in real-time.',
            tags: ['React', 'Firebase', 'Tailwind'],
            demoLink: '#',
            repoLink: '#',
            icon: <FaTasks />,
            gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(16, 185, 129, 0.3))'
        },
        {
            title: 'Weather Dashboard',
            description: 'Real-time weather application providing detailed forecasts and interactive maps using open APIs.',
            tags: ['JavaScript', 'API', 'Chart.js'],
            demoLink: '#',
            repoLink: '#',
            icon: <FaCloud />,
            gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.3), rgba(124, 58, 237, 0.3))'
        }
    ];

    return (
        <section id="projects" className="section container">
            <h2 className="section-title">Featured Projects</h2>
            <p style={{
                textAlign: 'center',
                maxWidth: '600px',
                margin: '-2rem auto 3rem',
                color: 'var(--text-muted)',
                fontSize: '1.05rem'
            }}>
                Some things I've built with passion and attention to detail
            </p>

            <div className="projects-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '2rem'
            }}>
                {projects.map((project, index) => (
                    <div key={index} className="soft-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 0,
                        overflow: 'hidden'
                    }}>
                        {/* Project Preview */}
                        <div style={{
                            height: '200px',
                            background: project.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                color: 'rgba(255,255,255,0.3)'
                            }}>
                                {project.icon}
                            </div>
                        </div>

                        <div style={{ padding: '1.75rem' }}>
                            <h3 style={{
                                fontSize: '1.4rem',
                                marginBottom: '0.75rem',
                                fontFamily: 'var(--font-display)',
                                fontWeight: '600'
                            }}>{project.title}</h3>

                            <div className="tags" style={{
                                display: 'flex',
                                gap: '0.5rem',
                                flexWrap: 'wrap',
                                marginBottom: '1rem'
                            }}>
                                {project.tags.map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '0.75rem',
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        background: 'rgba(0, 212, 255, 0.1)',
                                        border: '1px solid rgba(0, 212, 255, 0.2)',
                                        color: 'var(--primary)',
                                        fontWeight: 500
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p style={{
                                color: 'var(--text-secondary)',
                                marginBottom: '1.5rem',
                                flex: 1,
                                fontSize: '0.95rem',
                                lineHeight: '1.7'
                            }}>
                                {project.description}
                            </p>

                            <div className="project-links" style={{
                                display: 'flex',
                                gap: '1rem'
                            }}>
                                <a href={project.repoLink} className="soft-btn" style={{
                                    flex: 1,
                                    padding: '10px 16px',
                                    fontSize: '0.9rem'
                                }}>
                                    <FaGithub /> Code
                                </a>
                                <a href={project.demoLink} className="soft-btn primary" style={{
                                    flex: 1,
                                    padding: '10px 16px',
                                    fontSize: '0.9rem'
                                }}>
                                    <FaExternalLinkAlt /> Demo
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
