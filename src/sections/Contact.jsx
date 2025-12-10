import React, { useState, useRef } from 'react';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({ show: false, success: true, message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const closeModal = () => {
        setModal({ ...modal, show: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const SERVICE_ID = 'service_cyvbw3m';
        const TEMPLATE_ID = 'template_w2hyvu9';
        const PUBLIC_KEY = 'zAxGkMfWZTliaYFHT';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log('Email sent:', result.text);
                setModal({
                    show: true,
                    success: true,
                    message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, (error) => {
                console.log('Error sending email:', error.text);
                setModal({
                    show: true,
                    success: false,
                    message: 'Oops! Something went wrong. Please try again or email me directly at shaikhaabidhussain@gmail.com'
                });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const inputStyle = {
        width: '100%',
        padding: '16px 20px',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.03)',
        color: 'var(--text-main)',
        fontFamily: 'var(--font-main)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s ease'
    };

    const contactInfo = [
        { icon: <FaEnvelope />, label: 'Email', value: 'shaikhaabidhussain@gmail.com' },
        { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Mumbai, India' },
        { icon: <FaPhone />, label: 'Phone', value: '+91 88985 39930' }
    ];

    return (
        <section id="contact" className="section container">
            <h2 className="section-title">Get in Touch</h2>
            <p style={{
                textAlign: 'center',
                maxWidth: '600px',
                margin: '-2rem auto 3rem',
                color: 'var(--text-muted)',
                fontSize: '1.05rem'
            }}>
                Have a project in mind? Let's create something amazing together.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {/* Contact Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="soft-card" style={{ padding: '2rem' }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '1.5rem',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '600'
                        }}>
                            Let's Connect
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '2rem',
                            lineHeight: '1.8'
                        }}>
                            I'm always open to discussing new projects, creative ideas,
                            or opportunities to be part of your vision.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {contactInfo.map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '12px',
                                        background: 'rgba(0, 212, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--primary)',
                                        fontSize: '1.1rem'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p style={{
                                            fontSize: '0.8rem',
                                            color: 'var(--text-muted)',
                                            marginBottom: '2px'
                                        }}>{item.label}</p>
                                        <p style={{
                                            fontWeight: '500',
                                            color: 'var(--text-main)'
                                        }}>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="soft-card" style={{ padding: '2rem' }}>
                    <form ref={form} onSubmit={handleSubmit}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1rem',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)'
                                }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)'
                                }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 500,
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Project inquiry"
                                value={formData.subject}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: 500,
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>Message</label>
                            <textarea
                                name="message"
                                placeholder="Tell me about your project..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                style={{ ...inputStyle, resize: 'vertical' }}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="soft-btn primary"
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                padding: '16px',
                                fontSize: '1rem',
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            <FaPaperPlane style={{ marginLeft: '8px' }} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Beautiful Popup Modal */}
            {modal.show && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    animation: 'fadeIn 0.3s ease'
                }} onClick={closeModal}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.95), rgba(25, 25, 35, 0.95))',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '3rem',
                        maxWidth: '420px',
                        width: '90%',
                        textAlign: 'center',
                        boxShadow: modal.success
                            ? '0 0 60px rgba(16, 185, 129, 0.3), 0 25px 50px rgba(0, 0, 0, 0.5)'
                            : '0 0 60px rgba(239, 68, 68, 0.3), 0 25px 50px rgba(0, 0, 0, 0.5)',
                        animation: 'slideUp 0.4s ease',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <FaTimes />
                        </button>

                        {/* Icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: modal.success
                                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))'
                                : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            animation: 'pulse 2s infinite'
                        }}>
                            {modal.success ? (
                                <FaCheckCircle style={{
                                    fontSize: '2.5rem',
                                    color: '#10b981',
                                    filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))'
                                }} />
                            ) : (
                                <FaTimesCircle style={{
                                    fontSize: '2.5rem',
                                    color: '#ef4444',
                                    filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))'
                                }} />
                            )}
                        </div>

                        {/* Title */}
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            background: modal.success
                                ? 'linear-gradient(135deg, #10b981, #34d399)'
                                : 'linear-gradient(135deg, #ef4444, #f87171)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {modal.success ? 'Message Sent!' : 'Oops!'}
                        </h3>

                        {/* Message */}
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1rem',
                            lineHeight: '1.7',
                            marginBottom: '2rem'
                        }}>
                            {modal.message}
                        </p>

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="soft-btn primary"
                            style={{
                                padding: '14px 40px',
                                fontSize: '1rem'
                            }}
                        >
                            {modal.success ? 'Awesome!' : 'Try Again'}
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;
