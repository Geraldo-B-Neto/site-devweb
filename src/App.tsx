import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/home/HomePage';

export const App: React.FC = () => {
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      setIsBriefingOpen(window.location.hash === '#briefing');
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openBriefing = () => {
    window.location.hash = 'briefing';
    setIsBriefingOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeBriefing = () => {
    window.location.hash = 'topo';
    setIsBriefingOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header onOpenBriefing={openBriefing} />
      <HomePage
        isBriefingOpen={isBriefingOpen}
        onOpenBriefing={openBriefing}
        onCloseBriefing={closeBriefing}
      />
      <Footer onOpenBriefing={openBriefing} />
    </div>
  );
};

export default App;
