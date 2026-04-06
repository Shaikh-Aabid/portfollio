import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import IntroAnimation from './components/IntroAnimation';
import IDEContainer from './components/ide/IDEContainer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Aabid Hussain Shaikh | Full Stack Developer</title>
                <meta name="description" content="Portfolio of Aabid Hussain Shaikh, a Full Stack Developer specializing in React, Node.js, and modern web technologies." />
                <meta name="keywords" content="Full Stack Developer, React, Node.js, Portfolio, Web Developer, Aabid Hussain Shaikh" />
                <meta name="author" content="Aabid Hussain Shaikh" />
            </Helmet>
            
            <AnimatePresence mode="wait">
                {showIntro && (
                    <IntroAnimation onComplete={() => setShowIntro(false)} />
                )}
            </AnimatePresence>
            
            {!showIntro && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ height: '100vh', width: '100vw' }}
                >
                    <IDEContainer />
                </motion.div>
            )}
        </HelmetProvider>
    );
}

export default App;
