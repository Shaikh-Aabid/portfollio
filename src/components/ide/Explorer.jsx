import React from 'react';
import { VscChevronDown, VscAdd, VscRefresh, VscCollapseAll, VscWindow, VscLayout, VscSymbolMethod, VscSend } from 'react-icons/vsc';

const Explorer = ({ onFileClick, activeFile }) => {
    const pages = [
        { id: 'Home', name: 'Home_View', icon: <VscWindow style={{ color: '#61DAFB' }} /> },
        { id: 'About', name: 'Profile_About', icon: <VscSymbolMethod style={{ color: '#007ACC' }} /> },
        { id: 'Stack', name: 'Tech_Stack', icon: <VscLayout style={{ color: '#F7DF1E' }} /> },
        { id: 'Contact', name: 'Connect_Hub', icon: <VscSend style={{ color: '#4D4D4D' }} /> },
    ];

    return (
        <div style={{
            width: 'var(--sidebar-width)',
            height: '100%',
            background: 'var(--ide-sidebar)',
            borderRight: '1px solid var(--ide-border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 90
        }}>
            <div style={{
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'uppercase',
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--text-muted)',
                letterSpacing: '1px'
            }}>
                <span>Explorer</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <VscAdd />
                    <VscRefresh />
                    <VscCollapseAll />
                </div>
            </div>

            <div style={{ padding: '4px 0' }}>
                <div style={{
                    padding: '6px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: 'var(--text-main)',
                    background: 'rgba(255,255,255,0.03)',
                    cursor: 'default'
                }}>
                    <VscChevronDown />
                    <span>DASHBOARD</span>
                </div>

                <div style={{ padding: '4px 0 4px 12px' }}>
                    <div style={{
                        padding: '6px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: 'var(--text-main)',
                        cursor: 'default'
                    }}>
                        <VscChevronDown />
                        <span>src/pages</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {pages.map((page) => (
                            <div
                                key={page.id}
                                onClick={() => onFileClick(page.id)}
                                style={{
                                    padding: '6px 40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '13px',
                                    color: activeFile === page.id ? 'var(--primary)' : 'var(--text-secondary)',
                                    background: activeFile === page.id ? 'var(--ide-selection)' : 'transparent',
                                    borderLeft: activeFile === page.id ? '2px solid var(--primary)' : '2px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeFile !== page.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                }}
                                onMouseLeave={(e) => {
                                    if (activeFile !== page.id) e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                <span style={{ fontSize: '14px', display: 'flex' }}>{page.icon}</span>
                                <span>{page.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explorer;
