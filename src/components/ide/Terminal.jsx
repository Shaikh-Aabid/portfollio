import React from 'react';
import { VscClose, VscChevronRight, VscTerminal } from 'react-icons/vsc';

const Terminal = ({ onClose }) => {
    const logs = [
        '[10:05:32 PM] [vite] (client) hmr update /src/sections/Hero.jsx',
        '[10:06:12 PM] [system] Portfolio engine initialized.',
        '[10:06:15 PM] [auth] Developer session started: Aabid Hussain Shaikh',
        '[10:07:01 PM] [net] Connected to portfollio-api cluster-0',
        '[10:08:44 PM] [status] Ready for interaction.'
    ];

    return (
        <div style={{
            height: '250px',
            background: 'rgba(5, 1, 15, 0.95)',
            borderTop: '2px solid var(--ide-border)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 20px',
                borderBottom: '1px solid var(--ide-border)',
                background: 'rgba(255,255,255,0.02)'
            }}>
                <div style={{ display: 'flex', gap: '20px', fontSize: '12px', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--primary)', paddingBottom: '4px' }}>TERMINAL</span>
                    <span style={{ color: 'var(--text-muted)' }}>DEBUG CONSOLE</span>
                    <span style={{ color: 'var(--text-muted)' }}>OUTPUT</span>
                    <span style={{ color: 'var(--text-muted)' }}>PORTS</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <VscClose 
                        onClick={onClose} 
                        style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '18px' }} 
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    />
                </div>
            </div>

            <div style={{
                flex: 1,
                padding: '15px 20px',
                fontFamily: 'var(--font-code)',
                fontSize: '13px',
                overflowY: 'auto',
                lineHeight: '1.6'
            }}>
                {logs.map((log, i) => (
                    <div key={i} style={{ marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{log.split(']')[0]}]</span>
                        <span style={{ color: 'var(--accent)', marginLeft: '8px' }}>{log.split(']')[1].split('[')[0]}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{log.split(']')[2]}</span>
                    </div>
                ))}
                
                <div style={{ 
                    marginTop: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    color: 'var(--primary)'
                }}>
                    <VscChevronRight />
                    <span style={{ opacity: 0.8 }}>portfolio --status active</span>
                    <span style={{ 
                        width: '8px', 
                        height: '16px', 
                        background: 'var(--primary)', 
                        animation: 'blink 1s infinite' 
                    }} />
                </div>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default Terminal;
