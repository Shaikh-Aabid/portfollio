import React from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscAccount, VscSettingsGear } from 'react-icons/vsc';

const ActivityBar = ({ onExplorerToggle, isSidebarOpen }) => {
    const topIcons = [
        { id: 'explorer', icon: <VscFiles />, active: isSidebarOpen, onClick: onExplorerToggle },
        { id: 'search', icon: <VscSearch />, active: false },
        { id: 'git', icon: <VscSourceControl />, active: false },
        { id: 'extensions', icon: <VscExtensions />, active: false }
    ];

    const bottomIcons = [
        { id: 'account', icon: <VscAccount />, active: false },
        { id: 'settings', icon: <VscSettingsGear />, active: false }
    ];

    return (
        <div style={{
            width: 'var(--activity-bar-width)',
            height: '100%',
            background: 'var(--ide-activity)',
            borderRight: '1px solid var(--ide-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0 20px',
            zIndex: 100
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                {topIcons.map((item) => (
                    <button
                        key={item.id}
                        onClick={item.onClick}
                        style={{
                            width: '100%',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            color: item.active ? 'var(--primary)' : 'var(--text-muted)',
                            background: 'transparent',
                            border: 'none',
                            borderLeft: item.active ? '2px solid var(--primary)' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                            opacity: item.active ? 1 : 0.6
                        }}
                        onMouseEnter={(e) => {
                            if (!item.active) e.currentTarget.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                            if (!item.active) e.currentTarget.style.opacity = '0.6';
                        }}
                    >
                        {item.icon}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                {bottomIcons.map((item) => (
                    <button
                        key={item.id}
                        style={{
                            width: '100%',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            color: 'var(--text-muted)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            opacity: 0.6
                        }}
                    >
                        {item.icon}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ActivityBar;
