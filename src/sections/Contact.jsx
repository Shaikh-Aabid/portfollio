import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaTimesCircle, FaChevronRight } from 'react-icons/fa';
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

    const closeModal = () => setModal({ ...modal, show: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const SERVICE_ID = 'service_cyvbw3m';
        const TEMPLATE_ID = 'template_w2hyvu9';
        const PUBLIC_KEY = 'zAxGkMfWZTliaYFHT';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(() => {
                setModal({
                    show: true,
                    success: true,
                    message: "Message delivered successfully. Protocol handshake complete."
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, () => {
                setModal({
                    show: true,
                    success: false,
                    message: 'Transmission failed. Please check network protocols or contact manually.'
                });
            })
            .finally(() => setIsSubmitting(false));
    };

    const contactInfo = [
        { icon: <FaEnvelope />, label: 'Email', value: 'shaikhaabidhussain@gmail.com', color: 'var(--primary)' },
        { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Mumbai, India', color: 'var(--secondary)' },
        { icon: <FaPhone />, label: 'Phone', value: '+91 88985 39930', color: 'var(--accent)' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="contact" style={{
            padding: '60px 40px',
            fontFamily: 'var(--font-code)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#ffffff' }}>
                    Connect <span className="text-glow" style={{ color: 'var(--primary)' }}>Hub</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Initiate Global Collaboration
                </p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '4rem',
                    maxWidth: '1100px',
                    margin: '0 auto'
                }}
            >
                {/* Contact Information */}
                <motion.div variants={itemVariants}>
                    <div style={{
                        background: 'var(--bg-glass)',
                        backdropFilter: 'blur(12px)',
                        padding: '3rem',
                        borderRadius: '24px',
                        border: '1px solid var(--glass-border)',
                        height: '100%'
                    }}>
                        <h3 style={{
                            fontSize: '1.8rem',
                            marginBottom: '1.5rem',
                            fontFamily: 'var(--font-display)',
                            fontWeight: '700',
                            color: 'var(--text-main)'
                        }}>
                            Connection Ports
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '2.5rem',
                            lineHeight: '1.8',
                            fontSize: '1.05rem'
                        }}>
                            Ready for innovative system design, artistic production, and enterprise engineering.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {contactInfo.map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ x: 10 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.25rem',
                                        padding: '15px',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid transparent',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        background: `${item.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: item.color,
                                        fontSize: '1.25rem'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.label}=</p>
                                        <p style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '1rem' }}>"{item.value}"</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Form Container */}
                <motion.div variants={itemVariants}>
                    <div style={{
                        background: 'var(--bg-glass)',
                        backdropFilter: 'blur(12px)',
                        padding: '3rem',
                        borderRadius: '24px',
                        border: '1px solid var(--glass-border)',
                    }}>
                        <form ref={form} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Input_Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    padding: '16px 20px',
                                    color: 'var(--text-main)',
                                    marginBottom: '1.5rem',
                                    fontFamily: 'var(--font-code)',
                                    outline: 'none'
                                }}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Input_Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    padding: '16px 20px',
                                    color: 'var(--text-main)',
                                    marginBottom: '1.5rem',
                                    fontFamily: 'var(--font-code)',
                                    outline: 'none'
                                }}
                            />
                            <textarea
                                name="message"
                                placeholder="Input_Message_Payload..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    padding: '16px 20px',
                                    color: 'var(--text-main)',
                                    marginBottom: '2.5rem',
                                    fontFamily: 'var(--font-code)',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                            />

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--primary-glow)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#030014',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    cursor: 'pointer'
                                }}
                            >
                                {isSubmitting ? 'Transmitting...' : 'Send Packet'}
                                <FaPaperPlane />
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {modal.show && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(3, 0, 20, 0.9)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10002,
                            padding: '20px'
                        }} 
                        onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            style={{
                                background: 'rgba(10, 1, 24, 0.95)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '24px',
                                padding: '3rem',
                                maxWidth: '420px',
                                width: '100%',
                                textAlign: 'center'
                            }} 
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: modal.success ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 68, 68, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem'
                            }}>
                                {modal.success ? (
                                    <FaCheckCircle style={{ fontSize: '2.5rem', color: 'var(--accent)' }} />
                                ) : (
                                    <FaTimesCircle style={{ fontSize: '2.5rem', color: '#ff4444' }} />
                                )}
                            </div>
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontWeight: '700' }}>
                                {modal.success ? 'System Alert: Success' : 'System Alert: Error'}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{modal.message}</p>
                            <button onClick={closeModal} className="soft-btn primary" style={{ width: '100%', padding: '16px' }}>OK</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;
