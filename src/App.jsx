import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import IntroAnimation from './components/IntroAnimation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

function App() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <HelmetProvider>
            {showIntro && (
                <IntroAnimation onComplete={() => setShowIntro(false)} />
            )}
            <div className="App" style={{
                opacity: showIntro ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out'
            }}>
                <Helmet>
                    <title>Aabid Hussain Shaikh | Full Stack Developer</title>
                    <meta name="description" content="Portfolio of Aabid Hussain Shaikh, a Full Stack Developer specializing in React, Node.js, and modern web technologies." />
                    <meta name="keywords" content="Full Stack Developer, React, Node.js, Portfolio, Web Developer, Aabid Hussain Shaikh" />
                    <meta name="author" content="Aabid Hussain Shaikh" />
                </Helmet>
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Contact />
                </main>
                <Footer />
            </div>
        </HelmetProvider>
    );
}

export default App;
