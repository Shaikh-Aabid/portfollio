import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Project Manager',
            quote: "Alex is a phenomenal developer. The attention to detail and ability to translate complex requirements into user-friendly designs is unmatched."
        },
        {
            name: 'Michael Chen',
            role: 'CTO, TechStart',
            quote: "We hired Alex for a critical detailed dashboard project. Not only was the code clean and performant, but the Soft UI design system implemented was beautiful."
        },
        {
            name: 'Emily Davis',
            role: 'Designer',
            quote: "Rarely do you find a developer with such a strong eye for design. It made our collaboration seamless and the final product perfect."
        }
    ];

    return (
        <section id="testimonials" className="section container">
            <h2 className="section-title">Testimonials</h2>
            <div className="testimonials-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {testimonials.map((t, i) => (
                    <div key={i} className="soft-card" style={{ position: 'relative', padding: '2.5rem' }}>
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1.5rem',
                            color: 'var(--primary)',
                            opacity: 0.2,
                            fontSize: '3rem'
                        }}>
                            <FaQuoteLeft />
                        </div>

                        <p style={{
                            fontStyle: 'italic',
                            marginBottom: '1.5rem',
                            position: 'relative',
                            zIndex: 1,
                            lineHeight: '1.8'
                        }}>
                            "{t.quote}"
                        </p>

                        <div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{t.name}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
