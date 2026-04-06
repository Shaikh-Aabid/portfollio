import React, { useState, useEffect, Suspense, lazy } from 'react';
import ActivityBar from './ActivityBar';
import Explorer from './Explorer';
import EditorFrame from './EditorFrame';
import StatusBar from './StatusBar';
import Terminal from './Terminal';

// Self-contained section imports for robust mapping
const Hero = lazy(() => import('../../sections/Hero'));
const About = lazy(() => import('../../sections/About'));
const Skills = lazy(() => import('../../sections/Skills'));
const Contact = lazy(() => import('../../sections/Contact'));

// Simple ErrorBoundary component
class SectionErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) { return { hasError: true }; }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '60px', color: '#ff4444', fontFamily: 'var(--font-code)' }}>
                    <h3>[ SYSTEM_FAULT ]</h3>
                    <p>Failed to render module: {this.props.name}</p>
                    <button onClick={() => this.setState({ hasError: false })} style={{
                        marginTop: '20px', padding: '10px 20px', background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', cursor: 'pointer'
                    }}>REBOOT_MODULE</button>
                </div>
            );
        }
        return this.props.children;
    }
}

const IDEContainer = ({ children }) => {
    const [activeTab, setActiveTab] = useState('Home');
    const [openTabs, setOpenTabs] = useState(['Home']);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFileClick = (fileName) => {
        if (!openTabs.includes(fileName)) {
            setOpenTabs([...openTabs, fileName]);
        }
        setActiveTab(fileName);
    };

    const closeTab = (fileName) => {
        const newTabs = openTabs.filter(t => t !== fileName);
        setOpenTabs(newTabs);
        if (activeTab === fileName && newTabs.length > 0) {
            setActiveTab(newTabs[newTabs.length - 1]);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Home': return <Hero />;
            case 'About': return <About />;
            case 'Stack': return <Skills />;
            case 'Contact': return <Contact />;
            default: return <Hero />;
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            background: 'var(--ide-bg)',
            color: 'var(--text-main)',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <div style={{
                display: 'flex',
                flex: 1,
                overflow: 'hidden'
            }}>
                <ActivityBar 
                    onExplorerToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
                    isSidebarOpen={isSidebarOpen}
                />
                
                {isSidebarOpen && (
                    <div style={{
                        position: window.innerWidth <= 768 ? 'absolute' : 'relative',
                        left: window.innerWidth <= 768 ? 'var(--activity-bar-width)' : '0',
                        top: 0,
                        height: '100%',
                        zIndex: 100,
                        boxShadow: window.innerWidth <= 768 ? '10px 0 30px rgba(0,0,0,0.5)' : 'none'
                    }}>
                        <Explorer 
                            onFileClick={(f) => {
                                handleFileClick(f);
                                if (window.innerWidth <= 768) setIsSidebarOpen(false);
                            }} 
                            activeFile={activeTab} 
                        />
                    </div>
                )}

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <EditorFrame 
                        activeTab={activeTab}
                        openTabs={openTabs}
                        onTabClick={setActiveTab}
                        onTabClose={closeTab}
                    >
                        <Suspense fallback={
                            <div style={{ 
                                padding: '40px', 
                                color: 'var(--primary)', 
                                fontFamily: 'var(--font-code)',
                                fontSize: '14px' 
                            }}>
                                {">"} INITIALIZING_OUTPUT: {activeTab}...
                                <span style={{ 
                                    display: 'inline-block', 
                                    width: '10px', 
                                    height: '20px', 
                                    background: 'var(--primary)', 
                                    marginLeft: '10px',
                                    animation: 'blink 1s infinite'
                                }} />
                            </div>
                        }>
                            <SectionErrorBoundary name={activeTab}>
                                {renderContent()}
                            </SectionErrorBoundary>
                        </Suspense>
                    </EditorFrame>
                    
                    {isTerminalOpen && (
                        <Terminal onClose={() => setIsTerminalOpen(false)} />
                    )}
                </div>
            </div>

            <StatusBar 
                activeFile={activeTab} 
                onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)} 
            />
        </div>
    );
};

export default IDEContainer;
