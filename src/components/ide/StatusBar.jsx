import React from 'react';
import { VscSourceControl, VscError, VscWarning, VscBell, VscRemote, VscFeedback } from 'react-icons/vsc';

const StatusBar = ({ activeFile, onTerminalToggle }) => {
    return (
        <footer style={{
            height: 'var(--status-bar-height)',
            background: 'var(--ide-status)',
            color: '#030014',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 12px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 110,
            cursor: 'pointer'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    padding: '0 8px',
                    background: 'rgba(0,0,0,0.1)',
                    height: '100%'
                }}>
                    <VscRemote fontSize="14" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <VscSourceControl fontSize="14" />
                    <span>main*</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <VscError fontSize="14" />
                        <span>0</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <VscWarning fontSize="14" />
                        <span>0</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span onClick={onTerminalToggle} style={{ cursor: 'pointer' }}>Terminal</span>
                <span>Spaces: 4</span>
                <span>UTF-8</span>
                <span>{activeFile.endsWith('.js') ? 'Javascript/React' : activeFile.endsWith('.md') ? 'Markdown' : 'JSON'}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <VscFeedback fontSize="14" />
                    <VscBell fontSize="14" />
                </div>
            </div>
        </footer>
    );
};

export default StatusBar;
