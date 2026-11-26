import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ManifestoSection from './components/ManifestoSection';
import PresenceSection from './components/PresenceSection';
import ServicesSection from './components/ServicesSection';
import ConectaSection from './components/ConectaSection';
import GallerySection from './components/GallerySection';
import ProcessSection from './components/ProcessSection';
import BioSection from './components/BioSection';
import ResultsSection from './components/ResultsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import BriefingSection from './components/BriefingSection';

interface HomePageProps {
  isBriefingOpen?: boolean;
  onOpenBriefing?: () => void;
  onCloseBriefing?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  isBriefingOpen: controlledBriefingOpen,
  onOpenBriefing: controlledOpenBriefing,
  onCloseBriefing: controlledCloseBriefing,
}) => {
  const [internalBriefingOpen, setInternalBriefingOpen] = useState(false);

  const isBriefing = controlledBriefingOpen ?? internalBriefingOpen;

  const openBriefing = () => {
    if (controlledOpenBriefing) {
      controlledOpenBriefing();
    } else {
      setInternalBriefingOpen(true);
      window.location.hash = 'briefing';
    }
  };

  const closeBriefing = () => {
    if (controlledCloseBriefing) {
      controlledCloseBriefing();
    } else {
      setInternalBriefingOpen(false);
      window.location.hash = 'topo';
    }
  };

  // Sync hash with briefing mode
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#briefing') {
        setInternalBriefingOpen(true);
        window.scrollTo(0, 0);
      } else if (window.location.hash === '#topo' || !window.location.hash) {
        setInternalBriefingOpen(false);
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (isBriefing) {
    return <BriefingSection onClose={closeBriefing} />;
  }

  return (
    <main id="topo">
      <HeroSection onOpenBriefing={openBriefing} />
      <ManifestoSection />
      <PresenceSection />
      <ServicesSection onOpenBriefing={openBriefing} />
      <ConectaSection />
      <GallerySection onOpenBriefing={openBriefing} />
      <ProcessSection onOpenBriefing={openBriefing} />
      <BioSection />
      <ResultsSection />
      <FaqSection onOpenBriefing={openBriefing} />
      <ContactSection onOpenBriefing={openBriefing} />
    </main>
  );
};

export default HomePage;
