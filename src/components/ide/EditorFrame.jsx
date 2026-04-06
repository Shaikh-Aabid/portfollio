import React from 'react';
import { VscClose, VscChevronRight, VscCode, VscSymbolFile } from 'react-icons/vsc';
import { FaReact, FaMarkdown, FaCode, FaTerminal } from 'react-icons/fa';

const EditorFrame = ({ children, activeTab, openTabs, onTabClick, onTabClose }) => {
    const getIcon = (fileName) => {
        if (fileName.endsWith('.js')) return <FaReact style={{ color: '#61DAFB' }} />;
        if (fileName.endsWith('.md')) return <FaMarkdown style={{ color: '#007ACC' }} />;
        if (fileName.endsWith('.json')) return <FaCode style={{ color: '#F7DF1E' }} />;
        if (fileName.endsWith('.sh')) return <FaTerminal style={{ color: '#4D4D4D' }} />;
        return <VscSymbolFile />;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            height: '100%',
            overflow: 'hidden',
            background: 'var(--ide-editor)',
            position: 'relative'
        }}>
            {/* Tabs Header */}
            <div style={{
                display: 'flex',
                height: 'var(--tab-height)',
                background: 'var(--ide-sidebar)',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                zIndex: 80
            }}>
                {openTabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => onTabClick(tab)}
                        style={{
                            minWidth: '120px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 12px',
                            background: activeTab === tab ? 'var(--ide-editor)' : 'transparent',
                            borderRight: '1px solid var(--ide-border)',
                            borderTop: activeTab === tab ? '1px solid var(--primary)' : '1px solid transparent',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: activeTab === tab ? 'var(--text-main)' : 'var(--text-muted)',
                            transition: 'background 0.2s'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px', display: 'flex' }}>{getIcon(tab)}</span>
                            <span>{tab}</span>
                        </div>
                        <VscClose 
                            style={{ 
                                marginLeft: '8px', 
                                opacity: activeTab === tab ? 1 : 0.4,
                                transition: 'opacity 0.2s',
                                fontSize: '16px'
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onTabClose(tab);
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={(e) => { if (activeTab !== tab) e.currentTarget.style.opacity = '0.4' }}
                        />
                    </div>
                ))}
            </div>

            {/* Breadcrumbs */}
            <div style={{
                padding: '8px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                background: 'var(--ide-editor)',
                borderBottom: '1px solid var(--ide-border)'
            }}>
                <span>PORTFOLIO</span>
                <VscChevronRight fontSize="14" />
                <span>src</span>
                <VscChevronRight fontSize="14" />
                <span>sections</span>
                <VscChevronRight fontSize="14" />
                <span style={{ color: 'var(--text-main)' }}>{activeTab}</span>
            </div>

            {/* Scrollable Content Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                background: 'var(--ide-editor)',
                position: 'relative',
                scrollBehavior: 'smooth'
            }}>
                <div style={{ 
                    flex: 1, 
                    padding: '0', 
                    position: 'relative'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default EditorFrame;
